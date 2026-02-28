import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Topic } from "@/types";

interface TopicFilterProps {
  topics: Topic[];
  value: string;
  onChange: (value: string) => void;
}

const TopicFilter = ({ topics, value, onChange }: TopicFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="All topics" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All topics</SelectItem>
        {topics.map((topic) => (
          <SelectItem key={topic._id} value={topic.name}>
            {topic.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TopicFilter;
