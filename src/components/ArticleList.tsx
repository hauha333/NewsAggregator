import ArticleCard from "./ArticleCard";
import type { Article } from "@/types";

interface ArticleListProps {
  articles: Article[];
  getTopicForArticle: (title: string) => string | null;
}

function ArticleList({ articles, getTopicForArticle }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No articles found. Try changing the filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard
          key={article.url}
          article={article}
          topic={getTopicForArticle(article.title)}
          index={index}
        />
      ))}
    </div>
  );
}

export default ArticleList;
