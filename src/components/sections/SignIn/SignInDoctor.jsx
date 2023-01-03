import React, { useState, useContext } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { CustomContext } from '../../../context/Context';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import PageHeader from '../../elements/PageHeader';
import DoctorRegistrationBanner from '../../../images/doctor-registration-banner.png'


const theme = createTheme();


const SignIn = () => {
    const { user, setUser } = useContext(CustomContext)

    //setting the cureent user's info. It will be used in the doctor's profile pages through context.
    const { currentUserInfo, setCurrentUserInfo } = useContext(CustomContext)

    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async event => {

        event.preventDefault();

        setError(null)

        const user = new FormData(event.currentTarget);

        axios.post('http://localhost:4000/doctors/login', user, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }

        }).then(response => {
            setUser(response.data)
            setCurrentUserInfo(response.data.currentUserInfo)
            localStorage.setItem('user', JSON.stringify(response.data.currentUserInfo))
            console.log(response.data.currentUserInfo)
        })
            .catch((error) => setError(error.response.data.msg))
    };


    // if there's a user navigate to the profile
    if (user && currentUserInfo) {
        navigate("/doctor-profile")
    }

    // if there's no user, show the login form
    return (

        <div id="Doctor-registration">

            <PageHeader maoriTitle="Te waitohu a te taote" englishTitle="Doctor's sign in" background={DoctorRegistrationBanner} />

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '60vh'
                        }}
                    >
                       
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
export default SignIn;