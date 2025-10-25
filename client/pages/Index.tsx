import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { LeadCard } from "@/components/cards/LeadCard";
import { useAppStore } from "@/store/app-store";
import { Link } from "react-router-dom";

export default function Index() {
  const { leads } = useAppStore();
  const topThree = useMemo(() => leads.slice(0, 3), [leads]);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[radial-gradient(1200px_600px_at_10%_-10%,hsl(var(--brand-blue)/0.25),transparent),radial-gradient(1000px_500px_at_90%_-20%,hsl(var(--brand-purple)/0.25),transparent)] px-4 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl leading-tight text-white md:text-5xl">
              Campus Lead Chartbuster
            </h1>
            <p className="mt-4 max-w-xl text-white/80">
              Real-time ranks, auto score tracking, badges, and performance
              analytics. Futuristic glassmorphism with electric blue and purple
              accents keeps motivation high.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                asChild
                className="bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-[0_0_24px_hsl(var(--brand-blue)/0.5)]"
              >
                <Link to="/leaderboard">View Leaderboard</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Link to="/dashboard">Campus Lead Dashboard</Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 text-white/80">
              <Stat label="Total Leads" value={leads.length.toString()} />
              <Stat
                label="Top Score"
                value={leads[0]?.score.toString() ?? "0"}
              />
              <Stat
                label="Avg Score"
                value={Math.round(
                  leads.reduce((a, l) => a + l.score, 0) /
                    Math.max(1, leads.length),
                ).toString()}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {topThree.map((l, i) => (
              <LeadCard key={l.id} lead={l} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-[hsla(var(--glass-bg))] p-6 text-white backdrop-blur-xl">
          <h2 className="font-display text-2xl">Performance Analytics</h2>
          <p className="mt-1 text-white/70">
            Live activity, badges, and trends drive real-time motivation.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leads.slice(0, 6).map((l, i) => (
              <LeadMini key={l.id} name={l.name} score={l.score} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide text-white/60">
        {label}
      </div>
      <div className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-2xl font-bold text-transparent">
        {value}
      </div>
    </div>
  );
}

function LeadMini({ name, score }: { name: string; score: number }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="truncate text-white/80">{name}</div>
      <div className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text font-semibold text-transparent">
        {score}
      </div>
    </div>
  );
}
