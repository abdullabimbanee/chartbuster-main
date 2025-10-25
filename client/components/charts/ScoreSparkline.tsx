import { Area, AreaChart, ResponsiveContainer } from "recharts";

export function ScoreSparkline({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div className="h-14 w-full">
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{ left: 0, right: 0, top: 6, bottom: 0 }}
        >
          <defs>
            <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--brand-blue))"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--brand-purple))"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke="hsl(var(--brand-blue))"
            strokeWidth={2}
            fill="url(#spark)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
