import React, { Component } from "react";
import axios from "axios";
import { Row, Col, message } from "antd";

import randomProfile from "../../../assets/random-profile.jpg";
import DisabledPopOver from "../../Common/DisabledPopOver";
import Checklist from "../../Common/Checklist";
import ListingGallery from "../../Common/Profile/ListingGallery";
import PaymentsPlan from "./PaymentsPlan";
import BookingInfo from "./BookingInfo";

import {
  PageWrapper,
  SectionWrapperContent,
  SectionTitle,
  BlueLink
} from "../../Common/general";
import {
  Header,
  ProfilePicDiv,
  HeaderDiv,
  Headline,
  Address,
  SymbolDiv,
  Symbol,
  ParagraphHeadline,
  Paragraph
} from "../../Common/Profile/Profiles.style";

import starSign from "./../../../assets/star-sign-symbol.svg";

import { API_GET_BOOKING_URL } from "../../../constants/apiRoutes";
import { Error404, Error500 } from "../../../constants/navRoutes";

export default class BookingView extends Component {
  state = {
    checklistObj: {},
    installments: [],
    listing: {
      userProfile: { organisation: {}, profileImage: {} },
      photos: []
    },
    bookingInfo: {},
    isLoading: null
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const getBookingUrl = API_GET_BOOKING_URL.replace(
      ":id",
      this.props.match.params.id
    );
    try {
      const {
        data: {
          data: {
            checkList,
            installments,
            listing,
            price,
            payedAmount,
            status,
            startDate,
            endDate
          }
        }
      } = await axios.get(getBookingUrl);
      const checklistObj = checkList.reduce((acc, curr) => {
        acc[curr._id] = { ...curr };
        return acc;
      }, {});

      this.setState({
        checklistObj,
        installments,
        listing,
        bookingInfo: { price, payedAmount, status, startDate, endDate },
        isLoading: false
      });
    } catch (error) {
      if (error.response.status === 404) {
        message.destroy();
        return message
          .error("booking not found", 4)
          .then(() => this.props.history.push(Error404));
      }
      message.destroy();
      message
        .error("something went wrong", 4)
        .then(() => this.props.history.push(Error500));
    }
  }

  handleChecklistChange = async e => {
    const {
      dataset: { id },
      checked
    } = e.target;

    const { checklist } = this.state;
    try {
      await axios.get("/update checklist url");
      this.setState({
        checklist: {
          ...checklist,
          [id]: { ...checklist[id], isChecked: checked }
        }
      });
    } catch (err) {
      message.destroy();
      message.error("Something went wrong, try again later");
    }
  };

  render() {
    const {
      listing: {
        address,
        photos,
        userProfile: { profileImage, badge, bio, organisation, jobTitle }
      },
      checklistObj,
      installments,
      isLoading,
      bookingInfo
    } = this.state;

    const listingPhotos = {};
    if (photos[0]) {
      listingPhotos.img1 = photos[0].url;
      listingPhotos.img2 = photos[1].url;
      listingPhotos.img3 = photos[2].url;
    }

    return (
      <PageWrapper>
        <Header>
          {/* loading stuff */}
          <Row type="flex">
            <ProfilePicDiv
              src={(profileImage && profileImage.url) || randomProfile}
              onError={e => (e.target.src = randomProfile)}
            />
            <HeaderDiv>
              <Headline>
                {(jobTitle || organisation) &&
                  `(A ${jobTitle ? jobTitle : "_"} at ${
                    organisation ? organisation.name : "_"
                  })`}
              </Headline>

              <Address>
                {address &&
                  `${address.street ? address.street + ", " : ""}
                ${address.city ? address.city : ""}`}
              </Address>
            </HeaderDiv>
            <SymbolDiv>{badge && <Symbol src={starSign} />}</SymbolDiv>
          </Row>
        </Header>
        <ListingGallery {...listingPhotos} isLoading={isLoading} />
        <Row gutter={24}>
          {/* loading stuff */}
          <Col lg={16} md={14} sm={24}>
            <section>
              <SectionWrapperContent style={{ minHeight: 200 }}>
                <SectionTitle>About me</SectionTitle>
                <ParagraphHeadline>
                  {jobTitle} - {organisation.name}
                </ParagraphHeadline>
                <Paragraph>{bio}</Paragraph>
              </SectionWrapperContent>
              <Row type="flex" style={{ marginBottom: "2rem" }}>
                <DisabledPopOver>
                  <BlueLink to="#">Show other Info</BlueLink>
                </DisabledPopOver>
                <DisabledPopOver>
                  <BlueLink marginl="3rem" to="#">
                    Show pressPad offer
                  </BlueLink>
                </DisabledPopOver>
                <DisabledPopOver>
                  <BlueLink marginl="3rem" to="#">
                    Show Reviews
                  </BlueLink>
                </DisabledPopOver>
              </Row>
            </section>
            <Checklist
              checklistObj={checklistObj}
              handleChange={this.handleChecklistChange}
            />
            <PaymentsPlan
              data={{ installments: [], isLoading, ...bookingInfo }}
            />
          </Col>
          <Col lg={8} md={10} sm={24}>
            <BookingInfo isLoading={isLoading} />
          </Col>
        </Row>
      </PageWrapper>
    );
  }
}
