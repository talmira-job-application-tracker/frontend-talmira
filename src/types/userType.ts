export interface UserType {
    id?: string,
    role: "admin" | "user",
    name: string,
    email: string,
    password: string,
    age?: number,
    image?: string | null,
    phone: string,
    skills: string[],
    interests: string[],
    receiveNotification: boolean,
}