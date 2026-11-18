import type { ComponentType } from "react";
import { Network, Search } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiPrisma,
  SiCloudflare,
  SiLangchain,
  SiNodedotjs,
  SiFramer,
  SiTailwindcss,
  SiBun,
  SiEslint,
  SiRadixui,
  SiChartdotjs,
  SiGithub,
  SiFastapi,
  SiRedis,
  SiTldraw,
  SiCss,
  SiPython,
  SiAnthropic,
  SiClaude,
  SiGooglegemini,
  SiMeta,
} from "react-icons/si";

export type TechIcon = ComponentType<{ className?: string }>;
export type TechKey =
  | "next"
  | "ts"
  | "react"
  | "prisma"
  | "cloud"
  | "langchain"
  | "node"
  | "motion"
  | "tailwind"
  | "bun"
  | "eslint"
  | "radixui"
  | "charts"
  | "github"
  | "fastapi"
  | "redis"
  | "tldraw"
  | "css3"
  | "python"
  | "anthropic"
  | "claude"
  | "gemini"
  | "llama";

export type TechItem = TechKey | { label: string; tooltip?: string };

export type ProjectStatus = "live" | "building";

export interface Project {
  slug: string;
  title: string;
  imageTitle: string;
  src: string;
  lightModeSrc?: string;
  video: string;
  description: string;
  tech: TechItem[];
  github: string;
  live: string;
  starsText?: string;
  backgroundImage?: string;
  hasPin: boolean;
  status: ProjectStatus;
}

export const iconMap: Record<TechKey, TechIcon> = {
  next: SiNextdotjs,
  ts: SiTypescript,
  react: SiReact,
  prisma: SiPrisma,
  cloud: SiCloudflare,
  langchain: SiLangchain,
  node: SiNodedotjs,
  motion: SiFramer,
  tailwind: SiTailwindcss,
  bun: SiBun,
  eslint: SiEslint,
  radixui: SiRadixui,
  charts: SiChartdotjs,
  github: SiGithub,
  fastapi: SiFastapi,
  redis: SiRedis,
  tldraw: SiTldraw,
  css3: SiCss,
  python: SiPython,
  anthropic: SiAnthropic,
  claude: SiClaude,
  gemini: SiGooglegemini,
  llama: SiMeta,
};

export const techNames: Record<TechKey, string> = {
  next: "Next.js",
  ts: "TypeScript",
  react: "React",
  prisma: "Prisma",
  cloud: "Cloudflare",
  langchain: "LangChain",
  node: "Node.js",
  motion: "Framer Motion",
  tailwind: "Tailwind CSS",
  bun: "Bun",
  eslint: "ESLint",
  radixui: "Radix UI",
  charts: "Charts",
  github: "GitHub API",
  fastapi: "FastAPI",
  redis: "Redis",
  tldraw: "tldraw",
  css3: "CSS3",
  python: "Python",
  anthropic: "Anthropic",
  claude: "Claude",
  gemini: "Gemini",
  llama: "LLaMA",
};

export const projectsData: Project[] = [
  {
    slug: "skyboy",
    title: "SkyBoy",
    imageTitle: "SkyBoy",
    src: "/skyboy.png",
    lightModeSrc: "/skyboy.png",
    video: "",
    description: "Your second brain for AI coding agents.",
    tech: [
      { label: "Next.js" },
      { label: "TypeScript" },
      { label: "Desktop Application" },
      { label: "Node.js" },
      { label: "Cross-Platform" },
      { label: "Automation" },
      { label: "Native Notifications" },
      { label: "Agent Hooks" },
    ],
    github: "https://github.com/aijadugar/skyboy",
    live: "https://skyboy.in",
    backgroundImage: "/skyboy.png",
    hasPin: true,
    status: "building",
  },
  {
    slug: "fermes",
    title: "Fermes",
    imageTitle: "Fermes",
    src: "/fermes.png",
    lightModeSrc: "/fermes.png",
    video: "",
    description:
      "Sarvam-LLM land-suitability agent that fetches live geospatial data via tool-calling, grounded in verified USGS/FEMA/USDA data to cut hallucinations.",
    tech: [
      { label: "Node.js" },
      { label: "Express" },
      { label: "Next.js" },
      { label: "Sarvam AI" },
      { label: "LiveKit" },
      { label: "Google Places API" },
      { label: "Supabase" },
      { label: "Redis" },
      { label: "Docker" },
    ],
    github: "https://github.com/aijadugar/fermes",
    live: "https://fermes.vercel.app/",
    backgroundImage: "/fermes.png",
    hasPin: false,
    status: "live",
  },
  {
    slug: "know-when-you-dont-know",
    title: "Know When You Don't Know",
    imageTitle: "Know When You Don't Know",
    src: "/know-when-you-dont-know.png",
    lightModeSrc: "/know-when-you-dont-know.png",
    video: "",
    description:
      "An LLM confidence and uncertainty project that identifies when models know an answer versus when they are guessing or hallucinating.",
    tech: [{ label: "Python" }, { label: "Jupyter Notebook" }],
    github: "https://github.com/aijadugar/Know-When-You-Don-t-Know",
    live: "",
    backgroundImage: "/placeholder.png",
    hasPin: false,
    status: "live",
  },
  {
    slug: "satbara-saathi",
    title: "Satbara Saathi",
    imageTitle: "Satbara Saathi",
    src: "/satbara-sathi.png",
    lightModeSrc: "/satbara-sathi.png",
    video: "",
    description:
      "Understand Maharashtra 7/12 (Satbara) extracts in plain Marathi / Hindi / English with user follow-ups.",
    tech: [
      { label: "JavaScript" },
      { label: "Python" },
      { label: "CSS" },
      { label: "HTML" },
    ],
    github: "https://github.com/aijadugar/satbara-saathi",
    live: "",
    backgroundImage: "/placeholder.png",
    hasPin: false,
    status: "live",
  },
  {
    slug: "message-notification-router",
    title: "Message Notification Router",
    imageTitle: "Message Notification Router",
    src: "/placeholder.png",
    lightModeSrc: "/placeholder.png",
    video: "",
    description:
      "Multimodal WhatsApp router merging text, transcribed voice (Saaras v3 STT), and image OCR (Sarvam Vision) into notify/digest/mute buckets, with a context layer for scam-risk detection.",
    tech: [
      { label: "Python" },
      { label: "Sarvam AI (LLM / STT / Vision)" },
      { label: "Pandas" },
      { label: "Tenacity" },
    ],
    github: "https://github.com/aijadugar/wa-sarvam",
    live: "",
    backgroundImage: "/placeholder.png",
    hasPin: false,
    status: "live",
  },
];
