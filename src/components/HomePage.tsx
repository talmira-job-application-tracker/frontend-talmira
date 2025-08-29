import React from 'react'
import JobSearch from './JobSearchBar'
import ListJob from './ListJob'

const HomePage = () => {
  return (
    <div className='flex flex-col justify-items-start gap-10 mt-15'>
        <JobSearch/>

        <ListJob/>
    </div>
  )
}

export default HomePage