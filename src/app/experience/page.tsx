"use client";

import { CurrentTime } from "@/components/CurrentTime";
import { RightNavbar } from "@/components/RightNavbar";
import { FooterBackground } from "@/components/FooterBackground";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
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
    role: "AI Research Intern",
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
    `,
    tech: ["Data Analytics", "Data Science", "Machine Learning", "Statistics"],
    metrics: [
      { label: "Duration", value: "2 mos" },
      { label: "Mode", value: "Hybrid" },
    ],
  },
];

export default function AllExperiencePage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black relative overflow-x-hidden transition-colors duration-300">
      {/* Right Side Blueprint Navigation */}
      <RightNavbar />

      {/* Vertical Lines - Ultra-fine Micro Dots */}
      <div className="absolute top-0 bottom-0 left-[30%] w-0 border-r border-black/30 dark:border-[#2a303c] pointer-events-none hidden md:block" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />
      <div className="absolute top-0 bottom-0 right-[30%] w-0 border-r border-black/30 dark:border-[#2a303c] pointer-events-none hidden md:block" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />

      {/* Horizontal Lines - Ultra-fine Micro Dots */}
      <div className="absolute left-0 right-0 top-[22vh] h-0 border-b border-black/30 dark:border-[#2a303c] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
      <div className="absolute left-0 right-0 top-[calc(22vh+112px)] h-0 border-b border-black/30 dark:border-[#2a303c] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />

      {/* Ultra-Tiny Solid Nodes */}
      {[
        { top: '22vh', left: '30%' },
        { top: '22vh', right: '30%' },
        { top: 'calc(22vh + 112px)', left: '30%' },
        { top: 'calc(22vh + 112px)', right: '30%' },
      ].map((pos, i) => (
        <div key={i} className="absolute w-[2px] h-[2px] bg-black/50 dark:bg-[#4f46e5]/[0.35] pointer-events-none z-10 hidden md:block"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            transform: `translate(${pos.right ? '50%' : '-50%'}, -50%)`
          }} />
      ))}

      {/* Cell 1: Dot Matrix Background */}
      <div className="absolute left-0 right-0 md:left-[30%] md:right-[30%] top-0 h-[22vh] -z-0 pointer-events-auto">
        <FooterBackground />
        <div className="absolute bottom-3 right-2 z-10 pointer-events-auto">
          <CurrentTime />
        </div>
      </div>

      {/* Cell 2: Header with Back Button + Title + Controls */}
      <div className="absolute left-0 right-0 md:left-[30%] md:right-[30%] top-[22vh] h-[112px] flex items-center px-4 z-50">
        <div className="flex w-full items-center justify-between">
          {/* Left: Back + Title */}
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="group flex items-center justify-center w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            </Link>
            <div className="flex flex-col justify-center">
              <h1 className="text-[20px] sm:text-[24px] font-bold text-zinc-800 dark:text-zinc-100 tracking-tight leading-none mb-0.5 [text-shadow:-1.5px_0_0_rgba(0,200,255,0.3),1.5px_0_0_rgba(255,80,0,0.3)] dark:[text-shadow:-1.5px_0_0_rgba(0,200,255,0.6),1.5px_0_0_rgba(255,80,0,0.6)]">
                All Experiences
              </h1>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
                Full Experience Archive
              </p>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-start justify-end gap-2 sm:gap-3 h-20 sm:h-24 py-1">
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        className="ml-0 mr-0 md:ml-[30%] md:mr-[30%] pt-[calc(22vh+112px)] pb-16 px-4 flex flex-col z-10 relative"
      >
        <div className="relative pt-0 pb-6">

          {/* Experience Items */}
          <div className="flex flex-col relative z-10 w-full">
            {experiences.map((item, idx) => {
              const isOpen = openIdx === idx;
              const isLast = idx === experiences.length - 1;

              return (
                <div key={idx} className="group relative">
                  {/* Dashed bottom border for all items */}
                  <div
                    className={`absolute bottom-0 ${isLast ? 'left-[-100vw] right-[-100vw]' : 'left-[-16px] right-[-16px]'} h-0 border-b border-black/30 dark:border-[#2a303c] pointer-events-none z-10`}
                    style={{
                      maskImage:
                        "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                      WebkitMaskImage:
                        "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                    }}
                  />

                  {/* Intersection dots for last item */}
                  {isLast && (
                    <>
                      <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/40 dark:bg-[#4f46e5]/[0.35] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
                      <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/40 dark:bg-[#4f46e5]/[0.35] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
                    </>
                  )}

                  <div
                    className="flex flex-col items-start gap-2.5 py-3.5 px-4 -mx-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors cursor-pointer relative z-20 rounded-lg sm:gap-3 sm:py-4 2xl:flex-row 2xl:items-center 2xl:justify-between"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
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
                      <div className="flex min-w-0 flex-col gap-0.5 pr-2 sm:pr-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[14px] font-bold leading-tight text-zinc-900 dark:text-zinc-100 sm:text-[17px]">
                            {item.title}
                          </span>
                          {item.type && (
                            <span className="self-center whitespace-nowrap px-1.5 py-[1px] rounded-[4px] text-[11px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/50 dark:border-zinc-700/50">
                              {item.type}
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[14px] text-zinc-600 dark:text-zinc-400 sm:text-[15px]`}
                        >
                          {item.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-start gap-0.5 pr-5 pl-[52px] text-left sm:pl-[56px] 2xl:items-end 2xl:pl-0 2xl:text-right">
                      <div className="relative flex items-center text-[13px] font-medium text-zinc-900 dark:text-zinc-100 sm:text-[14px]">
                        <span>{item.dates}</span>
                        <svg
                          viewBox="0 0 24 24"
                          className={`w-3.5 h-3.5 text-zinc-500 absolute -right-5 top-1/2 -translate-y-1/2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                      <span className="text-[13px] text-zinc-500 dark:text-zinc-400 sm:text-[14px]">
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
        </div>

        {/* Bottom Separator */}
        <div className="relative mt-8">
          <div className="absolute left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-[#2a303c] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
          <div className="absolute -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-[#4f46e5]/[0.35] -translate-x-1/2 translate-y-[-1px] pointer-events-none z-20" />
          <div className="absolute -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-[#4f46e5]/[0.35] translate-x-1/2 translate-y-[-1px] pointer-events-none z-20" />
        </div>
      </div>
    </div>
  );
}
