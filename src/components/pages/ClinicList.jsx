import React from 'react'
import PageHeader from '../elements/PageHeader'
import ClinicBanner from '../../images/clinic-banner.png'
import Loading from '../elements/Loading';
const ClinicCards = React.lazy(() => import('../sections/Cards/ClinicCards')); // Lazy-loaded

export default function DoctorList() {
    return (
        <>
            <PageHeader maoriTitle="Nga Whare Haumanu kua Rehitatia" englishTitle="Registered Clinics" background={ClinicBanner} />
            <React.Suspense fallback={<Loading />}>
                <ClinicCards />
            </React.Suspense>
        </>
    )
}

