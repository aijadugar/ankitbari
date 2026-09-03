"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSectionNav, KeyBadge } from "@/components/SectionNav";

export function RightNavbar() {
  const pathname = usePathname();
  const { activeSection } = useSectionNav();

  const links = [
    { name: "Experience", href: "#experience", shortcutKey: "e" },
    { name: "Projects", href: "#projects", shortcutKey: "p" },
    { name: "Open Source", href: "#opensource", shortcutKey: "o" },
    { name: "Skills", href: "#skills", shortcutKey: "s" },
    { name: "Blog", href: "#blogs", shortcutKey: "b" },
  ];

  // Only render on the homepage where the #hash sections exist
  if (pathname !== "/") return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none hidden lg:block"
      style={{ width: 'calc(100vw - var(--removed-body-scroll-bar-size, 0px))' }}
    >
      <nav className="absolute top-[22vh] left-[calc(69%+32px)] pointer-events-auto flex flex-col gap-4 mt-2">
        <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase mb-1">Index</h3>
        {links.map((link) => {
          const isActive = activeSection === link.href.slice(1);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[12px] font-medium tracking-[0.05em] transition-all duration-300 ease-out flex items-center gap-3 ${isActive
                  ? "text-zinc-800 dark:text-zinc-200"
                  : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400"
                }`}
            >
              <span className={`h-[1px] transition-all duration-300 ease-out ${isActive
                  ? "w-3 bg-zinc-300 dark:bg-zinc-700"
                  : "w-0 bg-transparent"
                }`} />
              {link.name}
              <KeyBadge sectionId={link.href.slice(1)} shortcutKey={link.shortcutKey} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
