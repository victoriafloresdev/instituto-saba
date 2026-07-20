import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  aspect?: string;
  className?: string;
}

export function ImagePlaceholder({ label = "Imagem", aspect = "4/5", className }: Props) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-secondary via-muted to-accent/30 flex items-center justify-center",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0 opacity-[0.06] mix-blend-multiply" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #000 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
      <div className="relative flex flex-col items-center gap-2 text-muted-foreground">
        <ImageIcon className="h-6 w-6" strokeWidth={1.4} />
        <span className="text-xs uppercase tracking-[0.18em]">{label}</span>
      </div>
    </div>
  );
}
