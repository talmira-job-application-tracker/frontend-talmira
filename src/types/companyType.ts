export interface CompanyType {
    _id: string,
    name: string,
    industry: string,
    description: string,
    location: string,
    website: string,
    logo: string,
}

export interface cFormType {
    name: string,
    industry: string,
    description: string,
    location: string,
    website: string,
    logo: FileList,
}