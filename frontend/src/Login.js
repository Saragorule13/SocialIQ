import React from "react";
import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import leftImage from "./left.svg"; 
import rightImage from "./right2.svg";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(to right, #c2a4c8 50%, #f7f5f9 50%);
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden; 
`;

const LoginBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  color: #a374b2;
  font-size: 2rem;
  font-weight: bold;
`;

const SubText = styled.p`
  font-size: 0.9rem;
  color: #6d6d6d;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #a374b2;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #8f5b9d;
  }
`;

const GoogleButton = styled(Button)`
  background: white;
  color: black;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-top: 10px;

  &:hover {
    background: #f0f0f0;
  }
`;

const ForgotPassword = styled.a`
  display: block;
  margin-top: 10px;
  color: #a374b2;
  font-size: 0.9rem;
  cursor: pointer;
`;

const SignUpLink = styled.p`
  margin-top: 15px;
  font-size: 0.9rem;

  a {
    color: #a374b2;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 30vw; 
  max-width: 400px; 
  opacity: 0.8;
  z-index: 1;

  &.left {
    left: 0;
    bottom: 0;
  }

  &.right {
    right: 0;
    bottom: 0;
  }

  @media (max-width: 768px) {
    width: 60vw; 
    max-width: 300px;
  }
`;



function Login() {
  return (
    <Container>
      <LoginBox>
        <Title>Sign in</Title>
        <SubText>Welcome to SocialIQ</SubText>

        <Input type="text" placeholder="Username or email address" />
        <Input type="password" placeholder="Password" />

        <ForgotPassword>Forgot Password?</ForgotPassword>

        <Button>Sign in</Button>

        <SubText>OR</SubText>

        <GoogleButton>
          <FaGoogle style={{ marginRight: "10px" }} /> Sign in with Google
        </GoogleButton>

        <SignUpLink>
          No account? <Link to="/signup">Sign up</Link>
        </SignUpLink>
      </LoginBox>

     
      <BackgroundImage src={leftImage} alt="Left Art" className="left" />
      <BackgroundImage src={rightImage} alt="Right Art" className="right" />
    </Container>
  );
}

export default Login;
