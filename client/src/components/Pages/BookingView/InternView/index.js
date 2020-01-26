/* eslint-disable consistent-return */
import React, { Component } from "react";
import axios from "axios";
import { Row, Col, message, Spin } from "antd";
import { Elements } from "react-stripe-elements";

import randomProfile from "../../../../assets/random-profile.jpg";
import DisabledPopOver from "../../../Common/DisabledPopOver";
import Checklist from "../Checklist";
import ListingGallery from "../../../Common/Profile/ListingGallery";
import PaymentsPlan from "./PaymentsPlan";
import BookingInfo from "./BookingInfo";
import PayNowModal from "./PayNowModal";

import {
  getDiscountDays,
  calculatePrice,
  createInstallments,
  getFirstUnpaidInstallment,
} from "../helpers";

import {
  API_COUPON_URL,
  API_HOST_PROFILE_URL,
} from "../../../../constants/apiRoutes";
import { Error404, Error500 } from "../../../../constants/navRoutes";

import {
  PageWrapper,
  SectionWrapperContent,
  SectionTitle,
  BlueLink,
} from "../../../Common/general";
import {
  Header,
  ProfilePicDiv,
  HeaderDiv,
  Headline,
  Address,
  Symbol,
  ParagraphHeadline,
  Paragraph,
} from "../../../Common/Profile/Profiles.style";

import {
  AboutSectionDataContainer,
  AboutSectionDataRow,
  AboutSectionDataCell,
} from "../../InternProfile/HostView/HostView.style";

import starSign from "../../../../assets/star-sign-symbol.svg";

export default class BookingView extends Component {
  state = {
    listing: {
      userProfile: { organisation: "", profileImage: {} },
      photos: [],
    },
    profile: {},
    // reviews: [],
    couponInfo: {
      couponCode: "",
      discountDays: 0,
      discountRate: 0,
      couponDiscount: 0,
      isCouponLoading: null,
      error: "",
    },
    payNow: false,
    upfront: true,
    isLoading: true,
  };

