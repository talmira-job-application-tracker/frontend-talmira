export interface UserType {
    id: string,
    role: "admin" | "user",
    name: string,
    email: string,
    age?: number,
    image?: string | null,
    phone: string,
    skills: string[],
    interests: string[],
    receiveNotification: boolean,
}