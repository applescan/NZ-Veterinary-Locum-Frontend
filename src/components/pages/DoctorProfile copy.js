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
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';



const theme = createTheme();

export default function DoctorProfile() {

    const navigate = useNavigate()
    const { user, setUser } = useContext(CustomContext)
    const { currentUserInfo, setCurrentUserInfo } = useContext(CustomContext)
    const [isOpen, setOpen] = React.useState(false);
    const FileRef = React.useRef()

    //when edit button is clicked, the update form will appear
    const handleToggle = () => {
        setOpen(!isOpen);
    };

    //check if there's user data on page load
    useEffect(() => {
        //getting user's data from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);

            //getting current user's data based on the id stored in local storage
            const getUserById = async () => {
                const res = await axios.get(`http://localhost:4000/doctors/search/${user._id}`);
                setCurrentUserInfo(res.data.currentUserInfo[0])
                console.log(res.data.currentUserInfo[0])
            };
            getUserById()
        }

    }, []);

    //console.log(user)

    const [details, setDetails] = useState({
        first_name: '', last_name: '', email: '', password: '',
        specialities: '', phone: '', city: '', license: '', availability: '', work_requirement: ''
    })

    const [error, setError] = useState(null)


    const handleSubmit = (event) => {
        event.preventDefault();

        setError(null)

        const toSend = new FormData()
        toSend.append('first_name', details.first_name)
        toSend.append('last_name', details.last_name)
        toSend.append('email', details.email)
        toSend.append('password', details.password)
        toSend.append('specialities', details.specialities)
        toSend.append('phone', details.phone)
        toSend.append('city', details.city)
        toSend.append('license', details.license)
        toSend.append('availability', details.availability)
        toSend.append('work_requirement', details.work_requirement)
        toSend.append('imageKey', FileRef.current.files[0])
        console.log("uploading")
        axios.post(`http://localhost:4000/doctors/update/${user._id}`, toSend, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        }).then(() => {
            window.location.reload()
        })
            .catch((error) => setError(error))
    };


    // if there's a user and user's info, show their profile
    if (user && currentUserInfo) {
        return <>
            <PageHeader maoriTitle="Tō Kōtaha" englishTitle="Your Profile" background={ProfileBanner} />
            <section>
                <MDBContainer className="py-5">

                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    <MDBCardImage
                                        src={`http://localhost:4000/images/${currentUserInfo.imageKey}`}
                                        alt="avatar"
                                        className="rounded"
                                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                        fluid />
                                    <br></br>
                                    <br></br>
                                    <h3>Dr. {currentUserInfo.first_name} {currentUserInfo.last_name}</h3>
                                    <p className="text-muted mb-4">{currentUserInfo.city}, New Zealand</p>

                                </MDBCardBody>
                            </MDBCard>


                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Full Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfo.first_name} {currentUserInfo.last_name}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfo.email}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Phone</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfo.phone}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Specialities</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfo.specialities}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>License</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfo.license}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Availability</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfo.availability}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Work Requirement</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{currentUserInfo.work_requirement}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                            <ButtonBlue name="Edit Details" style={{ marginRight: 30 }} onClick={handleToggle} size='sml'></ButtonBlue>
                            <ButtonBlueOutlined name="Delete Profile" style={{ marginRight: 30 }} size='sml'></ButtonBlueOutlined>

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
                                                autoComplete="given-name"
                                                name="firstName"
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                                defaultValue={currentUserInfo.first_name}
                                                onChange={e => setDetails({ ...details, first_name: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="family-name"
                                                defaultValue={currentUserInfo.last_name}
                                                onChange={e => setDetails({ ...details, last_name: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                defaultValue={currentUserInfo.email}
                                                onChange={e => setDetails({ ...details, email: e.target.value })}
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
                                                defaultValue={currentUserInfo.password}
                                                onChange={e => setDetails({ ...details, password: e.target.value })}
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
                                                defaultValue={currentUserInfo.phone}
                                                onChange={e => setDetails({ ...details, phone: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                name="city"
                                                label="City"
                                                type="text"
                                                id="city"
                                                autoComplete="new-city"
                                                defaultValue={currentUserInfo.city}
                                                onChange={e => setDetails({ ...details, city: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                name="license"
                                                label="License"
                                                type="text"
                                                id="license"
                                                autoComplete="new-license"
                                                defaultValue={currentUserInfo.license}
                                                onChange={e => setDetails({ ...details, license: e.target.value })}
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
                                                defaultValue={currentUserInfo.specialities}
                                                onChange={e => setDetails({ ...details, specialities: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="availability"
                                                label="Availability"
                                                type="text"
                                                id="availability"
                                                autoComplete="availability"
                                                multiline
                                                rows={2}
                                                defaultValue={currentUserInfo.availability}
                                                onChange={e => setDetails({ ...details, availability: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="work_requirement"
                                                label="Work Requirement"
                                                type="text"
                                                id="work_requirement"
                                                autoComplete="work_requirement"
                                                placeholder='Please book 2 weeks in advance'
                                                multiline
                                                rows={2}
                                                defaultValue={currentUserInfo.work_requirement}
                                                onChange={e => setDetails({ ...details, work_requirement: e.target.value })}
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
        <div>Please login</div>
    );

}


