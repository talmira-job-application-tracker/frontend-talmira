import { ApplicationInterviewType } from "./applicationType";

export interface InterviewType {
  _id: string;
  application: ApplicationInterviewType; 
  scheduledAt: string;            
  mode: "Online" | "Offline" | "Phone";
  location?: string;
  notes?: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
