import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

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
      <AccordionPrimitive.Item value="item-1" className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container transition-[box-shadow] duration-[var(--duration-medium)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger className="group flex flex-1 items-center justify-between rounded-none px-5 py-4 text-left text-sm font-medium transition-[background-color] duration-[var(--duration-short)] ease-[var(--ease-standard)] hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[-2px]">
            <div className="flex flex-col gap-0.5">
              <span className="text-primary group-hover:text-on-primary-container transition-colors duration-[var(--duration-short)]">{title}</span>
              {summary && <span className="line-clamp-1 text-xs font-normal text-on-surface-variant">{summary}</span>}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-on-surface-variant transition-transform duration-[var(--duration-medium)] ease-[var(--ease-spring)] group-data-[state=open]:rotate-180" />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="overflow-hidden text-sm transition-[height,opacity] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="mt-1 max-w-none border-t border-outline-variant/30 px-5 pb-5 pt-1 leading-relaxed text-on-surface-variant prose prose-invert prose-xs">
            {children}
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}
