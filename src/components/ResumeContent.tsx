import React from "react";

// ---- Data -------------------------------------------------------------

const contact = {
  name: "Ankit Bari",
  email: "bariankitvinod@gmail.com",
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
    role: "Solo Founder",
    dates: "Dec 2025 – Present",
    org: "SiteVPN & SkyBoy",
    location: "Mumbai, India",
    bullets: [
      "SiteVPN, an open-source privacy solution offering temporary emails, phone numbers, and VPN routing for secure AI tool usage.",
      "Building SkyBoy, an open-source skill infrastructure (SKILL.md) for AI agents, via web catalog, CLI installer, and MCP server.",
    ],
  },
  {
    role: "AI Research Intern",
    dates: "Jun 2025 – Nov 2025",
    org: "The SMM Hub",
    location: "Mumbai, India",
    bullets: [
      "Developed AI Chatbot for lead tracking, achieving 95% accurate user data capture.",
      "Implemented fintech authentication backend, achieving low-latency (150–200 ms) request handling for 100+ daily users.",
      "Built a multi-agent blog generation system using CrewAI for a client, orchestrating specialized agents (research, drafting, editing, image generation) via OpenRouter LLM APIs.",
    ],
  },
];

const projects = [
  {
    name: "Fermes",
    tag: "Live | Code",
    stack:
      "Node.js · Express · Next.js · Sarvam AI · LiveKit · Google Places API · Supabase (OAuth) · Redis · Docker",
    bullets: [
      "Engineered an AI land-suitability agent, orchestrating Sarvam's LLM with tool-calling over cited geospatial data (elevation, flood zone, soil) and Google Places for nearby suppliers.",
      "Delivered a derived-verdict site report grounding LLM output in factual sources (USGS, FEMA, USDA) instead of raw model opinion, cutting hallucination risk in high-stakes farming decisions.",
    ],
  },
  {
    name: "Mini-Interfaze: Receipt Field Extractor",
    tag: "Live | Code",
    stack: "PyTorch · CUDA · CRNN · Transformers · EasyOCR · Safetensors · Hugging Face Hub · Gradio",
    bullets: [
      "Designed a native-fusion architecture from scratch: CRNN (CNN + BiLSTM + CTC) encoder → transformer decoder embedding space → fixed-schema JSON (company, date, address, total) with bounding-box + confidence metadata.",
      "Wrote a custom fused CUDA kernel (RMSNorm + residual) to speed up training.",
    ],
  },
  {
    name: "Wispr Flow Clone",
    tag: "Live | Code",
    stack: "PyTorch · CUDA · Transformers · Whisper · Hugging Face Hub · Gradio",
    bullets: [
      "Fine-tuned a two-stage pipeline from scratch: Whisper ASR (verbatim, disfluency-preserving) → fine-tuned LLM for filler removal, grammar fixes, and tone adaptation across email/chat/notes modes, keeping all rewriting confined to an auditable system prompt.",
      "Wrote a custom fused CUDA kernel (bias-add + GELU) that reduces GPU memory traffic.",
    ],
  },
  {
    name: "Message Notification Router",
    tag: "Code",
    stack: "Python · Sarvam AI (LLM/STT/Vision) · Pandas · Tenacity",
    bullets: [
      "Built a multimodal WhatsApp router: text + transcribed voice (Saaras v3 STT) + OCR'd images (Sarvam Vision) → fused reasoning context → Sarvam-105B classifies notify/digest/mute.",
      "Designed a context-assembly layer fusing engagement, group roles, business history, and repetition signals into one JSON payload, feeding risk/scam signals as observations.",
    ],
  },
];

const skills = [
  { label: "Languages", value: "Python, C++, CUDA, Bash, SQL" },
  {
    label: "AI/ML",
    value:
      "Machine Learning, Deep Learning, PyTorch, Hugging Face, Multimodal and Multilingual AI, Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), GPU Optimization, Fine-tuning (PEFT), Agentic AI, Prompt Engineering, Context Engineering",
  },
  { label: "Frameworks", value: "React, Flask, FastAPI, Express.js, REST APIs" },
  { label: "Databases", value: "MongoDB, Redis, Chroma DB" },
  { label: "Tools", value: "Git, GitHub, Docker, CI/CD, Jupyter Notebook" },
];

const achievements = [
  "Ranked 1st in the Department of Artificial Intelligence & Data Science",
  "2nd Place at VNPS'25 – National-Level Project Showcase, VCET Mumbai",
  "Open-sourced models on Hugging Face Hub, collectively surpassing 100k+ downloads across Neural Networks, LLM's, ASR, translation, and vision architectures",
  "Launched aynlp, an open-source NLP utility library with 7k+ downloads, enabling developers to solve common NLP tasks efficiently",
  "Authored 3+ technical articles on AI Agents and Reinforcement Learning in VCET Techzette",
  "Kaggle competitor with 15+ badges across Notebooks and Competitions, applying data science and ML techniques to real-world problems",
  "Solved 350+ DSA problems across competitive coding platforms",
  "OSS Contribution basedosdados/sdk (feat(infra): (#1372) add GCP Console link), PR reviewed and merged by maintainers",
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

// ---- Main component -----------------------------------------------------

export default function ResumeContent() {
  return (
    <div className="w-full font-sans">
      <div className="mx-auto max-w-[820px] rounded-[6px] bg-white text-gray-900 shadow-sm ring-1 ring-black/10 dark:ring-white/10 px-6 py-8 sm:px-10 sm:py-9">
        {/* Header */}
        <header className="text-center mb-5">
          <h1 className="text-[26px] font-bold tracking-tight">{contact.name}</h1>
          <p className="mt-1 text-[12.5px] text-gray-700">
            {contact.email} |{" "}
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
