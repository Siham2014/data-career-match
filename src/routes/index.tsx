import { createFileRoute, Link } from "@tanstack/react-router";
import { Upload, Sparkles, BarChart3, ArrowRight, Database, Workflow, Cloud, FileText, Brain, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Job Intelligent — Smart Data Job Recommendation Platform" },
      { name: "description", content: "Centralizes data jobs from LinkedIn, JSearch and France Travail. Airflow ETL, PostgreSQL star schema, CV-based recommendations." },
    ],
  }),
  component: Home,
});

const PIPELINE = [
  { label: "Sources", desc: "LinkedIn · JSearch · France Travail", icon: Cloud },
  { label: "Airflow", desc: "Orchestrated ETL", icon: Workflow },
  { label: "Azure Blob", desc: "Raw + cleaned storage", icon: Cloud },
  { label: "PostgreSQL", desc: "Star schema warehouse", icon: Database },
  { label: "Power BI", desc: "Dashboards", icon: LineChart },
  { label: "Recommendations", desc: "CV → Job matching", icon: Sparkles },
];

function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:py-20">
      <section className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Data careers, intelligently matched
        </span>
        <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
          Job Intelligent
        </h1>
        <p className="mt-3 text-lg font-medium text-primary">Smart Data Job Recommendation Platform</p>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground">
          Job Intelligent centralizes job offers from LinkedIn, JSearch and France Travail, processes them with an automated Airflow pipeline, stores them in a PostgreSQL Data Warehouse using a star schema, and recommends the most relevant jobs based on the user's CV.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-[oklch(0.65_0.2_240)] shadow-[var(--shadow-elevated)]">
            <Link to="/recommendations"><Upload className="mr-2 h-4 w-4" /> Upload CV</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pipeline">View Pipeline <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">The pipeline</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {PIPELINE.map((s, i) => (
            <div key={i} className="relative rounded-xl border bg-card p-5 shadow-[var(--shadow-card)]">
              <s.icon className="h-5 w-5 text-primary" />
              <div className="mt-3 text-sm font-semibold">{s.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          { icon: FileText, title: "Upload your CV", desc: "PDF, DOCX or TXT — we extract your tech stack with NLP." },
          { icon: Brain, title: "Get matched", desc: "Each offer scored against your skills using semantic matching." },
          { icon: BarChart3, title: "See the market", desc: "Top skills, sources and locations across the data job market." },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
