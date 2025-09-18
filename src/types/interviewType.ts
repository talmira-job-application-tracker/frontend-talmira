import { ApplicationType } from "./applicationType";

export interface InterviewType {
  _id: string;
  applicationId: ApplicationType; 
  scheduledAt: string;            
  mode: "Online" | "Offline" | "Phone";
  location?: string;
  notes?: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
