import { createFileRoute, Link } from "@tanstack/react-router";
import { Upload, Sparkles, BarChart3, ArrowRight, Database, Workflow, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Job Intelligent — Smart Data Job Recommendations" },
      { name: "description", content: "Upload your CV and discover the data jobs that match your skills best." },
    ],
  }),
  component: Home,
});

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
        <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
          Smart job recommendation platform for Data careers. Upload your CV, we extract your skills and match them against fresh job offers.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-[oklch(0.65_0.2_240)] shadow-[var(--shadow-elevated)]">
            <Link to="/upload"><Upload className="mr-2 h-4 w-4" /> Upload CV</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/recommendations">Browse jobs <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">The pipeline</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {[
            { label: "Sources", desc: "LinkedIn, Indeed, WTTJ" , icon: Database },
            { label: "Airflow", desc: "Orchestrated ETL", icon: Workflow },
            { label: "PostgreSQL", desc: "Star schema warehouse", icon: Database },
            { label: "Matching", desc: "Skill scoring engine", icon: Target },
            { label: "Recommendations", desc: "Ranked job cards", icon: Sparkles },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border bg-card p-5 shadow-[var(--shadow-card)]">
              <s.icon className="h-5 w-5 text-primary" />
              <div className="mt-3 text-sm font-semibold">{s.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          { icon: Upload, title: "Upload your CV", desc: "PDF, DOCX or TXT — we extract your tech stack." },
          { icon: Sparkles, title: "Get matched", desc: "Each offer scored against your skills." },
          { icon: BarChart3, title: "See trends", desc: "Top skills, sources and locations of the market." },
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
