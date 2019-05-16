import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Wrapper, Menu, Item, Logo } from "./Header.style.js";

import logoImage from "./../../../assets/WHITE presspad-logo.png";

class Header extends Component {
  render() {
    const { isLoggedin, handleSignOut } = this.props;
    let headerItems = [
      { text: "Dashboard", to: "/dashboard" },
      { text: "Hosts", to: "/hosts" },
      { text: "My profile", to: "/profile" }
    ];

    if (!isLoggedin) {
      headerItems = [
        { text: "Home", to: "/" },
        { text: "About", to: "/about" },
        { text: "Sign in", to: "/sign-in" }
      ];
    }
    return (
      <Wrapper>
        <Menu>
          <Item logo>
            <Link to="/">
              <Logo src={logoImage} />
            </Link>
          </Item>

          {headerItems.map(item => (
            <Item>
              <NavLink to={item.to}>{item.text}</NavLink>
            </Item>
          ))}

          {isLoggedin && (
            <Item onClick={handleSignOut}>
              <NavLink to="/sign-out">Sign out</NavLink>
            </Item>
          )}
        </Menu>
      </Wrapper>
    );
  }
}
export default Header;
