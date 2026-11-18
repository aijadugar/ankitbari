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
    title: "Building SkyBoy: A Second Brain for AI Coding Agents",
    date: "Aug 2026",
    claps: 0,
    tags: ["AI", "Agents", "Building"],
    link: "/blogs/building-skyboy",
    isExternal: false,
    slug: "building-skyboy",
    readingTime: "4 min read",
    description:
      "Why I started Skyboy, a desktop app that works alongside Claude Code and Codex as a second brain: it tracks their progress, alerts you, and keeps long tasks moving.",
    content: [
      {
        type: "paragraph",
        text: "Coding agents can now work for a long time without you. That sounds like freedom, until you realize what it does to your day. You start a task, switch to something else, and come back to find the agent finished twenty minutes ago, or has been sitting on a permission prompt the whole time. The agent is autonomous, but you are still the one babysitting it.",
      },
      {
        type: "paragraph",
        text: "Skyboy is my answer to that. It is a second brain for AI coding agents: a desktop app that runs alongside Claude Code and Codex, keeps track of what they are doing, tells you when it matters, and keeps the work moving when you are not at the keyboard.",
      },
      {
        type: "heading",
        text: "What a second brain does",
      },
      {
        type: "paragraph",
        text: "The idea is that your agent does the coding while Skyboy does the watching and the follow-up. That comes down to three jobs:",
      },
      {
        type: "list",
        items: [
          "Tell you when the agent finishes or needs your permission, with a custom sound, a ring, or a push notification",
          "Send the next prompt on its own when a task ends, from a list of prompts you set in advance, so a long piece of work keeps going without you",
          "Run an action once the work is done, such as putting your PC to sleep, so you can walk away and trust that things will wrap up properly",
        ],
      },
      {
        type: "paragraph",
        text: "The second job is the one I care about most. A single prompt rarely finishes real work. Real work is a chain of prompts, and today you are the one who has to sit there and pass the baton from one to the next. Skyboy lets you write the chain once and then leave.",
      },
      {
        type: "heading",
        text: "Why a desktop app",
      },
      {
        type: "paragraph",
        text: "Skyboy is a desktop app, not a CLI and not a browser extension. Your agents run on your machine, so that is where you need to be told what they are doing, and where an action like sleeping the computer has to happen. The first agents it supports are Claude Code and Codex, and the aim is for it to work for anyone using AI coding tools.",
      },
      {
        type: "quote",
        text: "Actions speak louder than words.",
      },
      {
        type: "heading",
        text: "Staying in control",
      },
      {
        type: "paragraph",
        text: "Handing prompts to an agent automatically only works if you can trust what happens next. So the rule behind Skyboy is simple: nothing runs without your say-so. You write the prompts, you set the actions, and Skyboy carries them out exactly as you set them. It is a second brain that follows your plan, not one that invents its own.",
      },
      {
        type: "heading",
        text: "Where it stands",
      },
      {
        type: "paragraph",
        text: "Skyboy is early. The website is the first thing I am building, with a download button and a clear description of the product, and the desktop software comes after it. I am also studying other open-source projects built around coding agents, and I plan to fold the useful ideas into Skyboy rather than reinvent them.",
      },
      {
        type: "links",
        items: [
          {
            title: "aijadugar/skyboy on GitHub",
            href: "https://github.com/aijadugar/skyboy",
            description:
              "The Skyboy repo: the second brain for AI coding agents.",
          },
          {
            title: "skyboy.in",
            href: "https://skyboy.in",
            description: "The Skyboy website.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "The goal is simple: let people hand real work to coding agents and stop watching the screen, because something is watching for them.",
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