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