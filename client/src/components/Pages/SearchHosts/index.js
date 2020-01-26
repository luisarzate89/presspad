import React, { Component } from "react";
import { Input, DatePicker, Icon, Select } from "antd";
import axios from "axios";
import moment from "moment";

// import API routes
import {
  API_SEARCH_PROFILES_URL,
  API_GET_ALL_CETIES_URL,
} from "../../../constants/apiRoutes";
import Button from "../../Common/Button";

// import Nav routes
import { HOSTS_URL, SIGNUP_INTERN } from "../../../constants/navRoutes";

import { TABLET_WIDTH } from "../../../constants/screenWidths";

import placeholder from "../../../assets/listing-placeholder.jpg";
// import styled components
import {
  Wrapper,
  Header,
  HeaderTitle,
  HeaderText,
  SearchForm,
  SearchLabel,
  SearchInputDiv,
  ErrorMsg,
  ResultsWrapper,
  ResultsText,
  Hosts,
  HostResult,
  HostHeader,
  HostTitle,
  HostImg,
  HostDates,
  HostLocation,
  DisabledHostResult,
  SignUpPromo,
  SearchButtonDiv,
  SearchButton,
} from "./SearchHosts.style";

export default class index extends Component {
  state = {
    listings: null,
    hometowns: [],
    searchFields: { hometown: null, startDate: null, endDate: null },
    errors: {},
  };

  async componentDidMount() {
    // fetch all hometowns from the listing
    const { data } = await axios.get(API_GET_ALL_CETIES_URL);
    const hometowns = data
      .filter(({ hometown }) => !!hometown)
      .reduce((acc, curr) => {
        acc.add(curr.hometown.toLowerCase());
        return acc;
      }, new Set());
    this.setState({ hometowns: [...hometowns] });
  }

  fetchListings = () => {
    const { searchFields, errors } = this.state;

    axios
      .post(API_SEARCH_PROFILES_URL, searchFields)
      .then(({ data }) => {
        this.setState({ listings: data });
      })
      .catch(() => {
        errors.searchError = "Sorry, there was an error getting the listings";
        this.setState({
          errors,
        });
      });
  };

