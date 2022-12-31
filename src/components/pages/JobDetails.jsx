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
            .get(`http://localhost:4000/jobs/search/id/${id}`)
            .then(res => {
                console.log(res.data)
                setPosts(res.data.currentUserInfo[0])

            })
            .catch(err => {
                console.log(err)
                seterrorMessage('Error retrieving data')
            })
    }, []) //only do get request on load


    return (
        <div id="Doctor-login">
            {posts ?

                <Wrapper id="home" className="container flexSpaceCenter">

                    <LeftSide className="flexCenter">
                        <div>
                            <h1>{posts.job_title}</h1>
                            <h5>
                                {posts.location}
                            </h5>

                            <hr></hr>

                            <p><b>Email: </b>{posts.email}</p>
                            <p><b>Phone: </b>{posts.phone}</p>
                            <p><b> Specialities: </b>{posts.specialities}</p>

                            <p>{posts.descriptions}</p>

                            <ButtonBlue onClick={() => { navigate(-1) }} name="Back" size='sml'></ButtonBlue>

                        </div>
                    </LeftSide>
                    <RightSide>
                        <div>
                            <Card.Link href={`mailto:${posts.email}`}><ButtonBlue name="Email Company" size='sml'></ButtonBlue></Card.Link>
                            <br></br>
                            <br></br>
                            <Card.Link href={`tel:${posts.phone}`}><ButtonBlueOutlined onClick='hello' name="Call Job Lister" style={{ marginRight: 30 }} size='sml'></ButtonBlueOutlined></Card.Link>
                        </div>
                    </RightSide>


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
          @media (max-width: 960px) {
            display: flex;
            flex-direction:column; 
  }
          `;
const LeftSide = styled.div`
          width: 80%;
          height: 100%;
          margin-right:50px;
          @media (max-width: 960px) {
            width: auto;
            margin: 0 10%;
            order: 2;
          text-align: left;
  }
          @media (max-width: 860px) {
            margin: 0 10%;
  }
          `;
const RightSide = styled.div`
          width: 20%;
          height: 100%;
          display: flex;
          @media (max-width: 960px) {
            width: auto;
            margin-bottom:  10%;
            margin-left: 10%;
            margin-right: 10%;
  }
          `;
