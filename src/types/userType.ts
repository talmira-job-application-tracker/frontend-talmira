export interface UserType {
  _id: string;
  role: "admin" | "user";
  name: string;
  email?: string;
  phone?: string;
  age?: number;
  image?: string | null;
  skills?: string[];
  interests?: string[];
  receiveNotification?: boolean;
  isDeleted?: boolean;
}


export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
  age: string;
  image?: FileList;
  skills: string;     
  interests: string;  
};

export interface SubscriberType {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  companyId: string;
  subscribedAt: string;
  isActive: boolean;
}
