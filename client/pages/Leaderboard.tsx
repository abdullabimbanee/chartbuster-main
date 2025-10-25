import { useAppStore } from "@/store/app-store";
import { LeadCard } from "@/components/cards/LeadCard";

export default function Leaderboard() {
  const { leads } = useAppStore();
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[radial-gradient(1200px_600px_at_10%_-10%,hsl(var(--brand-blue)/0.25),transparent),radial-gradient(1000px_500px_at_90%_-20%,hsl(var(--brand-purple)/0.25),transparent)] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-3xl text-white">Leaderboard</h1>
        <p className="mt-2 text-white/70">
          All campus leads, ranked in real-time.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((l, i) => (
            <LeadCard key={l.id} lead={l} rank={i + 1} />
          ))}
        </div>
      </div>
    </main>
  );
}