  async componentDidMount() {
    const { bookingInfo } = this.props;

    this.setState({ isLoading: true });

    const url = API_HOST_PROFILE_URL.replace(":id", bookingInfo.host._id);
    try {
      const {
        data: { listing, profile, reviews },
      } = await axios.get(url);
      // eslint-disable-next-line react/no-unused-state
      this.setState({ isLoading: false, listing, profile, reviews });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        message.destroy();
        return message
          .error("profile not found", 4)
          .then(() => this.props.history.push(Error404));
      }
      message.destroy();
      message
        .error("something went wrong", 4)
        .then(() => this.props.history.push(Error500));
    }
  }

  handleCouponChange = async e => {
    const code = e.target.value;
    if (!code) {
      return this.setState(prevState => ({
        couponInfo: {
          ...prevState.couponInfo,
          isCouponLoading: false,
          couponDiscount: 0,
          couponCode: "",
          error: "",
        },
      }));
    }
    // only send requests if the code is valid
    if (
      !code ||
      typeof code !== "string" ||
      code.length < 7 ||
      code.length > 14
    ) {
      this.setState(prevState => ({
        couponInfo: { ...prevState.couponInfo, couponCode: code },
      }));
    } else {
      this.setState(
        prevState => ({
          couponInfo: {
            ...prevState.couponInfo,
            couponCode: code,
            isCouponLoading: true,
            error: false,
          },
        }),
        async () => {
          try {
            const {
              data: {
                data: [couponInfo],
              },
            } = await axios.get(`${API_COUPON_URL}?code=${code}`);

            const {
              startDate: couponStart,
              endDate: couponEnd,
              discountRate,
              usedDays,
            } = couponInfo;

            const {
              bookingInfo: { startDate, endDate },
            } = this.props;

            const { discountDays } = getDiscountDays({
              bookingStart: startDate,
              bookingEnd: endDate,
              couponStart,
              couponEnd,
              usedDays,
            });
            this.setState(prevState => {
              const newCouponState = {
                ...prevState.couponInfo,
                discountDays,
                discountRate,
                couponDiscount:
                  (calculatePrice(discountDays) * discountRate) / 100,
                isCouponLoading: false,
                error: false,
              };
              if (discountDays === 0) {
                newCouponState.error =
                  "the coupon is expired or doesn't cover this booking period";
              }
              return { couponInfo: newCouponState };
            });
          } catch (error) {
            let errorMsg = "something went wrong";
            if (error.response && error.response.status === 404) {
              errorMsg = "wrong code ..";
            }
            this.setState(prevState => ({
              couponInfo: {
                ...prevState.couponInfo,
                isCouponLoading: false,
                error: errorMsg,
                couponDiscount: 0,
              },
            }));
          }
        },
      );
    }
  };

  handlePayNowClick = payNow => this.setState({ payNow });

  handlePaymentMethod = upfront => this.setState({ upfront });

  render() {
    const { bookingInfo, role } = this.props;
    const { _id: bookingId, installments, coupons } = bookingInfo;

    const name = bookingInfo.host && bookingInfo.host.name;

    const {
      isLoading,
      listing,
      profile,
      couponInfo,
      payNow,
      upfront,
    } = this.state;

    const { photos, address } = listing;
    const {
      profileImage,
      badge,
      bio,
      organisation,
      jobTitle,
      school,
      hometown,
      gender,
    } = profile;

    const listingPhotos = {};
    if (photos[0]) {
      listingPhotos.img1 = photos[0].url;
      listingPhotos.img2 = photos[1].url;
      listingPhotos.img3 = photos[2].url;
    }

    let firstUnpaidInstallment;
    if (installments[0]) {
      firstUnpaidInstallment = getFirstUnpaidInstallment(installments);
    }

    let newInstallments = [];
    const { price, startDate, endDate } = bookingInfo;
    const { couponDiscount } = couponInfo;
    const netAmount = price - couponDiscount;
    if (!installments[0]) {
      newInstallments = createInstallments(
        netAmount,
        startDate,
        endDate,
        upfront,
      );
    }

    const paymentInfo = installments[0]
      ? firstUnpaidInstallment
      : newInstallments;

    let renderedAddress = address;
    if (bookingInfo.status !== "confirmed") {
      const addressArr = address ? address.split("\n") : [];
      renderedAddress = `${addressArr[0]} `;
      if (addressArr[2]) renderedAddress += addressArr[2].slice(0, 3);
    }

    if (isLoading) return <Spin />;
    return (
      <PageWrapper>
        <Elements>
          <PayNowModal
            couponInfo={
              couponInfo.error ? { ...couponInfo, couponCode: "" } : couponInfo
            }
            bookingId={bookingInfo._id}
            paymentInfo={paymentInfo}
            visible={payNow}
            handlePayNowClick={this.handlePayNowClick}
          />
        </Elements>
        <Header justifyContent="space-between">
          <div style={{ display: "flex", width: "80%" }}>
            <ProfilePicDiv
              src={(profileImage && profileImage.url) || randomProfile}
              defaultPic={randomProfile}
              adminView={bookingInfo.status === "confirmed"}
            />
            <HeaderDiv>
              <Headline>
                {name}
                <span>
                  {(jobTitle || organisation) &&
                    ` (${jobTitle ? `A ${jobTitle}` : ""} ${
                      organisation ? `at ${organisation}` : ""
                    })`}
                </span>
              </Headline>

              <Address>
                {!renderedAddress.includes("undefined") ? renderedAddress : ""}
              </Address>
            </HeaderDiv>
          </div>
          {badge && <Symbol src={starSign} />}
        </Header>
        <ListingGallery {...listingPhotos} isLoading={isLoading} />
        <Row gutter={24}>
          {/* ToDo add loading skeleton */}
          <Col lg={16} md={14} sm={24}>
            <section>
              <SectionWrapperContent style={{ minHeight: 200 }}>
                <SectionTitle>About me</SectionTitle>
                <ParagraphHeadline>
                  {jobTitle} - {organisation}
                </ParagraphHeadline>
                <Paragraph>{bio}</Paragraph>
                <AboutSectionDataContainer>
                  {!!name && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>Name:</AboutSectionDataCell>
                      <AboutSectionDataCell>{name}</AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                  {!!renderedAddress && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>Address:</AboutSectionDataCell>
                      <AboutSectionDataCell>
                        {renderedAddress.split("\n").map(data => (
                          <div key={data}>{data}</div>
                        ))}
                      </AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                  {!!school && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>
                        University / School:
                      </AboutSectionDataCell>
                      <AboutSectionDataCell>{school}</AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                  {!!hometown && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>
                        Hometown:
                      </AboutSectionDataCell>
                      <AboutSectionDataCell>{hometown}</AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                  {!!gender && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>Gender:</AboutSectionDataCell>
                      <AboutSectionDataCell>{gender}</AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                </AboutSectionDataContainer>
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
            {bookingInfo.status === "confirmed" ? (
              <>
                <Checklist bookingInfo={bookingInfo} userRole="intern" />
                <PaymentsPlan
                  handlePaymentMethod={this.handlePaymentMethod}
                  handlePayNowClick={this.handlePayNowClick}
                  handleNewInstallments={this.handleNewInstallments}
                  handleCouponChange={this.handleCouponChange}
                  data={{
                    installments,
                    newInstallments,
                    isLoading,
                    ...bookingInfo,
                    couponInfo,
                  }}
                  role={role}
                />
              </>
            ) : null}
          </Col>
          <Col lg={8} md={10} sm={24}>
            <BookingInfo
              isLoading={isLoading}
              handlePayNowClick={this.handlePayNowClick}
              data={{
                bookingId,
                ...bookingInfo,
                installments,
                firstUnpaidInstallment,
                coupons,
                couponDiscount: couponInfo.couponDiscount,
              }}
              role={role}
            />
          </Col>
        </Row>
      </PageWrapper>
    );
  }
}
