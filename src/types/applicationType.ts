import { JobType } from "./jobType";
import { UserType } from "./userType";

export interface ApplicationType {
    id: string,
    user: UserType,
    job: JobType,
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