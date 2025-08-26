import ListCompanies from "@/components/ListCompany";
import ListJob from "@/components/ListJob";
import AddCompany from "./company/add/page";
import ListUsers from "@/components/ListUsers";
import JobSearch from "@/components/JobSearchBar";
import NotificationToggleButton from "@/components/ToggleNotification";
import ListApplications from "@/components/ListApplications";
import CompanySearch from "@/components/CompanySearch";
import LoginPage from "./login/page";

export default function Home() {
  return (
    <div>
      {/* <LoginPage/> */}
      {/* <AddCompany/> */}
      {/* <ListCompanies/> */}
      <ListJob/>
      {/* <ListUsers/> */}
      {/* <JobSearch/> */}
      {/* <NotificationToggleButton/> */}
      {/* <ListApplications/> */}
      {/* <CompanySearch/> */}
      {/* <JobSearch/> */}
      <JobSearch/>
      {/* <NotificationToggleButton/> */}
    </div>
  );
}
