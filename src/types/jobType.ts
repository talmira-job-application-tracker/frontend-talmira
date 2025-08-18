export interface JobType {
    title: string,
    description: string,
    company: string,
    location: string,
    jobType: string,
    salary: string,
    language: string[],
    qualification: string,
    keyword?: string[] | null,
    workMode: string,
}