import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
import ButtonBlue from '../../elements/ButtonBlue';
import Row from 'react-bootstrap/Row';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Loading from "../../elements/Loading";


export default function JobList() {

    const [posts, setPost] = useState([])
    const [northland, setNorthland] = useState([])
    const [auckland, setAuckland] = useState([])
    const [wellington, setWellington] = useState([])
    const [dunedin, setDunedin] = useState([])
    const [christchurch, setChristchurch] = useState([])
    const [queenstown, setQueenstown] = useState([])
    const [error, setError] = useState("")
    const [basicActive, setBasicActive] = useState('all');
    const navigate = useNavigate()

    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        }

        setBasicActive(value);
    };

    useEffect(() => {
        axios
            .get('https://www.nz-vet-locum.online/jobs/all')
            .then(res => {
                console.log(res)
                setPost(res.data)
            })
            .catch(err => {
                console.log(err)
                setError('Error retrieving data')
            })
    }, []) //only do get request on load

    useEffect(() => {
        axios
            .get('https://www.nz-vet-locum.online/jobs/search/north')
            .then(res => {
                //console.log(res)
                setNorthland(res.data)
            })
            .catch(err => {
                //console.log(err)
                setError('Error retrieving data')
            })
    }, []) //only do get request on load

    useEffect(() => {
        axios
            .get('https://www.nz-vet-locum.online/jobs/search/auck')
            .then(res => {
                //console.log(res)
                setAuckland(res.data)
            })
            .catch(err => {
                console.log(err)
                setError('Error retrieving data')
            })
    }, []) //only do get request on load

    useEffect(() => {
        axios
            .get('https://www.nz-vet-locum.online/jobs/search/well')
            .then(res => {
                //console.log(res)
                setWellington(res.data)
            })
            .catch(err => {
                console.log(err)
                setError('Error retrieving data')
            })
    }, []) //only do get request on load

    useEffect(() => {
        axios
            .get('https://www.nz-vet-locum.online/jobs/search/dun')
            .then(res => {
                //console.log(res)
                setDunedin(res.data)
            })
            .catch(err => {
                console.log(err)
                setError('Error retrieving data')
            })
    }, []) //only do get request on load

    useEffect(() => {
        axios
            .get('https://www.nz-vet-locum.online/jobs/search/chri')
            .then(res => {
                //console.log(res)
                setChristchurch(res.data)
            })
            .catch(err => {
                console.log(err)
                setError('Error retrieving data')
            })
    }, []) //only do get request on load

    useEffect(() => {
        axios
            .get('https://www.nz-vet-locum.online/jobs/search/queen')
            .then(res => {
                //console.log(res)
                setQueenstown(res.data)
            })
            .catch(err => {
                console.log(err)
                setError('Error retrieving data')
            })
    }, []) //only do get request on load

    
    // if the posts haven't loaded yet then show loading screen
    if (!posts) {
        return <>
            <Loading />
        </>
    }
    // if the post has loaded show UI
    return (
        <>
            <MDBTabs pills justify className='mb-3' id='cards'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('all')} active={basicActive === 'all'}  >
                        All
                    </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('Northland')} active={basicActive === 'Northland'}>
                        Northland
                    </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('Auckland')} active={basicActive === 'Auckland'}>
                        Auckland
                    </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('Wellington')} active={basicActive === 'Wellington'}>
                        Wellington
                    </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('Dunedin')} active={basicActive === 'Dunedin'}>
                        Dunedin
                    </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('Christchurch')} active={basicActive === 'Christchurch'}>
                        Christchurch
                    </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('Queenstown')} active={basicActive === 'Queenstown'}>
                        Queenstown
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={basicActive === 'all'}>
                    <Row xs={1} md={1} lg={1} className="g-4" id='cards'>
                        {posts.map(post =>
                            <div className="col-12 mt-3">
                                <div className="card">
                                    <div className="card-horizontal">

                                        <div className="card-body" id='card-body'>
                                            <h4 className="card-title">{post.job_title}</h4>
                                            <p className="card-text">
                                                {post.location}, New Zealand
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
                                                <b>Job ID: </b> {post._id}
                                                <br></br>
                                                <br></br>
                                                <b>Descriptions: </b>{post.descriptions.slice(0, 250)}...
                                            </p>
                                            <ButtonBlue onClick={() => { navigate(`${post._id}`) }} name="See Details" size='med'></ButtonBlue>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        )}

                        {error ? <Alert key='danger' variant='danger' id='cards'> {error.toString()}</Alert> : null}
                    </Row>
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Northland'}>
                    {/* if there's data then show cards, if not then show error */}
                    {northland.length > 0 ?
                        <Row xs={1} md={1} lg={1} className="g-4" id='cards'>
                            {northland.map(north =>
                                <div className="col-12 mt-3">
                                    <div className="card">
                                        <div className="card-horizontal">

                                            <div className="card-body" id='card-body'>
                                                <h4 className="card-title">{north.job_title}</h4>
                                                <p className="card-text">
                                                    {north.location}, New Zealand
                                                </p>
                                                <p>
                                                    <b>Email: </b>{north.email}
                                                </p>
                                                <p>
                                                    <b>Phone: </b>{north.phone}
                                                </p>
                                                <p>
                                                    <b>Specialities: </b>{north.specialities}
                                                </p>
                                            </div>

                                            <div className="card-body" id='card-body'>
                                                <p className="card-text">
                                                    <b>Job ID: </b> {north._id}
                                                    <br></br>
                                                    <br></br>
                                                    <b>Descriptions: </b>{north.descriptions.slice(0, 250)}...
                                                </p>
                                                <ButtonBlue onClick={() => { navigate(`${north._id}`) }} name="See Details" size='med'></ButtonBlue>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            )}


                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}


                        </Row>

                        : <div id='card-page'><Alert id='cards'>No job listing in this area</Alert></div>}

                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Auckland'}>
                    {/* if there's data then show cards, if not then show error */}
                    {auckland.length > 0 ?
                        <Row xs={1} md={1} lg={1} className="g-4" id='cards'>
                            {auckland.map(auck =>
                                <div className="col-12 mt-3">
                                    <div className="card">
                                        <div className="card-horizontal">

                                            <div className="card-body" id='card-body'>
                                                <h4 className="card-title">{auck.job_title}</h4>
                                                <p className="card-text">
                                                    {auck.location}, New Zealand
                                                </p>
                                                <p>
                                                    <b>Email: </b>{auck.email}
                                                </p>
                                                <p>
                                                    <b>Phone: </b>{auck.phone}
                                                </p>
                                                <p>
                                                    <b>Specialities: </b>{auck.specialities}
                                                </p>
                                            </div>

                                            <div className="card-body" id='card-body'>
                                                <p className="card-text">
                                                    <b>Job ID: </b> {auck._id}
                                                    <br></br>
                                                    <br></br>
                                                    <b>Descriptions: </b>{auck.descriptions.slice(0, 250)}...
                                                </p>
                                                <ButtonBlue onClick={() => { navigate(`${auck._id}`) }} name="See Details" size='med'></ButtonBlue>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            )}

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        </Row>
                        : <div id='card-page'><Alert id='cards'>No job listing in this area</Alert></div>}
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Wellington'}>
                    {/* if there's data then show cards, if not then show error */}
                    {wellington.length > 0 ?
                        <Row xs={1} md={1} lg={1} className="g-4" id='cards'>
                            {wellington.map(wlg =>
                                <div className="col-12 mt-3">
                                    <div className="card">
                                        <div className="card-horizontal">

                                            <div className="card-body" id='card-body'>
                                                <h4 className="card-title">{wlg.job_title}</h4>
                                                <p className="card-text">
                                                    {wlg.location}, New Zealand
                                                </p>
                                                <p>
                                                    <b>Email: </b>{wlg.email}
                                                </p>
                                                <p>
                                                    <b>Phone: </b>{wlg.phone}
                                                </p>
                                                <p>
                                                    <b>Specialities: </b>{wlg.specialities}
                                                </p>
                                            </div>

                                            <div className="card-body" id='card-body'>
                                                <p className="card-text">
                                                    <b>Job ID: </b> {wlg._id}
                                                    <br></br>
                                                    <br></br>
                                                    <b>Descriptions: </b>{wlg.descriptions.slice(0, 250)}...
                                                </p>
                                                <ButtonBlue onClick={() => { navigate(`${wlg._id}`) }} name="See Details" size='med'></ButtonBlue>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        </Row>
                        : <div id='card-page'><Alert id='cards'>No job listing in this area</Alert></div>}
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Dunedin'}>
                    {/* if there's data then show cards, if not then show error */}
                    {dunedin.length > 0 ?
                        <Row xs={1} md={1} lg={1} className="g-4" id='cards'>
                            {dunedin.map(dune =>
                                <div className="col-12 mt-3">
                                    <div className="card">
                                        <div className="card-horizontal">

                                            <div className="card-body" id='card-body'>
                                                <h4 className="card-title">{dune.job_title}</h4>
                                                <p className="card-text">
                                                    {dune.location}, New Zealand
                                                </p>
                                                <p>
                                                    <b>Email: </b>{dune.email}
                                                </p>
                                                <p>
                                                    <b>Phone: </b>{dune.phone}
                                                </p>
                                                <p>
                                                    <b>Specialities: </b>{dune.specialities}
                                                </p>
                                            </div>

                                            <div className="card-body" id='card-body'>
                                                <p className="card-text">
                                                    <b>Job ID: </b> {dune._id}
                                                    <br></br>
                                                    <br></br>
                                                    <b>Descriptions: </b>{dune.descriptions.slice(0, 250)}...
                                                </p>
                                                <ButtonBlue onClick={() => { navigate(`${dune._id}`) }} name="See Details" size='med'></ButtonBlue>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        </Row>
                        : <div id='card-page'><Alert id='cards'>No job listing in this area</Alert></div>}
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Christchurch'}>
                    {/* if there's data then show cards, if not then show error */}
                    {christchurch.length > 0 ?
                        <Row xs={1} md={1} lg={1} className="g-4" id='cards'>
                            {christchurch.map(chch =>
                                <div className="col-12 mt-3">
                                    <div className="card">
                                        <div className="card-horizontal">

                                            <div className="card-body" id='card-body'>
                                                <h4 className="card-title">{chch.job_title}</h4>
                                                <p className="card-text">
                                                    {chch.location}, New Zealand
                                                </p>
                                                <p>
                                                    <b>Email: </b>{chch.email}
                                                </p>
                                                <p>
                                                    <b>Phone: </b>{chch.phone}
                                                </p>
                                                <p>
                                                    <b>Specialities: </b>{chch.specialities}
                                                </p>
                                            </div>

                                            <div className="card-body" id='card-body'>
                                                <p className="card-text">
                                                    <b>Job ID: </b> {chch._id}
                                                    <br></br>
                                                    <br></br>
                                                    <b>Descriptions: </b>{chch.descriptions.slice(0, 250)}...
                                                </p>
                                                <ButtonBlue onClick={() => { navigate(`${chch._id}`) }} name="See Details" size='med'></ButtonBlue>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            )}

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        </Row>
                        : <div id='card-page'><Alert id='cards'>No job listing in this area</Alert></div>}
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Queenstown'}>
                    {/* if there's data then show cards, if not then show error */}
                    {queenstown.length > 0 ?
                        <Row xs={1} md={1} lg={1} className="g-4" id='cards'>
                            {queenstown.map(queens =>
                                <div className="col-12 mt-3">
                                    <div className="card">
                                        <div className="card-horizontal">

                                            <div className="card-body" id='card-body'>
                                                <h4 className="card-title">{queens.job_title}</h4>
                                                <p className="card-text">
                                                    {queens.location}, New Zealand
                                                </p>
                                                <p>
                                                    <b>Email: </b>{queens.email}
                                                </p>
                                                <p>
                                                    <b>Phone: </b>{queens.phone}
                                                </p>
                                                <p>
                                                    <b>Specialities: </b>{queens.specialities}
                                                </p>
                                            </div>

                                            <div className="card-body" id='card-body'>
                                                <p className="card-text">
                                                    <b>Job ID: </b> {queens._id}
                                                    <br></br>
                                                    <br></br>
                                                    <b>Descriptions: </b>{queens.descriptions.slice(0, 250)}...
                                                </p>
                                                <ButtonBlue onClick={() => { navigate(`${queens._id}`) }} name="See Details" size='med'></ButtonBlue>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            )}

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        </Row>
                        : <div id='card-page'><Alert id='cards'>No job listing in this area</Alert></div>}
                </MDBTabsPane>
            </MDBTabsContent>
        </>


    );
}






