import styled from "styled-components";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import ButtonBlue from "../elements/ButtonBlue";
import { useNavigate } from 'react-router-dom';
import ButtonBlueOutlined from '../elements/ButtonBlueOutlined';
import Card from 'react-bootstrap/Card';


export default function JobDetails() {

    const [posts, setPosts] = useState(null)
    const [errorMessage, seterrorMessage] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`https://nz-locum-backend.herokuapp.com/jobs/search/id/${id}`)
            .then(res => {
                console.log(res.data)
                setPosts(res.data[0])

            })
            .catch(err => {
                console.log(err)
                seterrorMessage('Error retrieving data')
            })
    }, []) //only do get request on load


    return (
        <div id="Doctor-login">
            {posts ?

                <Wrapper id="home" className="container flexSpaceCenter" style={{ height: '100%' }}>


                    <div>
                        <h6><b>Job ID: </b> {posts._id}</h6>
                        <br></br>
                        <br></br>
                        <h1>{posts.job_title}</h1>
                        <h5>
                            {posts.location}, New Zealand
                        </h5>
                        <br></br>
                        <Card.Link href={`mailto:${posts.email}`}><ButtonBlue name="Email Company" style={{ marginRight: 30 }} size='sml'></ButtonBlue></Card.Link>
                        <Card.Link href={`tel:${posts.phone}`}><ButtonBlueOutlined onClick='hello' name="Call Job Lister" style={{ marginRight: 30 }} size='sml'></ButtonBlueOutlined></Card.Link>
                        <hr></hr>

                        <p><b>Email: </b>{posts.email}</p>
                        <p><b>Phone: </b>{posts.phone}</p>
                        <p><b> Specialities: </b>{posts.specialities}</p>
                        <hr></hr>
                        <br></br>
                        <h5>Job Descriptions</h5>
                        <br></br>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{posts.descriptions}</p>

                        <br></br>
                        <ButtonBlue onClick={() => { navigate(-1) }} name="Back" size='med'></ButtonBlue>

                    </div>


                </Wrapper>

                : null
            }
            {errorMessage ? <div>{errorMessage}</div> : null}
        </div>
    );
}


const Wrapper = styled.section`
          padding: 100px 0;
          width: auto;
          display: flex;
          height: 100vh;
          `;

