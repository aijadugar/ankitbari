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
  | "next" | "ts" | "react" | "prisma" | "cloud" | "langchain" | "node" | "motion"
  | "tailwind" | "bun" | "eslint" | "radixui" | "charts" | "github" | "fastapi"
  | "redis" | "tldraw" | "css3" | "python" | "anthropic" | "claude" | "gemini" | "llama";

export type TechItem = TechKey | { label: string; tooltip?: string; };

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
  next: SiNextdotjs, ts: SiTypescript, react: SiReact, prisma: SiPrisma,
  cloud: SiCloudflare, langchain: SiLangchain, node: SiNodedotjs,
  motion: SiFramer, tailwind: SiTailwindcss, bun: SiBun, eslint: SiEslint, radixui: SiRadixui,
  charts: SiChartdotjs, github: SiGithub, fastapi: SiFastapi, redis: SiRedis,
  tldraw: SiTldraw, css3: SiCss, python: SiPython, anthropic: SiAnthropic, claude: SiClaude,
  gemini: SiGooglegemini, llama: SiMeta,
};

export const techNames: Record<TechKey, string> = {
  next: "Next.js", ts: "TypeScript", react: "React", prisma: "Prisma",
  cloud: "Cloudflare", langchain: "LangChain", node: "Node.js", motion: "Framer Motion",
  tailwind: "Tailwind CSS", bun: "Bun", eslint: "ESLint",
  radixui: "Radix UI", charts: "Charts", github: "GitHub API", fastapi: "FastAPI", redis: "Redis",
  tldraw: "tldraw", css3: "CSS3", python: "Python", anthropic: "Anthropic",
  claude: "Claude", gemini: "Gemini", llama: "LLaMA",
};

export const projectsData: Project[] = [
    {
    slug: "skyboy",
    title: "SkyBoy",
    imageTitle: "SkyBoy",
    src: "/placeholder.png",
    lightModeSrc: "/placeholder.png",
    video: "",
    description:
      "Agent-agnostic directory of AI skills (SKILL.md) — preview, install, and ship them to Claude, ChatGPT, Cursor, and Gemini CLI.",
    tech: [
      { label: "Next.js" },
      { label: "TypeScript" },
      { label: "AI Skills" },
      { label: "Claude" },
      { label: "ChatGPT" },
      { label: "Cursor" },
      { label: "Gemini CLI" },
    ],
    github: "https://github.com/aijadugar/skyboy",
    live: "https://skyboy.in",
    backgroundImage: "/placeholder.png",
    hasPin: true,
    status: "building",
  },
  {
    slug: "fermes",
    title: "Fermes",
    imageTitle: "Fermes",
    src: "/placeholder.png",
    lightModeSrc: "/placeholder.png",
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
    backgroundImage: "/placeholder.png",
    hasPin: false,
    status: "live",
  },
  {
    slug: "mini-interfaze",
    title: "Mini-Interfaze: Receipt Field Extractor",
    imageTitle: "Mini-Interfaze",
    src: "/placeholder.png",
    lightModeSrc: "/placeholder.png",
    video: "",
    description:
      "CRNN encoder + Transformer decoder for receipt field extraction (vendor, date, total, address) with bounding boxes. Custom fused CUDA kernel (RMSNorm + residual) speeds up training.",
    tech: [
      { label: "PyTorch" },
      { label: "CUDA" },
      { label: "CRNN" },
      { label: "Transformers" },
      { label: "EasyOCR" },
      { label: "Safetensors" },
      { label: "Hugging Face" },
      { label: "Gradio" },
    ],
    github: "https://github.com/aijadugar/mini-interfaze",
    live: "https://huggingface.co/spaces/aijadugar/mini-interfaze-receipt-extractor",
    backgroundImage: "/placeholder.png",
    hasPin: false,
    status: "live",
  },
  {
    slug: "wispr-flow-clone",
    title: "Wispr Flow Clone",
    imageTitle: "Wispr Flow Clone",
    src: "/placeholder.png",
    lightModeSrc: "/placeholder.png",
    video: "",
    description:
      "Two-stage pipeline: Whisper for verbatim transcription, then an LLM cleans fillers, grammar, and tone across email/chat/notes. Custom fused CUDA kernel (bias-add + GELU) speeds up inference.",
    tech: [
      { label: "PyTorch" },
      { label: "CUDA" },
      { label: "Transformers" },
      { label: "Whisper" },
      { label: "Hugging Face" },
      { label: "Gradio" },
    ],
    github: "https://github.com/aijadugar/wisprflow-clone",
    live: "https://huggingface.co/spaces/aijadugar/wisprflow-clone",
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
