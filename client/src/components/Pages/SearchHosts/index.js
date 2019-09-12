import React, { Component } from "react";
import { Input, DatePicker, Icon, Select } from "antd";
import axios from "axios";
import moment from "moment";

// import API routes
import {
  API_SEARCH_PROFILES_URL,
  API_GET_ALL_CETIES_URL
} from "./../../../constants/apiRoutes";

// import Nav routes
import { HOSTS_URL, SIGNUP_INTERN } from "./../../../constants/navRoutes";

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
  HostImg,
  HostDates,
  HostLocation,
  DisabledHostResult,
  SignUpPromo
} from "./SearchHosts.style";

export default class index extends Component {
  state = {
    listings: null,
    cities: [],
    searchFields: { city: null, startDate: null, endDate: null },
    errors: {}
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
    const newSearchFields = { ...searchFields };

    if (e.target) {
      newSearchFields[e.target.name] = e.target.value;
      this.setState({ searchFields: newSearchFields });
    } else {
      // e is the city <Select>  value
      newSearchFields.city = e;
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

  showStartDate = dates => {
    if (dates.length > 0) {
      const sortedDates = dates.sort((a, b) => {
        return b.startDate - a.startDate;
      });

      return moment(sortedDates[0].startDate).format("Do MMM YYYY");
    } else return moment(dates).format("Do MMM YYYY");
  };

  showEndDate = dates => {
    if (dates.length > 0) {
      const sortedDates = dates.sort((a, b) => {
        return b.endDate - a.endDate;
      });
      return moment(sortedDates[sortedDates.length - 1].endDate).format(
        "Do MMM YYYY"
      );
    } else return moment(dates).format("Do MMM YYYY");
  };

  async componentDidMount() {
    // fetch all cities from the listing
    const { data } = await axios.get(API_GET_ALL_CETIES_URL);
    const cities = data.reduce((acc, curr) => {
      acc.add(curr.city.toLowerCase());
      return acc;
    }, new Set());
    this.setState({ cities: [...cities] });
  }

  render() {
    const { searchFields, errors, listings, cities } = this.state;
    const { isLoggedIn } = this.props;
    const { startDate, endDate } = searchFields;
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
            <Select
              showSearch
              placeholder="Enter your city"
              name="city"
              id="city"
              autoFocus
              style={{ width: 150 }}
              onSelect={this.onInputChange}
            >
              {cities.map(city => (
                <Select.Option value={city} key={city}>
                  {city}
                </Select.Option>
              ))}
            </Select>
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
          <SearchInputDiv disabled>
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
            {isLoggedIn ? (
              <Hosts underThree={listings.length < 3}>
                {listings.map((listing, index) => (
                  <HostResult
                    key={index}
                    underThree={listings.length < 3}
                    to={`${HOSTS_URL}/${listing.userID}`}
                  >
                    <HostHeader>
                      <HostTitle>
                        {listing.address.borough || listing.address.city}
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
                      {listing.address.city && <>{listing.address.city}, </>}
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
                  {listings.slice(0, 3).map((listing, index) => (
                    <DisabledHostResult
                      key={index}
                      to={`${HOSTS_URL}/${listing.userID}`}
                      isLoggedIn={isLoggedIn}
                    >
                      <HostHeader>
                        <HostTitle>
                          {listing.address.borough || listing.address.city}
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
                        {listing.address.city && <>{listing.address.city}, </>}
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
