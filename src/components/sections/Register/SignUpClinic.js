import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import PageHeader from '../../elements/PageHeader';
import DoctorRegistrationBanner from '../../../images/doctor-registration-banner.png'
import Button from '@mui/material/Button';
import { CustomContext } from '../../../context/Context';
import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';


const theme = createTheme();

export default function SignUp() {

    //setting the cureent user's info. It will be used in the doctor's profile pages through context.
    const { currentUserInfoClinic, setCurrentUserInfoClinic } = useContext(CustomContext)

    const [details, setDetails] = useState({
        business_name: '', email: '', password: '', specialities: '', phone: '', address: '', hours: ''
    })

    const [error, setError] = useState('')
    let myRef = {}
    const navigate = useNavigate()

    //sign up button will be disabled until all forms is filled
    function SubmitButton() {
        if (details.business_name && details.email && details.password
            && details.specialities && details.phone && details.address && details.hours) {
            return <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => { myRef.current.reportValidity() }}>Sign Up</Button>
        } else {
            return <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => { myRef.current.reportValidity() }} disabled>Sign Up</Button>
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setError(null)

        const toSend = new FormData()
        toSend.append('business_name', details.business_name)
        toSend.append('email', details.email)
        toSend.append('password', details.password)
        toSend.append('specialities', details.specialities)
        toSend.append('phone', details.phone)
        toSend.append('address', details.address)
        toSend.append('hours', details.hours)
        toSend.append('imageKey', FileRef.current.files[0])
        console.log("uploading")
        axios.post('http://localhost:4000/clinics/add', toSend, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log(response.data)
            setCurrentUserInfoClinic(response.data.currentUserInfoClinic)
            setTimeout(function () { navigate("/sign-in"); }, 2000);
        })
            .catch((error) => setError(error.response.data.msg))
    };



    const FileRef = React.useRef()



    return (
        <div id="Doctor-registration">

            <PageHeader maoriTitle="Me noho ko tetahi o a maatau whare haumanu kua rehitatia" englishTitle="Become one of our registered clinics" background={DoctorRegistrationBanner} />

            <Container component="main" maxWidth="md" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                        {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        <Grid item xs={12}>
                            <input ref={FileRef} type="file" inputRef={myRef} />
                            <div className="small text-muted mt-2">Upload your profile picture. Max file size 5 MB</div>
                            <br></br>
                        </Grid>


                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    inputRef={myRef}
                                    autoComplete="business_name"
                                    name="business_name"
                                    required
                                    fullWidth
                                    id="business_name"
                                    label="Business Name"
                                    autoFocus
                                    onChange={e => setDetails({ ...details, business_name: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    inputRef={myRef}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={e => setDetails({ ...details, email: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    inputRef={myRef}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={e => setDetails({ ...details, password: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    inputRef={myRef}
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone"
                                    type="number"
                                    id="phone"
                                    autoComplete="new-phone"
                                    onChange={e => setDetails({ ...details, phone: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={myRef}
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    type="text"
                                    id="address"
                                    multiline
                                    rows={2}
                                    autoComplete="address"
                                    onChange={e => setDetails({ ...details, address: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={myRef}
                                    required
                                    fullWidth
                                    name="specialities"
                                    label="Specialities"
                                    type="text"
                                    id="specialities"
                                    autoComplete="specialities"
                                    multiline
                                    rows={2}
                                    onChange={e => setDetails({ ...details, specialities: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={myRef}
                                    required
                                    fullWidth
                                    name="hours"
                                    label="hours"
                                    type="text"
                                    id="hours"
                                    autoComplete="hours"
                                    onChange={e => setDetails({ ...details, hours: e.target.value })}
                                />

                                <SubmitButton />
                                <br></br>
                                <br></br>
                                <br></br>

                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Container>
        </div>
    );
}




