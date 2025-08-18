import { UserType } from "@/types/userType";

interface UserState {
    user: UserType | null;
    loading: boolean;
    error: string | null;
    isRefresh: boolean;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    isRefresh: false,
}