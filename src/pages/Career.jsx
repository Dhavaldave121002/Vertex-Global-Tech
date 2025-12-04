// src/pages/Career.jsx
import React, { useState } from 'react'
import './career.css'

import Hero from '../components/Career/Hero'
import Filters from '../components/Career/Filters'
import JobList from '../components/Career/JobList'
import ApplyForm from '../components/Career/ApplyForm'
import RecruiterBox from '../components/Career/RecruiterBox'

import { JOBS } from '../components/Career/jobs-data'

export default function Career() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [applyData, setApplyData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    jobId: ''
  })
  const [errors, setErrors] = useState({})

  return (
    <main className="career-page py-5">
      <div className="container">

        <Hero />

        <Filters filter={filter} setFilter={setFilter} />

        <div className="row g-4">
          <div className="col-lg-7">
            <JobList
              filter={filter}
              expanded={expanded}
              setExpanded={setExpanded}
              applyData={applyData}
              setApplyData={setApplyData}
            />
          </div>

          <div className="col-lg-5">
            <ApplyForm
              applyData={applyData}
              setApplyData={setApplyData}
              errors={errors}
              setErrors={setErrors}
            />

            <RecruiterBox />
          </div>
        </div>

      </div>
    </main>
  )
}
