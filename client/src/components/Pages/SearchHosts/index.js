import React, { Component } from "react";
import { Input, DatePicker, Icon } from "antd";

// import styled components
import {
  Wrapper,
  Header,
  HeaderTitle,
  HeaderText,
  SearchForm,
  FirstSearchInputDiv,
  SearchLabel,
  SearchInputDiv,
  ResultsWrapper,
  ResultsText,
  Hosts,
  HostResult,
  HostHeader,
  HostTitle,
  HostLog,
  HostImg,
  HostDates,
  HostLocation
} from "./SearchHosts.style";

export default class index extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <HeaderTitle>Hosts offering a PressPad</HeaderTitle>
          <HeaderText>
            You can search for hosts by filling in the city and dates you're
            looking for, as well as any interests you might have so we can find
            the perfect match for you.
          </HeaderText>
        </Header>
        <SearchForm>
          <FirstSearchInputDiv>
            <SearchLabel htmlFor="city">City</SearchLabel>
            <Input name="city" id="city" type="text" style={{ width: 150 }} />
          </FirstSearchInputDiv>
          <SearchInputDiv>
            <SearchLabel htmlFor="from">Between</SearchLabel>
            <DatePicker
              name="from"
              id="from"
              type="date"
              style={{ marginRight: 8 }}
            />
            <SearchLabel htmlFor="to">and</SearchLabel>
            <DatePicker name="to" id="to" type="date" />
          </SearchInputDiv>
          <SearchInputDiv>
            <SearchLabel htmlFor="interests">Interests</SearchLabel>
            <Input
              name="interests"
              id="interests"
              type="text"
              style={{ width: 150 }}
            />
          </SearchInputDiv>
          <SearchInputDiv>
            <Icon type="search" style={{ fontSize: 24 }} />
          </SearchInputDiv>
        </SearchForm>
      </Wrapper>
    );
  }
}
