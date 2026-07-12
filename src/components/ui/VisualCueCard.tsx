import * as React from "react";
import { CheckCircle2, CircleDashed, Zap, AlertTriangle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type StatusType = "demonstrated" | "inferred" | "proposed" | "speculative";

const statusConfig = {
  demonstrated: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    label: "Verified",
  },
  inferred: {
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    label: "Inferred",
  },
  proposed: {
    icon: CircleDashed,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    label: "Proposed",
  },
  speculative: {
    icon: AlertTriangle,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    label: "Speculative",
  },
};

export function VisualCueCard({ 
  title, 
  status, 
  children 
}: { 
  title: string; 
  status: StatusType; 
  children: React.ReactNode;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn(
      "flex flex-col gap-3 p-4 rounded-xl border bg-obsidian-2/60 shadow-sm transition-[box-shadow,background-color] hover:shadow-md hover:bg-obsidian-2",
      config.border
    )}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-bold text-parchment-1 leading-tight">{title}</h3>
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap",
          config.bg,
          config.color
        )}>
          <Icon size={12} />
          {config.label}
        </div>
      </div>
      <div className="text-sm text-parchment-2/80 leading-relaxed prose prose-invert prose-xs max-w-none">
        {children}
      </div>
    </div>
  );
}
