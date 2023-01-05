import React, { useState, useEffect, useContext } from "react";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse
} from 'mdb-react-ui-kit';
import Logo from '../../images/logo.png'
import Toggle from '../../images/toggle.png'
import ButtonBlue from './ButtonBlue'
import ButtonBlueOutlined from './ButtonBlueOutlined';
import { useNavigate } from 'react-router-dom'
import { CustomContext } from '../../context/Context';


export default function NavBar() {

    const [showNav, setShowNav] = useState(false);
    const { user, setUser } = useContext(CustomContext)
    const { setCurrentUserInfo } = useContext(CustomContext)
    const { userClinic, setUserClinic } = useContext(CustomContext)
    const { setCurrentUserInfoClinic } = useContext(CustomContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear(); //clear user data on sign-out 
        setCurrentUserInfo({})
        setCurrentUserInfoClinic({})
        navigate('/')
        window.location.reload()
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userClinic = JSON.parse(localStorage.getItem('userClinic'));
        if (user) {
            setUser(user);
        } else if (userClinic) {
            setUserClinic(userClinic)
        }
    }, []);

    if (user) {
        return <div className='nav-shadow'>
            <MDBNavbar sticky expand='lg' light style={{ backgroundColor: '#F3F9FF' }} >
                <MDBContainer fluid >
                    <MDBNavbarBrand href='/'>
                        <img
                            src={Logo}
                            height='70'
                            alt=''
                            loading='lazy'
                        />
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        type='button'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNav(!showNav)}
                    >
                        <img
                            src={Toggle}
                            height='40'
                            alt='toggle icon'
                            loading='lazy'
                        />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showNav}>
                        <MDBNavbarNav style={{ margin: 20 }}>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/job-search' >
                                    Job Search
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/doctors' >
                                    Doctors
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/clinics' >
                                    Clinics
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/about' >
                                    About Us
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/doctor-profile'>
                                    Your Profile
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <div className='nav-button'>
                            <ButtonBlue onClick={handleLogout} name="Logout" style={{ marginRight: 30 }} size='sml'></ButtonBlue>

                        </div>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    }

    // if user is clinic then snow this nav bar menu
    if (userClinic) {
        return <div className='nav-shadow'>
            <MDBNavbar sticky expand='lg' light style={{ backgroundColor: '#F3F9FF' }} >
                <MDBContainer fluid >
                    <MDBNavbarBrand href='/'>
                        <img
                            src={Logo}
                            height='70'
                            alt=''
                            loading='lazy'
                        />
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        type='button'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNav(!showNav)}
                    >
                        <img
                            src={Toggle}
                            height='40'
                            alt='toggle icon'
                            loading='lazy'
                        />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showNav}>
                        <MDBNavbarNav style={{ margin: 20 }}>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/job-search' >
                                    Job Search
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/doctors' >
                                    Doctors
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/clinics' >
                                    Clinics
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/about' >
                                    About Us
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/clinic-profile'>
                                    Your Profile
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <div className='nav-button'>
                            <ButtonBlue onClick={handleLogout} name="Logout" style={{ marginRight: 30 }} size='sml'></ButtonBlue>

                        </div>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    }

    return (
        <div className='nav-shadow'>
            <MDBNavbar sticky expand='lg' light style={{ backgroundColor: '#F3F9FF' }} >
                <MDBContainer fluid >
                    <MDBNavbarBrand href='/'>
                        <img
                            src={Logo}
                            height='70'
                            alt=''
                            loading='lazy'
                        />
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        type='button'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNav(!showNav)}
                    >
                        <img
                            src={Toggle}
                            height='40'
                            alt='toggle icon'
                            loading='lazy'
                        />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showNav}>
                        <MDBNavbarNav style={{ margin: 20 }}>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/job-search'>
                                    Job Search
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/doctors' >
                                    Doctors
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/clinics'>
                                    Clinics
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/about'>
                                    About Us
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <div className='nav-button'>
                            <ButtonBlueOutlined onClick={() => { navigate(`/sign-in`) }} name="Login" style={{ marginRight: 30 }} size='sml' ></ButtonBlueOutlined>
                            <ButtonBlue onClick={() => { navigate(`/sign-up`) }} name="Register" style={{ marginRight: 30 }} size='sml'></ButtonBlue>
                        </div>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}
