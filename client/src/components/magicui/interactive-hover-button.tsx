import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import React from "react";

interface InteractiveHoverButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const InteractiveHoverButton = React.forwardRef<
	HTMLButtonElement,
	InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
	return (
		<button
			ref={ref}
			className={cn(
				"group relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-white/20 bg-white/10 py-[2px] pr-[3px] pl-2 text-base font-medium backdrop-blur-md transition-all duration-300 hover:bg-white/5 hover:backdrop-blur-lg md:py-1 md:pr-1 md:pl-3 dark:border-white/20 dark:bg-white/10",
				className,
			)}
			{...props}
		>
			<span className="z-10 px-3 text-white transition-colors duration-300 group-hover:text-black dark:text-white dark:group-hover:text-black">
				Let&apos;s Connect
			</span>

			<span className="absolute inset-0 translate-x-[45%] scale-0 rounded-full bg-white opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 dark:bg-white" />

			<span className="relative z-10 flex items-center justify-center overflow-hidden rounded-full bg-white p-1.5 transition-colors duration-300 group-hover:bg-transparent dark:bg-white">
				<ArrowRight className="size-5 text-black transition-all duration-300 group-hover:translate-x-5 group-hover:opacity-0 dark:text-black" />
				<ArrowRight className="absolute size-5 -translate-x-5 text-black opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:text-black" />
			</span>
		</button>
	);
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
