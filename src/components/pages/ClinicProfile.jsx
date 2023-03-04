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
import ClinicJobCards from '../sections/Cards/ClinicJobCards'
import Card from 'react-bootstrap/Card';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Loading from "../elements/Loading";


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

    //when modal delete button is clicked, it will delete the user profile data and all jobs data connected by the clinic id
    const handleChanges = async (event) => {
        event.preventDefault();

        try {
            const urls = [`https://www.nz-vet-locum.online/clinics/delete/${userClinic._id}`,
            `https://www.nz-vet-locum.online/jobs/delete/clinic/${userClinic._id}`]

            const deleteRequests = urls.map((url) => {
                return axios.delete(url);
            });

            await axios.all(deleteRequests);

            // Handle success 
            localStorage.clear(); //clear user data on sign-out 
            setCurrentUserInfoClinic({})
            navigate('/')
            window.location.reload()
            console.log('Delete requests completed successfully!');

        } catch (error) {
            console.error('Error during delete requests:', error);
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
                const res = await axios.get(`https://www.nz-vet-locum.online/clinics/search/${userClinic._id}`);
                setCurrentUserInfoClinic(res.data.currentUserInfoClinic[0])
                console.log(res.data.currentUserInfoClinic[0])
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
        console.log(data.get('business_name'))

        const business_name = data.get('business_name') == null ? currentUserInfoClinic.business_name : data.get('business_name');
        const email = data.get('email') == null ? currentUserInfoClinic.email : data.get('email');
        const password = data.get('password') == null ? currentUserInfoClinic.password : data.get('password');
        const specialities = data.get('specialities') == null ? currentUserInfoClinic.specialities : data.get('specialities');
        const phone = data.get('phone') == null ? currentUserInfoClinic.phone : data.get('phone');
        const address = data.get('address') == null ? currentUserInfoClinic.address : data.get('address');
        const city = data.get('city') == null ? currentUserInfoClinic.city : data.get('city');
        const hours = data.get('hours') == null ? currentUserInfoClinic.hours : data.get('hours');
        const imageKey = FileRef.current.files[0] == null ? currentUserInfoClinic.imageKey : FileRef.current.files[0];


        const toSend = new FormData()
        toSend.append('business_name', business_name)
        toSend.append('email', email)
        toSend.append('password', password)
        toSend.append('specialities', specialities)
        toSend.append('phone', phone)
        toSend.append('city', city)
        toSend.append('hours', hours)
        toSend.append('address', address)
        toSend.append('imageKey', imageKey)

        console.log("uploading")

        try {
            fetch(`https://www.nz-vet-locum.online/clinics/update/${userClinic._id}`, {
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
    if (userClinic && !currentUserInfoClinic) {
        return <>
            <Loading />
        </>
    }
    // if there's a user and user's info, show their profile
    if (userClinic && currentUserInfoClinic) {
        return <>
            <PageHeader maoriTitle="Tō Kōtaha" englishTitle="Your Profile" background={ProfileBanner} />

            <MDBContainer className="py-5">

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={`https://www.nz-vet-locum.online/images/${currentUserInfoClinic.imageKey}`}
                                    alt="avatar"
                                    className="rounded"
                                    style={{ width: '250px', height: '200px', objectFit: 'cover' }}
                                    fluid />
                                <br></br>
                                <br></br>
                                <h3>{currentUserInfoClinic.business_name}</h3>
                                <p className="text-muted mb-4">{currentUserInfoClinic.address}, {currentUserInfoClinic.city}</p>

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
                <br></br>
                <br></br>
                <br></br>


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
                                                autoComplete="business_name"
                                                name="business_name"
                                                fullWidth
                                                id="business_name"
                                                label="Business Name"
                                                autoFocus
                                                defaultValue={currentUserInfoClinic.business_name}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                defaultValue={currentUserInfoClinic.email}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
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
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                name="phone"
                                                label="Phone"
                                                type="number"
                                                id="phone"
                                                autoComplete="new-phone"
                                                defaultValue={currentUserInfoClinic.phone}
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
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="city">City*</InputLabel>
                                                <Select
                                                    labelId="city"
                                                    id="city"
                                                    required
                                                    label="City"
                                                    name='city'
                                                    defaultValue={currentUserInfoClinic.city}
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
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="hours"
                                                label="Hours"
                                                type="text"
                                                id="hours"
                                                autoComplete="hours"
                                                defaultValue={currentUserInfoClinic.hours}
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


                {/* job listings */}
                <ClinicJobCards />

            </MDBContainer>
        </>
    }

    // if there's no user, show the login message
    return (
        <div id='card-page'>
            <br></br>
            <br></br>
            <Alert id='cards'>Please sign in</Alert>
        </div>
    );

}


