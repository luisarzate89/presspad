import React, { Component } from "react";
import moment from "moment";

//api
import { API_INTERN_PROFILE_URL } from "./../../../../constants/apiRoutes";

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
} from "../../../Common/Profile/Profiles.style";

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
} from "./HostView.style";

import "antd/dist/antd.css";

import referIcon from "./../../../../assets/refer.svg";
import verifiedIcon from "./../../../../assets/verified.svg";

import { Spin, Icon, Radio, message } from "antd";

class HostView extends Component {
  state = {
    isLoading: true,
    value: 1,
    internData: null,
    reviews: null
  };

  // functions
  axiosCall = () => {
    const { id: internId } = this.props.match.params;
    axios
      .get(`/api/interns/${internId}/profile`)
      .then(({ data }) => {
        const { internData, reviews, nextBooking } = data;
        this.setState({
          isLoading: false,
          internData,
          reviews,
          nextBooking
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
      : require("./../../../../assets/random-profile.jpg");

  onRadioChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    if (this.state.isLoading) return <Spin tip="Loading Request" />;

    const { internData, reviews, nextBooking } = this.state;

    const { name, profile } = internData;

    const {
      bio,
      favouriteArticle,
      jobTitle,
      profileImage,
      verification,
      verified
    } = profile;

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
        <Header flex>
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
                  <BookingDetailsText>
                    {moment(nextBooking.startDate).format("DD.MM.YYYY")}
                  </BookingDetailsText>
                </BookingDetailsDiv>
                <BookingDetailsDiv>
                  <BookingDetailsHeadline>End date</BookingDetailsHeadline>
                  <BookingDetailsText>
                    {moment(nextBooking.endDate).format("DD.MM.YYYY")}
                  </BookingDetailsText>
                </BookingDetailsDiv>
                <BookingDetailsDiv>
                  <BookingDetailsHeadline>Payment</BookingDetailsHeadline>
                  <BookingDetailsText>
                    £
                    {parseFloat(
                      Math.round(nextBooking.price * 100) / 100
                    ).toFixed(2)}{" "}
                  </BookingDetailsText>
                </BookingDetailsDiv>
              </BookingDetailsContainer>
              <Paragraph>
                You can choose to receive full payment to your account, or
                donate the money received on this hosting to the PressPad fund.
                Find out more about the fund.
              </Paragraph>
              <RadioContainer>
                <Radio.Group
                  onChange={this.onRadioChange}
                  value={this.state.value}
                >
                  <Radio style={radioStyle} value={"toMe"}>
                    Receive payment to my account{" "}
                  </Radio>
                  <Radio style={radioStyle} value={"toPresspad"}>
                    Donate payment to the PressPad fund{" "}
                  </Radio>
                </Radio.Group>
              </RadioContainer>
              <ButtonDiv>
                <Button onClick={this.handleAccept}>Accept Request</Button>
                <Button reject={true} onClick={this.handleReject}>
                  Reject Request
                </Button>
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
        {reviews.length > 0 && (
          <ReviewsCard>
            <Reviews>
              <SubHeadline>
                {name.split(" ")[0]} has stayed with {reviews.length}{" "}
                {reviews.length === 1 ? "host" : "hosts"} so far
              </SubHeadline>
              <ReviewsSection>
                {reviews.map((re, i) => (
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

export default HostView;
