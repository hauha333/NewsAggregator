import { useQuery } from "@tanstack/react-query";
import { fetchAllowedSources, fetchTopics } from "@/lib/sanity";

export function useSanityConfig() {
  const sourcesQuery = useQuery({
    queryKey: ["allowedSources"],
    queryFn: fetchAllowedSources,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const topicsQuery = useQuery({
    queryKey: ["topics"],
    queryFn: fetchTopics,
    staleTime: 5 * 60 * 1000,
  });

  return {
    sources: sourcesQuery.data || [],
    topics: topicsQuery.data || [],
    isLoading: sourcesQuery.isLoading || topicsQuery.isLoading,
    error: sourcesQuery.error || topicsQuery.error,
  };
}
