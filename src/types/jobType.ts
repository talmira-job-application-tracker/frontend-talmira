import { CompanyType } from "./companyType";

export interface JobType {
    _id?: string ,
    title: string,
    description: string,
    company: CompanyType,
    location: string,
    jobType: string,
    salary: string,
    language: string[],
    qualification: string,
    keyword?: string[] | null,
    workMode: string,
}

export interface JobCreateType {
  title: string;
  description: string;
  company: string; 
  location: string;
  jobType: "Full-time" | "Part-time" | "Internship";
  salary: string;
  language: string; // <-- string in form (comma separated)
  qualification: string;
  keyword: string;  // <-- string in form (comma separated)
  workMode: "Hybrid" | "On-Site" | "Remote";
}

export interface JobSearchFilters {
  title: string;
  location: string;
  jobType?: "Full-time" | "Part-time" | "Contract" | "Internship" | "";
  workMode?: "Hybrid" | "On-Site" | "Remote" | "";
  keyword: string;
}
