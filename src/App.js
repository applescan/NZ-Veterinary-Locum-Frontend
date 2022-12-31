import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/elements/NavBar';
import Context from './context/Context';
import SignIn from './components/pages/SignIn';
import ClinicList from './components/pages/ClinicList';
import DoctorList from './components/pages/DoctorList';
import JobList from './components/pages/JobList'
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
          <Route path='/clinics' element={<ClinicList />} />
          <Route path='/doctors' element={<DoctorList />} />
          <Route path='/job-search' element={<JobList />} />
          <Route path="/job-search/:id" element={<JobDetails />} />
          <Route path='/about' element={<About />} />
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