import { createFileRoute } from "@tanstack/react-router";
import { Database, Building2, MapPin, Tag, Calendar, Briefcase, Star, Target } from "lucide-react";

export const Route = createFileRoute("/warehouse")({
  head: () => ({
    meta: [
      { title: "Data Warehouse — Job Intelligent" },
      { name: "description", content: "PostgreSQL star schema with dim_source, dim_company, dim_location, dim_skill, dim_date, dim_job and fact tables." },
    ],
  }),
  component: WarehousePage,
});

const DIMS = [
  { name: "dim_source", icon: Database, fields: ["source_id", "name", "type", "base_url"] },
  { name: "dim_company", icon: Building2, fields: ["company_id", "name", "industry", "size"] },
  { name: "dim_location", icon: MapPin, fields: ["location_id", "city", "region", "country"] },
  { name: "dim_skill", icon: Tag, fields: ["skill_id", "name", "category", "level"] },
  { name: "dim_date", icon: Calendar, fields: ["date_id", "day", "month", "year", "weekday"] },
  { name: "dim_job", icon: Briefcase, fields: ["job_id", "title", "contract", "seniority"] },
];

const FACTS = [
  { name: "fact_job_offer", icon: Star, body: "One row per published job offer. Foreign keys to every dimension. Measures: salary_min, salary_max, posted_at, is_remote." },
  { name: "fact_job_matching", icon: Target, body: "One row per (CV, offer) pair. Foreign keys to dim_job, dim_skill, dim_date. Measures: match_score, matched_skill_count, total_skill_count." },
];

function WarehousePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Data Warehouse</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        A PostgreSQL star schema optimized for analytical queries and recommendation scoring. Two fact tables surrounded by six conformed dimensions.
      </p>

      {/* Star schema visual */}
      <div className="relative mt-10 rounded-2xl border bg-gradient-to-br from-card to-secondary/30 p-6 shadow-[var(--shadow-card)] lg:p-10">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-center">
          {/* Left dims */}
          <div className="space-y-3">
            {DIMS.slice(0, 3).map((d) => <DimCard key={d.name} d={d} align="right" />)}
          </div>
          {/* Center facts */}
          <div className="space-y-4">
            {FACTS.map((f) => (
              <div key={f.name} className="rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-primary/5 p-5 shadow-[var(--shadow-elevated)]">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-sm font-semibold text-primary">{f.name}</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
          {/* Right dims */}
          <div className="space-y-3">
            {DIMS.slice(3).map((d) => <DimCard key={d.name} d={d} align="left" />)}
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">All dimensions connect to both fact tables via foreign keys (star topology).</p>
      </div>
    </div>
  );
}

function DimCard({ d, align }: { d: typeof DIMS[number]; align: "left" | "right" }) {
  return (
    <div className={`rounded-xl border bg-card p-4 shadow-[var(--shadow-card)] ${align === "right" ? "lg:text-right" : ""}`}>
      <div className={`flex items-center gap-2 ${align === "right" ? "lg:flex-row-reverse" : ""}`}>
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
          <d.icon className="h-3.5 w-3.5" />
        </div>
        <span className="font-mono text-sm font-semibold">{d.name}</span>
      </div>
      <ul className="mt-2 space-y-0.5 font-mono text-[11px] text-muted-foreground">
        {d.fields.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </div>
  );
}
