import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AllowedSource } from "@/types";

interface SourceFilterProps {
  sources: AllowedSource[];
  value: string;
  onChange: (value: string) => void;
}

function SourceFilter({ sources, value, onChange }: SourceFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="All sources" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All sources</SelectItem>
        {sources.map((source) => (
          <SelectItem key={source.slug} value={source.slug}>
            {source.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SourceFilter;
