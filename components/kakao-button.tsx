import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface KakaoButtonProps extends ButtonProps {
  variant?: "default" | "outline"
}

export function KakaoButton({ className, children, variant = "default", ...props }: KakaoButtonProps) {
  return (
    <Button
      className={cn(
        variant === "default"
          ? "bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#3A1D1D] font-medium"
          : "bg-transparent border-[#FEE500] text-[#3A1D1D] hover:bg-[#FEE500]/10 font-medium",
        className,
      )}
      {...props}
    >
      {variant === "default" && (
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C6.48 3 2 6.48 2 11c0 2.76 1.33 5.19 3.38 6.74L3.7 21l3.8-2.26c1.37.51 2.86.79 4.5.79 5.52 0 10-3.48 10-8.75S17.52 3 12 3zm-.94 11.47l-2.77-3.71a.59.59 0 0 1 .95-.7l2.3 3.08 3.58-4.82a.59.59 0 1 1 .94.7l-4.04 5.45a.59.59 0 0 1-.96 0z" />
        </svg>
      )}
      {children}
    </Button>
  )
}

