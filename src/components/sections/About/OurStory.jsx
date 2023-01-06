import React from "react";
import styled from "styled-components";
import AboutImg from '../../../images/about-this-project.jpg'


export default function OurStory() {

  return (
    <>
      <Wrapper className="container flexSpaceCenter">
        <LeftSide className="flexCenter">
          <div>
            <h3>About This Project</h3>
            <hr></hr>
            <p>In order to market themselves and look for jobs, there hasn't been a website created exclusively for veterinary locums in New Zealand.
              This project intends to develop a platform where veterinary locums can create profiles and introduce themselves and companies can post job vacancies for locums.
              <br></br>
              <br></br>
              We resolve the current communication issue by facilitating direct communication between veterinarian offices and locum tenens. </p>
          </div>
        </LeftSide>


        <RightSide>
          <img src={AboutImg} className='img-fluid rounded' alt='new zealand nature' />

        </RightSide>

      </Wrapper>


      <Wrapper2 className="container flexSpaceCenter">
        <Content>
          <h4>Why is this problem valuable to address?</h4>
          <p>There is still no infrastructure that enables veterinary locums to openly promote themselves outside of a recruitment agency,
            making it very difficult for locums and clinics to connect without third-party intervention (recruitment agency).
            If new veterinary locums don't already have personal relationships with clinics, finding one can be very challenging.

            They have no platform to view and identify the clinics that require them. Currently, a Facebook group is the only location locums
            may access information. My aim is to have all doctors' information in a beautiful, understandable style so that they don't have to
            wade through several Facebook postings to figure out which locum is reliable and reachable for a clinic.</p>
          <br></br>

          <h4>Goals</h4>
          <p>
            With this project, I intend to make it easier for veterinary clinics and locums to organize employment on their own without the use of a
            recruitment firm by centralizing lists of available jobs and veterinary locums.
            The NZ Veterinary Locum Network will be the only platform to keep track of veterinary locum's profiles that are visible to the public online,
            filling a specialized need for a distinct sector on the website rather than specialized Facebook groups.
          </p>
        </Content>
      </Wrapper2>
    </>
  );
}


const Wrapper = styled.section`
  padding: 40px 3% 0;
  width: 100%;
  display: flex;
  @media (max-width: 960px) {
  flex-direction: column;
  }
`;

const Wrapper2 = styled.section`
  padding: 0 3% 5%;
  width: 100%;
  display: flex;
  @media (max-width: 960px) {
  flex-direction: column;
}
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  
  @media (max-width: 960px) {
  width: 100%;
  text-align: left;
  }
  @media (max-width: 860px) {
  width: 100%;
  padding: 20px 50px;
  text-align: left;
  }
`;

const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  padding-top: 120px;
  padding-right:50px;
  
  @media (max-width: 960px) {
  order: 2;
  width: 100%;
  padding: 50px 0;
  text-align: left;
  }
  @media (max-width: 860px) {
  order: 2;
  width: 100%;
  padding: 20px 50px;
  text-align: left;
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
  text-align: left;
  }
`;