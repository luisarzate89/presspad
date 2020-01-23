import React from "react";
import styled, { css } from "styled-components";
import { NavLink, withRouter } from "react-router-dom";

import { Icon } from "antd";

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
  ${({ isMobile }) =>
    isMobile &&
    css`
      z-index: 99;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: ${colors.primary};

      :before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
      }
    `}
`;

const Options = styled.div`
  color: ${colors.white};
  font-size: 1.25rem;

  .active {
    font-weight: bold;
  }

  ${({ isMobile }) =>
    isMobile &&
    css`
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `}
`;

const MenuItem = styled(NavLink)`
  margin: 0 0 0 3rem;
  text-decoration: none;
  color: ${colors.white};
  width: 100%;
  text-align: center;

  :hover {
    color ${colors.secondary};
  }

  ${({ isMobile }) =>
    isMobile &&
    css`
      margin: 0 0 1.5rem 0;
      font-size: 1.5rem;
    `}
`;

// Button to allow signout to send request to the server
const MenuButton = styled.button`
  margin-left: 3rem;
  text-decoration: none;
  color: ${colors.white};
  border: none;
  background-color: transparent;
  cursor: pointer;

  :hover {
    color ${colors.secondary};
  }

  ${({ isMobile }) =>
    isMobile &&
    css`
      margin: 0 0 1.5rem 0;
      font-size: 1.5rem;
    `}
`;

const Menu = ({
  toggleMenu,
  menuButtonClick,
  isMobile,
  userType,
  isLoggedIn
}) => {
  return (
    <Wrapper isMobile={isMobile}>
      {/* NOT LOGGED IN */}
      {!isLoggedIn && (
        <Options isMobile={isMobile}>
          {isMobile && (
            <Icon
              type="close"
              style={{
                fontSize: "32px",
                color: "white",
                cursor: "pointer",
                position: "absolute",
                top: "1rem",
                right: "1rem"
              }}
              onClick={toggleMenu}
            />
          )}
          <MenuItem to={HOME_URL} onClick={toggleMenu} isMobile={isMobile}>
            Home
          </MenuItem>
          <MenuItem to={ABOUT_URL} onClick={toggleMenu} isMobile={isMobile}>
            About
          </MenuItem>
          <MenuItem to={HOSTS_URL} onClick={toggleMenu} isMobile={isMobile}>
            Hosts
          </MenuItem>
          <MenuItem to={SIGNIN_URL} onClick={toggleMenu} isMobile={isMobile}>
            Sign in
          </MenuItem>
        </Options>
      )}

      {/* LOGGED IN  */}
      {isLoggedIn && (
        <Options isMobile={isMobile}>
          {isMobile && (
            <Icon
              type="close"
              style={{
                fontSize: "32px",
                color: "white",
                cursor: "pointer",
                position: "absolute",
                top: "1rem",
                right: "1rem"
              }}
              onClick={toggleMenu}
            />
          )}
          <MenuItem
            to={
              userType === USER_TYPES.admin
                ? ADMIN_DASHBOARD_URL
                : DASHBOARD_URL
            }
            onClick={toggleMenu}
            isMobile={isMobile}
          >
            Dashboard
          </MenuItem>
          {userType === USER_TYPES.intern && (
            <>
              <MenuItem
                to={MYPROFILE_URL}
                onClick={toggleMenu}
                isMobile={isMobile}
              >
                My profile
              </MenuItem>
              <MenuItem to={HOSTS_URL} onClick={toggleMenu} isMobile={isMobile}>
                Hosts
              </MenuItem>
            </>
          )}
          {userType === USER_TYPES.host && (
            <>
              <MenuItem
                to={MYPROFILE_URL}
                onClick={toggleMenu}
                isMobile={isMobile}
              >
                My profile
              </MenuItem>
            </>
          )}
          {userType === USER_TYPES.superhost && (
            <>
              <MenuItem
                to={MYPROFILE_URL}
                onClick={toggleMenu}
                isMobile={isMobile}
              >
                My profile
              </MenuItem>
            </>
          )}
          {userType === USER_TYPES.organisation && (
            <>
              <MenuItem
                to={MYPROFILE_URL}
                onClick={toggleMenu}
                isMobile={isMobile}
              >
                My profile
              </MenuItem>
            </>
          )}

          <MenuButton onClick={menuButtonClick} isMobile={isMobile}>
            Sign out
          </MenuButton>
        </Options>
      )}
    </Wrapper>
  );
};

export default withRouter(Menu);
