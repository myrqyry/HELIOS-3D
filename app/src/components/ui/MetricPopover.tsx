import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function MetricPopover({ 
  label, 
  value, 
  source,
  children 
}: { 
  label: string; 
  value: string; 
  source?: string;
  children: React.ReactNode;
}) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber/10 border border-amber/20 text-amber hover:bg-amber/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian transition-colors text-xs font-mono font-medium">
          <span className="opacity-70">{label}:</span>
          <span>{value}</span>
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={5}
          className={cn(
            "z-50 overflow-hidden rounded-lg bg-obsidian-2 p-4 text-sm text-parchment-2 shadow-xl animate-in fade-in-0 zoom-in-95 border border-obsidian-3 max-w-sm"
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start gap-4">
              <p className="font-bold text-amber">{label}</p>
              <span className="text-xs font-mono bg-obsidian-3 px-1.5 py-0.5 rounded text-parchment-3">{value}</span>
            </div>
            <div className="text-xs leading-relaxed opacity-90">
              {children}
            </div>
            {source && (
              <div className="pt-2 mt-2 border-t border-obsidian-3/30 text-[10px] uppercase tracking-widest text-parchment-3 opacity-60 italic">
                Source: {source}
              </div>
            )}
          </div>
          <PopoverPrimitive.Close className="absolute top-2 right-2 rounded-full p-1 hover:bg-obsidian-3 transition-colors opacity-50" aria-label="Close">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.74992L4.03157 3.2184C3.80702 2.99385 3.44295 2.99385 3.2184 3.2184C2.99385 3.44295 2.99385 3.80702 3.2184 4.03157L6.74992 7.50005L3.2184 10.9685C2.99385 11.193 2.99385 11.5571 3.2184 11.7816C3.44295 12.0062 3.80702 12.0062 4.03157 11.7816L7.50005 8.25017L10.9685 11.7816C11.193 12.0062 11.5571 12.0062 11.7816 11.7816C12.0062 11.5571 12.0062 11.193 11.7816 10.9685L8.25017 7.50005L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </PopoverPrimitive.Close>
          <PopoverPrimitive.Arrow className="fill-obsidian-2 stroke-obsidian-3" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
