import { createFileRoute } from "@tanstack/react-router";
import { Cloud, Brush, Brain, Target, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Job Intelligent" },
      { name: "description", content: "Multi-source collection, cleaning, NLP skill extraction, CV matching and BI analytics." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Cloud, title: "Multi-source Job Collection", desc: "Automated connectors pull fresh offers from LinkedIn, JSearch and France Travail every day, scheduled via Airflow DAGs." },
  { icon: Brush, title: "Data Cleaning & Normalization", desc: "Deduplication, language detection, location parsing and contract normalization unify heterogeneous payloads into one canonical schema." },
  { icon: Brain, title: "NLP Skill Extraction", desc: "spaCy + custom skill ontology extract technical and soft skills from raw job descriptions and CVs into a shared vocabulary." },
  { icon: Target, title: "CV-to-Job Matching", desc: "Each candidate's skill set is scored against every offer using weighted overlap and semantic similarity, producing a 0-100 fit score." },
  { icon: BarChart3, title: "BI Dashboard & Analytics", desc: "Power BI dashboards on top of the star schema reveal skill trends, top hiring locations and salary signals across the market." },
];

function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Services</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Five end-to-end capabilities, from raw scraping to a personalized recommendation experience.</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <article key={s.title} className="group rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.65_0.2_240)] text-primary-foreground shadow-[var(--shadow-card)]">
              <s.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
