import { getBadgeForScore, Lead } from "@/store/app-store";
import { Badge } from "@/components/ui/badge";
import { ScoreSparkline } from "@/components/charts/ScoreSparkline";

export function LeadCard({ lead, rank }: { lead: Lead; rank: number }) {
  const badge = getBadgeForScore(lead.score);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[hsla(var(--glass-bg))] p-4 shadow-[0_0_24px_hsl(var(--brand-blue)/0.15)] backdrop-blur-xl">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-brand-blue/30 to-brand-purple/30 blur-2xl transition-opacity group-hover:opacity-70" />
      <div className="flex items-center gap-3">
        <div
          className="grid size-12 place-items-center rounded-xl"
          style={{
            background: `linear-gradient(135deg, hsl(${lead.avatarHue} 90% 60% / 0.3), hsl(${(lead.avatarHue + 60) % 360} 90% 60% / 0.3))`,
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <span className="font-display text-white">
            {lead.name
              .split(" ")
              .map((s) => s[0])
              .slice(0, 2)
              .join("")}
          </span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-white">{lead.name}</h3>
            <Badge className={`bg-gradient-to-r ${badge.color} text-slate-900`}>
              {badge.label}
            </Badge>
          </div>
          <div className="mt-1 text-xs text-white/70">Rank #{rank}</div>
        </div>
        <div className="ml-auto text-right">
          <div className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-lg font-bold text-transparent">
            {lead.score}
          </div>
          <div className="text-[10px] uppercase tracking-wide text-white/60">
            points
          </div>
        </div>
      </div>
      <div className="mt-3">
        <ScoreSparkline data={lead.history} />
      </div>
    </div>
  );
}
