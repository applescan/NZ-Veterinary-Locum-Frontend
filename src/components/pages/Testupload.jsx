import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { CustomContext } from '../../context/Context';
import { useContext } from 'react';
import { useEffect } from 'react';


const theme = createTheme();

export default function SignUp() {

    //setting the cureent user's info. It will be used in the doctor's profile pages through context.
    // const { currentUserInfo, setCurrentUserInfo } = useContext(CustomContext)
    const { user, setUser } = useContext(CustomContext)
    const { currentUserInfo, setCurrentUserInfo } = useContext(CustomContext)


    const [details, setDetails] = useState({
        first_name: '', last_name: '', email: '', password: '',
        specialities: '', phone: '', city: '', license: '', availability: '', work_requirement: ''
    })

    const [validation, setValidation] = useState({
        first_name: '', last_name: '', email: '', password: '',
        specialities: '', phone: '', city: '', license: '', availability: '', work_requirement: ''
    });

    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const checkValidation = () => {
        let errors = validation;

        const first_name = details.first_name == null ? 'poop' : details.first_name;

        // //first Name validation
        // if (!details.fName.trim()) {
        //     errors.fName = "First name is required";
        // } else {
        //     errors.fName = "";
        // }
        // //last Name validation
        // if (!details.lName.trim()) {
        //     errors.lName = "Last name is required";
        // } else {
        //     errors.lName = "";
        // }

        // // email validation
        // const emailCond =
        //     "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
        // if (!details.email.trim()) {
        //     errors.email = "Email is required";
        // } else if (!details.email.match(emailCond)) {
        //     errors.email = "Please ingress a valid email address";
        // } else {
        //     errors.email = "";
        // }

        // //password validation
        // const cond1 = "/^(?=.*[a-z]).{6,20}$/";
        // const cond2 = "/^(?=.*[A-Z]).{6,20}$/";
        // const cond3 = "/^(?=.*[0-9]).{6,20}$/";
        // const password = details.password;
        // if (!password) {
        //     errors.password = "password is required";
        // } else if (password.length < 6) {
        //     errors.password = "Password must be longer than 6 characters";
        // } else if (password.length >= 20) {
        //     errors.password = "Password must shorter than 20 characters";
        // } else if (!password.match(cond1)) {
        //     errors.password = "Password must contain at least one lowercase";
        // } else if (!password.match(cond2)) {
        //     errors.password = "Password must contain at least one capital letter";
        // } else if (!password.match(cond3)) {
        //     errors.password = "Password must contain at least a number";
        // } else {
        //     errors.password = "";
        // }


        setValidation(errors);
    };

    useEffect(() => {
        checkValidation();
    }, [details]);

    const onUpdateField = e => {
        const nextFormState = {
            ...details,
            [e.target.name]: e.target.value,
        };
        setDetails(nextFormState);
    };

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
        axios.post(`http://localhost:4000/doctors/update/63abdc28195f544fd4bd053e`, toSend, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            //setCurrentUserInfo(res.data)
            console.log(res.data)
            alert(JSON.stringify(details, null, 2));
            //navigate("/sign-in")
        })
            .catch((error) => setError(error))
    };

    const FileRef = React.useRef()



    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                        {error ? <h1>{error.toString()}</h1> : null}

                        <input ref={FileRef} type="file" />
                        <br></br>
                        <br></br>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    autoFocus
                                    value={details.first_name}
                                    onChange={onUpdateField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                    value={details.last_name}
                                    onChange={onUpdateField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={details.email}
                                    onChange={onUpdateField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={details.password}
                                    onChange={onUpdateField}
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
                                    value={details.phone}
                                    onChange={onUpdateField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="city"
                                    label="City"
                                    type="text"
                                    id="city"
                                    autoComplete="new-city"
                                    value={details.city}
                                    onChange={onUpdateField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="license"
                                    label="License"
                                    type="text"
                                    id="license"
                                    autoComplete="new-license"
                                    value={details.license}
                                    onChange={onUpdateField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="specialities"
                                    label="Specialities"
                                    type="text"
                                    id="specialities"
                                    autoComplete="specialities"
                                    multiline
                                    rows={2}
                                    value={details.specialities}
                                    onChange={onUpdateField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="availability"
                                    label="Availability"
                                    type="text"
                                    id="availability"
                                    autoComplete="availability"
                                    multiline
                                    rows={2}
                                    value={details.availability}
                                    onChange={onUpdateField}
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
                                    value={details.work_requirement}
                                    onChange={onUpdateField}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

// import { useState } from "react";
// import styles from "./LoginForm.module.css";

// const LoginForm = props => {
//     const [form, setForm] = useState({
//         email: "",
//         password: "",
//         confirmPassword: "",
//     });

//     const onUpdateField = e => {
//         const nextFormState = {
//             ...form,
//             [e.target.name]: e.target.value,
//         };
//         setForm(nextFormState);
//     };

//     const onSubmitForm = e => {
//         e.preventDefault();
//         alert(JSON.stringify(form, null, 2));
//     };

//     return (
//         <form className={styles.form} onSubmit={onSubmitForm}>
//             <div className={styles.formGroup}>
//                 <label className={styles.formLabel}>Email</label>
//                 <input
//                     className={styles.formField}
//                     type="text"
//                     aria-label="Email field"
//                     name="email"
//                     value={form.email}
//                     onChange={onUpdateField}
//                 />
//             </div>
//             <div className={styles.formGroup}>
//                 <label className={styles.formLabel}>Password</label>
//                 <input
//                     className={styles.formField}
//                     type="password"
//                     aria-label="Password field"
//                     name="password"
//                     value={form.password}
//                     onChange={onUpdateField}
//                 />
//             </div>
//             <div className={styles.formGroup}>
//                 <label className={styles.formLabel}>Confirm Password</label>
//                 <input
//                     className={styles.formField}
//                     type="password"
//                     aria-label="Confirm password field"
//                     name="confirmPassword"
//                     value={form.confirmPassword}
//                     onChange={onUpdateField}
//                 />
//             </div>
//             <div className={styles.formActions}>
//                 <button className={styles.formSubmitBtn} type="submit">
//                     Login
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default LoginForm;