import React from 'react'
import PageHeader from '../elements/PageHeader'
import JobBanner from '../../images/job-banner.png'
import Loading from '../elements/Loading';
const JobsCards = React.lazy(() => import('../sections/Cards/JobCards')); // Lazy-loaded

export default function jobList() {
    return (
        <div>
            <PageHeader maoriTitle="Nga rarangi mahi" englishTitle="Job Listings" background={JobBanner} />
            <React.Suspense fallback={<Loading />}>
                <JobsCards />
            </React.Suspense>
        </div>
    )
}
