import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Article } from "@/types";

const ArticlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const article = location.state?.article as Article | undefined;
  const topic = location.state?.topic as string | undefined;

  if (!article) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-muted-foreground">Article not found.</p>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to feed
        </Button>
      </div>
    );
  }

  const formattedDate = format(
    new Date(article.publishedAt),
    "MMMM dd, yyyy 'at' HH:mm"
  );

  return (
    <article className="mx-auto max-w-3xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        &larr; Back
      </Button>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="mb-6 h-64 w-full rounded-lg object-cover sm:h-80"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      <div className="mb-4 flex items-center gap-2">
        <Badge variant="outline">{article.source.name}</Badge>
        {topic && <Badge variant="secondary">{topic}</Badge>}
      </div>

      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{article.title}</h1>

      <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
        <span>{formattedDate}</span>
        {article.author && (
          <>
            <span>·</span>
            <span>{article.author}</span>
          </>
        )}
      </div>

      <Separator className="mb-6" />

      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        {article.description}
      </p>

      {article.content && (
        <div className="mb-6 text-gray-600">
          <p>{article.content}</p>
        </div>
      )}

      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <Button>Read full article &rarr;</Button>
      </a>
    </article>
  );
};

export default ArticlePage;
