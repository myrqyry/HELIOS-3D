import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function TermTooltip({ 
  term, 
  definition, 
  children 
}: { 
  term: string; 
  definition: string; 
  children?: React.ReactNode 
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <span className="cursor-help border-b border-dotted border-amber text-amber-100 hover:text-amber transition-colors">
            {children || term}
          </span>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={5}
            className={cn(
              "z-50 overflow-hidden rounded-md bg-obsidian-2 px-3 py-1.5 text-xs text-parchment-2 shadow-md animate-in fade-in-0 zoom-in-95 border border-obsidian-3 max-w-xs"
            )}
          >
            <p className="font-medium text-amber mb-0.5">{term}</p>
            <p className="leading-relaxed opacity-90">{definition}</p>
            <TooltipPrimitive.Arrow className="fill-obsidian-2 stroke-obsidian-3" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
