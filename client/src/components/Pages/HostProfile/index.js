import React, { Component } from "react";

import {
  Wrapper,
  LinkDiv,
  BackLinkDiv,
  Arrow,
  BackLink
} from "./Profile.style";

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
      </Wrapper>
    );
  }
}

export default HostProfile;
