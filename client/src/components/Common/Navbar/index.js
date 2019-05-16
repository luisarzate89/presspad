import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import whiteLogo from "./../../../assets/white-presspad-logo.png";

import { colors } from "../../../theme";

import {
  HOME_URL,
  ABOUT_URL,
  MYPROFILE_URL,
  DASHBOARD_URL,
  HOSTS_URL,
  SIGNIN_URL,
  SIGNOUT_URL
} from "../../../constants/navRoutes";

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  padding: 0.5rem 9rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${colors.primary};
  height: 60px;
`;

const Logo = styled.img`
  /* width: 8rem;
  height: auto; */
  height: 2.5rem;
`;

const Options = styled.div`
  color: ${colors.white};
  font-size: 1.25rem;
  border: 1px red solid;
  width: 50%;
  display: flex;
  justify-content: flex-end;

  .active {
    font-weight: bold;
  }
`;

const MenuItem = styled(NavLink)`
  margin-left: 3rem;
  text-decoration: none;
  color: ${colors.white};
  width: 100%;
`;

export default class Navbar extends Component {
  render() {
    return (
      <Wrapper>
        <Logo src={whiteLogo} alt="logo" />
        <Options>
          <MenuItem to={HOME_URL}>Home</MenuItem>
          <MenuItem to={ABOUT_URL}>About</MenuItem>
          <MenuItem to={HOSTS_URL}>Hosts</MenuItem>
          <MenuItem to={SIGNIN_URL}>Sign in</MenuItem>
        </Options>
      </Wrapper>
    );
  }
}
