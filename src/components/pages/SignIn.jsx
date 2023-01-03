import React from "react";
import styled from "styled-components";
import ClinicLogin from '../../images/clinic-login.png'
import DoctorLogin from '../../images/doctor-login.png'
import { useNavigate } from 'react-router-dom'

export default function About() {

    const navigate = useNavigate()

    return (
        <>
            <Wrapper id="Doctor-login">
                <Title>
                    <br></br>
                    <h1>Sign in to NZ Veterinary Locum Network</h1>
                </Title>

                <Links>
                    <LeftSide>
                        <div className="img-link">
                            <img src={DoctorLogin} className='img-fluid rounded' alt='sign-in as a doctor' onClick={() => { navigate(`/sign-in-doctor`) }} />
                            <br></br>
                            <br></br>
                            <h6>Sign in as vet locum</h6>
                        </div>
                    </LeftSide>


                    <RightSide>
                        <div className="img-link">
                            <img src={ClinicLogin} className='img-fluid rounded' alt='sign-in as a clinic' onClick={() => { navigate(`/sign-in-clinic`) }} />
                            <br></br>
                            <br></br>
                            <h6>Sign in as clinic</h6>
                        </div>
                    </RightSide>
                </Links>
            </Wrapper>

        </>
    );
}


const Title = styled.section`
  width: 100%;
  display: flex;
  padding-top: 8%;
  padding-bottom: 2%;
  padding-left: 10%;
  padding-right: 10%;
  height: 100%;
  color: #5BA4EE;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.section`
  width: 100%;
  display: block;
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 5%;
  height: 100%;
  color:#5BA4EE;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Links = styled.section`
  width: 100%;
  display: flex;
  padding: 0 10%;
  height: 100%;
  color: #5BA4EE;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const LeftSide = styled.div`
width: 50%;
height: 100%;
text-align: center;
padding: 5%;

@media (max-width: 960px) {
  width: 100%;
  padding: 0 50px;
  text-align: center;
}
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  text-align: center;
  padding: 5%;

  @media (max-width: 960px) {
    width: 100%;
    padding: 0 50px;
    text-align: center;
  }
`;