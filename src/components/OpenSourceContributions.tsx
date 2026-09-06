"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { KeyBadge } from "@/components/SectionNav";

interface GHPR {
  title: string;
  url: string;
  repository: string;
  state: "OPEN" | "CLOSED" | "MERGED";
  createdAt: string;
}

interface HFModel {
  id: string;
  downloads: number;
  likes: number;
  link: string;
}

interface HFSpace {
  id: string;
  likes: number;
  link: string;
}

interface KaggleItem {
  title: string;
  link: string;
  votes: number;
}

interface ContributionsData {
  github: { prs: GHPR[]; error?: string };
  huggingface: {
    models: HFModel[];
    spaces: HFSpace[];
    datasets: HFModel[];
    error?: string;
  };
  kaggle: {
    notebooks: KaggleItem[];
    datasets: KaggleItem[];
    models: KaggleItem[];
    error?: string;
  };
}

type TabType = "github" | "huggingface" | "kaggle";

const TABS: TabType[] = ["github", "huggingface", "kaggle"];

const TAB_LABELS: Record<TabType, string> = {
  github: "GitHub",
  huggingface: "Hugging Face",
  kaggle: "Kaggle",
};

function formatNumber(n: number): string {
  if (n >= 1000) {
    return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k";
  }
  return String(n);
}

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const days = Math.floor(diff / 86400000);
  if (days <= 0) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function StateBadge({ state }: { state: GHPR["state"] }) {
  const map = {
    MERGED: { label: "Merged", cls: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30" },
    OPEN: { label: "Open", cls: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30" },
    CLOSED: { label: "Closed", cls: "bg-rose-500/15 text-rose-300 border-rose-500/30" },
  } as const;
  const s = map[state];
  return (
    <span className={`shrink-0 px-1.5 py-0.5 rounded-[4px] text-[10px] font-medium border ${s.cls}`}>
      {s.label}
    </span>
  );
}

export function OpenSourceContributions({ isFullPage = false }: { isFullPage?: boolean }) {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<TabType>("github");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fetchedRef = useRef(false);

  const initialCount = isFullPage ? 24 : 5;

  const load = useCallback(async () => {
    const cacheKey = "contributions_all";
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          setData(JSON.parse(cached));
        } catch {
          /* ignore */
        }
      }
    }

    try {
      const res = await fetch("/api/contributions", { cache: "no-store" });
      if (!res.ok) throw new Error("bad status");
      const json = (await res.json()) as ContributionsData;
      setData(json);
      if (typeof window !== "undefined") {
        localStorage.setItem(cacheKey, JSON.stringify(json));
      }
    } catch (e) {
      setError("Could not load contributions. Retry after deploy.");
    }
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    load();
  }, [load]);

  const handleTabChange = useCallback((next: TabType) => {
    if (next === tab) return;
    setIsTransitioning(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        setTab(next);
        requestAnimationFrame(() => {
          setTimeout(() => setIsTransitioning(false), 30);
        });
      }, 120);
    });
  }, [tab]);

  return (
    <div className="w-full flex flex-col">
      <div className="py-2 relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
            <KeyBadge sectionId="opensource" shortcutKey="o" />
            Latent Space Contributions
          </h2>
          {/* <p className="text-[12px] text-zinc-500 dark:text-zinc-400 -mt-0.5">
            GitHub · Hugging Face · Kaggle
          </p> */}
        </div>

        {/* Toggle */}

        {/* Horizontal line below heading */}
        <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-[#2a303c] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
        <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/40 dark:bg-[#4f46e5]/[0.35] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
        <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/40 dark:bg-[#4f46e5]/[0.35] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
      </div>
        <div className="flex items-center gap-2 relative z-20 group mr-[8px]">
          <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
          <div className="relative grid grid-cols-3 p-1 bg-zinc-50 dark:bg-[#09090b] rounded-[6px] border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80 w-fit select-none">
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc((100%-8px)/3)] rounded-[4px] bg-white dark:bg-[#1e1e20] border border-zinc-200/50 dark:border-cyan-500/30 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] transform will-change-transform ${tab === "github" ? "translate-x-0" : tab === "huggingface" ? "translate-x-[100%]" : "translate-x-[200%]"
                }`}
            />
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => handleTabChange(t)}
                className={`z-10 relative px-3 py-1.5 text-[12px] font-medium text-center transition-colors duration-200 ${tab === t
                  ? "text-zinc-900 dark:text-cyan-200"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
              >
                {TAB_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

      <div className="relative pt-2 pb-2">
        <div
          className="transition-all duration-150 ease-out"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "translateY(4px)" : "translateY(0)",
          }}
        >
          {error && !data ? (
            <div className="flex justify-center py-4 text-center text-[13px] text-zinc-500">
              {error}
            </div>
          ) : !data ? (
            /* Skeleton */
            <div className="flex flex-col">
              {Array.from({ length: initialCount > 5 ? 6 : 5 }).map((_, idx) => (
                <div key={idx} className="relative flex flex-col gap-1.5 py-4 px-4 -mx-4">
                  {idx < 4 && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0 border-b border-black/30 dark:border-[#2a303c] pointer-events-none z-10"
                      style={{
                        maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                        WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                      }}
                    />
                  )}
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse shrink-0" />
                    <div className="h-3.5 bg-zinc-100 dark:bg-zinc-800/60 rounded-md animate-pulse w-3/4" />
                  </div>
                  <div className="ml-4.5 pl-0.5">
                    <div className="h-3 bg-zinc-100 dark:bg-zinc-800/40 rounded-md animate-pulse w-1/3 mt-0.5" />
                  </div>
                </div>
              ))}
            </div>
          ) : tab === "github" ? (
            <GitHubSection data={data} initialCount={initialCount} isFullPage={isFullPage} />
          ) : tab === "huggingface" ? (
            <HuggingFaceSection data={data} initialCount={initialCount} isFullPage={isFullPage} />
          ) : (
            <KaggleSection data={data} initialCount={initialCount} isFullPage={isFullPage} />
          )}
        </div>
      </div>
    </div>
  );
}

function SectionShell({
  children,
  isFullPage,
  total,
  initialCount,
  emptyText,
}: {
  children: React.ReactNode;
  isFullPage: boolean;
  total: number;
  initialCount: number;
  emptyText: string;
}) {
  if (total === 0) {
    return (
      <div className="flex justify-center py-4 text-center text-[13px] text-zinc-500">
        {emptyText}
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {children}
      {!isFullPage && total > initialCount && (
        <div className="flex justify-center mt-4 relative z-20">
          <Link href="/pull-requests" className="relative group block">
            <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
            <div className="relative flex items-center gap-1.5 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
              View All ({total - initialCount} more)
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-transform duration-300 -rotate-90" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

type GHFilter = "MERGED" | "OPEN" | "CLOSED";

const GH_FILTERS: GHFilter[] = ["MERGED", "OPEN", "CLOSED"];

const GH_FILTER_LABELS: Record<GHFilter, string> = {
  MERGED: "Merged",
  OPEN: "Open",
  CLOSED: "Closed",
};

function GitHubSection({
  data,
  initialCount,
  isFullPage,
}: {
  data: ContributionsData;
  initialCount: number;
  isFullPage: boolean;
}) {
  const [ghFilter, setGhFilter] = useState<GHFilter>("MERGED");

  const allPrs = data.github.prs;
  const prs = allPrs.filter((pr) => pr.state === ghFilter);
  const counts: Record<GHFilter, number> = {
    MERGED: allPrs.filter((pr) => pr.state === "MERGED").length,
    OPEN: allPrs.filter((pr) => pr.state === "OPEN").length,
    CLOSED: allPrs.filter((pr) => pr.state === "CLOSED").length,
  };

  return (
    <SectionShell
      isFullPage={isFullPage}
      total={prs.length}
      initialCount={initialCount}
      emptyText={`No ${GH_FILTER_LABELS[ghFilter].toLowerCase()} pull requests found. (Add GITHUB_TOKEN in Vercel and redeploy)`}
    >
      {/* PR state sub-tabs */}
      <div className="flex items-center justify-center gap-2 relative group mb-2 -mt-1">
        <div className="relative grid grid-cols-3 p-1 bg-zinc-50 dark:bg-[#09090b] rounded-[6px] border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80 w-fit select-none">
          <div
            className={`absolute top-1 bottom-1 left-1 rounded-[4px] bg-white dark:bg-[#1e1e20] border border-zinc-200/50 dark:border-cyan-500/30 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] transform will-change-transform ${ghFilter === "MERGED" ? "translate-x-0" : ghFilter === "OPEN" ? "translate-x-[100%]" : "translate-x-[200%]"
              }`}
            style={{ width: "calc((100% - 8px) / 3)" }}
          />
          {GH_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setGhFilter(f)}
              className={`z-10 relative px-3 py-1.5 text-[12px] font-medium text-center transition-colors duration-200 ${ghFilter === f
                ? "text-zinc-900 dark:text-cyan-200"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
            >
              {GH_FILTER_LABELS[f]}
              <span className={`ml-1.5 text-[10px] ${ghFilter === f ? "text-zinc-400 dark:text-cyan-400/70" : "text-zinc-400 dark:text-zinc-600"
                }`}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>
      {prs.slice(0, isFullPage ? prs.length : initialCount).map((pr, idx, arr) => {
        const isLast = idx === arr.length - 1;
        return (
          <a
            key={pr.url}
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col gap-1.5 py-4 px-4 -mx-4 transition-colors hover:bg-zinc-50 dark:hover:bg-cyan-500/5 rounded-lg"
          >
            {!isLast && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0 border-b border-black/30 dark:border-[#2a303c] pointer-events-none z-10"
                style={{
                  maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                  WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                }}
              />
            )}
            <div className="flex items-center gap-2.5 relative z-20 min-w-0">
              <div className={`w-2 h-2 rounded-full shrink-0 ${pr.state === "MERGED"
                ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                : pr.state === "OPEN"
                  ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                  : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                }`}></div>
              <StateBadge state={pr.state} />
              <h3 className="text-[14px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-cyan-100 transition-colors truncate">
                {pr.title}
              </h3>
            </div>
            <p className="text-[12px] text-zinc-500 dark:text-zinc-400 ml-4.5 pl-0.5 relative z-20">
              {pr.repository} · {timeAgo(pr.createdAt)}
            </p>
          </a>
        );
      })}
    </SectionShell>
  );
}

type HFKind = "spaces" | "models" | "datasets";

const HF_KINDS: HFKind[] = ["spaces", "models", "datasets"];

const HF_KIND_LABELS: Record<HFKind, string> = {
  spaces: "Spaces",
  models: "Models",
  datasets: "Datasets",
};

function HuggingFaceSection({
  data,
  initialCount,
  isFullPage,
}: {
  data: ContributionsData;
  initialCount: number;
  isFullPage: boolean;
}) {
  const [hfKind, setHfKind] = useState<HFKind>("spaces");

  const models = data.huggingface.models;
  const spaces = data.huggingface.spaces;
  const datasets = data.huggingface.datasets;

  const counts: Record<HFKind, number> = {
    spaces: spaces.length,
    models: models.length,
    datasets: datasets.length,
  };

  let items: HFModel[] = [];
  let kindLabel = "Space";
  let dotCls = "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]";
  let badgeCls = "border-indigo-500/30 bg-indigo-500/10 text-indigo-300";
  let showDownloads = false;
  if (hfKind === "spaces") {
    items = spaces;
    kindLabel = "Space";
  } else if (hfKind === "models") {
    items = models;
    kindLabel = "Model";
    dotCls = "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]";
    badgeCls = "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
    showDownloads = true;
  } else {
    items = datasets;
    kindLabel = "Dataset";
    dotCls = "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]";
    badgeCls = "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    showDownloads = true;
  }

  return (
    <SectionShell
      isFullPage={isFullPage}
      total={items.length}
      initialCount={initialCount}
      emptyText={`No ${HF_KIND_LABELS[hfKind].toLowerCase()} found. (Add HUGGINGFACE_TOKEN in Vercel and redeploy)`}
    >
      {/* HF sub-tabs */}
      <div className="flex items-center justify-center gap-2 relative group mb-2 -mt-1">
        <div className="relative grid grid-cols-3 p-1 bg-zinc-50 dark:bg-[#09090b] rounded-[6px] border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80 w-fit select-none">
          <div
            className={`absolute top-1 bottom-1 left-1 rounded-[4px] bg-white dark:bg-[#1e1e20] border border-zinc-200/50 dark:border-cyan-500/30 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] transform will-change-transform ${hfKind === "spaces" ? "translate-x-0" : hfKind === "models" ? "translate-x-[100%]" : "translate-x-[200%]"
              }`}
            style={{ width: "calc((100% - 8px) / 3)" }}
          />
          {HF_KINDS.map((k) => (
            <button
              key={k}
              onClick={() => setHfKind(k)}
              className={`z-10 relative px-3 py-1.5 text-[12px] font-medium text-center transition-colors duration-200 ${hfKind === k
                ? "text-zinc-900 dark:text-cyan-200"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
            >
              {HF_KIND_LABELS[k]}
              <span className={`ml-1.5 text-[10px] ${hfKind === k ? "text-zinc-400 dark:text-cyan-400/70" : "text-zinc-400 dark:text-zinc-600"
                }`}>
                {counts[k]}
              </span>
            </button>
          ))}
        </div>
      </div>
      {items.slice(0, isFullPage ? items.length : initialCount).map((m, idx, arr) => {
        const isLast = idx === arr.length - 1;
        return (
          <a
            key={m.link}
            href={m.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between gap-3 py-4 px-4 -mx-4 transition-colors hover:bg-zinc-50 dark:hover:bg-cyan-500/5 rounded-lg"
          >
            {!isLast && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0 border-b border-black/30 dark:border-[#2a303c] pointer-events-none z-10"
                style={{
                  maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                  WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                }}
              />
            )}
            <div className="flex items-center gap-2.5 relative z-20 min-w-0">
              <div className={`w-2 h-2 rounded-full shrink-0 ${dotCls}`} />
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-[4px] border ${badgeCls} shrink-0`}>
                {kindLabel}
              </span>
              <h3 className="text-[14px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-cyan-100 transition-colors truncate">
                {m.id}
              </h3>
            </div>
            <div className="flex items-center gap-3 shrink-0 relative z-20 text-[11px] text-zinc-500 dark:text-zinc-400">
              {showDownloads && (
                <span title="downloads">↓ {formatNumber(m.downloads)}</span>
              )}
              <span title="likes" className="text-rose-400">♥ {formatNumber(m.likes)}</span>
            </div>
          </a>
        );
      })}
    </SectionShell>
  );
}

type KaggleKind = "notebooks" | "models" | "datasets";

const KAGGLE_KINDS: KaggleKind[] = ["notebooks", "models", "datasets"];

const KAGGLE_KIND_LABELS: Record<KaggleKind, string> = {
  notebooks: "Notebooks",
  models: "Models",
  datasets: "Datasets",
};

function KaggleSection({
  data,
  initialCount,
  isFullPage,
}: {
  data: ContributionsData;
  initialCount: number;
  isFullPage: boolean;
}) {
  const [kaggleKind, setKaggleKind] = useState<KaggleKind>("notebooks");

  const notebooks = data.kaggle.notebooks;
  const datasets = data.kaggle.datasets;
  const models = data.kaggle.models;

  const counts: Record<KaggleKind, number> = {
    notebooks: notebooks.length,
    models: models.length,
    datasets: datasets.length,
  };

  let items: KaggleItem[] = notebooks;
  let kindLabel = "Notebook";
  if (kaggleKind === "models") {
    items = models;
    kindLabel = "Model";
  } else if (kaggleKind === "datasets") {
    items = datasets;
    kindLabel = "Dataset";
  }

  // Highest-voted first.
  items = [...items].sort((a: KaggleItem, b: KaggleItem) => b.votes - a.votes);

  const renderItem = (item: KaggleItem, kind: string, isLast: boolean, link: string) => (
    <a
      key={link}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between gap-3 py-4 px-4 -mx-4 transition-colors hover:bg-zinc-50 dark:hover:bg-cyan-500/5 rounded-lg"
    >
      {!isLast && (
        <div
          className="absolute bottom-0 left-0 right-0 h-0 border-b border-black/30 dark:border-[#2a303c] pointer-events-none z-10"
          style={{
            maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
            WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
          }}
        />
      )}
      <div className="flex items-center gap-2.5 relative z-20 min-w-0">
        <div className="w-2 h-2 rounded-full shrink-0 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.45)]" />
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-[4px] border border-amber-500/30 bg-amber-500/10 text-amber-300 shrink-0">
          {kind}
        </span>
        <h3 className="text-[14px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-cyan-100 transition-colors truncate">
          {item.title}
        </h3>
      </div>
      <div className="flex items-center gap-3 shrink-0 relative z-20 text-[11px] text-zinc-500 dark:text-zinc-400">
        <span title="votes">▲ {formatNumber(item.votes)}</span>
      </div>
    </a>
  );

  return (
    <SectionShell
      isFullPage={isFullPage}
      total={items.length}
      initialCount={initialCount}
      emptyText={`No ${KAGGLE_KIND_LABELS[kaggleKind].toLowerCase()} found. (Add KAGGLE_USERNAME / KAGGLE_KEY in Vercel and redeploy)`}
    >
      {/* Kaggle sub-tabs */}
      <div className="flex items-center justify-center gap-2 relative group mb-2 -mt-1">
        <div className="relative grid grid-cols-3 p-1 bg-zinc-50 dark:bg-[#09090b] rounded-[6px] border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80 w-fit select-none">
          <div
            className={`absolute top-1 bottom-1 left-1 rounded-[4px] bg-white dark:bg-[#1e1e20] border border-zinc-200/50 dark:border-cyan-500/30 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] transform will-change-transform ${kaggleKind === "notebooks" ? "translate-x-0" : kaggleKind === "models" ? "translate-x-[100%]" : "translate-x-[200%]"
              }`}
            style={{ width: "calc((100% - 8px) / 3)" }}
          />
          {KAGGLE_KINDS.map((k) => (
            <button
              key={k}
              onClick={() => setKaggleKind(k)}
              className={`z-10 relative px-3 py-1.5 text-[12px] font-medium text-center transition-colors duration-200 ${kaggleKind === k
                ? "text-zinc-900 dark:text-cyan-200"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
            >
              {KAGGLE_KIND_LABELS[k]}
              <span className={`ml-1.5 text-[10px] ${kaggleKind === k ? "text-zinc-400 dark:text-cyan-400/70" : "text-zinc-400 dark:text-zinc-600"
                }`}>
                {counts[k]}
              </span>
            </button>
          ))}
        </div>
      </div>
      {items.slice(0, isFullPage ? items.length : initialCount).map((item, idx, arr) =>
        renderItem(item, kindLabel, idx === arr.length - 1, item.link)
      )}
    </SectionShell>
  );
}
