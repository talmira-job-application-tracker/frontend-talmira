import ListCompanies from "@/components/ListCompany";
import ListJob from "@/components/ListJob";
import AddCompany from "./company/add/page";
import ListUsers from "@/components/ListUsers";
import JobSearch from "@/components/JobSearchBar";
import NotificationToggleButton from "@/components/ToggleNotification";
import ListApplications from "@/components/ListApplications";
import CompanySearch from "@/components/CompanySearch";
import LoginPage from "./login/page";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header/>
      {/* <LoginPage/> */}
      {/* <AddCompany/> */}
      {/* <ListCompanies/> */}
      {/* <ListJob/> */}
      {/* <ListUsers/> */}
      {/* <JobSearch/> */}
      {/* <NotificationToggleButton/> */}
      <ListApplications/>
      {/* <CompanySearch/> */}
      {/* <JobSearch/> */}
      {/* <JobSearch/> */}
      {/* <NotificationToggleButton/> */}
    </div>
  );
}
