// "use client"

// import * as React from "react"
// import * as TooltipPrimitive from "@radix-ui/react-tooltip"

// import { cn } from "@/lib/utils"

// const TooltipProvider = TooltipPrimitive.Provider

// const Tooltip = TooltipPrimitive.Root

// const TooltipTrigger = TooltipPrimitive.Trigger

// const TooltipContent = React.forwardRef<
//   React.ElementRef<typeof TooltipPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
// >(({ className, sideOffset = 4, ...props }, ref) => (
//   <TooltipPrimitive.Content
//     ref={ref}
//     sideOffset={sideOffset}
//     className={cn(
//       "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
//       className
//     )}
//     {...props}
//   />
// ))
// TooltipContent.displayName = TooltipPrimitive.Content.displayName

// export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

// components/Tooltip.js
'use client';

import { useState } from 'react';

export default function Tooltip({ text, children }: { text: string, children: React.ReactNode }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex justify-center items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="absolute bottom-full mb-4 w-max bg-white text-gray-500 text-[0.65rem] shadow rounded py-1 px-2 z-10 border ">
          {text}
          {/* <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-3 h-3 bg-white rotate-45 border "></div> */}
        </div>
      )}
    </div>
  );
}
