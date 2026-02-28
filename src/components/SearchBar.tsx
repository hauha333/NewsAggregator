import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value);

  // debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onChange]);

  return (
    <Input
      type="text"
      placeholder="Search articles by title..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full sm:max-w-xs"
    />
  );
};

export default SearchBar;
