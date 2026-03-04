import type { LucideIcon } from "lucide-react";

interface ProgramCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ProgramCard({
  icon: Icon,
  title,
  description,
}: ProgramCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-warm transition-all hover:-translate-y-1 border border-border group">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon size={28} className="text-primary" />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
