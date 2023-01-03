import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
import ButtonBlue from '../../elements/ButtonBlue';
import ButtonBlueOutlined from '../../elements/ButtonBlueOutlined';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';

export default function DoctorList() {

    const [posts, setPost] = useState([])
    const [northland, setNorthland] = useState([])
    const [auckland, setAuckland] = useState([])
    const [wellington, setWellington] = useState([])
    const [dunedin, setDunedin] = useState([])
    const [christchurch, setChristchurch] = useState([])
    const [queenstown, setQueenstown] = useState([])
    const [error, setError] = useState("")
    const [basicActive, setBasicActive] = useState('all');

    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        }

        setBasicActive(value);
    };

    useEffect(() => {
        axios
            .get('http://localhost:4000/doctors/all')
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
            .get('http://localhost:4000/doctors/search/city/north')
            .then(res => {
                //console.log(res)
                setNorthland(res.data)
            })
            .catch(err => {
                console.log(err)
                setError('Error retrieving data')
            })
    }, []) //only do get request on load

    useEffect(() => {
        axios
            .get('http://localhost:4000/doctors/search/city/auck')
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
            .get('http://localhost:4000/doctors/search/city/well')
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
            .get('http://localhost:4000/doctors/search/city/dun')
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
            .get('http://localhost:4000/doctors/search/city/chr')
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
            .get('http://localhost:4000/doctors/search/city/queen')
            .then(res => {
                //console.log(res)
                setQueenstown(res.data)
            })
            .catch(err => {
                console.log(err)
                setError('Error retrieving data')
            })
    }, []) //only do get request on load


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
                    <Row xs={1} md={3} lg={4} className="g-4" id='cards'>
                        {posts.map(post =>
                            <Col>
                                <Card style={{ width: 'auto' }}>
                                    <Card.Img variant="top" src={`http://localhost:4000/images/${post.imageKey}`} style={{ width: 'auto', height: '300px', objectFit: 'cover' }} />
                                    <div id='cards'>
                                        <Card.Title>Dr. {post.first_name} {post.last_name} </Card.Title>
                                        <Card.Text>
                                            {post.city}, New Zealand
                                        </Card.Text>
                                    </div>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item><b>Email: </b>{post.email}</ListGroup.Item>
                                        <ListGroup.Item><b>Phone: </b>{post.phone}</ListGroup.Item>
                                        <ListGroup.Item><b>Specialities: </b>{post.specialities}</ListGroup.Item>
                                        <ListGroup.Item><b>License: </b>{post.license}</ListGroup.Item>
                                        <ListGroup.Item><b>Availability: </b>{post.availability}</ListGroup.Item>
                                        <ListGroup.Item><b>Work Requirement: </b>{post.work_requirement}</ListGroup.Item>
                                    </ListGroup>
                                    <span id='cards'>
                                        <Card.Link href={`mailto:${post.email}`}><ButtonBlue name="Email" size='sml'></ButtonBlue></Card.Link>
                                        <Card.Link href={`tel:${post.phone}`}><ButtonBlueOutlined onClick='hello' name="Call Me" style={{ marginRight: 30 }} size='sml'></ButtonBlueOutlined></Card.Link>
                                    </span>
                                </Card>
                            </Col>

                        )}

                        {error ? <Alert key='danger' variant='danger' id='cards'> {error.toString()}</Alert> : null}
                    </Row>
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Northland'}>
                    {/* if there's data then show cards, if not then show error */}
                    {northland.length > 0 ?
                        <Row xs={1} md={3} lg={4} className="g-4" id='cards'>
                            {northland.map(north =>
                                <Col>
                                    <Card style={{ width: 'auto' }}>
                                        <Card.Img variant="top" src={`http://localhost:4000/images/${north.imageKey}`} style={{ width: 'auto', height: '300px', objectFit: 'cover' }} />
                                        <div id='cards'>
                                            <Card.Title>Dr. {north.first_name} {north.last_name} </Card.Title>
                                            <Card.Text>
                                                {north.city}, New Zealand
                                            </Card.Text>
                                        </div>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item><b>Email: </b>{north.email}</ListGroup.Item>
                                            <ListGroup.Item><b>Phone: </b>{north.phone}</ListGroup.Item>
                                            <ListGroup.Item><b>Specialities: </b>{north.specialities}</ListGroup.Item>
                                            <ListGroup.Item><b>License: </b>{north.license}</ListGroup.Item>
                                            <ListGroup.Item><b>Availability: </b>{north.availability}</ListGroup.Item>
                                            <ListGroup.Item><b>Work Requirement: </b>{north.work_requirement}</ListGroup.Item>
                                        </ListGroup>
                                        <span id='cards'>
                                            <Card.Link href={`mailto:${north.email}`}><ButtonBlue name="Email" size='sml'></ButtonBlue></Card.Link>
                                            <Card.Link href={`tel:${north.phone}`}><ButtonBlueOutlined onClick='hello' name="Call Me" style={{ marginRight: 30 }} size='sml'></ButtonBlueOutlined></Card.Link>
                                        </span>
                                    </Card>
                                </Col>

                            )}

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        </Row>
                        : <div id='card-page'><Alert id='cards'>No doctors in this area</Alert></div>}
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Auckland'}>
                    {/* if there's data then show cards, if not then show error */}
                    {auckland.length > 0 ?
                        <Row xs={1} md={3} lg={4} className="g-4" id='cards'>
                            {auckland.map(auck =>
                                <Col>
                                    <Card style={{ width: 'auto' }}>
                                        <Card.Img variant="top" src={`http://localhost:4000/images/${auck.imageKey}`} style={{ width: 'auto', height: '300px', objectFit: 'cover' }} />
                                        <div id='cards'>
                                            <Card.Title>Dr. {auck.first_name} {auck.last_name} </Card.Title>
                                            <Card.Text>
                                                {auck.city}, New Zealand
                                            </Card.Text>
                                        </div>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item><b>Email: </b>{auck.email}</ListGroup.Item>
                                            <ListGroup.Item><b>Phone: </b>{auck.phone}</ListGroup.Item>
                                            <ListGroup.Item><b>Specialities: </b>{auck.specialities}</ListGroup.Item>
                                            <ListGroup.Item><b>License: </b>{auck.license}</ListGroup.Item>
                                            <ListGroup.Item><b>Availability: </b>{auck.availability}</ListGroup.Item>
                                            <ListGroup.Item><b>Work Requirement: </b>{auck.work_requirement}</ListGroup.Item>
                                        </ListGroup>
                                        <span id='cards'>
                                            <Card.Link href={`mailto:${auck.email}`}><ButtonBlue name="Email" size='sml'></ButtonBlue></Card.Link>
                                            <Card.Link href={`tel:${auck.phone}`}><ButtonBlueOutlined onClick='hello' name="Call Me" style={{ marginRight: 30 }} size='sml'></ButtonBlueOutlined></Card.Link>
                                        </span>
                                    </Card>
                                </Col>

                            )}

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        </Row>
                        : <div id='card-page'><Alert id='cards'>No doctors in this area</Alert></div>}
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Wellington'}>
                    {/* if there's data then show cards, if not then show error */}
                    {wellington.length > 0 ?
                        <Row xs={1} md={3} lg={4} className="g-4" id='cards'>
                            {wellington.map(wlg =>
                                <Col>
                                    <Card style={{ width: 'auto' }}>
                                        <Card.Img variant="top" src={`http://localhost:4000/images/${wlg.imageKey}`} style={{ width: 'auto', height: '300px', objectFit: 'cover' }} />
                                        <div id='cards'>
                                            <Card.Title>Dr. {wlg.first_name} {wlg.last_name} </Card.Title>
                                            <Card.Text>
                                                {wlg.city}, New Zealand
                                            </Card.Text>
                                        </div>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item><b>Email: </b>{wlg.email}</ListGroup.Item>
                                            <ListGroup.Item><b>Phone: </b>{wlg.phone}</ListGroup.Item>
                                            <ListGroup.Item><b>Specialities: </b>{wlg.specialities}</ListGroup.Item>
                                            <ListGroup.Item><b>License: </b>{wlg.license}</ListGroup.Item>
                                            <ListGroup.Item><b>Availability: </b>{wlg.availability}</ListGroup.Item>
                                            <ListGroup.Item><b>Work Requirement: </b>{wlg.work_requirement}</ListGroup.Item>
                                        </ListGroup>
                                        <span id='cards'>
                                            <Card.Link href={`mailto:${wlg.email}`}><ButtonBlue name="Email" size='sml'></ButtonBlue></Card.Link>
                                            <Card.Link href={`tel:${wlg.phone}`}><ButtonBlueOutlined onClick='hello' name="Call Me" style={{ marginRight: 30 }} size='sml'></ButtonBlueOutlined></Card.Link>
                                        </span>
                                    </Card>
                                </Col>

                            )}

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        </Row>
                        : <div id='card-page'><Alert id='cards'>No doctors in this area</Alert></div>}
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Dunedin'}>
                    {/* if there's data then show cards, if not then show error */}
                    {dunedin.length > 0 ?
                        <Row xs={1} md={3} lg={4} className="g-4" id='cards'>
                            {dunedin.map(dune =>
                                <Col>
                                    <Card style={{ width: 'auto' }}>
                                        <Card.Img variant="top" src={`http://localhost:4000/images/${dune.imageKey}`} style={{ width: 'auto', height: '300px', objectFit: 'cover' }} />
                                        <div id='cards'>
                                            <Card.Title>Dr. {dune.first_name} {dune.last_name} </Card.Title>
                                            <Card.Text>
                                                {dune.city}, New Zealand
                                            </Card.Text>
                                        </div>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item><b>Email: </b>{dune.email}</ListGroup.Item>
                                            <ListGroup.Item><b>Phone: </b>{dune.phone}</ListGroup.Item>
                                            <ListGroup.Item><b>Specialities: </b>{dune.specialities}</ListGroup.Item>
                                            <ListGroup.Item><b>License: </b>{dune.license}</ListGroup.Item>
                                            <ListGroup.Item><b>Availability: </b>{dune.availability}</ListGroup.Item>
                                            <ListGroup.Item><b>Work Requirement: </b>{dune.work_requirement}</ListGroup.Item>
                                        </ListGroup>
                                        <span id='cards'>
                                            <Card.Link href={`mailto:${dune.email}`}><ButtonBlue name="Email" size='sml'></ButtonBlue></Card.Link>
                                            <Card.Link href={`tel:${dune.phone}`}><ButtonBlueOutlined onClick='hello' name="Call Me" style={{ marginRight: 30 }} size='sml'></ButtonBlueOutlined></Card.Link>
                                        </span>
                                    </Card>
                                </Col>

                            )}

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        </Row>
                        : <div id='card-page'><Alert id='cards'>No doctors in this area</Alert></div>}
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Christchurch'}>
                    {/* if there's data then show cards, if not then show error */}
                    {christchurch.length > 0 ?
                        <Row xs={1} md={3} lg={4} className="g-4" id='cards'>
                            {christchurch.map(chch =>
                                <Col>
                                    <Card style={{ width: 'auto' }}>
                                        <Card.Img variant="top" src={`http://localhost:4000/images/${chch.imageKey}`} style={{ width: 'auto', height: '300px', objectFit: 'cover' }} />
                                        <div id='cards'>
                                            <Card.Title>Dr. {chch.first_name} {chch.last_name} </Card.Title>
                                            <Card.Text>
                                                {chch.city}, New Zealand
                                            </Card.Text>
                                        </div>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item><b>Email: </b>{chch.email}</ListGroup.Item>
                                            <ListGroup.Item><b>Phone: </b>{chch.phone}</ListGroup.Item>
                                            <ListGroup.Item><b>Specialities: </b>{chch.specialities}</ListGroup.Item>
                                            <ListGroup.Item><b>License: </b>{chch.license}</ListGroup.Item>
                                            <ListGroup.Item><b>Availability: </b>{chch.availability}</ListGroup.Item>
                                            <ListGroup.Item><b>Work Requirement: </b>{chch.work_requirement}</ListGroup.Item>
                                        </ListGroup>
                                        <span id='cards'>
                                            <Card.Link href={`mailto:${chch.email}`}><ButtonBlue name="Email" size='sml'></ButtonBlue></Card.Link>
                                            <Card.Link href={`tel:${chch.phone}`}><ButtonBlueOutlined onClick='hello' name="Call Me" style={{ marginRight: 30 }} size='sml'></ButtonBlueOutlined></Card.Link>
                                        </span>
                                    </Card>
                                </Col>

                            )}

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        </Row>
                        : <div id='card-page'><Alert id='cards'>No doctors in this area</Alert></div>}
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'Queenstown'}>
                    {/* if there's data then show cards, if not then show error */}
                    {queenstown.length > 0 ?
                        <Row xs={1} md={3} lg={4} className="g-4" id='cards'>
                            {queenstown.map(queens =>
                                <Col>
                                    <Card style={{ width: 'auto' }}>
                                        <Card.Img variant="top" src={`http://localhost:4000/images/${queens.imageKey}`} style={{ width: 'auto', height: '300px', objectFit: 'cover' }} />
                                        <div id='cards'>
                                            <Card.Title>Dr. {queens.first_name} {queens.last_name} </Card.Title>
                                            <Card.Text>
                                                {queens.city}, New Zealand
                                            </Card.Text>
                                        </div>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item><b>Email: </b>{queens.email}</ListGroup.Item>
                                            <ListGroup.Item><b>Phone: </b>{queens.phone}</ListGroup.Item>
                                            <ListGroup.Item><b>Specialities: </b>{queens.specialities}</ListGroup.Item>
                                            <ListGroup.Item><b>License: </b>{queens.license}</ListGroup.Item>
                                            <ListGroup.Item><b>Availability: </b>{queens.availability}</ListGroup.Item>
                                            <ListGroup.Item><b>Work Requirement: </b>{queens.work_requirement}</ListGroup.Item>
                                        </ListGroup>
                                        <span id='cards'>
                                            <Card.Link href={`mailto:${queens.email}`}><ButtonBlue name="Email" size='sml'></ButtonBlue></Card.Link>
                                            <Card.Link href={`tel:${queens.phone}`}><ButtonBlueOutlined onClick='hello' name="Call Me" style={{ marginRight: 30 }} size='sml'></ButtonBlueOutlined></Card.Link>
                                        </span>
                                    </Card>
                                </Col>

                            )}

                            {error ? <Alert key='danger' variant='danger'> {error.toString()}</Alert> : null}

                        </Row>
                        : <div id='card-page'><Alert id='cards'>No doctors in this area</Alert></div>}
                </MDBTabsPane>
            </MDBTabsContent>
        </>


    );
}





