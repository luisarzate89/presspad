import React, { Component } from "react";

// STYLING
import {
  Wrapper,
  TopSection,
  Title,
  DashboardMenu,
  MenuItem,
  MainSection,
  ContentTitle,
  SearchWrapper,
  SearchInput,
  Filters,
  ResultsWrapper
} from "./AdminDashboard.style";

export default class AdminDashboard extends Component {
  state = {
    activeLink: "clients"
  };

  selectSection = section => {
    console.log("reached");
    this.setState({ activeLink: section });
  };

  render() {
    const { activeLink } = this.state;

    return (
      <Wrapper>
        <TopSection>
          <Title>Your Dashboard</Title>
          <DashboardMenu>
            <MenuItem
              onClick={() => this.selectSection("clients")}
              active={activeLink === "clients"}
            >
              Clients
            </MenuItem>
            <MenuItem
              onClick={() => this.selectSection("interns")}
              active={activeLink === "interns"}
            >
              Interns
            </MenuItem>
            <MenuItem
              onClick={() => this.selectSection("hosts")}
              active={activeLink === "hosts"}
            >
              Hosts
            </MenuItem>
          </DashboardMenu>
        </TopSection>
        <MainSection>
          {activeLink === "clients" && <div>Clients to go here</div>}
          {activeLink === "interns" && <div>Interns to go here</div>}
          {activeLink === "hosts" && <div>Hosts to go here</div>}
          {/* <ContentTitle>Your Placeholder</ContentTitle>
          <SearchWrapper>
            <SearchInput />
            <Filters />
          </SearchWrapper>
          <ResultsWrapper>
            <div>TABLE FROM ANTD TO GO HERE</div>
          </ResultsWrapper> */}
        </MainSection>
      </Wrapper>
    );
  }
}
