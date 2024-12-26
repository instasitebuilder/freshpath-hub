import Papa from 'papaparse';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string;
  companyInfo: string;
  logoUrl: string;
  applyUrl: string;
  responsibilities: string[];
}

export const fetchJobs = async (): Promise<Job[]> => {
  const response = await fetch('/jobs.csv');
  const csv = await response.text();
  
  const { data } = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return data.map((job: any) => ({
    ...job,
    id: parseInt(job.id),
    responsibilities: job.responsibilities.split('|')
  }));
};