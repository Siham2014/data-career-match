// API client. Replace BASE_URL with FastAPI backend when ready.
// For now returns mock data.

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  source: string;
  score: number; // 0-100
  matched_skills: string[];
  job_skills: string[];
  url?: string;
  posted_at?: string;
}

export interface Analytics {
  jobs_by_source: { name: string; value: number }[];
  top_locations: { name: string; value: number }[];
  top_skills: { name: string; value: number }[];
  score_distribution: { range: string; value: number }[];
}

const MOCK_SKILLS = [
  "Python", "SQL", "Airflow", "PostgreSQL", "Spark", "dbt",
  "Pandas", "Docker", "AWS", "Kafka", "Snowflake", "Git",
];

const MOCK_JOBS: Job[] = [
  { id: "1", title: "Data Engineer", company: "Datalyst", location: "Paris", source: "LinkedIn", score: 92, matched_skills: ["Python","SQL","Airflow","dbt"], job_skills: ["Python","SQL","Airflow","dbt","Snowflake"] },
  { id: "2", title: "Analytics Engineer", company: "Quanta", location: "Remote", source: "Welcome to the Jungle", score: 84, matched_skills: ["SQL","dbt","Snowflake"], job_skills: ["SQL","dbt","Snowflake","BigQuery","Looker"] },
  { id: "3", title: "Senior Data Engineer", company: "Northwind", location: "Berlin", source: "Indeed", score: 76, matched_skills: ["Python","Spark","Kafka","AWS"], job_skills: ["Python","Spark","Kafka","AWS","Scala"] },
  { id: "4", title: "ML Data Engineer", company: "VisionAI", location: "Lyon", source: "LinkedIn", score: 68, matched_skills: ["Python","Airflow"], job_skills: ["Python","Airflow","MLflow","Kubeflow","TensorFlow"] },
  { id: "5", title: "Data Platform Engineer", company: "Cloudbase", location: "Amsterdam", source: "HelloWork", score: 58, matched_skills: ["Docker","AWS","PostgreSQL"], job_skills: ["Docker","AWS","PostgreSQL","Terraform","Kubernetes"] },
  { id: "6", title: "Junior Data Analyst", company: "Brightly", location: "Paris", source: "Indeed", score: 45, matched_skills: ["SQL","Python"], job_skills: ["SQL","Python","Tableau","Excel","PowerBI"] },
  { id: "7", title: "Big Data Engineer", company: "Hadoopia", location: "London", source: "LinkedIn", score: 38, matched_skills: ["Spark"], job_skills: ["Spark","Hadoop","Hive","Scala","Java"] },
  { id: "8", title: "BI Developer", company: "MetricsCo", location: "Madrid", source: "Welcome to the Jungle", score: 32, matched_skills: ["SQL"], job_skills: ["SQL","PowerBI","DAX","SSIS"] },
];

const MOCK_ANALYTICS: Analytics = {
  jobs_by_source: [
    { name: "LinkedIn", value: 124 },
    { name: "Indeed", value: 86 },
    { name: "WTTJ", value: 54 },
    { name: "HelloWork", value: 38 },
  ],
  top_locations: [
    { name: "Paris", value: 92 },
    { name: "Remote", value: 71 },
    { name: "Lyon", value: 34 },
    { name: "Berlin", value: 28 },
    { name: "Amsterdam", value: 21 },
  ],
  top_skills: [
    { name: "Python", value: 180 },
    { name: "SQL", value: 165 },
    { name: "Airflow", value: 98 },
    { name: "Spark", value: 76 },
    { name: "dbt", value: 64 },
    { name: "AWS", value: 58 },
  ],
  score_distribution: [
    { range: "0-20", value: 12 },
    { range: "20-40", value: 28 },
    { range: "40-60", value: 64 },
    { range: "60-80", value: 92 },
    { range: "80-100", value: 46 },
  ],
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function uploadCV(_file: File): Promise<{ uploadId: string }> {
  await delay(700);
  return { uploadId: crypto.randomUUID() };
}

export async function extractSkills(_uploadId: string): Promise<{ skills: string[] }> {
  await delay(900);
  return { skills: MOCK_SKILLS.slice(0, 8) };
}

export async function getRecommendations(_skills?: string[]): Promise<Job[]> {
  await delay(400);
  return [...MOCK_JOBS].sort((a, b) => b.score - a.score);
}

export async function getAnalytics(): Promise<Analytics> {
  await delay(300);
  return MOCK_ANALYTICS;
}
