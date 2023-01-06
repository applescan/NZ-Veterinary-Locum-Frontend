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
import Card from 'react-bootstrap/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Loading from "../elements/Loading";



const theme = createTheme();

export default function DoctorProfile() {

    const FileRef = React.useRef()
    const navigate = useNavigate()

    //use state for getting user info and user from local storage
    const { user, setUser } = useContext(CustomContext)
    const { currentUserInfo, setCurrentUserInfo } = useContext(CustomContext)

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
            await axios.delete(`https://www.nz-vet-locum.online/doctors/delete/${user._id}`);
            localStorage.clear(); //clear user data on sign-out 
            setCurrentUserInfo({})
            navigate('/')
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    };

    //check if there's user data on page load
    useEffect(() => {
        //getting user's data from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);

            //getting current user's data based on the id stored in local storage
            const getUserById = async () => {
                const res = await axios.get(`https://www.nz-vet-locum.online/doctors/search/${user._id}`);
                setCurrentUserInfo(res.data.currentUserInfo[0])
                console.log(res.data.currentUserInfo[0])
            };
            getUserById()
        }

    }, []);


    const [error, setError] = useState(null)
    const [uploading, setUploading] = useState(false)


    const handleSubmit = (event) => {
        event.preventDefault();

        setError(null)
        setUploading(true)

        const data = new FormData(event.currentTarget);


        const first_name = data.get('first_name') == null ? currentUserInfo.first_name : data.get('first_name');
        const last_name = data.get('last_name') == null ? currentUserInfo.last_name : data.get('last_name');
        const email = data.get('email') == null ? currentUserInfo.email : data.get('email');
        const password = data.get('password') == null ? currentUserInfo.password : data.get('password');
        const specialities = data.get('specialities') == null ? currentUserInfo.specialities : data.get('specialities');
        const phone = data.get('phone') == null ? currentUserInfo.phone : data.get('phone');
        const city = data.get('city') == null ? currentUserInfo.city : data.get('city');
        const license = data.get('license') == null ? currentUserInfo.license : data.get('license');
        const availability = data.get('availability') == null ? currentUserInfo.availability : data.get('availability');
        const work_requirement = data.get('work_requirement') == null ? currentUserInfo.work_requirement : data.get('work_requirement');
        const imageKey = FileRef.current.files[0] == null ? currentUserInfo.imageKey : FileRef.current.files[0];


        const toSend = new FormData()
        toSend.append('first_name', first_name)
        toSend.append('last_name', last_name)
        toSend.append('email', email)
        toSend.append('password', password)
        toSend.append('specialities', specialities)
        toSend.append('phone', phone)
        toSend.append('city', city)
        toSend.append('license', license)
        toSend.append('availability', availability)
        toSend.append('work_requirement', work_requirement)
        toSend.append('imageKey', imageKey)

        try {
            fetch(`https://www.nz-vet-locum.online/doctors/update/${user._id}`, {
                method: "POST",
                body: toSend
            }).then(() => {
                window.location.reload()
            }).catch((error) => setError(error))
        } catch (error) {
            console.log(error.msg)
            setUploading(false)
        }
    };


    //when uploading image show the uploading animation
    if (uploading === true) {
        return <>
            <Loading />
        </>
    }
    // if there's a user but the get current info hasn't loaded yet then show loading screen
    if (user && !currentUserInfo) {
        return <>
            <Loading />
        </>
    }
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
                                        src={`https://www.nz-vet-locum.online/images/${currentUserInfo.imageKey}`}
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
                                            <Card>
                                                <div id='cards'>
                                                    <input ref={FileRef} type="file" />
                                                    <div className="small text-muted mt-2">Upload your profile picture. Max file size 1 MB</div>
                                                </div>
                                            </Card>
                                        </Grid>
                                        <br></br>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="first_name"
                                                name="first_name"
                                                fullWidth
                                                id="first_name"
                                                label="First Name"
                                                autoFocus
                                                defaultValue={currentUserInfo.first_name}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="last_name"
                                                label="Last Name"
                                                name="last_name"
                                                autoComplete="family-name"
                                                defaultValue={currentUserInfo.last_name}
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
                                                placeholder={'Your password'}
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
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="city">City*</InputLabel>
                                                <Select
                                                    labelId="city"
                                                    id="city"
                                                    name="city"
                                                    label="City"
                                                    required
                                                    defaultValue={currentUserInfo.city}
                                                >
                                                    <MenuItem value={'Northland'}>Northland</MenuItem>
                                                    <MenuItem value={'Auckland'}>Auckland</MenuItem>
                                                    <MenuItem value={'Wellington'}>Wellington</MenuItem>
                                                    <MenuItem value={'Dunedin'}>Dunedin</MenuItem>
                                                    <MenuItem value={'Christchurch'}>Christchurch</MenuItem>
                                                    <MenuItem value={'Queenstown'}>Queenstown</MenuItem>
                                                </Select>
                                            </FormControl>
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


