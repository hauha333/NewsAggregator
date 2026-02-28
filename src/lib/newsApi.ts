import type { NewsApiResponse } from "@/types";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export async function fetchTopHeadlines(
  sources: string
): Promise<NewsApiResponse> {
  const url = `${BASE_URL}/top-headlines?sources=${sources}&apiKey=${API_KEY}`;

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
  let url = `${BASE_URL}/everything?sources=${sources}&sortBy=publishedAt&apiKey=${API_KEY}`;

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
