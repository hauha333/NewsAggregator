import { createClient } from "@sanity/client";
import type { AllowedSource, Topic } from "@/types";

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function fetchAllowedSources(): Promise<AllowedSource[]> {
  const query = `*[_type == "allowedSource"]{ _id, name, "slug": slug.current }`;
  const sources = await client.fetch(query);
  return sources;
}

export async function fetchTopics(): Promise<Topic[]> {
  const query = `*[_type == "topic"]{ _id, name, keywords }`;
  const topics = await client.fetch(query);
  return topics;
}
