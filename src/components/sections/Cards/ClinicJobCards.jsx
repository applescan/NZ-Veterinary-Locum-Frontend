import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
import ButtonBlue from '../../elements/ButtonBlue';
import ButtonBlueOutlined from "../../elements/ButtonBlueOutlined";
import { useNavigate } from 'react-router-dom';
import { CustomContext } from '../../../context/Context';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import UserModal from "../../elements/Modal";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const theme = createTheme();

export default function JobList() {

    //use state for getting user info and user from local storage
    const { userClinic, setUserClinic } = useContext(CustomContext)
    const { currentJobInfo, setCurrentJobInfo } = useState('')
    // const { currentUserInfoClinic, setCurrentUserInfoClinic } = useContext(CustomContext)

    const [posts, setPost] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate()

    //usestate for edit toggle button
    const [isOpen, setOpen] = React.useState(false);
    //when edit button is clicked, the update form will appear
    const handleToggle = (index) => {
        setOpen(index);
    };

    //usestate for add job listing button
    const [isOpenAdd, setOpenAdd] = React.useState(false);
    //when add button is clicked, the add form will appear
    const handleToggleAdd = () => {
        setOpenAdd(!isOpenAdd);
    };

    //usestate for modal
    const [show, setShow] = useState(false);
    //closing and opening modal functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //check if there's user data on page load and show related user's job listing
    useEffect(() => {
        //getting user's data from local storage
        const userClinic = JSON.parse(localStorage.getItem('userClinic'));
        if (userClinic) {
            setUserClinic(userClinic);

            //getting current user's data based on the id stored in local storage
            const getJobsByClinicId = async () => {
                const res = await axios.get(`https://nz-locum-backend-3a82ed85ab97.herokuapp.com/jobs/search/clinic/${userClinic._id}`);
                console.log(res.data)
                setPost(res.data)
            };
            getJobsByClinicId()
        }

    }, []);


    //when delete button is clicked, it will take the individual post's id and delete it
    const handleChanges = async (event, postid) => {

        event.preventDefault();

        try {
            await axios.delete(`https://nz-locum-backend-3a82ed85ab97.herokuapp.com/jobs/delete/${postid}`);
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    };


    //usestate to make new job listing
    const [details, setDetails] = useState({
        job_title: '', location: '', email: '',
        specialities: '', descriptions: '', phone: ''
    })

    //ref to check if input fields is empty/not
    let myRef = {}

    //job description min chacater input
    const CHARACTER_LIMIT = 150;

    //add job button will be disabled until all forms is filled
    function SubmitButton() {
        if (details.job_title && details.location && details.email
            && details.specialities && details.phone && details.descriptions.length >= CHARACTER_LIMIT) {
            return <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, textTransform: "none" }} onClick={() => { myRef.current.reportValidity() }}>Create job listing</Button>
        } else {
            return <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, textTransform: "none" }} onClick={() => { myRef.current.reportValidity() }} disabled>Create job listing</Button>
        };
    };

    //post function to add new job
    const addNewJob = (event) => {
        event.preventDefault();

        setError(null)

        const toSend = new FormData()
        toSend.append('job_title', details.job_title)
        toSend.append('location', details.location)
        toSend.append('email', details.email)
        toSend.append('specialities', details.specialities)
        toSend.append('phone', details.phone)
        toSend.append('descriptions', details.descriptions)
        toSend.append('clinic_id', userClinic._id) //automatically sets the clinic id with the logged in user's id
        console.log(toSend)

        axios.post('https://nz-locum-backend-3a82ed85ab97.herokuapp.com/jobs/add', toSend, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log(response.data)
            window.location.reload()
        })
            .catch((error) => setError(error.response.data.msg))
    };


    //function to update job listing
    const handleSubmit = (event, postid) => {

        event.preventDefault();

        if (posts._id === postid) {
            setCurrentJobInfo(currentJobInfo);
        }

        setError(null)

        const data = new FormData(event.currentTarget);

        const job_title = data.get('job_title') == null ? currentJobInfo.job_title : data.get('job_title');
        const location = data.get('location') == null ? currentJobInfo.location : data.get('location');
        const email = data.get('email') == null ? currentJobInfo.email : data.get('email');
        const specialities = data.get('specialities') == null ? currentJobInfo.specialities : data.get('specialities');
        const descriptions = data.get('descriptions') == null ? currentJobInfo.descriptions : data.get('descriptions');
        const phone = data.get('phone') == null ? currentJobInfo.phone : data.get('phone');


        try {
            fetch(`https://nz-locum-backend-3a82ed85ab97.herokuapp.com/jobs/update/${postid}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    job_title: job_title,
                    location: location,
                    email: email,
                    specialities: specialities,
                    descriptions: descriptions,
                    phone: phone,
                })
            }).then(() => {
                window.location.reload()
            }).catch((error) => setError(error))
        } catch (error) {
            console.log(error.msg)
        }
    };


    return (
        <>
            <h2>Job Listings</h2>
            <br></br>
            <div className="card">
                <Button variant="outlined" startIcon={<AddBoxIcon />} onClick={handleToggleAdd} sx={{ textTransform: "none" }}>
                    Add New Job Listing
                </Button></div>

            {/* form will show when the edit button is clicked */}

            {isOpenAdd &&

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

                            <h3>Enter Job Listing Details</h3>
                            <Box component="form" noValidate onSubmit={addNewJob} sx={{ mt: 3 }}>

                                {error ? <h1>{error.toString()}</h1> : null}


                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            inputRef={myRef}
                                            autoComplete="job_title"
                                            name="job_title"
                                            fullWidth
                                            id="job_title"
                                            label="Job Title"
                                            autoFocus
                                            onChange={e => setDetails({ ...details, job_title: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            inputRef={myRef}
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            type="email"
                                            id="email"
                                            autoComplete="email"
                                            onChange={e => setDetails({ ...details, email: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            inputRef={myRef}
                                            fullWidth
                                            name="phone"
                                            label="Phone"
                                            type="number"
                                            id="phone"
                                            autoComplete="new-phone"
                                            onChange={e => setDetails({ ...details, phone: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="location">Location*</InputLabel>
                                            <Select
                                                labelId="location"
                                                id="location"
                                                name="location"
                                                required
                                                label="Location"
                                                onChange={e => setDetails({ ...details, location: e.target.value })}
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
                                            inputRef={myRef}
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
                                            fullWidth
                                            inputRef={myRef}
                                            name="descriptions"
                                            label="Descriptions"
                                            type="text"
                                            id="descriptions"
                                            inputProps={{
                                                minlength: CHARACTER_LIMIT
                                            }}
                                            helperText={`${details.descriptions.length}/${CHARACTER_LIMIT}`}
                                            multiline
                                            rows={15}
                                            onChange={e => setDetails({ ...details, descriptions: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SubmitButton />
                                        <br></br>
                                        <br></br>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            }

            {/* job list begins here */}
            {posts.map((post, index) =>
                <div className="col-12 mt-3">
                    <div className="card">
                        <div className="card-horizontal">
                            <div className="card-body" id='card-body'>
                                <h4 className="card-title">{post.job_title}</h4>
                                <p className="card-text">
                                    {post.location}
                                </p>
                                <p>
                                    <b>Email: </b>{post.email}
                                </p>
                                <p>
                                    <b>Phone: </b>{post.phone}
                                </p>
                                <p>
                                    <b>Specialities: </b>{post.specialities}
                                </p>
                            </div>

                            <div className="card-body" id='card-body'>
                                <p className="card-text">
                                    <b>Descriptions: </b>{post.descriptions.slice(0, 250)}...
                                </p>
                                <ButtonBlue onClick={() => handleToggle(index)} name="Edit Job Listing" size='sml' style={{ marginRight: 30, marginBottom: 10 }}></ButtonBlue>
                                <ButtonBlueOutlined onClick={() => handleShow()} name="Delete Job Listing" size='sml' style={{ marginRight: 30, marginBottom: 10 }}></ButtonBlueOutlined>
                                <ButtonBlue onClick={() => { navigate(`/job-search/${post._id}`) }} name="See Details" size='sml' style={{ marginRight: 30, marginBottom: 10 }}></ButtonBlue>

                                {/* modal for job deletion*/}
                                <UserModal show={show} handleClose={handleClose} handleShow={handleShow} handleChanges={(event) => handleChanges(event, post._id)} nameClose='Cancel' nameOpen='Delete Job Listing'
                                    title='Delete Job Listing' text='Are you sure you want to delete this job listing? You can not undo this action' />
                            </div>
                        </div>

                    </div>

                    {/* form will show when the edit button is clicked */}

                    {index === isOpen &&

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

                                    <h3>Edit Job Listing</h3>
                                    <Box component="form" noValidate onSubmit={(event) => handleSubmit(event, post._id)} sx={{ mt: 3 }}>

                                        {error ? <h1>{error.toString()}</h1> : null}


                                        <Grid container spacing={2}>

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="job_title"
                                                    name="job_title"
                                                    fullWidth
                                                    id="job_title"
                                                    label="Job Title"
                                                    defaultValue={post.job_title}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    name="email"
                                                    label="Email"
                                                    type="email"
                                                    id="email"
                                                    autoComplete="email"
                                                    defaultValue={post.email}
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
                                                    defaultValue={post.phone}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="location">Location*</InputLabel>
                                                    <Select
                                                        labelId="location"
                                                        id="location"
                                                        name="location"
                                                        required
                                                        label="Location"
                                                        defaultValue={post.location}
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
                                                    name="specialities"
                                                    label="Specialities"
                                                    type="text"
                                                    id="specialities"
                                                    autoComplete="specialities"
                                                    multiline
                                                    rows={2}
                                                    defaultValue={post.specialities}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="descriptions"
                                                    label="Descriptions"
                                                    type="text"
                                                    id="descriptions"
                                                    inputProps={{
                                                        minlength: CHARACTER_LIMIT
                                                    }}
                                                    helperText={`${post.descriptions.length}/${CHARACTER_LIMIT}`}
                                                    multiline
                                                    rows={15}
                                                    defaultValue={post.descriptions}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <ButtonBlueOutlined onClick={handleToggle} name="Cancel" size='sml' style={{ marginRight: 30 }}></ButtonBlueOutlined>
                                                <ButtonBlue name="Save Changes" type="submit" size='sml'></ButtonBlue>
                                                <br></br>
                                                <br></br>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Container>
                        </ThemeProvider>
                    }

                </div>

            )}


            {error ? <Alert key='danger' variant='danger' id='cards'> Error retrieving data </Alert> : null}


        </>


    );
}






