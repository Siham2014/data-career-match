import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@/lib/api";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Job Intelligent" }, { name: "description", content: "Insights on data job market: sources, locations, skills, score distribution." }] }),
  component: AnalyticsPage,
});

const COLORS = ["oklch(0.55 0.2 255)", "oklch(0.65 0.2 240)", "oklch(0.72 0.15 220)", "oklch(0.78 0.12 200)", "oklch(0.6 0.18 270)"];

function AnalyticsPage() {
  const { data, isLoading } = useQuery({ queryKey: ["analytics"], queryFn: getAnalytics });

  if (isLoading || !data) {
    return <div className="mx-auto max-w-7xl p-10">Loading analytics…</div>;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      <p className="mt-2 text-muted-foreground">A snapshot of the data job market.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(() => {
          const total = data.jobs_by_source.reduce((a, b) => a + b.value, 0);
          const sources = data.jobs_by_source.length;
          const skills = data.top_skills.length;
          const locations = data.top_locations.length;
          const kpis = [
            { label: "Total job offers", value: total },
            { label: "Sources", value: sources },
            { label: "Tracked skills", value: skills },
            { label: "Top locations", value: locations },
          ];
          return kpis.map((k) => (
            <div key={k.label} className="rounded-xl border bg-card p-5 shadow-[var(--shadow-card)]">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</div>
              <div className="mt-2 text-3xl font-bold text-foreground">{k.value}</div>
            </div>
          ));
        })()}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Jobs by source">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data.jobs_by_source} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
                {data.jobs_by_source.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top locations">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.top_locations} layout="vertical" margin={{ left: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
              <XAxis type="number" stroke="oklch(0.5 0.03 250)" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="oklch(0.5 0.03 250)" fontSize={12} width={80} />
              <Tooltip />
              <Bar dataKey="value" fill="oklch(0.55 0.2 255)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top skills demanded">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.top_skills}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
              <XAxis dataKey="name" stroke="oklch(0.5 0.03 250)" fontSize={12} />
              <YAxis stroke="oklch(0.5 0.03 250)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="oklch(0.65 0.2 240)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Score distribution">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.score_distribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
              <XAxis dataKey="range" stroke="oklch(0.5 0.03 250)" fontSize={12} />
              <YAxis stroke="oklch(0.5 0.03 250)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="oklch(0.72 0.15 220)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-[var(--shadow-card)]">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
