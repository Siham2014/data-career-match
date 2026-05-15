import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, FileText, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { uploadCV, extractSkills } from "@/lib/api";

export const Route = createFileRoute("/upload")({
  head: () => ({ meta: [{ title: "Upload CV — Job Intelligent" }, { name: "description", content: "Upload your CV to extract skills and match data jobs." }] }),
  component: UploadPage,
});

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle"|"uploading"|"extracting"|"done">("idle");
  const [skills, setSkills] = useState<string[]>([]);

  const onAnalyze = async () => {
    if (!file) return;
    setStatus("uploading");
    const { uploadId } = await uploadCV(file);
    setStatus("extracting");
    const { skills } = await extractSkills(uploadId);
    setSkills(skills);
    setStatus("done");
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Upload your CV</h1>
      <p className="mt-2 text-muted-foreground">We support PDF, DOCX and TXT. Your file is sent to the API for skill extraction.</p>

      <label className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-10 text-center transition hover:bg-primary/10">
        <Upload className="h-10 w-10 text-primary" />
        <span className="mt-3 text-sm font-medium">{file ? file.name : "Click to choose a file or drag it here"}</span>
        <span className="mt-1 text-xs text-muted-foreground">PDF, DOCX, TXT — up to 10MB</span>
        <input
          type="file" accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => { setFile(e.target.files?.[0] ?? null); setStatus("idle"); setSkills([]); }}
        />
      </label>

      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border bg-card p-3 text-sm shadow-[var(--shadow-card)]">
          <FileText className="h-4 w-4 text-primary" />
          <span className="flex-1 truncate">{file.name}</span>
          <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</span>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button onClick={onAnalyze} disabled={!file || status === "uploading" || status === "extracting"} size="lg">
          {status === "uploading" || status === "extracting" ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {status === "uploading" ? "Uploading…" : "Extracting skills…"}</>
          ) : "Analyze CV"}
        </Button>
      </div>

      {status === "done" && (
        <div className="mt-10 rounded-xl border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">Skills extracted</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((s) => (
              <Badge key={s} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/15">{s}</Badge>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button asChild>
              <Link to="/recommendations">View recommendations <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
