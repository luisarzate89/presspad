import React, { Component } from "react";
import { Input, DatePicker, Icon } from "antd";
import axios from "axios";
import moment from "moment";

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
  HostLogo,
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

  // HANDLING DATE INPUTS
  disabledStartDate = startDate => {
    const { searchFields } = this.state;
    const { endDate } = searchFields;
    if (!endDate || !startDate) {
      return false;
    }
    return startDate.valueOf() > endDate.valueOf();
  };

  disabledEndDate = endDate => {
    const { searchFields } = this.state;
    const { startDate } = searchFields;
    if (!endDate || !startDate) {
      return false;
    }
    return endDate.valueOf() <= startDate.valueOf();
  };

  onDateInputChange = (field, value) => {
    const { searchFields } = this.state;
    searchFields[field] = value;
    this.setState({ searchFields });
  };

  onStartChange = value => {
    this.onDateInputChange("startDate", value);
    const dateString = moment(value).format("YYYY-MM-DD");
    console.log(dateString);
  };

  onEndChange = value => {
    this.onDateInputChange("endDate", value);
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

  // checks if lisitng image exists and goes to right folder
  getListingPic = listingPic => {
    return listingPic && listingPic.length > 0
      ? listingPic
      : require("./../../../assets/listing-placeholder.jpg");
  };

  // only show the dates listed that are relevant for this search
  showDates = dates => {
    // check if the user has searched for dates
    const { searchFields } = this.state;
    const { startDate, endDate } = searchFields;

    console.log("D", dates);

    if (startDate && endDate) {
      // map through the dates to find all objects that have an end date after the user's start date and a start date before the user's end date
      const availableDates = dates.filter(
        date =>
          date.endDate >= moment(startDate).format() &&
          date.startDate <= moment(endDate).format()
      );
      console.log(availableDates);
    }
  };

  render() {
    const { searchFields, errors, msg, listings } = this.state;
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
              disabledDate={this.disabledStartDate}
              id="startDate"
              type="date"
              style={{ marginRight: 8 }}
              value={startDate}
              onChange={this.onStartChange}
              format="YYYY-MM-DD"
            />
            <SearchLabel htmlFor="endDate">and</SearchLabel>
            <DatePicker
              name="endDate"
              disabledDate={this.disabledEndDate}
              id="endDate"
              type="date"
              value={endDate}
              onChange={this.onEndChange}
              format="YYYY-MM-DD"
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
        {listings && (
          <ResultsWrapper>
            <ResultsText>
              Your search returned {listings.length} results
            </ResultsText>
            <Hosts>
              {listings.map(listing => (
                <HostResult>
                  {this.showDates(listing.availableDates)}
                  <HostHeader>
                    <HostTitle>
                      {listing.address.borough || listing.address.city}
                    </HostTitle>
                  </HostHeader>
                  <HostImg src={this.getListingPic()} />
                  <HostDates>12 May - 24 May 2019</HostDates>
                  <HostLocation>
                    {listing.address.borough && (
                      <>{listing.address.borough}, </>
                    )}
                    {listing.address.city && <>{listing.address.city}, </>}
                    {listing.address.postcode && (
                      <>{listing.address.postcode}</>
                    )}
                  </HostLocation>
                </HostResult>
              ))}
            </Hosts>
          </ResultsWrapper>
        )}
      </Wrapper>
    );
  }
}
