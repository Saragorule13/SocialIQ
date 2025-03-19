import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 
import Navbar from "./Navbar";
import leftImage from "./left.svg"; 
import rightImage from "./right.svg"; 

import { FaInstagram, FaYoutube, FaPinterest, FaFacebook, FaTwitter } from "react-icons/fa";

const Container = styled.div`
  background-color: white;
  height: 100vh; /* Full screen height */
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  position: relative;
  flex: 1; 
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Image = styled.img`
  position: absolute;
  width: 200px; 

  @media (max-width: 1024px) {
    width: 150px; 
  }
`;

const LeftImage = styled(Image)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 450px;
  max-width: 600px;
  z-index: 2;

  @media (max-width: 1024px) {
    width: 250px;
  }

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 600px) {
    display: none; 
  }
`;

const RightImage = styled(Image)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 450px;
  max-width: 600px; 
  z-index: 2;

  @media (max-width: 1024px) {
    width: 250px;
  }

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 600px) {
    display: none; 
  }
`;

const RoundedContainer = styled.div`
  background-color: #BD9FC1;
  width: 90%;
  max-width: 85vw;
  height: 65vh;
  padding: 60px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem; 
  font-weight: 800; 
  text-align: center;
  letter-spacing: 1.5px;
  margin-bottom: 10px;
  max-width: 800px;
  color: white; 

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const OutlinedText = styled.span`
  color: transparent;
  -webkit-text-stroke: 2px white;
  font-weight: 800;
`;

const Subtitle = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem; 
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  max-width: 600px;
  margin-top: 15px; 
  opacity: 0.9; 
`;

const GetStartedButton = styled.button`
  margin-top: 30px;
  padding: 12px 25px;
  background-color: white;
  color: #BD9FC1;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(1);

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px; 
  margin-bottom: 2px; 
`;

const SocialIcon = styled.div`
  background-color: white; 
  padding: 12px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #BD9FC1;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1); 
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

function LandingPage() {
  const navigate = useNavigate(); 
  return (
    <Container>
      
      <Navbar navigate={navigate} />
      
      <ContentWrapper>
        <LeftImage src={leftImage} alt="Left Illustration" />
        <RightImage src={rightImage} alt="Right Illustration" />

        <RoundedContainer>
          <SocialIconsContainer>
            <SocialIcon><FaInstagram /></SocialIcon>
            <SocialIcon><FaYoutube /></SocialIcon>
            <SocialIcon><FaPinterest /></SocialIcon>
            <SocialIcon><FaFacebook /></SocialIcon>
            <SocialIcon><FaTwitter /></SocialIcon>
          </SocialIconsContainer>

          <Title>
            Manage all your <OutlinedText>Social's</OutlinedText> at 
            <OutlinedText> one</OutlinedText> 
            <OutlinedText> place</OutlinedText> with <OutlinedText>Social</OutlinedText>IQ
          </Title>

          <Subtitle>Analyze. Predict. Insights</Subtitle>

          
          <GetStartedButton onClick={() => navigate("/login")}>
            Get Started
          </GetStartedButton>
        </RoundedContainer>
      </ContentWrapper>
    </Container>
  );
}

export default LandingPage;
