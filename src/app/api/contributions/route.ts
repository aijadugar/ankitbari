import { NextResponse } from "next/server";

export const revalidate = 3600;

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "aijadugar";
const HF_USERNAME = process.env.HF_USERNAME || "aijadugar";
const KAGGLE_USERNAME = process.env.KAGGLE_USERNAME || "bariankitvinod";

const HF_API = "https://huggingface.co/api";
const KAGGLE_API = "https://www.kaggle.com/api/v1";

interface GHPR {
  title: string;
  url: string;
  repository: string;
  state: "OPEN" | "CLOSED" | "MERGED";
  createdAt: string;
}

interface ContributionsData {
  github: { prs: GHPR[]; error?: string };
  huggingface: {
    models: { id: string; downloads: number; likes: number; link: string }[];
    spaces: { id: string; likes: number; link: string }[];
    datasets: { id: string; downloads: number; likes: number; link: string }[];
    error?: string;
  };
  kaggle: {
    notebooks: { title: string; link: string; votes: number }[];
    datasets: { title: string; link: string; votes: number }[];
    models: { title: string; link: string; votes: number }[];
    error?: string;
  };
}

async function fetchGitHub(token: string): Promise<ContributionsData["github"]> {
  if (!token) {
    return { prs: [], error: "Missing GITHUB_TOKEN" };
  }

  // Paginate through every PR matching the author. GitHub search caps each
  // page at 100 and the total result set at 1000, so we loop until we've
  // drained the cursor (or hit the 1000 ceiling).
  const MAX_TOTAL = 1000;
  const PAGE_SIZE = 100;

  const query = `
    query($cursor: String) {
      search(query: "author:${GITHUB_USERNAME} type:pr", type: ISSUE, first: ${PAGE_SIZE}, after: $cursor) {
        edges {
          node {
            ... on PullRequest {
              title
              url
              state
              createdAt
              mergedAt
              repository { nameWithOwner }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }`;

  try {
    const prs: GHPR[] = [];
    let cursor: string | null = null;

    do {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables: { cursor } }),
        next: { revalidate: 3600 },
      });

      const data = await res.json();
      const search = data?.data?.search;
      const edges = search?.edges ?? [];

      for (const e of edges) {
        const n = e?.node;
        if (!n) continue;
        // GraphQL `state` is OPEN | CLOSED. A closed PR that was merged
        // reports MERGED here (mergedAt is set); otherwise it's CLOSED.
        const state: GHPR["state"] =
          n.state === "OPEN"
            ? "OPEN"
            : n.mergedAt
            ? "MERGED"
            : "CLOSED";
        prs.push({
          title: n.title,
          url: n.url,
          repository: n.repository?.nameWithOwner ?? "",
          state,
          createdAt: n.createdAt,
        });
      }

      const pageInfo = search?.pageInfo ?? {};
      cursor = pageInfo.hasNextPage ? pageInfo.endCursor : null;
    } while (cursor && prs.length < MAX_TOTAL);

    prs.sort(
      (a: GHPR, b: GHPR) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return { prs };
  } catch (err) {
    return { prs: [], error: "Failed to fetch GitHub activity" };
  }
}

async function fetchHuggingFace(token: string): Promise<ContributionsData["huggingface"]> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  // Hugging Face's list endpoints are paginated via `limit` + `offset`.
  // We page through all results (cap at 1000) so every sub-tab is complete.
  const PAGE_SIZE = 100;
  const MAX_TOTAL = 1000;

  const fetchAll = async (
    path: string,
    make: (item: any) => { id: string; downloads: number; likes: number; link: string }
  ) => {
    const items: { id: string; downloads: number; likes: number; link: string }[] = [];
    let offset = 0;
    do {
      const res = await fetch(
        `${HF_API}/${path}?author=${HF_USERNAME}&sort=downloads&direction=-1&limit=${PAGE_SIZE}&offset=${offset}`,
        { headers, next: { revalidate: 3600 } }
      );
      if (!res.ok) break;
      const json = (await res.json()) as any[];
      if (!Array.isArray(json) || json.length === 0) break;
      for (const item of json) items.push(make(item));
      offset += PAGE_SIZE;
    } while (items.length < MAX_TOTAL && items.length % PAGE_SIZE === 0);
    return items;
  };

  try {
    const [models, spaces, datasets] = await Promise.all([
      fetchAll("models", (m) => ({
        id: m.id,
        downloads: m.downloads ?? 0,
        likes: m.likes ?? 0,
        link: `https://huggingface.co/${m.id}`,
      })),
      fetchAll("spaces", (s) => ({
        id: s.id,
        downloads: 0,
        likes: s.likes ?? 0,
        link: `https://huggingface.co/spaces/${s.id}`,
      })),
      fetchAll("datasets", (d) => ({
        id: d.id,
        downloads: d.downloads ?? 0,
        likes: d.likes ?? 0,
        link: `https://huggingface.co/datasets/${d.id}`,
      })),
    ]);

    return { models, spaces, datasets };
  } catch {
    return { models: [], spaces: [], datasets: [], error: "Failed to fetch Hugging Face activity" };
  }
}

