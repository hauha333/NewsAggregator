import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSanityConfig } from "@/hooks/useSanityConfig";
import { fetchTopHeadlines } from "@/lib/newsApi";
import ArticleList from "@/components/ArticleList";
import SearchBar from "@/components/SearchBar";
import SourceFilter from "@/components/SourceFilter";
import TopicFilter from "@/components/TopicFilter";
import SortSelect from "@/components/SortSelect";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article, Topic } from "@/types";

function getArticleTopic(title: string, topics: Topic[]): string | null {
  const lowerTitle = title.toLowerCase();
  for (const topic of topics) {
    for (const keyword of topic.keywords) {
      if (lowerTitle.includes(keyword.toLowerCase())) {
        return topic.name;
      }
    }
  }
  return null;
}

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const {
    sources,
    topics,
    isLoading: configLoading,
    error: configError,
  } = useSanityConfig();

  const sourceSlugs = sources.map((s) => s.slug).join(",");

  const {
    data: newsData,
    isLoading: newsLoading,
    error: newsError,
  } = useQuery({
    queryKey: ["news", sourceSlugs],
    queryFn: () => fetchTopHeadlines(sourceSlugs),
    enabled: sourceSlugs.length > 0,
    staleTime: 2 * 60 * 1000,
  });

  const articles = useMemo(() => newsData?.articles || [], [newsData]);

  const getTopicForArticle = useCallback(
    (title: string) => getArticleTopic(title, topics),
    [topics]
  );

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((article: Article) =>
        article.title.toLowerCase().includes(query)
      );
    }

    if (selectedSource !== "all") {
      result = result.filter(
        (article: Article) => article.source.id === selectedSource
      );
    }

    if (selectedTopic !== "all") {
      result = result.filter((article: Article) => {
        const topic = getTopicForArticle(article.title);
        return topic === selectedTopic;
      });
    }

    result.sort((a: Article, b: Article) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [
    articles,
    searchQuery,
    selectedSource,
    selectedTopic,
    sortOrder,
    getTopicForArticle,
  ]);

  const isLoading = configLoading || newsLoading;
  const error = configError || newsError;

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500">Something went wrong: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <SourceFilter
          sources={sources}
          value={selectedSource}
          onChange={setSelectedSource}
        />
        <TopicFilter
          topics={topics}
          value={selectedTopic}
          onChange={setSelectedTopic}
        />
        <SortSelect value={sortOrder} onChange={setSortOrder} />
      </div>

      {!isLoading && (
        <p className="mb-4 text-sm text-muted-foreground">
          Showing {filteredArticles.length} article
          {filteredArticles.length !== 1 ? "s" : ""}
        </p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <ArticleList
          articles={filteredArticles}
          getTopicForArticle={getTopicForArticle}
        />
      )}
    </div>
  );
}

export default HomePage;
