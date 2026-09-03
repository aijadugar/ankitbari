import { NextResponse } from "next/server";

export const revalidate = 3600;

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "aijadugar";
const HF_USERNAME = process.env.HF_USERNAME || "aijadugar";
const KAGGLE_USERNAME = process.env.KAGGLE_USERNAME || "";

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

  const query = `
    query {
      search(query: "author:${GITHUB_USERNAME} type:pr", type: ISSUE, first: 10) {
        edges {
          node {
            ... on PullRequest {
              title
              url
              state
              createdAt
              repository { nameWithOwner }
            }
          }
        }
      }
    }`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    const edges = data?.data?.search?.edges ?? [];
    const prs: GHPR[] = edges
      .map((e: { node?: any }) => e?.node)
      .filter(Boolean)
      .map((n: any) => ({
        title: n.title,
        url: n.url,
        repository: n.repository?.nameWithOwner ?? "",
        state: n.state,
        createdAt: n.createdAt,
      }))
      .sort(
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

  try {
    const [modelsRes, spacesRes] = await Promise.all([
      fetch(
        `${HF_API}/models?author=${HF_USERNAME}&sort=downloads&direction=-1&limit=8`,
        { headers, next: { revalidate: 3600 } }
      ),
      fetch(
        `${HF_API}/spaces?author=${HF_USERNAME}&sort=likes&direction=-1&limit=8`,
        { headers, next: { revalidate: 3600 } }
      ),
    ]);

    const modelsJson = modelsRes.ok ? await modelsRes.json() : [];
    const spacesJson = spacesRes.ok ? await spacesRes.json() : [];

    const models = (modelsJson as any[]).map((m) => ({
      id: m.id,
      downloads: m.downloads ?? 0,
      likes: m.likes ?? 0,
      link: `https://huggingface.co/${m.id}`,
    }));

    const spaces = (spacesJson as any[]).map((s) => ({
      id: s.id,
      likes: s.likes ?? 0,
      link: `https://huggingface.co/spaces/${s.id}`,
    }));

    return { models, spaces };
  } catch {
    return { models: [], spaces: [], error: "Failed to fetch Hugging Face activity" };
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

  try {
    const [notebooksRes, datasetsRes, modelsRes] = await Promise.all([
      fetch(`${KAGGLE_API}/kernels/list?owner=${username}&pageSize=8`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`${KAGGLE_API}/datasets/list?owner=${username}&pageSize=8`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`${KAGGLE_API}/models/list?owner=${username}&pageSize=8`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    const notebooksJson = notebooksRes.ok ? await notebooksRes.json() : [];
    const datasetsJson = datasetsRes.ok ? await datasetsRes.json() : [];
    const modelsJson = modelsRes.ok ? await modelsRes.json() : [];

    const toItem = (x: any, base: string) => ({
      title: x.title ?? x.ref?.split("/").pop() ?? x.ref,
      link: `https://www.kaggle.com/${base}/${x.ref}`,
      votes: x.totalVotes ?? x.voteCount ?? 0,
    });

    const notebooks = (notebooksJson as any[]).filter((k) => k.kernelType === "notebook").map((k) => toItem(k, "code"));
    const datasets = (datasetsJson as any[]).map((d) => toItem(d, "datasets"));
    const models = (modelsJson as any[]).map((m) => toItem(m, "models"));

    return { notebooks, datasets, models };
  } catch {
    return { notebooks: [], datasets: [], models: [], error: "Failed to fetch Kaggle activity" };
  }
}

export async function GET() {
  const [github, huggingface, kaggle] = await Promise.all([
    fetchGitHub(process.env.GITHUB_TOKEN || ""),
    fetchHuggingFace(process.env.HUGGINGFACE_TOKEN || ""),
    fetchKaggle(KAGGLE_USERNAME, process.env.KAGGLE_KEY || ""),
  ]);

  return NextResponse.json(
    { github, huggingface, kaggle },
    { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=600" } }
  );
}
