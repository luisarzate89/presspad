import React, { Component } from "react";
import { Input, DatePicker, Icon } from "antd";
import axios from "axios";

// import API routes
import { API_SEARCH_PROFILES_URL } from "./../../../constants/apiRoutes";

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
  ErrorMsg,
  SearchButton,
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
  state = {
    listings: null,
    searchFields: { city: null, startDate: null, endDate: null },
    errors: {},
    msg: null
  };

  fetchListings = () => {
    const { searchFields, errors } = this.state;
    axios
      .post(API_SEARCH_PROFILES_URL, searchFields)
      .then(({ data }) => {
        this.setState({ listings: data });
      })
      .catch(err => {
        errors.searchError = "Sorry, there was an error getting the listings";
        this.setState({
          errors
        });
      });
  };

  onInputChange = e => {
    const { searchFields } = this.state;
    searchFields[e.target.name] = e.target.value;
    this.setState({ searchFields });
  };

  onSearchSubmit = e => {
    e.preventDefault();
    const isValid = this.validateSearch();
    if (isValid) {
      this.fetchListings();
    }
  };

  validateSearch = () => {
    const { searchFields } = this.state;
    const errors = {};
    let searchIsValid = true;

    if (
      !searchFields.city &&
      !searchFields.startDate &&
      !searchFields.endDate
    ) {
      searchIsValid = false;
      errors.searchError =
        "* You must fill in at least one input before searching";
    }

    if (searchFields.startDate) {
      if (!searchFields.endDate) {
        searchIsValid = false;
        errors.searchError = "* You must enter both a start and end date";
      }
    }

    if (searchFields.endDate) {
      if (!searchFields.startDate) {
        searchIsValid = false;
        errors.searchError = "* You must enter both a start and end date";
      }
    }

    this.setState({
      errors
    });

    return searchIsValid;
  };

  render() {
    const { searchFields, errors, msg } = this.state;
    const { city, startDate, endDate } = searchFields;
    const { searchError } = errors;
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
            <Input
              placeholder="Enter your city"
              name="city"
              id="city"
              type="text"
              style={{ width: 150 }}
              value={city}
              onChange={this.onInputChange}
            />
          </FirstSearchInputDiv>
          <SearchInputDiv>
            <SearchLabel htmlFor="startDate">Between</SearchLabel>
            <DatePicker
              name="startDate"
              id="startDate"
              type="date"
              style={{ marginRight: 8 }}
              value={startDate}
              onChange={this.onInputChange}
            />
            <SearchLabel htmlFor="endDate">and</SearchLabel>
            <DatePicker
              name="endDate"
              id="endDate"
              type="date"
              value={endDate}
              onChange={this.onInputChange}
            />
          </SearchInputDiv>
          <SearchInputDiv>
            <SearchLabel htmlFor="interests">Interests</SearchLabel>
            <Input
              name="interests"
              id="interests"
              type="text"
              style={{ width: 150 }}
              onChange={this.onInputChange}
            />
          </SearchInputDiv>
          <SearchInputDiv>
            <SearchButton onClick={this.onSearchSubmit}>
              <Icon type="search" style={{ fontSize: 24 }} />
            </SearchButton>
          </SearchInputDiv>
        </SearchForm>
        <ErrorMsg>{searchError}</ErrorMsg>
      </Wrapper>
    );
  }
}
