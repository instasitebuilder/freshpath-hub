import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  onPositionChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

const positions = [
  "Software Developer",
  "Junior Software Engineer",
  "Web Developer",
  "Front-End Developer",
  "Back-End Developer",
  "Full-Stack Developer",
  "Python Developer",
  "Java Developer",
  "React Developer",
  "AI/ML Developer",
  "Data Scientist",
  "Quality Analyst",
  "Systems Analyst",
  "IT Support Engineer",
  "DevOps Engineer",
];

const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];

export const FilterBar = ({ onPositionChange, onTypeChange }: FilterBarProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <Select onValueChange={onPositionChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Position" />
        </SelectTrigger>
        <SelectContent>
          {positions.map((position) => (
            <SelectItem key={position} value={position}>
              {position}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onTypeChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          {jobTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};