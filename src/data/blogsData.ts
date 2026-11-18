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
            description:
              "The monorepo: website, Go CLI, MCP server, and the skills catalog itself.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Skyboy is still early, but the shape already feels right to me: one format, one manifest, and three doors in, so finding a skill and actually using it are no longer two different problems.",
      },
    ],
  },
  {
    title: "Building SiteVPN: Privacy Tools in One Account",
    date: "Dec 2025",
    claps: 0,
    tags: ["Privacy", "Open Source", "SaaS"],
    link: "/blogs/building-sitevpn",
    isExternal: false,
    slug: "building-sitevpn",
    readingTime: "5 min read",
    description:
      "Why I founded SiteVPN, an open-source privacy project that puts a smart VPN, disposable email, and temporary phone numbers behind one account and one developer API.",
    content: [
      {
        type: "paragraph",
        text: "Staying private online usually means juggling a pile of separate tools. One app for a VPN, another site for a throwaway inbox, a third service for a number that can receive a verification SMS. Each one has its own account, its own limits, and its own idea of what free means. I wanted to try the opposite: a single place where those tools live together.",
      },
      {
        type: "paragraph",
        text: "That is SiteVPN. I founded it in December 2025 and have been its lead maintainer since. It is an open-source privacy and security project that combines private browsing, disposable email, anonymous temporary phone numbers, and AI-assisted privacy help, with a freemium model so that the basics stay usable without paying.",
      },
      {
        type: "heading",
        text: "What it does today",
      },
      {
        type: "paragraph",
        text: "Everything sits behind one dashboard, so you do not have to move between products to get through a signup or a sketchy download:",
      },
      {
        type: "list",
        items: [
          "Smart VPN server recommendations, so you are pointed at a sensible server instead of scrolling a long list",
          "Temp email with automatic classification of each message as safe, promotional, phishing, or a one-time code",
          "Temporary phone numbers that receive SMS, with the OTP pulled out of the message for you",
          "AI-drafted email replies on the Pro plan",
          "Email and password sign-in, plus Google OAuth",
          "Free, Pro, and Business plans, with daily usage limits tracked per plan",
        ],
      },
      {
        type: "paragraph",
        text: "The AI parts are intentionally small and practical. Telling a phishing email from a real one, or lifting a six-digit code out of a wall of text, is exactly the sort of chore a model is good at. If no Claude API key is configured, the app falls back to simple local rules, so those features degrade instead of breaking.",
      },
      {
        type: "heading",
        text: "A developer API for the Business plan",
      },
      {
        type: "paragraph",
        text: "A privacy tool is more useful when other software can use it too. The Business plan includes API keys and a small REST API, where every request carries a bearer token. You can create an inbox, read its messages, request a number, read its SMS, list VPN servers, and open a connection, all over plain HTTP.",
      },
      {
        type: "paragraph",
        text: "Businesses can also register a webhook URL and get notified when an email arrives, an SMS lands, or a VPN connection is made. Every payload is signed with an HMAC, and the secret is shown once at registration, so the receiving side can verify that a request really came from SiteVPN before trusting it.",
      },
      {
        type: "heading",
        text: "How it is built",
      },
      {
        type: "paragraph",
        text: "The product is a Next.js App Router app with React 19, Tailwind, and TypeScript. Prisma talks to PostgreSQL on Supabase, NextAuth handles sign-in, and Stripe handles subscriptions, with a webhook that updates a user's plan the moment checkout completes or a subscription changes. The repo also has a NestJS service scaffold under server/ for backend and mail experiments, while most of the product work lives in src/.",
      },
      {
        type: "paragraph",
        text: "I also wrote SEO landing pages for the three tools people search for most: free temp email, temporary phone number, and free VPN with no logs. Many privacy tools get found through exactly those searches, so the pages are part of the product, not an afterthought.",
      },
      {
        type: "quote",
        text: "A privacy tool that hides what it cannot do is not a privacy tool.",
      },
      {
        type: "heading",
        text: "Where it honestly stands",
      },
      {
        type: "paragraph",
        text: "SiteVPN is still a prototype, and I would rather say so than oversell it. The repo's own readiness checklist is blunt: the email, SMS, and VPN data is still mocked in places and needs real production providers behind it, customer webhook delivery needs timeouts and queueing, and some pages still need real policy and status content. Those are the next things on the list, in that order.",
      },
      {
        type: "paragraph",
        text: "That is also the reason it is open source. For a product that asks people to trust it with their privacy, the code should be readable by the people being asked. Issues, ideas, and pull requests are all welcome.",
      },
      {
        type: "links",
        items: [
          {
            title: "aijadugar/SiteVPN on GitHub",
            href: "https://github.com/aijadugar/SiteVPN",
            description:
              "The open-source repo: the Next.js app, the developer API, and the NestJS scaffold.",
          },
          {
            title: "sitevpn.me",
            href: "https://sitevpn.me",
            description:
              "The live site for the VPN, temp email, and temp number tools.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "The goal is simple: make the private option the easy option, with one account instead of five, and keep every claim in the product something the code can back up.",
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