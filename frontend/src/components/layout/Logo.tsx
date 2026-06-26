import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  to?: string;
}

const sizeMap = {
  sm: "h-20",      // 80px
  md: "h-32",      // 128px
  lg: "h-[22rem]", // 352px
  xl: "h-[34rem]", // 544px
};

export function Logo({
  className,
  size = "md",
  to = "/",
}: LogoProps) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center overflow-visible",
        className
      )}
    >
      <img
        src="/images/logo1.png"
        alt="Arcana"
        className={cn(
          "w-auto object-contain select-none transition-transform duration-300 hover:scale-105",
          sizeMap[size]
        )}
        draggable={false}
      />
    </Link>
  );
}