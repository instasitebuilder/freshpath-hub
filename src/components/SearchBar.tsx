import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="flex gap-2 max-w-2xl w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          className="pl-10"
          placeholder="Search for jobs, companies, or keywords..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Button>Search</Button>
    </div>
  );
};