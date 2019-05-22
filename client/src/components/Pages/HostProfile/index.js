import React, { Component } from "react";

import {
  Wrapper,
  LinkDiv,
  BackLinkDiv,
  Arrow,
  BackLink,
  Header,
  ProfilePicDiv,
  HeadlineDiv,
  Headline,
  Address,
  SymbolDiv,
  Symbol
} from "./Profile.style";

// images
import adamProfile from "./../../../assets/profile-pictures/adam-profile.jpeg";
import starSign from "./../../../assets/star-sign-symbol.svg";

class HostProfile extends Component {
  render() {
    return (
      <Wrapper>
        <LinkDiv>
          <BackLinkDiv>
            <Arrow />
            <BackLink to="/">back to search results</BackLink>
          </BackLinkDiv>
        </LinkDiv>
        <Header>
          <ProfilePicDiv src={adamProfile} />
          <HeadlineDiv>
            <Headline>A policy research editor at Financial Times</Headline>
            <Address>12 Marylbone St., London</Address>
          </HeadlineDiv>
          <SymbolDiv>
            <Symbol src={starSign} />
          </SymbolDiv>
        </Header>
      </Wrapper>
    );
  }
}

export default HostProfile;
