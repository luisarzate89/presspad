import React, { Component } from "react";

//api
import { API_INTERN_PROFILE_URL } from "../../../constants/apiRoutes";

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

import referIcon from "./../../../assets/refer.svg";
import verifiedIcon from "./../../../assets/verified.svg";

import { Spin, Icon, Radio, message } from "antd";

class BookingRequest extends Component {
  state = {
    isLoading: true,
    value: 1,
    internData: null,
    internReviews: null
  };

  // functions
  axiosCall = () => {
    //get user id
    // const id = window.location.href.split("/")[4];

    axios
      .post(API_INTERN_PROFILE_URL)
      .then(res => {
        this.setState({
          isLoading: false,
          internData: res.data[0][0],
          internReviews: res.data[1]
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  componentWillMount() {
    this.axiosCall();
  }

  // checks if profile image exists and returns src path
  getProfilePic = img =>
    img && img.length > 0
      ? img
      : require("./../../../assets/random-profile.jpg");

  // checks if lisitng image exists and goes to right folder
  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  render() {
    if (this.state.isLoading) return <Spin tip="Loading Request" />;

    const { internData, internReviews } = this.state;
    const { name, profile } = internData;

    const {
      bio,
      favouriteArticle,
      jobTitle,
      profileImage,
      verification,
      verified
    } = profile[0];

    const { author, link, title, description } = favouriteArticle;

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    const { reference1, reference2 } = verification;

    const referencesLength =
      ((reference1 && reference1.name && 1) || 0) +
      ((reference2 && reference2.name && 1) || 0);

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
          <ProfilePicDiv src={this.getProfilePic(profileImage)} />
          <HeaderDiv>
            <Headline>{name}</Headline>
            <JobTitle>{jobTitle}</JobTitle>
            <SymbolDiv>
              {verified ? (
                <SymbolContainer>
                  <Symbol src={verifiedIcon} />
                  <SymbolHeadline>Verified</SymbolHeadline>
                </SymbolContainer>
              ) : (
                <SymbolContainer>
                  <Symbol src={verifiedIcon} />
                  <SymbolHeadline>Not Verified</SymbolHeadline>
                </SymbolContainer>
              )}

              <SymbolContainer>
                <Symbol src={referIcon} />
                <SymbolHeadline>{referencesLength} References</SymbolHeadline>
                <IconDiv>
                  <Icon type="info-circle" />
                </IconDiv>
              </SymbolContainer>
            </SymbolDiv>
            <BioContainer>
              <Paragraph>{bio}</Paragraph>
            </BioContainer>
          </HeaderDiv>
        </Header>
        {/* Main section */}
        <MainSection>
          <BookingDetailsCard>
            <BookingDetailsInnerCard>
              <SubHeadline>{name.split(" ")[0]}’s request to stay</SubHeadline>
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
                <SubHeadline>More about {name.split(" ")[0]}</SubHeadline>
                <ParagraphHeadline>
                  {name.split(" ")[0]}’s favourite article this week is{" "}
                  <a href={`${link}`}>
                    {title}, by {author}
                  </a>{" "}
                </ParagraphHeadline>
                <Paragraph>{description}</Paragraph>
              </InnerCard>
            </Card>
          </MoreAboutSection>
        </MainSection>
        {/* Review section */}
        {internReviews.length > 0 && (
          <ReviewsCard>
            <Reviews>
              <SubHeadline>
                {name.split(" ")[0]} has stayed with {internReviews.length}{" "}
                {internReviews.length === 1 ? "host" : "hosts"} so far
              </SubHeadline>
              <ReviewsSection>
                {internReviews.map((re, i) => (
                  <ReviewsBox key={i}>
                    <ReviewsHeader>
                      <ReviewHeadline>
                        {" "}
                        {re.from_user.name.split(" ")[0]},{" "}
                        {re.from_profile.jobTitle}
                      </ReviewHeadline>
                      <StarRate disabled defaultValue={re.rating} />
                    </ReviewsHeader>
                    <ReviewText>{re.message}</ReviewText>
                  </ReviewsBox>
                ))}
              </ReviewsSection>
            </Reviews>
          </ReviewsCard>
        )}
      </Wrapper>
    );
  }
}

export default BookingRequest;
