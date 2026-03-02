import type { NewsApiResponse } from "@/types";

const BASE_URL = "/api/news";

export async function fetchTopHeadlines(
  sources: string
): Promise<NewsApiResponse> {
  const url = `${BASE_URL}?endpoint=top-headlines&sources=${sources}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`News API error: ${response.status}`);
  }

  const data: NewsApiResponse = await response.json();
  return data;
}

export async function fetchEverything(
  sources: string,
  query?: string
): Promise<NewsApiResponse> {
  let url = `${BASE_URL}?endpoint=everything&sources=${sources}&sortBy=publishedAt`;

  if (query) {
    url += `&q=${encodeURIComponent(query)}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`News API error: ${response.status}`);
  }

  const data: NewsApiResponse = await response.json();
  return data;
}
