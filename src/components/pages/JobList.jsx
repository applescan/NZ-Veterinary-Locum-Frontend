import React from 'react'
import PageHeader from '../elements/PageHeader'
import JobBanner from '../../images/job-banner.png'
import JobsCards from '../sections/Cards/JobCards'

export default function jobList() {
    return (
        <div>
            <PageHeader maoriTitle="Nga rarangi mahi" englishTitle="Job Listings" background={JobBanner} />
            <JobsCards />
        </div>
    )
}
