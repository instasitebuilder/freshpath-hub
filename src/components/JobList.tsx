import { Job } from "@/services/jobService";
import { JobCard } from "./JobCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface JobListProps {
  jobs: Job[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onJobSelect: (job: Job) => void;
}

const ITEMS_PER_PAGE = 12;

export const JobList = ({ jobs, currentPage, setCurrentPage, onJobSelect }: JobListProps) => {
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
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
            onClick={() => onJobSelect(job)}
          />
        ))}
      </div>

      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(Math.max(1, currentPage - 1));
                }}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(Math.min(totalPages, currentPage + 1));
                }}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};