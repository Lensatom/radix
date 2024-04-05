import * as React from "react"

import { cn } from "@/lib/utils"

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//     label?: React.ReactNode
//   }

const Input = React.forwardRef(
  ({ className, type, label, ...props }:any, ref) => {
    console.log(ref)
    return (
      <div className="flex flex-col gap-1">
        <label className="font-medium text-sm">{label}</label>
        {type === "textarea" ? (
          <textarea
            className={cn(
              "flex h-24 resize-none w-full rounded-md border-[1px] border-gray px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          ></textarea>
        ) : (
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border-[1px] border-gray px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            // ref={ref}
            {...props}
          />
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
