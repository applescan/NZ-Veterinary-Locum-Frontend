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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Loading from '../../elements/Loading';


export default function SignUp() {

    //setting the cureent user's info. It will be used in the doctor's profile pages through context.
    const { setCurrentUserInfoClinic } = useContext(CustomContext)

    const [details, setDetails] = useState({
        business_name: '', email: '', password: '', specialities: '', phone: '', address: '', hours: ''
    })

    const [error, setError] = useState('')
    const [uploading, setUploading] = useState(false)
    let myRef = {}
    const navigate = useNavigate()

    //sign up button will be disabled until all forms is filled
    function SubmitButton() {
        if (details.business_name && details.email && details.password && details.city
            && details.specialities && details.phone && details.address && details.hours) {
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
        toSend.append('business_name', details.business_name)
        toSend.append('email', details.email)
        toSend.append('password', details.password)
        toSend.append('specialities', details.specialities)
        toSend.append('phone', details.phone)
        toSend.append('address', details.address)
        toSend.append('city', details.city)
        toSend.append('hours', details.hours)
    
        // Append the imageKey only if there's an uploaded file
        if (FileRef.current.files[0]) {
            toSend.append('imageKey', FileRef.current.files[0])
        }
    
        axios.post('https://nz-locum-backend-3a82ed85ab97.herokuapp.com/clinics/add', toSend, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            setCurrentUserInfoClinic(response.data.currentUserInfoClinic)
            navigate("/sign-in")
        })
        .catch((error) => { setError(error.response.data.msg); setUploading(false) })
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

                <PageHeader maoriTitle="Rēhitahia to whare haumanu" englishTitle="Register your clinic" background={DoctorRegistrationBanner} />

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
                                        autoComplete="business_name"
                                        name="business_name"
                                        required
                                        fullWidth
                                        id="business_name"
                                        label="Business Name"
                                        autoFocus
                                        placeholder={`My Pet Clinic`}
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
                                        placeholder={`example@email.com`}
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
                                        placeholder={`0932784373`}
                                        onChange={e => setDetails({ ...details, phone: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputRef={myRef}
                                        required
                                        fullWidth
                                        name="address"
                                        label="Address"
                                        type="text"
                                        id="address"
                                        placeholder={`1 Te Apunga Place, Mount Wellington`}
                                        onChange={e => setDetails({ ...details, address: e.target.value })}
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
                                        placeholder={`VSA is an advanced animal hospital providing specialist surgery, imaging, and medical services as well as advanced physiotherapy and after hours emergency care. We are open 24 hours seven days a week.`}
                                        onChange={e => setDetails({ ...details, specialities: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={myRef}
                                        required
                                        fullWidth
                                        name="hours"
                                        label="Hours"
                                        type="text"
                                        id="hours"
                                        placeholder={`24 hours`}
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
        </>
    };
}




