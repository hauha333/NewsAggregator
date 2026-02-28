import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  topic: string | null;
  index: number;
}

const ArticleCard = ({ article, topic, index }: ArticleCardProps) => {
  const formattedDate = format(
    new Date(article.publishedAt),
    "MMM dd, yyyy HH:mm"
  );

  return (
    <Link to={`/article/${index}`} state={{ article, topic }}>
      <Card className="h-full transition-shadow hover:shadow-md">
        {article.urlToImage && (
          <div className="overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="h-48 w-full object-cover"
              onError={(e) => {
                // hide broken images
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {article.source.name}
            </Badge>
            {topic && (
              <Badge variant="secondary" className="text-xs">
                {topic}
              </Badge>
            )}
          </div>
          <CardTitle className="line-clamp-2 text-base">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3">
            {article.description || "No description available."}
          </CardDescription>
          <p className="mt-3 text-xs text-muted-foreground">{formattedDate}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
