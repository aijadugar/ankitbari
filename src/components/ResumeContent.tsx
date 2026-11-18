import React from "react";

// ---- Data -------------------------------------------------------------

const contact = {
  name: "Ankit Bari",
  tagline: "AI engineer and founder | shipping open-source and building SkyBoy",
  email: "bariankitvinod@gmail.com",
  website: { label: "ankitbari.vercel.app", url: "https://ankitbari.vercel.app" },
  linkedin: { label: "linkedin.com/in/aijadugar", url: "https://www.linkedin.com/in/aijadugar/" },
  github: { label: "github.com/aijadugar", url: "https://github.com/aijadugar" },
};

const education = [
  {
    degree: "Bachelor of Technology in Artificial Intelligence and Data Science",
    dates: "2023 – 2026",
    school: "Vidyavardhini's College of Engineering and Technology, Mumbai University",
    detail: "CGPA: 9.10 / 10.0",
  },
  {
    degree: "Diploma in Computer Engineering",
    dates: "2021 – 2023",
    school: "Theem College of Engineering, MSBTE",
    detail: "Percentage: 85.3%",
  },
];

const experience = [
  {
    role: "Founder",
    dates: "Mar 2026 – Present",
    org: "SkyBoy",
    location: "Mumbai, India",
    bullets: [
      "Building a cross-platform desktop product for developer tools and workflow automation, built for the shift to AI-assisted (\"vibe\") coding and agentic software development.",
      "Developing it for Claude Code and Codex as a second autonomous brain that works alongside coding agents: it tracks their progress, alerts you, and keeps long tasks moving by sending the next prompt on its own.",
      "Defining product vision, roadmap and go-to-market for engineers using Claude Code, Codex and other AI coding agents; leading design, competitive research and the product website.",
    ],
  },
  {
    role: "AI Research Intern",
    dates: "Jun 2025 – Nov 2025",
    org: "The SMM Hub",
    location: "Mumbai, India",
    bullets: [
      "Built an AI chatbot for lead tracking and evaluated it against conversation datasets, achieving 95% accuracy in user data capture.",
      "Researched, built and load-tested a fintech authentication backend, then deployed it to serve 100+ daily users with 150–200 ms request latency.",
      "Solved a client's content bottleneck by designing a multi-agent system in CrewAI, where specialized LLM agents (research, drafting, editing, image generation) automate blog production from topic to publish-ready post.",
    ],
  },
];

const projects = [
  {
    name: "Know-When-You-Don't-Know: Hallucination Detection for LLMs",
    tag: "Live | Code",
    stack:
      "PyTorch · Transformers · Qwen2.5-3B-Instruct · scikit-learn · Gradio · Hugging Face Spaces (ZeroGPU)",
    bullets: [
      "Built an LLM reliability system that predicts, before generation, whether a model's answer to a factual question will be wrong, using a linear probe on the last-prompt-token hidden state of Qwen2.5-3B-Instruct, and abstains instead of hallucinating.",
      "Developed an end-to-end reproducible pipeline (data build, answer labeling, activation extraction, probe training, out-of-distribution evaluation) trained on TriviaQA and tested on NQ-Open, with unit tests, a claims-audit script and a deployed Gradio app.",
    ],
  },
  {
    name: "Satbara Saathi: Land-Record Explainer",
    tag: "Live | Code",
    stack: "Python · OCR · LLMs · Text-to-Speech · Docker · GitHub Actions · Render",
    bullets: [
      "Built a multilingual (Marathi, Hindi, English) AI tool that reads scanned Maharashtra 7/12 land records and explains them in plain language, with spoken summaries, for farmers and landowners.",
      "Designed a pipeline of OCR, structured extraction, validation and a deterministic red-flag rules engine with no AI in the decision logic, using the LLM only to explain findings; added consent gating, deletion of images after processing and PII-free logs.",
    ],
  },
  {
    name: "Fermes",
    tag: "Live | Code",
    stack:
      "Node.js · Express · Next.js · Sarvam AI · LiveKit · Google Places API · Supabase (OAuth) · Redis · Docker",
    bullets: [
      "Engineered an AI land-suitability agent, orchestrating Sarvam's LLM with tool-calling over cited geospatial data (elevation, flood zone, soil) and Google Places for nearby suppliers.",
      "Delivered a derived-verdict site report grounding LLM output in factual sources (USGS, FEMA, USDA) instead of raw model opinion, to reduce hallucination risk in high-stakes farming decisions.",
    ],
  },
];

const openSource = [
  {
    name: "Nuphos",
    text: "Merged 30+ pull requests across the desktop, backend and agent-runtime layers of a platform that runs Claude Code and Codex agents. Hardened security and reliability: IP-based rate limiting on password sign-in. Fixed a session-loss bug where flaky session loads wiped an agent's saved context; the change was merged with praise from the maintainer.",
  },
  {
    name: "Heard",
    text: "(PR under review) Windows support for the headless core (daemon, CLI, hooks, audio) and a fix for failures when the cloud voice is unavailable.",
  },
  {
    name: "HydraDB CLI",
    text: "(PR under review) fixes for CLI input handling, config security and API response validation.",
  },
  {
    name: "Monid",
    text: "(PR under review) engine fix preventing URL path parameters from escaping their path segment.",
  },
  {
    name: "BasedosDados SDK",
    text: "Added a GCP Console link to copy_table success logs to speed up debugging of data pipelines.",
  },
];

