export interface ApplicationUser {
  _id: string;
  name: string;
}

export interface ApplicationInterviewUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ApplicationJob {
  _id: string;
  title: string;
  company: { _id: string; name: string };
  appliedAt?:Date;
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

export interface ApplicationInterviewType {
  _id: string;
  user?: ApplicationInterviewUser;
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



