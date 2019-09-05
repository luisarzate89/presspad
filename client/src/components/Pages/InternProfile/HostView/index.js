import React, { Component } from "react";
import moment from "moment";
import { Modal, Spin, Icon, Radio, message } from "antd";
import axios from "axios";

import { API_INTERN_PROFILE_URL } from "./../../../../constants/apiRoutes";

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
import { ButtonSpinner } from "./../../../Common/Button";

const { confirm } = Modal;
const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};
class HostView extends Component {
  state = {
    isLoading: true,
    moneyGoTo: "host",
    internData: null,
    reviews: null
  };

  // functions
  axiosCall = () => {
    const { id: internId } = this.props.match.params;
    axios
      .get(
        `${API_INTERN_PROFILE_URL.replace(
          ":id",
          internId
        )}?expand=bookings&expand=reviews`
      )
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
      moneyGoTo: e.target.value
    });
  };

  handleAccept = () => {
    const {
      nextBooking,
      moneyGoTo,
      internData: { name }
    } = this.state;
    try {
      this.setState({ apiLoading: true, action: "accept" }, async () => {
        await axios.patch(`/api/bookings/${nextBooking._id}/accept`, {
          moneyGoTo
        });

        this.setState({ apiLoading: false });

        Modal.success({
          title: "Done!",
          content: `You successfully accepted ${name.split(" ")[0]}'s request`,
          onOk: () => this.axiosCall()
        });
      });
    } catch (err) {
      this.setState({ apiLoading: false });

      const error =
        err.response && err.response.data && err.response.data.error;
      message.error(error || "Something went wrong");
    }
  };

  handleReject = () => {
    const {
      nextBooking,
      internData: { name }
    } = this.state;
    confirm({
      title: "Are you sure?",
      content: `Reject ${name.split(" ")[0]}'s booking request?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.setState({ apiLoading: true, action: "reject" }, async () => {
          try {
            await axios.patch(`/api/bookings/${nextBooking._id}/reject`);

            this.setState({ apiLoading: false });

            Modal.success({
              title: "Done!",
              content: `You successfully rejected ${
                name.split(" ")[0]
              }'s request`,
              onOk: () => this.axiosCall()
            });
          } catch (err) {
            this.setState({ apiLoading: false });

            const error =
              err.response && err.response.data && err.response.data.error;
            message.error(error || "Something went wrong");
          }
        });
      }
    });
  };

  render() {
    if (this.state.isLoading) return <Spin tip="Loading Request" />;

    const {
      internData,
      reviews,
      nextBooking,
      moneyGoTo,
      apiLoading,
      action
    } = this.state;

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
          {nextBooking ? (
            <BookingRequestSection
              name={name}
              nextBooking={nextBooking}
              apiLoading={apiLoading}
              moneyGoTo={moneyGoTo}
              action={action}
              onRadioChange={this.onRadioChange}
              handleAccept={this.handleAccept}
              handleReject={this.handleReject}
            />
          ) : (
            reviews.length > 0 && (
              <ReviewSection name={name} reviews={reviews} />
            )
          )}
          <MoreAboutSection
            fullwidth={!reviews || (!reviews.length > 0 && !nextBooking)}
          >
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
        {reviews.length > 0 && nextBooking && (
          <ReviewSection name={name} reviews={reviews} />
        )}
      </Wrapper>
    );
  }
}

export default HostView;

const ReviewSection = ({ name, reviews }) => {
  return (
    <ReviewsCard style={{ width: "100%" }}>
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
                  {re.from_user.name.split(" ")[0]}, {re.from_profile.jobTitle}
                </ReviewHeadline>
                <StarRate disabled defaultValue={re.rating} />
              </ReviewsHeader>
              <ReviewText>{re.message}</ReviewText>
            </ReviewsBox>
          ))}
        </ReviewsSection>
      </Reviews>
    </ReviewsCard>
  );
};

const BookingRequestSection = ({
  name,
  nextBooking,
  apiLoading,
  moneyGoTo,
  action,
  onRadioChange,
  handleAccept,
  handleReject
}) => {
  return (
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
              {parseFloat(Math.round(nextBooking.price * 100) / 100).toFixed(2)}{" "}
            </BookingDetailsText>
          </BookingDetailsDiv>
        </BookingDetailsContainer>
        <Paragraph>
          You can choose to receive full payment to your account, or donate the
          money received on this hosting to the PressPad fund. Find out more
          about the fund.
        </Paragraph>
        <RadioContainer>
          <Radio.Group onChange={onRadioChange} value={moneyGoTo}>
            <Radio style={radioStyle} value={"host"}>
              Receive payment to my account{" "}
            </Radio>
            <Radio style={radioStyle} value={"presspad"}>
              Donate payment to the PressPad fund{" "}
            </Radio>
          </Radio.Group>
        </RadioContainer>
        <ButtonDiv>
          <Button onClick={handleAccept} disabled={apiLoading}>
            {apiLoading && action === "accept" && (
              <ButtonSpinner color={"#FFFFFF"} />
            )}
            Accept Request
          </Button>
          <Button reject={true} onClick={handleReject} disabled={apiLoading}>
            {apiLoading && action === "reject" && (
              <ButtonSpinner color={"#FFFFFF"} />
            )}
            Reject Request
          </Button>
        </ButtonDiv>
      </BookingDetailsInnerCard>
    </BookingDetailsCard>
  );
};
