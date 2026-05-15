import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, Lightbulb, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Job Intelligent" },
      { name: "description", content: "Why Job Intelligent exists: centralize, clean, enrich and recommend data jobs." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const blocks = [
    { icon: AlertCircle, title: "The problem", body: "Data job offers are scattered across LinkedIn, JSearch, France Travail and many other platforms. Each source has its own format, its own taxonomy and its own quality issues. Candidates lose hours filtering noise instead of finding fit." },
    { icon: Lightbulb, title: "Our solution", body: "We collect job offers from multiple sources, clean and normalize them into a unified schema, enrich them with NLP-extracted skills, and store them in a PostgreSQL star-schema warehouse ready for analytics and recommendations." },
    { icon: Users, title: "Target users", body: "Data Engineers, Data Analysts, Data Scientists, ML Engineers and Analytics Engineers — from junior to senior — who want a single, intelligent entry point to the data job market." },
    { icon: Sparkles, title: "The value", body: "Faster search, personalized recommendations scored against your real CV, and market-level visibility on the skills, locations and companies that matter for your next move." },
  ];
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">About the project</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Job Intelligent is a Data Engineering project that turns a fragmented job market into a personalized recommendation experience.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {blocks.map((b) => (
          <article key={b.title} className="rounded-xl border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <b.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">{b.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
