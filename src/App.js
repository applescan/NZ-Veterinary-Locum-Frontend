import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/elements/NavBar';
import Context from './context/Context';
import SignIn from './components/pages/SignIn';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import About from './components/pages/About';
import Loading from './components/elements/Loading'
import SignUpDoctor from './components/sections/Register/SignUpDoctor';
import SignInDoctor from './components/sections/SignIn/SignInDoctor'
import SignInClinic from './components/sections/SignIn/SignInClinic'
import SignUpClinic from './components/sections/Register/SignUpClinic'
import JobDetails from './components/pages/JobDetails'
import Footer from './components/elements/Footer'
const LazyDoctorProfile = React.lazy(() => import('./components/pages/DoctorProfile'))
const LazyClinicProfile = React.lazy(() => import('./components/pages/ClinicProfile'))
const LazyDoctorList = React.lazy(() => import('./components/pages/DoctorList'))
const LazyClinicList = React.lazy(() => import('./components/pages/ClinicList'))
const LazyJobList = React.lazy(() => import('./components/pages/JobList'))

function App() {


  return (
    <>
      <Context>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-in-doctor' element={<SignInDoctor />} />
          <Route path='/sign-in-clinic' element={<SignInClinic />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-up-doctor' element={<SignUpDoctor />} />
          <Route path='/sign-up-clinic' element={<SignUpClinic />} />
          <Route path="/job-search/:id" element={<JobDetails />} />
          <Route path='/about' element={<About />} />
          <Route path="/job-search" element={<React.Suspense fallback={<Loading />}>
            <LazyJobList /></React.Suspense>}></Route>
          <Route path="/doctors" element={<React.Suspense fallback={<Loading />}>
            <LazyDoctorList /></React.Suspense>}></Route>
          <Route path="/clinics" element={<React.Suspense fallback={<Loading />}>
            <LazyClinicList /></React.Suspense>}></Route>
          <Route path="/doctor-profile" element={<React.Suspense fallback={<Loading />}>
            <LazyDoctorProfile /></React.Suspense>}></Route>
          <Route path="/clinic-profile" element={<React.Suspense fallback={<Loading />}>
            <LazyClinicProfile /></React.Suspense>}></Route>

        </Routes>
        <Footer />
      </Context>
    </>
  );
}

export default App;