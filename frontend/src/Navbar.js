import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link for navigation

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;
const Logo = styled.h1`
  font-size: 1.5rem;
  color: #BD9FC1;
  font-weight: bold;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

const NavLink = styled.li`
  font-size: 1rem;
  color: gray;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

// Styled button
const Button = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: scale(1);

  &:hover {
    transform: scale(1.1);
  }
`;

// Styled login button with border
const LoginButton = styled(Button)`
  border: 1px solid gray;
  background-color: white;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// Styled sign-in button with background color
const SignInButton = styled(Button)`
  background-color: #BD9FC1;
  color: white;
  border: none;

  &:hover {
    background-color: #b190c8;
  }
`;

function Navbar() {
  return (
    <Nav>
      <Logo>SocialiQ</Logo>
      <NavLinks>
        <NavLink>Home</NavLink>
        <NavLink>Features</NavLink>
        <NavLink>Analytics</NavLink>
        <NavLink>FAQs</NavLink>
        <NavLink>Contact</NavLink>
      </NavLinks>
      <Buttons>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <LoginButton>Login</LoginButton>
        </Link>
        <SignInButton>Sign In</SignInButton>
      </Buttons>
    </Nav>
  );
}

export default Navbar;
