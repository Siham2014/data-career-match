import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Building2, MapPin, Globe, ExternalLink, Filter } from "lucide-react";
import { getRecommendations, type Job } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/recommendations")({
  head: () => ({ meta: [{ title: "Recommendations — Job Intelligent" }, { name: "description", content: "Top data jobs ranked against your CV skills." }] }),
  component: RecommendationsPage,
});

function RecommendationsPage() {
  const { data: jobs = [], isLoading } = useQuery({ queryKey: ["recs"], queryFn: () => getRecommendations() });
  const [minScore, setMinScore] = useState(0);
  const [search, setSearch] = useState("");
  const [sources, setSources] = useState<Set<string>>(new Set());

  const allSources = useMemo(() => Array.from(new Set(jobs.map((j) => j.source))), [jobs]);

  const filtered = jobs.filter((j) =>
    j.score >= minScore &&
    (sources.size === 0 || sources.has(j.source)) &&
    (search === "" || (j.title + j.company + j.location).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Recommendations</h1>
      <p className="mt-2 text-muted-foreground">{filtered.length} job{filtered.length !== 1 && "s"} matching your profile.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-xl border bg-card p-5 shadow-[var(--shadow-card)] lg:sticky lg:top-20">
          <div className="flex items-center gap-2 text-sm font-semibold"><Filter className="h-4 w-4 text-primary" /> Filters</div>

          <div className="mt-5">
            <label className="text-xs font-medium text-muted-foreground">Search</label>
            <Input placeholder="Title, company…" className="mt-2" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="mt-5">
            <label className="text-xs font-medium text-muted-foreground">Min. score: <span className="font-semibold text-foreground">{minScore}%</span></label>
            <Slider className="mt-3" value={[minScore]} max={100} step={5} onValueChange={(v) => setMinScore(v[0])} />
          </div>

          <div className="mt-5">
            <div className="text-xs font-medium text-muted-foreground">Source</div>
            <div className="mt-2 space-y-2">
              {allSources.map((s) => (
                <label key={s} className="flex cursor-pointer items-center gap-2 text-sm">
                  <Checkbox checked={sources.has(s)} onCheckedChange={(c) => {
                    const next = new Set(sources);
                    c ? next.add(s) : next.delete(s);
                    setSources(next);
                  }} />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="grid gap-4 sm:grid-cols-2">
          {isLoading && Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-xl border bg-muted/40" />
          ))}
          {!isLoading && filtered.map((job) => <JobCard key={job.id} job={job} />)}
          {!isLoading && filtered.length === 0 && (
            <div className="col-span-full rounded-xl border bg-card p-10 text-center text-sm text-muted-foreground">
              No jobs match these filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <article className="group flex flex-col rounded-xl border bg-card p-5 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elevated)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{job.title}</h3>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3" />{job.company}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
            <span className="inline-flex items-center gap-1"><Globe className="h-3 w-3" />{job.source}</span>
          </div>
        </div>
        <ScoreBadge score={job.score} />
      </div>

      <div className="mt-4">
        <div className="text-xs font-medium text-muted-foreground">Matched skills</div>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {job.matched_skills.map((s) => (
            <Badge key={s} className="bg-success/15 text-success hover:bg-success/20 border-success/30" variant="outline">{s}</Badge>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs font-medium text-muted-foreground">Job skills</div>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {job.job_skills.map((s) => (
            <Badge key={s} variant="secondary" className="bg-secondary text-secondary-foreground">{s}</Badge>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-5">
        <Button variant="outline" className="w-full">View details <ExternalLink className="ml-2 h-3.5 w-3.5" /></Button>
      </div>
    </article>
  );
}
