import { createFileRoute } from "@tanstack/react-router";
import { Cloud, Workflow, Database, Sparkles, BarChart3, GitMerge, Filter, Brain } from "lucide-react";

export const Route = createFileRoute("/pipeline")({
  head: () => ({
    meta: [
      { title: "Pipeline — Job Intelligent" },
      { name: "description", content: "Airflow ETL pipeline: collect, clean, merge, deduplicate, extract skills, match, store and visualize." },
    ],
  }),
  component: PipelinePage,
});

type Node = { id: string; label: string; sub?: string; icon: React.ComponentType<{ className?: string }>; tone?: "src" | "etl" | "store" | "ml" | "out" };
const tones: Record<string, string> = {
  src: "from-[oklch(0.7_0.18_230)] to-[oklch(0.6_0.2_250)]",
  etl: "from-[oklch(0.65_0.18_180)] to-[oklch(0.55_0.18_200)]",
  store: "from-[oklch(0.55_0.2_280)] to-[oklch(0.5_0.22_300)]",
  ml: "from-[oklch(0.65_0.2_320)] to-[oklch(0.55_0.22_340)]",
  out: "from-[oklch(0.65_0.2_140)] to-[oklch(0.55_0.18_160)]",
};

function NodeCard({ n }: { n: Node }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-[var(--shadow-card)]">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-white ${tones[n.tone ?? "etl"]}`}>
        <n.icon className="h-4 w-4" />
      </div>
      <div className="mt-3 text-sm font-semibold leading-tight">{n.label}</div>
      {n.sub && <div className="mt-0.5 text-[11px] text-muted-foreground">{n.sub}</div>}
    </div>
  );
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className={`flex items-center justify-center text-muted-foreground/60 ${vertical ? "py-1" : "px-1"}`}>
      <span className="text-lg leading-none">{vertical ? "↓" : "→"}</span>
    </div>
  );
}

function PipelinePage() {
  const sources: Node[] = [
    { id: "ft", label: "France Travail", sub: "Public API", icon: Cloud, tone: "src" },
    { id: "js", label: "JSearch", sub: "RapidAPI", icon: Cloud, tone: "src" },
    { id: "li", label: "LinkedIn", sub: "Scraper", icon: Cloud, tone: "src" },
  ];
  const collect: Node[] = [
    { id: "c_ft", label: "collect_france_travail", icon: Workflow, tone: "etl" },
    { id: "c_js", label: "collect_jsearch", icon: Workflow, tone: "etl" },
    { id: "c_li", label: "collect_linkedin", icon: Workflow, tone: "etl" },
  ];
  const clean: Node[] = [
    { id: "cl_ft", label: "clean_france_travail", icon: Filter, tone: "etl" },
    { id: "cl_js", label: "clean_jsearch", icon: Filter, tone: "etl" },
    { id: "cl_li", label: "clean_linkedin", icon: Filter, tone: "etl" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Data Pipeline</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Airflow orchestrates collection, cleaning, deduplication, NLP enrichment and serving — end to end.</p>

      <div className="mt-10 rounded-2xl border bg-gradient-to-b from-card to-secondary/30 p-6 shadow-[var(--shadow-card)] lg:p-10">
        {/* Sources row */}
        <div className="grid gap-3 sm:grid-cols-3">{sources.map((n) => <NodeCard key={n.id} n={n} />)}</div>
        <div className="grid sm:grid-cols-3"><Arrow vertical /><Arrow vertical /><Arrow vertical /></div>
        {/* Collect row */}
        <div className="grid gap-3 sm:grid-cols-3">{collect.map((n) => <NodeCard key={n.id} n={n} />)}</div>
        <div className="grid sm:grid-cols-3"><Arrow vertical /><Arrow vertical /><Arrow vertical /></div>
        {/* Clean row */}
        <div className="grid gap-3 sm:grid-cols-3">{clean.map((n) => <NodeCard key={n.id} n={n} />)}</div>

        <div className="my-3 flex justify-center"><Arrow vertical /></div>

        {/* Merge funnel */}
        <div className="mx-auto max-w-md">
          <NodeCard n={{ id: "merge", label: "Merge all sources", sub: "Unified schema", icon: GitMerge, tone: "etl" }} />
        </div>
        <div className="my-3 flex justify-center"><Arrow vertical /></div>
        <div className="mx-auto max-w-md">
          <NodeCard n={{ id: "dedup", label: "Deduplication", sub: "Hash + fuzzy match", icon: Filter, tone: "etl" }} />
        </div>
        <div className="my-3 flex justify-center"><Arrow vertical /></div>
        <div className="mx-auto max-w-md">
          <NodeCard n={{ id: "skills", label: "Skill extraction", sub: "spaCy + ontology", icon: Brain, tone: "ml" }} />
        </div>
        <div className="my-3 flex justify-center"><Arrow vertical /></div>
        <div className="mx-auto max-w-md">
          <NodeCard n={{ id: "match", label: "Matching", sub: "Score CV ↔ offer", icon: Sparkles, tone: "ml" }} />
        </div>

        <div className="my-6 flex justify-center"><Arrow vertical /></div>

        {/* Storage + serving */}
        <div className="grid gap-3 sm:grid-cols-2">
          <NodeCard n={{ id: "blob", label: "Azure Blob Storage", sub: "Raw + curated zones", icon: Cloud, tone: "store" }} />
          <NodeCard n={{ id: "pg", label: "PostgreSQL Star Schema", sub: "Facts + dimensions", icon: Database, tone: "store" }} />
        </div>
        <div className="my-3 grid sm:grid-cols-2"><Arrow vertical /><Arrow vertical /></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <NodeCard n={{ id: "pbi", label: "Power BI", sub: "Market dashboards", icon: BarChart3, tone: "out" }} />
          <NodeCard n={{ id: "app", label: "Recommendation App", sub: "This frontend", icon: Sparkles, tone: "out" }} />
        </div>
      </div>
    </div>
  );
}
