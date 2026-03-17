import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    fullBleed?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, children, fullBleed = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "w-full px-[20px] md:px-[40px] lg:px-[80px] mx-auto",
                    !fullBleed && "max-w-[1400px]",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Container.displayName = "Container";
