import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { endpoint, ...params } = req.query;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.append(key, value as string);
  });
  searchParams.append("apiKey", process.env.VITE_NEWS_API_KEY!);

  const response = await fetch(
    `https://newsapi.org/v2/${endpoint}?${searchParams.toString()}`
  );

  const data = await response.json();
  res.json(data);
}