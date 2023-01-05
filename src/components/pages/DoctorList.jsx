import React from 'react'
import PageHeader from '../elements/PageHeader'
import DoctorBanner from '../../images/doctor-banner.png'
import Loading from '../elements/Loading';
const DoctorCards = React.lazy(() => import('../sections/Cards/DoctorCards')); // Lazy-loaded

export default function DoctorList() {
    return (
        <>
            <PageHeader maoriTitle="Wātea Locums" englishTitle="Available Locums" background={DoctorBanner} />
            <React.Suspense fallback={<Loading />}>
                <DoctorCards />
            </React.Suspense>
        </>
    )
}
