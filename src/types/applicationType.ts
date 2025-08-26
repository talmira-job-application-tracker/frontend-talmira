import { JobType } from "./jobType";
import { UserType } from "./userType";

export interface ApplicationType {
  _id: string; // backend sends _id
  user?: UserType; // optional: only included for admin
  job: JobType;
  appliedAt: string;
  status: "applied" | "under review" | "rejected" | "selected";
  resume?: string; // optional in case not uploaded
  contactInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  isRead?: boolean; // optional unless you're explicitly storing this in backend
}
