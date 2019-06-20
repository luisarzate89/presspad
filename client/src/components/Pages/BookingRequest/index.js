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
  HeaderDiv,
  InnerCard,
  Headline,
  SubHeadline,
  ParagraphHeadline,
  Paragraph,
  Card,
  StarRate
} from "../../Common/Profile/Profiles.style";

import {
  MainSection,
  BookingDetailsCard,
  BookingDetailsInnerCard,
  ReviewsCard,
  MoreAboutSection,
  JobTitle,
  ProfilePicDiv,
  SymbolDiv,
  Symbol,
  SymbolHeadline,
  SymbolContainer,
  IconDiv,
  BioContainer,
  BookingDetailsDiv,
  BookingDetailsHeadline,
  BookingDetailsText,
  BookingDetailsContainer,
  RadioContainer,
  ButtonDiv,
  Button,
  Reviews,
  ReviewsBox,
  ReviewsHeader,
  ReviewsSection,
  ReviewHeadline,
  ReviewText
} from "./BookingRequest.style";

import "antd/dist/antd.css";

import refer from "./../../../assets/refer.svg";
import verified from "./../../../assets/verified.svg";

import { Spin, Icon, Radio } from "antd";

class BookingRequest extends Component {
  state = {
    isLoading: true,
    value: 1
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
  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };
  render() {
    if (this.state.isLoading) return <Spin tip="Loading Request" />;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    return (
      <Wrapper>
        {/* Backlink */}
        <LinkDiv>
          <BackLinkDiv>
            <Arrow />
            <BackLink to="/">back</BackLink>
          </BackLinkDiv>
        </LinkDiv>
        {/* Header */}
        <Header>
          <ProfilePicDiv />
          {/* <ProfilePicDiv src={this.getProfilePic(profileImage)} /> */}
          <HeaderDiv>
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
            <BioContainer>
              <Paragraph>
                I work for a local newspaper, recently established a weekly
                column on council affairs. Aiming to inform the local community
                and inspire them to find the truth.
              </Paragraph>
            </BioContainer>
          </HeaderDiv>
        </Header>
        {/* Main section */}
        <MainSection>
          <BookingDetailsCard>
            <BookingDetailsInnerCard>
              <SubHeadline>Andrew’s request to stay</SubHeadline>
              <BookingDetailsContainer>
                <BookingDetailsDiv>
                  <BookingDetailsHeadline>Start date</BookingDetailsHeadline>
                  <BookingDetailsText>10.05.2019</BookingDetailsText>
                </BookingDetailsDiv>
                <BookingDetailsDiv>
                  <BookingDetailsHeadline>End date</BookingDetailsHeadline>
                  <BookingDetailsText>20.05.2019</BookingDetailsText>
                </BookingDetailsDiv>
                <BookingDetailsDiv>
                  <BookingDetailsHeadline>Payment</BookingDetailsHeadline>
                  <BookingDetailsText>£245.00 </BookingDetailsText>
                </BookingDetailsDiv>
              </BookingDetailsContainer>
              <Paragraph>
                You can choose to receive full payment to your account, or
                donate the money received on this hosting to the PressPad fund.
                Find out more about the fund.
              </Paragraph>
              <RadioContainer>
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                  <Radio style={radioStyle} value={1}>
                    Receive payment to my account{" "}
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    Donate payment to the PressPad fund{" "}
                  </Radio>
                </Radio.Group>
              </RadioContainer>
              <ButtonDiv>
                <Button>Accept Request</Button>
                <Button reject={true}>Reject Request</Button>
              </ButtonDiv>
            </BookingDetailsInnerCard>
          </BookingDetailsCard>

          <MoreAboutSection>
            <Card mt="30px" mh="450px">
              <InnerCard>
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
              </InnerCard>
            </Card>
          </MoreAboutSection>
        </MainSection>
        {/* Review section */}
        <ReviewsCard>
          <Reviews>
            <SubHeadline>Andrew has stayed with 2 hosts so far</SubHeadline>
            <ReviewsSection>
              <ReviewsBox>
                <ReviewsHeader>
                  <ReviewHeadline>Jack, political analyst</ReviewHeadline>
                  <StarRate disabled defaultValue={2} />
                </ReviewsHeader>
                <ReviewText>
                  Andrew was a pleasure to host, he showed a lot of enthusiasm
                  and passion. We only spent a week together but I could see us
                  crossing paths in the future. He was a lovely guest, helped
                  with keeping the entire place tidy and my dog seemed to have
                  liked him very much!
                </ReviewText>
              </ReviewsBox>
              <ReviewsBox>
                <ReviewsHeader>
                  <ReviewHeadline>Jack, political analyst</ReviewHeadline>
                  <StarRate disabled defaultValue={2} />
                </ReviewsHeader>
                <ReviewText>
                  Andrew was a pleasure to host, he showed a lot of enthusiasm
                  and passion. We only spent a week together but I could see us
                  crossing paths in the future. He was a lovely guest, helped
                  with keeping the entire place tidy and my dog seemed to have
                  liked him very much!
                </ReviewText>
              </ReviewsBox>
            </ReviewsSection>
          </Reviews>
        </ReviewsCard>
      </Wrapper>
    );
  }
}

export default BookingRequest;
