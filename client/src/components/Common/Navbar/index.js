import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import { message, Icon } from 'antd';

import whiteLogo from '../../../assets/white-presspad-logo.png';

import { colors } from '../../../theme';

import { HOME_URL } from '../../../constants/navRoutes';

import { TABLET_WIDTH } from '../../../constants/screenWidths';

import { API_SIGNOUT_URL } from '../../../constants/apiRoutes';

import Menu from './Menu';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  padding: ${({ isMobile }) => (isMobile ? '0.5rem 1rem' : '0.5rem 4rem')};
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  background-color: ${colors.primary};
  height: 60px;
  z-index: 10;
  top: 0;

  & + * {
    padding-top: 60px;
  }
`;

const Logo = styled.img`
  height: 2.5rem;
`;

class Navbar extends Component {
  // RENDERING IS BASED ON KNOWING IF LOGGEDIN AND THE TYPE OF USER

  state = {
    menuOpen: false,
  };

  toggleMenu = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  };

  menuButtonClick = async e => {
    const signOutResult = await axios.get(API_SIGNOUT_URL);
    if (signOutResult.data.success) {
      console.log('reached');
      this.setState({ menuOpen: false });
      this.props.resetState();
      this.props.history.push(HOME_URL);
    } else {
      message.error('Server Error, please try again!');
    }
  };

  render() {
    const { isLoggedIn, userType, windowWidth } = this.props;
    const { menuOpen } = this.state;

    return (
      <Wrapper isMobile={windowWidth < TABLET_WIDTH}>
        {windowWidth < TABLET_WIDTH ? (
          <>
            <NavLink to={HOME_URL}>
              <Logo src={whiteLogo} alt="logo" />
            </NavLink>
            {menuOpen ? (
              <Menu
                toggleMenu={this.toggleMenu}
                isLoggedIn={isLoggedIn}
                isMobile
                userType={userType}
                menuButtonClick={this.menuButtonClick}
              />
            ) : (
              <Icon
                type="menu"
                style={{ fontSize: '32px', color: 'white', cursor: 'pointer' }}
                onClick={() => this.toggleMenu()}
              />
            )}
          </>
        ) : (
          <>
            <NavLink to={HOME_URL}>
              <Logo src={whiteLogo} alt="logo" />
            </NavLink>
            <Menu
              isLoggedIn={isLoggedIn}
              userType={userType}
              menuButtonClick={this.menuButtonClick}
            />
          </>
        )}
      </Wrapper>
    );
  }
}

export default withRouter(Navbar);
