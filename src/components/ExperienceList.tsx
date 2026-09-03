"use client";

import React, { useState } from "react";
import Image from "next/image";

type ExperienceData = {
  title: string;
  role: string;
  dates: string;
  location: string;
  src: string;
  type?: string;
  imageFit?: "contain" | "cover";
  imageZoom?: number;
  description: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  screenshot?: string;
};

const experiences: ExperienceData[] = [
  {
    title: "Skyboy",
    role: "Founder",
    type: "Self-employed",
    dates: "Jun 2026 - Present",
    location: "4 mos",
    src: "/placeholder.png",
    imageFit: "contain",
    imageZoom: 1,
    description: `
      The fastest, best-curated, agent-agnostic directory of AI skills (SKILL.md)
      Preview, install, and ship them to Claude, ChatGPT, Cursor, Gemini CLI, and more
    `,
    tech: [
      "AI Skills",
      "Agent-Agnostic",
      "Claude",
      "ChatGPT",
      "Cursor",
      "Gemini CLI",
    ],
    metrics: [
      { label: "Duration", value: "4 mos" },
      { label: "Launched", value: "Jun 2026" },
    ],
  },
  {
    title: "SiteVPN",
    role: "Founder",
    type: "Self-employed",
    dates: "Dec 2025 - May 2026",
    location: "6 mos",
    src: "/placeholder.png",
    imageFit: "contain",
    imageZoom: 1,
    description: `
      Founder and lead maintainer of SiteVPN, an open-source privacy and security technology project
      Building a secure AI VPN alongside temporary email and phone number utility offerings
      Focus areas: Networking and Open-Source Software
    `,
    tech: ["Networking", "Open-Source Software", "Privacy", "Security"],
    metrics: [
      { label: "Duration", value: "6 mos" },
      { label: "Period", value: "Dec 25 - May 26" },
    ],
  },
  {
    title: "The SMM Hub",
    role: "AI Researcher Intern",
    type: "Internship",
    dates: "Jun 2025 - Nov 2025",
    location: "Mumbai, Maharashtra, India · On-site",
    src: "/placeholder.png",
    imageFit: "contain",
    imageZoom: 1,
    description: `
      Worked as an AI Researcher Intern, contributing to AI-driven products, backend services, and automation systems
      Collaborated across teams to build intelligent lead-generation solutions, content creation platforms, and workflow automation tools
      Streamlined business operations and improved user experiences through automation
      Skills: Generative AI Tools, Prompt Engineering, and more
    `,
    tech: [
      "Generative AI Tools",
      "Prompt Engineering",
      "Backend",
      "Automation",
    ],
    metrics: [
      { label: "Duration", value: "6 mos" },
      { label: "Mode", value: "On-site" },
    ],
  },
  {
    title: "Godrej Infotech Ltd",
    role: "Data Analytics Intern",
    type: "Internship",
    dates: "Oct 2024 - Jan 2025",
    location: "Mumbai, Maharashtra, India · Remote",
    src: "/placeholder.png",
    imageFit: "contain",
    imageZoom: 1,
    description: `
      Contributed to business intelligence and analytics initiatives by building automated Power BI dashboards
      Developed data visualizations and generated analytical reports
      Leveraged data-driven insights to improve visibility into business performance, marketing effectiveness, and operational trends
      Skills: Data Analytics, Presentation Skills, and more
    `,
    tech: ["Data Analytics", "Power BI", "Data Visualization", "Reporting"],
    metrics: [
      { label: "Duration", value: "4 mos" },
      { label: "Mode", value: "Remote" },
    ],
  },
  {
    title: "Coincent.ai",
    role: "Artificial Intelligence Intern",
    type: "Internship",
    dates: "Jul 2024 - Oct 2024",
    location: "Mumbai, Maharashtra, India · Remote",
    src: "/placeholder.png",
    imageFit: "contain",
    imageZoom: 1,
    description: `
      Gained hands-on experience in deep learning, computer vision, and reinforcement learning
      Developed and optimized CNN-based models for image classification tasks
      Explored Transformer architectures and reinforcement learning techniques
      Conducted experiments to improve model performance, training efficiency, and convergence behavior
      Skills: Artificial Intelligence (AI) and Data Science
    `,
    tech: ["Artificial Intelligence", "Data Science", "Deep Learning", "Computer Vision"],
    metrics: [
      { label: "Duration", value: "4 mos" },
      { label: "Mode", value: "Remote" },
    ],
  },
  {
    title: "Acmegrade",
    role: "Data Science Intern",
    type: "Part-time",
    dates: "Dec 2023 - Jan 2024",
    location: "Mumbai, Maharashtra, India · Hybrid",
    src: "/placeholder.png",
    imageFit: "contain",
    imageZoom: 1,
    description: `
      Applied data analysis, machine learning, and statistical techniques to solve real-world problems
      Gained hands-on experience in data preprocessing, exploratory data analysis, model development, and performance evaluation
      Worked on practical datasets and industry-oriented projects
      Skills: Data Analytics, Data Science, and more
    `,
    tech: ["Data Analytics", "Data Science", "Machine Learning", "Statistics"],
    metrics: [
      { label: "Duration", value: "2 mos" },
      { label: "Mode", value: "Hybrid" },
    ],
  },
];