async function fetchKaggle(username: string, key: string): Promise<ContributionsData["kaggle"]> {
  if (!username || !key) {
    return { notebooks: [], datasets: [], models: [], error: "Missing KAGGLE_USERNAME / KAGGLE_KEY" };
  }

  const auth = Buffer.from(`${username}:${key}`).toString("base64");
  const headers = {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
  };

  // Kaggle endpoint quirks:
  //  - kernels/list & datasets/list: flat array, paged via `page=N` (max pageSize 100).
  //  - models/list: returns { models, nextPageToken }, paged via `nextPageToken`.
  //  - auth param differs: `user=` for kernels/datasets, `owner=` for models.
  const fetchList = async (path: string, param: "user" | "owner") => {
    const all: any[] = [];
    let page = 1;
    do {
      const res = await fetch(
        `${KAGGLE_API}/${path}?${param}=${username}&pageSize=100&page=${page}`,
        { headers, next: { revalidate: 3600 } }
      );
      if (!res.ok) break;
      const json = (await res.json()) as any[];
      if (!Array.isArray(json) || json.length === 0) break;
      for (const item of json) all.push(item);
      page += 1;
    } while (all.length < 100000);
    return all;
  };

  const fetchModels = async () => {
    const all: any[] = [];
    let pageToken = "";
    do {
      const url = `${KAGGLE_API}/models/list?owner=${username}&pageSize=100${pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ""}`;
      const res = await fetch(url, { headers, next: { revalidate: 3600 } });
      if (!res.ok) break;
      const json = (await res.json()) as { models?: any[]; nextPageToken?: string };
      for (const m of json.models ?? []) all.push(m);
      pageToken = json.nextPageToken ?? "";
    } while (pageToken);
    return all;
  };

  try {
    const [notebooksJson, datasetsJson, modelsJson] = await Promise.all([
      fetchList("kernels/list", "user"),
      fetchList("datasets/list", "user"),
      fetchModels(),
    ]);

    const toItem = (x: any, base: string, titleKey: string) => ({
      title: x[titleKey] ?? x.ref?.split("/").pop() ?? x.ref,
      link: `https://www.kaggle.com/${base}/${x.ref}`,
      votes: x.totalVotes ?? x.voteCount ?? x.usefulCount ?? 0,
    });

    const notebooks = (notebooksJson as any[])
      .filter((k) => !k.kernelType || k.kernelType === "notebook" || k.kernelType === "script")
      .map((k) => toItem(k, "code", "title"));
    const datasets = (datasetsJson as any[]).map((d) => toItem(d, "datasets", "title"));
    const models = (modelsJson as any[]).map((m) => toItem(m, "models", "title"));

    return { notebooks, datasets, models };
  } catch {
    return { notebooks: [], datasets: [], models: [], error: "Failed to fetch Kaggle activity" };
  }
}

export async function GET() {
  // Trim env values so stray newlines / CRLF in .env.local can't corrupt
  // the Basic auth header (a trailing CR silently 401s the Kaggle API).
  const trim = (v: string | undefined) => (v ?? "").trim();

  const [github, huggingface, kaggle] = await Promise.all([
    fetchGitHub(trim(process.env.GITHUB_TOKEN)),
    fetchHuggingFace(trim(process.env.HUGGINGFACE_TOKEN)),
    fetchKaggle(trim(KAGGLE_USERNAME), trim(process.env.KAGGLE_KEY)),
  ]);

  return NextResponse.json(
    { github, huggingface, kaggle },
    { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=600" } }
  );
}
