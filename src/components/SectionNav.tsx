"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type SectionNavContextValue = {
  activeSection: string | null;
};

const SectionNavContext = createContext<SectionNavContextValue>({
  activeSection: null,
});

export function useSectionNav() {
  return useContext(SectionNavContext);
}

/**
 * Small styled square box showing the trigger letter for a section.
 * Highlights when its section is the active one.
 */
export function KeyBadge({
  sectionId,
  shortcutKey,
  className = "",
}: {
  sectionId: string;
  shortcutKey: string;
  className?: string;
}) {
  const { activeSection } = useSectionNav();
  const isActive = activeSection === sectionId;

  return (
    <kbd
      className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded-[4px] text-[10px] font-semibold leading-none border transition-colors duration-300 select-none ${
        isActive
          ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_8px_rgba(99,102,241,0.35)]"
          : "bg-zinc-100 border-black/10 text-zinc-400 dark:bg-zinc-800/60 dark:border-white/10 dark:text-zinc-500"
      } ${className}`}
    >
      {shortcutKey.toUpperCase()}
    </kbd>
  );
}

// Shortcut key -> section id (case-insensitive lookup happens in the listener)
export const SECTION_SHORTCUTS: { key: string; id: string; label: string }[] = [
  { key: "e", id: "experience", label: "Experience" },
  { key: "p", id: "projects", label: "Projects" },
  { key: "o", id: "opensource", label: "Open Source" },
  { key: "s", id: "skills", label: "Skills" },
  { key: "b", id: "blogs", label: "Blog" },
];

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return true;
  if (target.isContentEditable) return true;
  return false;
}

export function SectionNavProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    SECTION_SHORTCUTS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      const key = e.key.toLowerCase();
      const match = SECTION_SHORTCUTS.find((s) => s.key === key);
      if (!match) return;

      const el = document.getElementById(match.id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <SectionNavContext.Provider value={{ activeSection }}>
      {children}
    </SectionNavContext.Provider>
  );
}
