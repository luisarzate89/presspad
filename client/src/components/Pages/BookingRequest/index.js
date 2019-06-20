import React, { Component } from "react";

//api
import { API_HOST_PROFILE_URL } from "../../../constants/apiRoutes";

import axios from "axios";

//styles
import {
  Wrapper,
  LinkDiv,
  BackLinkDiv,
  Arrow,
  BackLink,
  Header,
  HeadlineDiv,
  BookingRequestDiv,
  Headline,
  MainSection,
  TextContentDiv,
  AvailableHosting,
  CalendarDiv,
  SubHeadline,
  ParagraphHeadline,
  Paragraph,
  Card,
  JobTitle,
  ProfilePicDiv,
  SymbolDiv,
  Symbol,
  SymbolHeadline,
  SymbolContainer,
  IconDiv
} from "./BookingRequest.style";

import "antd/dist/antd.css";

import refer from "./../../../assets/refer.svg";
import verified from "./../../../assets/verified.svg";

import { Spin, Icon, message } from "antd";

class BookingRequest extends Component {
  state = {
    isLoading: true
  };

  // functions
  axiosCall = () => {
    //get user id
    // const id = window.location.href.split("/")[4];
    // const data = { userId: id };
    // axios
    //   .post(API_HOST_PROFILE_URL, data)
    //   .then(res => {
    //     this.setState({
    //       isLoading: false,
    //       profileData: res.data[0][0],
    //       reviews: res.data[1]
    //     });
    //   })
    //   .catch(err => {
    //     const error =
    //       err.response && err.response.data && err.response.data.error;
    //     message.error(error || "Something went wrong");
    //   });
  };

  componentWillMount() {
    // this.axiosCall();
    this.setState({ isLoading: false });
  }

  // checks if profile image exists and returns src path
  getProfilePic = img =>
    img && img.length > 0
      ? img
      : require("./../../../assets/random-profile.jpg");

  // checks if lisitng image exists and goes to right folder

  render() {
    if (this.state.isLoading) return <Spin tip="Loading Request" />;

    return (
      <Wrapper>
        <LinkDiv>
          <BackLinkDiv>
            <Arrow />
            <BackLink to="/">back to search results</BackLink>
          </BackLinkDiv>
        </LinkDiv>
        <Header>
          <ProfilePicDiv />
          {/* <ProfilePicDiv src={this.getProfilePic(profileImage)} /> */}
          <HeadlineDiv>
            <Headline>Andrew Langley</Headline>
            <JobTitle>Politics reporter</JobTitle>
            <SymbolDiv>
              <SymbolContainer>
                <Symbol src={verified} />
                <SymbolHeadline>Verified</SymbolHeadline>
              </SymbolContainer>
              <SymbolContainer>
                <Symbol src={refer} />
                <SymbolHeadline>2 References</SymbolHeadline>
                <IconDiv>
                  <Icon type="info-circle" />
                </IconDiv>
              </SymbolContainer>
            </SymbolDiv>
          </HeadlineDiv>
        </Header>
        <MainSection>
          <TextContentDiv>
            <Card>
              <BookingRequestDiv>
                <SubHeadline>Andrew’s request to stay</SubHeadline>
                <ParagraphHeadline>
                  StartDate, EndDate, Payment
                </ParagraphHeadline>
                <Paragraph>
                  You can choose to receive full payment to your account, or
                  donate the money received on this hosting to the PressPad
                  fund. Find out more about the fund.
                </Paragraph>
              </BookingRequestDiv>
            </Card>
            {/* {reviews.length > 0 && ( */}
            <Card>Reviews</Card>
            {/* )} */}
          </TextContentDiv>
          <AvailableHosting>
            <Card>
              <CalendarDiv>
                <SubHeadline>More about Andrew</SubHeadline>
                <ParagraphHeadline>
                  Andrew’s favourite article this week is What Could Blockchain
                  Do for Politics?, by N. Woolf.{" "}
                </ParagraphHeadline>
                <Paragraph>
                  “I found Nicky’s article on blockchain in politics to be
                  amazingly written. Not only does he unearth the most pressing
                  issues blockchain could fix, but he also shows why it’s not
                  happening yet. Blockchain is not a term you usually see in
                  politics, but moving away from the buzzword and looking at the
                  actual applications, Nicky manages to tell the story of how it
                  could do a lot of good to Georgians.”
                </Paragraph>
              </CalendarDiv>
            </Card>
          </AvailableHosting>
        </MainSection>
      </Wrapper>
    );
  }
}

export default BookingRequest;