const skills = [
  { label: "Programming Languages", value: "Python, C++, CUDA, SQL, Bash" },
  {
    label: "Machine Learning & Deep Learning",
    value:
      "PyTorch, Hugging Face Transformers, Parameter-Efficient Fine-Tuning (PEFT), Model Evaluation & Benchmarking, Multimodal and Multilingual AI, GPU Optimization",
  },
  {
    label: "LLM & Agentic AI",
    value:
      "Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), Multi-Agent Systems, LLM APIs, LLM Evaluation",
  },
  { label: "Backend & Frameworks", value: "FastAPI, Flask, Express.js, Next.js, React.js" },
  { label: "Databases", value: "MongoDB, Redis, Chroma DB (vector database)" },
  { label: "Tools & DevOps", value: "Git, GitHub, Docker, CI/CD, Cloud Deployment, Jupyter" },
];

const achievements = [
  "Ranked 1st in the Department of Artificial Intelligence & Data Science",
  "2nd Place at VNPS'25 – National-Level Project Showcase, VCET Mumbai",
  "Open-sourced models on Hugging Face Hub, with 100k+ downloads across Neural Networks, LLMs, ASR, translation, and vision architectures",
  "Launched aynlp, an open-source NLP utility library with 7k+ downloads, enabling developers to solve common NLP tasks efficiently",
  "Authored 3+ technical articles on AI Agents and Reinforcement Learning in VCET Techzette",
  "Kaggle competitor with 15+ badges across Notebooks and Competitions, applying data science and ML techniques to real-world problems",
  "Solved 350+ DSA problems across competitive coding platforms",
];

// ---- Small building blocks ---------------------------------------------

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-bold tracking-wide text-gray-900 border-b border-gray-300 pb-1 mb-2.5">
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 space-y-1">
      {items.map((b, i) => (
        <li key={i} className="flex text-[12.5px] leading-snug text-gray-800">
          <span className="mr-2 select-none">•</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function NamedBullets({ items }: { items: { name: string; text: string }[] }) {
  return (
    <ul className="mt-1 space-y-1">
      {items.map((b, i) => (
        <li key={i} className="flex text-[12.5px] leading-snug text-gray-800">
          <span className="mr-2 select-none">•</span>
          <span>
            <span className="font-semibold">{b.name}: </span>
            {b.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ---- Main component -----------------------------------------------------

export default function ResumeContent() {
  return (
    <div className="w-full font-sans">
      <div className="mx-auto max-w-[820px] rounded-[6px] bg-white text-gray-900 shadow-sm ring-1 ring-black/10 dark:ring-white/10 px-6 py-8 sm:px-10 sm:py-9">
        {/* Header */}
        <header className="text-center mb-5">
          <h1 className="text-[26px] font-bold tracking-tight">{contact.name}</h1>
          <p className="mt-1 text-[12.5px] italic text-gray-700">{contact.tagline}</p>
          <p className="mt-1 text-[12.5px] text-gray-700">
            {contact.email} |{" "}
            <a
              href={contact.website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 underline hover:text-gray-900"
            >
              {contact.website.label}
            </a>{" "}
            |{" "}
            <a
              href={contact.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 underline hover:text-gray-900"
            >
              {contact.linkedin.label}
            </a>{" "}
            |{" "}
            <a
              href={contact.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 underline hover:text-gray-900"
            >
              {contact.github.label}
            </a>
          </p>
        </header>

        {/* Education */}
        <section className="mb-4">
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-2.5">
            {education.map((ed, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline text-[13px]">
                  <span className="font-semibold">{ed.degree}</span>
                  <span className="text-gray-700 text-[12.5px] whitespace-nowrap ml-4">{ed.dates}</span>
                </div>
                <div className="flex justify-between items-baseline text-[12.5px] text-gray-700 italic">
                  <span>{ed.school}</span>
                  <span className="whitespace-nowrap ml-4">{ed.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-4">
          <SectionHeading>Work Experience</SectionHeading>
          <div className="space-y-3">
            {experience.map((job, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline text-[13px]">
                  <span className="font-semibold">{job.role}</span>
                  <span className="text-gray-700 text-[12.5px] whitespace-nowrap ml-4">{job.dates}</span>
                </div>
                <div className="flex justify-between items-baseline text-[12.5px] text-gray-700 italic">
                  <span>
                    {job.org} · {job.location}
                  </span>
                </div>
                <Bullets items={job.bullets} />
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-4">
          <SectionHeading>Projects</SectionHeading>
          <div className="space-y-3">
            {projects.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline text-[13px]">
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-gray-700 text-[12.5px] whitespace-nowrap ml-4">{p.tag}</span>
                </div>
                <div className="text-[12px] text-gray-700 italic">{p.stack}</div>
                <Bullets items={p.bullets} />
              </div>
            ))}
          </div>
        </section>

        {/* Open Source Contributions */}
        <section className="mb-4">
          <SectionHeading>Open Source Contributions</SectionHeading>
          <NamedBullets items={openSource} />
        </section>

        {/* Technical Skills */}
        <section className="mb-4">
          <SectionHeading>Technical Skills</SectionHeading>
          <div className="space-y-1">
            {skills.map((s, i) => (
              <p key={i} className="text-[12.5px] leading-snug text-gray-800">
                <span className="font-semibold">{s.label}: </span>
                {s.value}
              </p>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <SectionHeading>Achievements</SectionHeading>
          <Bullets items={achievements} />
        </section>
      </div>
    </div>
  );
}