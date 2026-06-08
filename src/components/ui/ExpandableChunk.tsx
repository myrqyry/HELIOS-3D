import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ExpandableChunk({ 
  title, 
  summary, 
  children,
  defaultOpen = false
}: { 
  title: string; 
  summary?: string; 
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <AccordionPrimitive.Root type="single" collapsible defaultValue={defaultOpen ? "item-1" : undefined} className="w-full my-4">
      <AccordionPrimitive.Item value="item-1" className="border border-obsidian-3 rounded-lg bg-obsidian-2/40 overflow-hidden">
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium transition-all hover:bg-obsidian-3/50 group text-left">
            <div className="flex flex-col gap-0.5">
              <span className="text-amber-100 group-hover:text-amber transition-colors">{title}</span>
              {summary && <span className="text-xs text-parchment-2 opacity-60 font-normal line-clamp-1">{summary}</span>}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-parchment-2 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="px-4 pb-4 pt-0 text-parchment-2/90 leading-relaxed border-t border-obsidian-3/30 mt-2 py-3 prose prose-invert prose-xs max-w-none">
            {children}
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}
