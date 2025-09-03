import JobSearch from "./JobSearchBar";
import ListJob from "./ListJob";

const HomePage = () => {
  return (
    <main className="flex flex-col mt-20 px-4 sm:px-6">
      <JobSearch />
      <ListJob />
    </main>
  );
};

export default HomePage;
