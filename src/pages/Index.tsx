import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterBar } from "@/components/FilterBar";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { JobList } from "@/components/JobList";
import { useQuery } from "@tanstack/react-query";
import { Job, fetchJobs } from "@/services/jobService";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: jobs = [] } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPosition = !selectedPosition || job.title.includes(selectedPosition);
    const matchesType = !selectedType || job.type === selectedType;
    const matchesLocation = !selectedLocation || job.location === selectedLocation;

    return matchesSearch && matchesPosition && matchesType && matchesLocation;
  });

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setIsDetailOpen(true);
  };

  const handleApply = () => {
    if (selectedJob?.applyUrl) {
      window.open(selectedJob.applyUrl, '_blank');
    }
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

          <JobList 
            jobs={filteredJobs}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onJobSelect={handleJobSelect}
          />
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

                <Button onClick={handleApply} className="w-full">
                  Apply Now
                </Button>
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