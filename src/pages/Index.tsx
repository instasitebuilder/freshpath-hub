import { useState } from "react";
import { JobCard } from "@/components/JobCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";

// Mock data for initial development
const MOCK_JOBS = [
  {
    id: 1,
    title: "Junior Software Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We're looking for a passionate junior developer to join our growing team. You'll work on exciting projects using modern technologies like React, Node.js, and AWS.",
  },
  {
    id: 2,
    title: "Marketing Associate",
    company: "Growth Marketing Inc",
    location: "New York, NY",
    type: "Full-time",
    description: "Join our marketing team to help drive growth through digital campaigns, social media management, and content creation.",
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "DataViz Analytics",
    location: "Remote",
    type: "Internship",
    description: "Great opportunity for fresh graduates to gain hands-on experience with data analysis, visualization, and reporting using modern tools.",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement actual search functionality
  };

  const handleJobClick = (jobId: number) => {
    console.log("Job clicked:", jobId);
    // TODO: Implement job details view
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Dream Entry-Level Job
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover opportunities perfectly matched for fresh graduates and early career professionals
          </p>
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline">Remote Jobs</Button>
          <Button variant="outline">Full-time</Button>
          <Button variant="outline">Internship</Button>
          <Button variant="outline">Tech</Button>
          <Button variant="outline">Marketing</Button>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_JOBS.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              type={job.type}
              description={job.description}
              onClick={() => handleJobClick(job.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;