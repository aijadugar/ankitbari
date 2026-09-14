export interface Blog {
  title: string;
  date: string;
  claps: number;
  tags: string[];
  link: string;
  isExternal: boolean;
  slug?: string;
  description?: string;
  readingTime?: string;
  content?: BlogBlock[];
}

export type BlogBlock =
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "quote";
      text: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "links";
      items: {
        title: string;
        href: string;
        description: string;
      }[];
    };

export const blogsData: Blog[] = [
  {
    title: "Building SkyBoy: A Directory for AI Skills",
    date: "Aug 2026",
    claps: 0,
    tags: ["AI", "Agents", "Building"],
    link: "/blogs/building-skyboy",
    isExternal: false,
    slug: "building-skyboy",
    readingTime: "6 min read",
    description:
      "Why I started Skyboy, and how a single SKILL.md format became a website, a Go CLI, and an MCP server that any coding agent can pull from.",
    content: [
      {
        type: "paragraph",
        text: "Every agent I used wanted skills in a slightly different place, in a slightly different shape. Claude Code wanted a folder. Cursor wanted rules. Windsurf, Gemini CLI, and Codex each had their own convention. If you found a genuinely good skill, the only way to reuse it was to copy-paste the file around and hope you did not lose track of updates.",
      },
      {
        type: "paragraph",
        text: "Skyboy is my answer to that: a fast, searchable, agent-agnostic home for portable AI skills and plugins. Every entry is a self-contained SKILL.md package that hands a coding agent, a writing agent, or a reasoning workflow a reusable, expert-level behavior, without you needing to know or care which agent you happen to be running.",
      },
      {
        type: "heading",
        text: "One catalog, three ways in",
      },
      {
        type: "paragraph",
        text: "The core idea is that a skill should be one command away from whatever tool you already have open. So the catalog ships three times: as a searchable website, as a single dependency-free CLI binary written in Go, and as an MCP server.",
      },
      {
        type: "paragraph",
        text: "The CLI is a static binary with no runtime to install. You pull it down and immediately have a working toolset:",
      },
      {
        type: "list",
        items: [
          "skyboy add <name1,name2,...> — download skills into ./.skyboy/skills/ and track them in ~/.skyboy/state.json",
          "skyboy update <name> — re-fetch a skill and report what changed",
          "skyboy list / skyboy list --all — see what you have locally, or browse the full catalog by category",
          "skyboy zip <name1,name2,...> — bundle skills into a ZIP with a generated context summary for uploading to ChatGPT, Claude, or Gemini",
          "skyboy info <name> — print a skill's SKILL.md",
          "skyboy mcp --transport stdio — run the MCP server locally",
        ],
      },
      {
        type: "paragraph",
        text: "That zip command mattered more than I expected. Every archive gets a generated summary file at its root, written for the model on the receiving end rather than for a human, so the upload-a-zip workflow actually works the first time instead of leaving the agent guessing what it was just handed.",
      },
      {
        type: "heading",
        text: "A format simple enough that a folder is a PR",
      },
      {
        type: "paragraph",
        text: "Every skill lives in its own folder with a SKILL.md carrying frontmatter and a command section, plus a skill.json validated against a JSON Schema. Plugins follow the same idea but are indexed rather than vendored: a plugin.json points at the upstream repository as the source of truth, so content issues get reported there instead of forking someone else's work into the catalog.",
      },
      {
        type: "paragraph",
        text: "Categories are not hardcoded anywhere. They are derived directly from the top-level folders under the skills directory, so adding a new category is just adding a folder and opening a pull request, with no code change anywhere in the site or the CLI. CI runs a Go validator against the schemas on every PR and rebuilds the catalog, so drift fails the build instead of quietly shipping.",
      },
      {
        type: "heading",
        text: "The MCP server, two ways",
      },
      {
        type: "paragraph",
        text: "The same server implementation exposes the catalog as callable tools, just with different trust levels depending on the transport. The hosted endpoint is read-only: search, preview, list, and bundle, nothing that touches your filesystem. The local stdio server adds one more tool, install_skill, which actually writes files, and that only runs locally because writing to disk is the one thing that needs local trust rather than a remote connection.",
      },
      {
        type: "quote",
        text: "Actions speak louder than words.",
      },
      {
        type: "heading",
        text: "How the repo is put together",
      },
      {
        type: "paragraph",
        text: "It is a monorepo with a clear split between the parts that change often and the parts that should barely ever change. The Next.js site lives under apps/web and also hosts the read-only MCP endpoint. The Go binary under cli/ is the CLI and the stdio MCP server in one, built on the standard library with zero third-party dependencies. skills/ is the actual catalog, one folder per skill, and plugins/ is the index of everything that lives upstream. A single catalog.json at the repo root, generated from those two folders, is the one manifest that the website, the CLI, and the MCP server all read from, so there is exactly one source of truth to keep in sync.",
      },
      {
        type: "heading",
        text: "Small conventions, kept on purpose",
      },
      {
        type: "paragraph",
        text: "A couple of house rules run through the whole project, in the docs and the rendered site alike: no em-dashes anywhere in rendered text, CLI output, or docstrings, and hairline borders paired with a pen-blue accent used only on strokes, never on surfaces. Neither one is load-bearing, but keeping them consistent everywhere is part of what makes the catalog feel like one product instead of a pile of separate tools stitched together.",
      },
      {
        type: "links",
        items: [
          {
            title: "aijadugar/skyboy on GitHub",
            href: "https://github.com/aijadugar/skyboy",
            description: "The monorepo: website, Go CLI, MCP server, and the skills catalog itself.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Skyboy is still early, but the shape already feels right to me: one format, one manifest, and three doors in, so finding a skill and actually using it are no longer two different problems.",
      },
    ],
  },
];

export const blogPosts = blogsData.filter(
  (blog): blog is Blog & { slug: string; content: BlogBlock[] } =>
    typeof blog.slug === "string" && Array.isArray(blog.content),
);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((blog) => blog.slug === slug);
}