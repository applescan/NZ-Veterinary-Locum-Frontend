import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import PageHeader from '../../elements/PageHeader';
import DoctorRegistrationBanner from '../../../images/doctor-registration-banner.png'
import Button from '@mui/material/Button';
import { CustomContext } from '../../../context/Context';
import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Loading from '../../elements/Loading';


export default function SignUp() {

    //setting the current user's info. It will be used in the doctor's profile pages through context.
    const { setCurrentUserInfo } = useContext(CustomContext)

    const [details, setDetails] = useState({
        first_name: '', last_name: '', email: '', password: '',
        specialities: '', phone: '', city: '', license: '', availability: '', work_requirement: ''
    })

    const [error, setError] = useState('')
    const [uploading, setUploading] = useState(false)
    let myRef = {}
    const navigate = useNavigate()

    //sign up button will be disabled until all forms is filled
    function SubmitButton() {
        if (details.first_name && details.last_name && details.email && details.password
            && details.specialities && details.phone && details.city && details.license
            && details.availability && details.work_requirement) {
            return <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => { myRef.current.reportValidity() }}>Sign Up</Button>
        } else {
            return <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => { myRef.current.reportValidity() }} disabled>Sign Up</Button>
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setError(null)
        setUploading(true)
        console.log(uploading)

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
        axios.post('https://www.nz-vet-locum.online/doctors/add', toSend, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log(response.data)
            setCurrentUserInfo(response.data.currentUserInfo)
            navigate("/sign-in")
        })
            .catch((error) => { setError(error.response.data.msg); setUploading(false) }) //runs both function, setUploading is a second param to .catch
    };



    const FileRef = React.useRef()


    //when uploading image show the uploading animation
    if (uploading) {
        return <>
            <Loading />
        </>
    }

    if (!uploading) {
        return <>
            <div id="Doctor-registration">

                <PageHeader maoriTitle="Rēhita hei waahi" englishTitle="Register as a locum" background={DoctorRegistrationBanner} />

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

                            <h4>Please upload your profile image</h4>
                            <br></br>
                            <Grid item xs={12}>
                                <Card>
                                    <div id='cards'>
                                        <input ref={FileRef} type="file" inputRef={myRef} />
                                        <div className="small text-muted mt-2">Upload your profile picture. Max file size 1 MB</div>
                                    </div>
                                </Card>
                            </Grid>
                            <br></br>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputRef={myRef}
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        placeholder={`Jane`}
                                        onChange={e => setDetails({ ...details, first_name: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputRef={myRef}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        placeholder={`Doe`}
                                        onChange={e => setDetails({ ...details, last_name: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={myRef}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        placeholder={`example@email.com`}
                                        onChange={e => setDetails({ ...details, email: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={myRef}
                                        required
                                        fullWidth
                                        name="phone"
                                        label="Phone"
                                        type="number"
                                        id="phone"
                                        placeholder={`09863453423`}
                                        onChange={e => setDetails({ ...details, phone: e.target.value })}
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
                                            onChange={e => setDetails({ ...details, city: e.target.value })}
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
                                        inputRef={myRef}
                                        required
                                        fullWidth
                                        name="license"
                                        label="License"
                                        type="text"
                                        id="license"
                                        placeholder={`AD097244`}
                                        onChange={e => setDetails({ ...details, license: e.target.value })}
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
                                        placeholder={`I specialize in animal surgeries and horse care`}
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
                                        name="availability"
                                        label="Availability"
                                        type="text"
                                        id="availability"
                                        placeholder={`Monday to Friday from 9am - 4pm`}
                                        multiline
                                        rows={2}
                                        onChange={e => setDetails({ ...details, availability: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={myRef}
                                        required
                                        fullWidth
                                        name="work_requirement"
                                        label="Work Requirement"
                                        type="text"
                                        id="work_requirement"
                                        placeholder={`Please book 2 weeks in advance, only call when it's urgent`}
                                        multiline
                                        rows={2}
                                        onChange={e => setDetails({ ...details, work_requirement: e.target.value })}
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
        </>
    };
}




