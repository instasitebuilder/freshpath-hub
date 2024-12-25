import { useState } from "react";
import { JobCard } from "@/components/JobCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterBar } from "@/components/FilterBar";
import { useNavigate } from "react-router-dom";

// Mock data with added type field
const MOCK_JOBS = [
  {
    id: 1,
    title: "Junior Software Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We're looking for a passionate junior developer to join our growing team. You'll work on exciting projects using modern technologies like React, Node.js, and AWS.",
    position: "Software Developer"
  },
  {
    id: 2,
    title: "Marketing Associate",
    company: "Growth Marketing Inc",
    location: "New York, NY",
    type: "Part-time",
    description: "Join our marketing team to help drive growth through digital campaigns, social media management, and content creation.",
    position: "Marketing Associate"
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "DataViz Analytics",
    location: "Remote",
    type: "Internship",
    description: "Great opportunity for fresh graduates to gain hands-on experience with data analysis, visualization, and reporting using modern tools.",
    position: "Data Analyst"
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedGraduationYear, setSelectedGraduationYear] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPosition = !selectedPosition || job.position === selectedPosition;
    const matchesType = !selectedType || job.type === selectedType;

    return matchesSearch && matchesPosition && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="bg-primary py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find Your Dream Entry-Level Job
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover opportunities perfectly matched for fresh graduates and early career professionals
            </p>
            <div className="flex justify-center">
              <SearchBar onSearch={setSearchQuery} />
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <div className="flex justify-between items-center mb-8">
            <FilterBar
              onPositionChange={setSelectedPosition}
              onTypeChange={setSelectedType}
              onGraduationYearChange={setSelectedGraduationYear}
            />
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                type={job.type}
                description={job.description}
                onClick={() => console.log("Job clicked:", job.id)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;