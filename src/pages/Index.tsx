import { useState } from "react";
import { JobCard } from "@/components/JobCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterBar } from "@/components/FilterBar";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;

const MOCK_JOBS = [
  {
    id: 1,
    title: "Junior Software Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We're looking for a passionate junior developer to join our growing team.",
    salary: "$70,000 - $90,000",
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with cross-functional teams",
      "Write clean, maintainable code"
    ],
    companyInfo: "TechCorp is a leading software company focused on innovation.",
    logoUrl: "/placeholder.svg"
  },
  // ... Add more mock jobs with similar structure
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPosition = !selectedPosition || job.position === selectedPosition;
    const matchesType = !selectedType || job.type === selectedType;
    const matchesLocation = !selectedLocation || job.location === selectedLocation;

    return matchesSearch && matchesPosition && matchesType && matchesLocation;
  });

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute min-h-full min-w-full object-cover opacity-10"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
      </div>

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
              onLocationChange={setSelectedLocation}
            />
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                type={job.type}
                description={job.description}
                logoUrl={job.logoUrl}
                onClick={() => {
                  setSelectedJob(job);
                  setIsDetailOpen(true);
                }}
              />
            ))}
          </div>

          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedJob && (
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedJob.logoUrl}
                  alt={`${selectedJob.company} logo`}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                  <p className="text-gray-600">{selectedJob.company}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Salary Range</h3>
                  <p>{selectedJob.salary}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-5">
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">About Company</h3>
                  <p>{selectedJob.companyInfo}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Index;