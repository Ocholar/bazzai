import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TechBadgeProps {
    name: string;
    icon?: ReactNode;
    className?: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
}

export function TechBadge({ name, icon, className, variant = "secondary" }: TechBadgeProps) {
    return (
        <Badge
            variant={variant}
            className={cn(
                "flex items-center gap-1.5 px-3 py-1 text-sm font-medium transition-all hover:scale-105",
                className
            )}
        >
            {icon && <span className="w-4 h-4">{icon}</span>}
            {name}
        </Badge>
    );
}
