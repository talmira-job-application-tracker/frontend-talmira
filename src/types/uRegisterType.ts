export interface RegisterType {
  name: string;
  email: string;
  password: string;
  phone: string;
  age?: number;
  image?: string | null;
  skills?: string[];
  interests?: string[];
}
