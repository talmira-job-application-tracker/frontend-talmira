export interface ApplicationType {
    id: string,
    user: string,
    job: string,
    appliedAt: string,
    status: "applied" | "under review" | "rejected" | "selected",
    resume: string,
    contactInfo?: {
        name?: string;
        email?: string;
        phone?: string;
    };
    isRead: boolean,
}