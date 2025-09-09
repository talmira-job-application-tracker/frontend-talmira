'use client'

import JobSearch from "@/components/JobSearchBar";
import ListJob from "@/components/ListJob"

const jobs = () => {
    return (
        <div>
           <JobSearch/>
            <ListJob/>
        </div>
    )
}
export default jobs;