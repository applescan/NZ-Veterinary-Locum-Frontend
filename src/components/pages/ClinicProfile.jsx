import React, { useState, useEffect, useContext } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../elements/PageHeader'
import ProfileBanner from '../../images/profile-banner.png'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
} from 'mdb-react-ui-kit';
import ButtonBlue from "../elements/ButtonBlue";
import ButtonBlueOutlined from "../elements/ButtonBlueOutlined";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import UserModal from "../elements/Modal";
import Alert from 'react-bootstrap/Alert';



const theme = createTheme();

export default function DoctorProfile() {

    const FileRef = React.useRef()
    const navigate = useNavigate()

    //use state for getting user info and user from local storage
    const { userClinic, setUserClinic } = useContext(CustomContext)
    const { currentUserInfoClinic, setCurrentUserInfoClinic } = useContext(CustomContext)

    //usestate for edit toggle button
    const [isOpen, setOpen] = React.useState(false);
    //when edit button is clicked, the update form will appear
    const handleToggle = () => {
        setOpen(!isOpen);
    };

    //usestate for modal
    const [show, setShow] = useState(false);
    //closing and opening modal functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //when modal delete button is clicked, it will delete the user profile data 
    const handleChanges = async (event) => {
        event.preventDefault();

        try {
            await axios.delete(`http://localhost:4000/clinics/delete/${userClinic._id}`);
            localStorage.clear(); //clear user data on sign-out 
            setCurrentUserInfoClinic({})
            navigate('/')
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    };

    //check if there's user data on page load
    useEffect(() => {
        //getting user's data from local storage
        const userClinic = JSON.parse(localStorage.getItem('userClinic'));
        if (userClinic) {
            setUserClinic(userClinic);

            //getting current user's data based on the id stored in local storage
            const getUserById = async () => {
                const res = await axios.get(`http://localhost:4000/clinics/search/${userClinic._id}`);
                setCurrentUserInfoClinic(res.data.currentUserInfoClinic[0])
                console.log(res.data.currentUserInfoClinic[0])
            };
            getUserById()
        }

    }, []);

    //console.log(user)

    const [details, setDetails] = useState({
        business_name: '', email: '', password: '',
        specialities: '', phone: '', address: '', hours: ''
    })

    const [error, setError] = useState(null)


    const handleSubmit = (event) => {
        event.preventDefault();

        setError(null)

        const data = new FormData(event.currentTarget);
        console.log(data.get('business_name'))

        const business_name = data.get('business_name') == null ? currentUserInfoClinic.business_name : data.get('business_name');
        const email = data.get('email') == null ? currentUserInfoClinic.email : data.get('email');
        const password = data.get('password') == null ? currentUserInfoClinic.password : data.get('password');
        const specialities = data.get('specialities') == null ? currentUserInfoClinic.specialities : data.get('specialities');
        const phone = data.get('phone') == null ? currentUserInfoClinic.phone : data.get('phone');
        const address = data.get('address') == null ? currentUserInfoClinic.address : data.get('address');
        const hours = data.get('hours') == null ? currentUserInfoClinic.hours : data.get('hours');
        const imageKey = FileRef.current.files[0] == null ? currentUserInfoClinic.imageKey : FileRef.current.files[0];


        console.log("uploading")
        try {
            fetch(`http://localhost:4000/clinics/update/${userClinic._id}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    business_name: business_name,
                    email: email,
                    password: password,
                    specialities: specialities,
                    phone: phone,
                    address: address,
                    hours: hours,
                    imageKey: imageKey
                })
            }).then(() => {
                window.location.reload()
            }).catch((error) => setError(error))
        } catch (error) {
            console.log(error.msg)
        }
    };


    // if there's a user and user's info, show their profile
    if (userClinic && currentUserInfoClinic) {
        return <>
            <PageHeader maoriTitle="Tō Kōtaha" englishTitle="Your Profile" background={ProfileBanner} />
            <section>
                <MDBContainer className="py-5">

                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    <MDBCardImage
                                        src={`http://localhost:4000/images/${currentUserInfoClinic.imageKey}`}
                                        alt="avatar"
                                        className="rounded"
                                        style={{ width: '250px', height: '200px', objectFit: 'cover' }}
                                        fluid />
                                    <br></br>
                                    <br></br>
                                    <h3>{currentUserInfoClinic.business_name}</h3>
                                    <p className="text-muted mb-4">{currentUserInfoClinic.address}</p>

                                </MDBCardBody>
                            </MDBCard>


                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Business Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfoClinic.business_name}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfoClinic.email}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Phone</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfoClinic.phone}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Specialities</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfoClinic.specialities}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Address</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfoClinic.address}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Hours</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfoClinic.hours}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                            <ButtonBlue name="Edit Details" style={{ marginRight: 30 }} onClick={handleToggle} size='sml'></ButtonBlue>
                            <ButtonBlueOutlined name="Delete Profile" style={{ marginRight: 30 }} onClick={() => handleShow()} size='sml'></ButtonBlueOutlined>


                            {/* modal for user deletion*/}
                            <UserModal show={show} handleClose={handleClose} handleShow={handleShow} handleChanges={handleChanges} nameClose='Cancel' nameOpen='Delete Profile'
                                title='We are sad to see you go! 😔' text='Are you sure you want to delete your profile? You can not undo this action' />


                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

                {/* form will show when the edit button is clicked */}

                {isOpen &&

                    <ThemeProvider theme={theme}>
                        <Container component="main">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'left',
                                    textAlign: 'left'
                                }}
                            >

                                <h3>Edit Your Details</h3>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                                    {error ? <h1>{error.toString()}</h1> : null}


                                    <Grid container spacing={2}>

                                        <Grid item xs={12}>
                                            {/* <MDBFile size='lg' id='customFile' ref={FileRef} type="file" /> */}
                                            <input ref={FileRef} type="file" />
                                            <div className="small text-muted mt-2">Upload your profile picture. Max file size 5 MB</div>
                                            <br></br>
                                        </Grid>


                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="business_name"
                                                name="business_name"
                                                fullWidth
                                                id="business_name"
                                                label="Business Name"
                                                autoFocus
                                                defaultValue={currentUserInfoClinic.business_name}
                                            // onChange={e => setDetails({ ...details, first_name: e.target.value })}
                                            />
                                        </Grid>
                                    
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                defaultValue={currentUserInfoClinic.email}
                                            // onChange={e => setDetails({ ...details, email: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                defaultValue={currentUserInfoClinic.password}
                                            //onChange={e => setDetails({ ...details, password: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="phone"
                                                label="Phone"
                                                type="number"
                                                id="phone"
                                                autoComplete="new-phone"
                                                defaultValue={currentUserInfoClinic.phone}
                                            //onChange={e => setDetails({ ...details, phone: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                name="address"
                                                label="Address"
                                                type="text"
                                                id="address"
                                                autoComplete="address"
                                                defaultValue={currentUserInfoClinic.address}
                                            //onChange={e => setDetails({ ...details, city: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                name="hours"
                                                label="Hours"
                                                type="text"
                                                id="hours"
                                                autoComplete="hours"
                                                defaultValue={currentUserInfoClinic.hours}
                                            //onChange={e => setDetails({ ...details, license: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="specialities"
                                                label="Specialities"
                                                type="text"
                                                id="specialities"
                                                autoComplete="specialities"
                                                multiline
                                                rows={2}
                                                defaultValue={currentUserInfoClinic.specialities}
                                            //onChange={e => setDetails({ ...details, specialities: e.target.value })}
                                            />
                                        </Grid>
                                       
                                        <Grid item xs={12}>
                                            <ButtonBlue name="Save Changes" type="submit" style={{ marginBottom: 50 }} size='sml'></ButtonBlue>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>

                }


            </section>




        </>
    }

    // if there's no user, show the login form
    return (
        <div id='card-page'>
            <br></br>
            <br></br>
            <Alert id='cards'>Please sign in</Alert>
        </div>
    );

}


