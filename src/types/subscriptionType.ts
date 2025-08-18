import { CompanyType } from "./companyType";
import { UserType } from "./userType";

export interface SubscriptionType {
    id: string,
    userId: UserType,
    companyId: CompanyType,
    isActive: boolean,
}