export function ExperienceList({ limit }: { limit?: number }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const visibleExperiences =
    typeof limit === "number" ? experiences.slice(0, limit) : experiences;

  return (
    <div className="block">
      {visibleExperiences.map((item, idx) => {
        const isOpen = openIdx === idx;
        const isLast = idx === visibleExperiences.length - 1;
        const isLastOverall = idx === experiences.length - 1;

        return (
          <div key={idx} className="group relative">
            {/* Dashed bottom border for all items except the last one */}
            {!isLast && (
              <div
                className="absolute bottom-0 left-[-16px] right-[-16px] h-0 border-b border-black/30 dark:border-[#2a303c] pointer-events-none z-10"
                style={{
                  maskImage:
                    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                  WebkitMaskImage:
                    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                }}
              />
            )}

            {/* Special full-width dashed line and intersection dots for the last item */}
            {isLast && isLastOverall && (
              <>
                <div
                  className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-[#2a303c] pointer-events-none z-10"
                  style={{
                    maskImage:
                      "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                    WebkitMaskImage:
                      "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                  }}
                />
                <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/40 dark:bg-[#4f46e5]/[0.35] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
                <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/40 dark:bg-[#4f46e5]/[0.35] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              </>
            )}

            <div
              className={`flex flex-col items-start gap-2.5 py-3.5 px-4 -mx-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors cursor-pointer relative z-20 rounded-lg sm:gap-3 sm:py-4 2xl:flex-row 2xl:items-center 2xl:justify-between ${idx === visibleExperiences.length - 1 ? "rounded-b-lg" : ""}`}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="size-10 shrink-0 rounded-[10px] border border-black/10 bg-zinc-50 p-[2px] shadow-sm shadow-black/15 dark:border-zinc-800 dark:bg-[#111111] dark:shadow-md dark:shadow-black/50">
                  <div className="w-full h-full rounded-[7px] border border-black/5 dark:border-black/20 bg-[#161b22] flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={40}
                      height={40}
                      sizes="40px"
                      quality={60}
                      style={item.imageZoom ? { transform: `scale(${item.imageZoom})` } : undefined}
                      className={`${item.imageFit === "contain" ? "object-contain" : "object-cover"} w-full h-full p-0.5`}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 min-w-0 pr-2 sm:pr-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[14px] font-bold leading-tight text-zinc-900 dark:text-zinc-100 sm:text-[17px]">
                      {item.title}
                    </span>
                    {item.type && (
                      <span className="self-center px-1.5 py-[1px] rounded-[4px] text-[11px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/50 dark:border-zinc-700/50 whitespace-nowrap">
                        {item.type}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-400 truncate`}
                  >
                    {item.role}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start gap-0.5 text-left pr-5 pl-[52px] shrink-0 sm:pl-[56px] 2xl:mt-0 2xl:items-end 2xl:pl-0 2xl:text-right">
                <div className="flex items-center text-[13px] sm:text-[14px] font-medium text-zinc-900 dark:text-zinc-100 relative">
                  <span>{item.dates}</span>
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-3.5 h-3.5 text-zinc-500 absolute -right-5 top-1/2 -translate-y-1/2 -mt-[1.5px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <span className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400">
                  {item.location}
                </span>
              </div>
            </div>

            {/* Expandable Details Section */}
            <div
              className={`-mx-4 grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`${isOpen ? "pb-4 pt-0 opacity-100 translate-y-0" : "pb-0 pt-0 opacity-0 -translate-y-2"
                    } transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] pl-6 pr-8 text-[14px] text-zinc-600 dark:text-zinc-400`}
                >
                  {item.metrics && (
                    <div className="relative -ml-6 -mr-8 mb-4">
                      <div className="grid max-w-full grid-cols-2 pl-6 pr-8 2xl:grid-cols-4">
                        {item.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="relative min-w-0 px-3 py-2 after:absolute after:bottom-0 after:right-0 after:top-0 after:w-0 after:border-r after:border-black/30 after:[mask-image:repeating-linear-gradient(to_bottom,black_0,black_1px,transparent_1px,transparent_6px)] dark:after:border-white/[0.15] [&:nth-child(2n)]:after:hidden 2xl:[&:not(:last-child)]:after:block 2xl:[&:last-child]:after:hidden"
                          >
                            <p
                              className={`${metric.value.includes(" - ") ? "text-[13px]" : "text-[16px]"} whitespace-nowrap font-bold leading-none text-zinc-900 dark:text-zinc-100`}
                            >
                              {metric.value}
                            </p>
                            <p className="mt-1 text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-600">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-0 border-t border-black/30 dark:border-[#2a303c]"
                        style={{
                          maskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                          WebkitMaskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                        }}
                      />
                      <span
                        className="pointer-events-none absolute inset-x-0 top-1/2 h-0 border-t border-black/30 dark:border-[#2a303c] 2xl:hidden"
                        style={{
                          maskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                          WebkitMaskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                        }}
                      />
                      <span
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-0 border-b border-black/30 dark:border-[#2a303c]"
                        style={{
                          maskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                          WebkitMaskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                        }}
                      />
                      <span className="pointer-events-none absolute left-0 top-0 h-[2px] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-black/50 dark:bg-[#4f46e5]/[0.35]" />
                      <span className="pointer-events-none absolute right-0 top-0 h-[2px] w-[2px] translate-x-1/2 -translate-y-1/2 bg-black/50 dark:bg-[#4f46e5]/[0.35]" />
                      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-[2px] -translate-x-1/2 translate-y-1/2 bg-black/50 dark:bg-[#4f46e5]/[0.35]" />
                      <span className="pointer-events-none absolute bottom-0 right-0 h-[2px] w-[2px] translate-x-1/2 translate-y-1/2 bg-black/50 dark:bg-[#4f46e5]/[0.35]" />
                    </div>
                  )}

                  {isOpen && item.screenshot && (
                    <div className="relative mb-4 overflow-hidden bg-black">
                      <Image
                        src={item.screenshot}
                        alt={`${item.title} analytics screenshot`}
                        width={1400}
                        height={1050}
                        sizes="(min-width: 768px) 40vw, calc(100vw - 3rem)"
                        quality={70}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  )}

                  <ul className="mb-4 space-y-2 text-[13px] leading-relaxed">
                    {item.description
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((point, i) => {
                        const [label, ...detail] = point.trim().split(":");

                        return (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-zinc-400 dark:text-zinc-500 mt-[2px] text-[14px] leading-none">•</span>
                            <span>
                              {detail.length > 0 ? (
                                <>
                                  <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
                                    {label}:
                                  </strong>
                                  {detail.join(":")}
                                </>
                              ) : (
                                point.trim()
                              )}
                            </span>
                          </li>
                        );
                      })}
                  </ul>

                  {item.tech && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-[4px] border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50 dark:bg-[#111111] text-[11px] font-medium text-zinc-500 dark:text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
