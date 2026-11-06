"use client";

import { useWorld } from "../three/scene";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Available portfolio locations (used for routing & fallback)
// ---------------------------------------------------------------------------

export type LocationId = "about" | "skills" | "projects" | "studio" | "services" | "contact";

export interface LocationData {
  id: LocationId;
  label: string;
  title: string;
  description: string;
  link: string;
  sectionTitle?: string;
  content?: React.ReactNode;
}

export const LOCATIONS: LocationData[] = [
  {
    id: "about",
    label: "About",
    title: "About Me",
    description: "Get to know Ashraf.",
    link: "/#about",
  },
  {
    id: "skills",
    label: "Skills",
    title: "Skills City",
    description: "My technical toolkit.",
    link: "/#skills",
  },
  {
    id: "projects",
    label: "Projects",
    title: "Project Exhibition",
    description: "My three real projects.",
    link: "/#projects",
  },
  {
    id: "studio",
    label: "Studio",
    title: "Design Studio",
    description: "Graphic & web design.",
    link: "/#studio",
  },
  {
    id: "services",
    label: "Services",
    title: "Services",
    description: "What I offer.",
    link: "/#services",
  },
  {
    id: "contact",
    label: "Contact",
    title: "Contact Station",
    description: "Get in touch.",
    link: "/#contact",
  },
];

// ---------------------------------------------------------------------------
// Clickable 3D waypoint marker
// ---------------------------------------------------------------------------

interface PortalProps {
  portal: ReturnType<typeof useWorld>["portals"][number];
}

export function Portal({ portal }: PortalProps) {
  const { portals, setIsFullscreen } = useWorld();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // We'll route via the overlay selection panel + URL hash instead of direct nav
    // (the 3D world is the navigation; panels show on E / hover)
  };

  return (
    <motion.div
      className="cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      role="button"
      tabIndex={0}
      aria-label={`Go to ${portal.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const loc = LOCATIONS.find((l) => l.id === portal.target);
          if (loc) window.location.hash = loc.link.replace("#", "");
        }
      }}
    >
      <div className="relative w-10 h-10 rounded-full border border-white/50 bg-white/10 flex items-center justify-center">
        <span className="text-xs font-semibold text-white">{portal.id[0].toUpperCase()}</span>
      </div>
      {/* Pulse glow */}
      <div className="absolute inset-0 rounded-full bg-white/10 animate-ping" style={{ animationDuration: "2s" }} />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Selection overlay (click a marker to open the panel; 3D is nav)
// ---------------------------------------------------------------------------

export function PortalSelectionPanel() {
  const { portals } = useWorld();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-wrap gap-2 justify-center max-w-2xl px-4">
      {portals.map((p) => {
        const loc = LOCATIONS.find((l) => l.id === p.target)!;
        return (
          <motion.div
            key={p.id}
            whileHover={{ y: -4, scale: 1.02 }}
            className="flex items-center gap-2 bg-black/70 border border-white/10 rounded-lg px-4 py-2 text-sm backdrop-blur"
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#22d3ee" }} />
            <span className="text-white font-medium">{p.name}</span>
            <span className="text-white/60 text-xs">{loc.label}</span>
            <Link
              href={loc.link}
              className="ml-2 text-xs text-blue-400 hover:text-white underline underline-offset-2"
            >
              Open
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
