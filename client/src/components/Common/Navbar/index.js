import React, { Component } from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

import whiteLogo from "./../../../assets/white-presspad-logo.png";

import { colors } from "../../../theme";

import {
  HOME_URL,
  ABOUT_URL,
  MYPROFILE_URL,
  DASHBOARD_URL,
  ADMIN_DASHBOARD_URL,
  HOSTS_URL,
  SIGNIN_URL
} from "../../../constants/navRoutes";

import USER_TYPES from "./../../../constants/userTypes";

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  padding: 0.5rem 9rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${colors.primary};
  height: 60px;
  z-index: 1;

  & + * {
    padding-top: 60px;
  }
`;

const Logo = styled.img`
  height: 2.5rem;
`;

const Options = styled.div`
  color: ${colors.white};
  font-size: 1.25rem;

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

// Button to allow signout to send request to the server
const MenuButton = styled.button`
  margin-left: 3rem;
  text-decoration: none;
  color: ${colors.white};
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

class Navbar extends Component {
  // RENDERING IS BASED ON KNOWING IF LOGGEDIN AND THE TYPE OF USER

  menuButtonClick = async e => {
    const signOutResult = await axios.get("api/sign-out");
    if (signOutResult.data.success) {
      this.props.resetState();
      this.props.history.push("/");
    } else {
      message.error("Server Error, please try again!");
    }
  };

  render() {
    const { isLoggedIn, userType } = this.props;

    return (
      <Wrapper>
        <NavLink to={HOME_URL}>
          <Logo src={whiteLogo} alt="logo" />
        </NavLink>
        <Options>
          {/* NOT LOGGED IN */}
          {!isLoggedIn && (
            <>
              <MenuItem to={HOME_URL}>Home</MenuItem>
              <MenuItem to={ABOUT_URL}>About</MenuItem>
              <MenuItem to={HOSTS_URL}>Hosts</MenuItem>
              <MenuItem to={SIGNIN_URL}>Sign in</MenuItem>
            </>
          )}

          {/* LOGGED IN  */}
          {isLoggedIn && (
            <>
              <MenuItem
                to={
                  userType === USER_TYPES.admin
                    ? ADMIN_DASHBOARD_URL
                    : DASHBOARD_URL
                }
              >
                Dashboard
              </MenuItem>
              {userType === USER_TYPES.intern && (
                <>
                  <MenuItem to={MYPROFILE_URL}>My profile</MenuItem>
                  <MenuItem to={HOSTS_URL}>Hosts</MenuItem>
                </>
              )}
              {userType === USER_TYPES.host && (
                <>
                  <MenuItem to={MYPROFILE_URL}>My profile</MenuItem>
                </>
              )}
              {userType === USER_TYPES.superhost && (
                <>
                  <MenuItem to={MYPROFILE_URL}>My profile</MenuItem>
                </>
              )}
              {userType === USER_TYPES.organisation && (
                <>
                  <MenuItem to={MYPROFILE_URL}>My profile</MenuItem>
                </>
              )}

              <MenuButton onClick={this.menuButtonClick}>Sign out</MenuButton>
            </>
          )}
        </Options>
      </Wrapper>
    );
  }
}

export default withRouter(Navbar);