  onInputChange = e => {
    const { searchFields } = this.state;
    const newSearchFields = { ...searchFields };

    if (e.target) {
      newSearchFields[e.target.name] = e.target.value;
      this.setState({ searchFields: newSearchFields });
    } else {
      // e is the hometown <Select>  value
      newSearchFields.hometown = e;
      this.setState({ searchFields: newSearchFields }, () => {
        const isValid = this.validateSearch();
        if (isValid) {
          this.fetchListings();
        }
      });
    }
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
      !searchFields.hometown &&
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
      errors,
    });

    return searchIsValid;
  };

  // checks if lisitng image exists and goes to right folder
  getListingPic = listingPic =>
    listingPic && listingPic.length > 0 ? listingPic : placeholder;

  showStartDate = dates => {
    if (dates.length > 0) {
      const sortedDates = dates.sort((a, b) => b.startDate - a.startDate);

      return moment(sortedDates[0].startDate).format("Do MMM YYYY");
    }
    return moment(dates).format("Do MMM YYYY");
  };

  showEndDate = dates => {
    if (dates.length > 0) {
      const sortedDates = dates.sort((a, b) => b.endDate - a.endDate);
      return moment(sortedDates[sortedDates.length - 1].endDate).format(
        "Do MMM YYYY",
      );
    }
    return moment(dates).format("Do MMM YYYY");
  };

  render() {
    const { searchFields, errors, listings, hometowns } = this.state;
    const { isLoggedIn, windowWidth } = this.props;
    const { startDate, endDate } = searchFields;
    const { searchError } = errors;

    return (
      <Wrapper>
        <Header>
          <HeaderTitle>Hosts offering a PressPad</HeaderTitle>
          <HeaderText>
            You can search for hosts by filling in the hometown and dates
            you&apos;re looking for, as well as any interests you might have so
            we can find the perfect match for you.
          </HeaderText>
        </Header>
        <SearchForm>
          <SearchInputDiv order={0}>
            <SearchLabel htmlFor="hometown">Hometown</SearchLabel>
            <Select
              showSearch
              placeholder="Enter your hometown"
              name="hometown"
              id="hometown"
              autoFocus
              style={{ width: 150 }}
              onSelect={this.onInputChange}
            >
              {hometowns.map(hometown => (
                <Select.Option value={hometown} key={hometown}>
                  {hometown}
                </Select.Option>
              ))}
            </Select>
          </SearchInputDiv>
          <SearchInputDiv order={1}>
            <SearchLabel htmlFor="startDate">Between</SearchLabel>
            <DatePicker
              name="startDate"
              disabledDate={this.disabledStartDate}
              id="startDate"
              type="date"
              style={{ width: 150 }}
              value={startDate}
              onChange={this.onStartChange}
              format="YYYY-MM-DD"
            />
          </SearchInputDiv>
          <SearchInputDiv order={2}>
            <SearchLabel htmlFor="endDate">and</SearchLabel>
            <DatePicker
              name="endDate"
              disabledDate={this.disabledEndDate}
              id="endDate"
              type="date"
              value={endDate}
              onChange={this.onEndChange}
              format="YYYY-MM-DD"
              style={{ width: 150 }}
            />
          </SearchInputDiv>
          <SearchInputDiv order={3} disabled>
            <SearchLabel htmlFor="interests">Interests</SearchLabel>
            <Input
              name="interests"
              id="interests"
              type="text"
              style={{ width: 150 }}
              onChange={this.onInputChange}
            />
          </SearchInputDiv>

          <SearchButtonDiv>
            {windowWidth < TABLET_WIDTH ? (
              <Button
                label="search"
                type="primary"
                onClick={this.onSearchSubmit}
              />
            ) : (
              <SearchButton onClick={this.onSearchSubmit}>
                <Icon type="search" style={{ fontSize: 24 }} />
              </SearchButton>
            )}
          </SearchButtonDiv>
        </SearchForm>
        <ErrorMsg>{searchError}</ErrorMsg>
        {listings && (
          <ResultsWrapper>
            <ResultsText>
              Your search returned {listings.length}{" "}
              {listings.length === 1 ? "result" : "results"}
            </ResultsText>
            {isLoggedIn ? (
              <Hosts underThree={listings.length < 3}>
                {listings.map(listing => (
                  <HostResult
                    key={listing._id}
                    underThree={listings.length < 3}
                    to={`${HOSTS_URL}/${listing.userID}`}
                  >
                    <HostHeader>
                      <HostTitle>
                        {listing.address.borough || listing.address.hometown}
                      </HostTitle>
                    </HostHeader>
                    <HostImg src={this.getListingPic(listing.photos[0])} />
                    <HostDates>
                      {this.showStartDate(listing.availableDates)} -{" "}
                      {this.showEndDate(listing.availableDates)}
                    </HostDates>
                    <HostLocation>
                      {listing.address.borough && (
                        <>{listing.address.borough}, </>
                      )}
                      {listing.address.hometown && (
                        <>{listing.address.hometown}, </>
                      )}
                      {listing.address.postcode && (
                        <>{listing.address.postcode}</>
                      )}
                    </HostLocation>
                  </HostResult>
                ))}
              </Hosts>
            ) : (
              <>
                <Hosts>
                  {listings.slice(0, 3).map(listing => (
                    <DisabledHostResult
                      key={`${listing._id}2`}
                      to={`${HOSTS_URL}/${listing.userID}`}
                      isLoggedIn={isLoggedIn}
                    >
                      <HostHeader>
                        <HostTitle>
                          {listing.address.borough || listing.address.hometown}
                        </HostTitle>
                      </HostHeader>
                      <HostImg src={this.getListingPic(listing.photos[0])} />
                      <HostDates>
                        {this.showStartDate(listing.availableDates)} -{" "}
                        {this.showEndDate(listing.availableDates)}
                      </HostDates>
                      <HostLocation>
                        {listing.address.borough && (
                          <>{listing.address.borough}, </>
                        )}
                        {listing.address.hometown && (
                          <>{listing.address.hometown}, </>
                        )}
                        {listing.address.postcode && (
                          <>{listing.address.postcode}</>
                        )}
                      </HostLocation>
                    </DisabledHostResult>
                  ))}
                </Hosts>
                <SignUpPromo to={SIGNUP_INTERN}>
                  Sign up now to view all properties, full property details and
                  request to stay.
                </SignUpPromo>
              </>
            )}
          </ResultsWrapper>
        )}
      </Wrapper>
    );
  }
}
