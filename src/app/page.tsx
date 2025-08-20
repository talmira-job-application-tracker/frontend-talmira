import ListCompanies from "@/components/ListCompany";
import ListJob from "@/components/ListJob";
import AddCompany from "./company/add/page";

export default function Home() {
  return (
    <div>
      {/* <AddCompany/> */}
      <ListCompanies/>
      {/* <ListJob/> */}
    </div>
  );
}
