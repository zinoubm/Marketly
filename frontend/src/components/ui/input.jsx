import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const IconInput = ({icon:Icon ,className,...props } ) => {
  

  return (
    <div className="flex flex-1 pl-1 items-center">
      <div  className=" absolute ml-1">
      <Icon />
      </div>
      <Input
        
        {...props}
        className={cn("pl-7" , className)}
      />
    </div>
  );
};

export { Input, IconInput };

