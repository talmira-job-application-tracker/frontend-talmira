export interface ApplicationUser {
  _id: string;
  name: string;
}

export interface ApplicationJob {
  _id: string;
  title: string;
  company: { _id: string; name: string };
  location?: string;
}

export interface ApplicationType {
  _id: string;
  user?: ApplicationUser;
  job: ApplicationJob;
  appliedAt: string;
  status: "applied" | "under review" | "rejected" | "selected";
  resume?: string;
  contactInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  prevPosition: string;
  prevCompany: string;
  isRead?: boolean;
}

