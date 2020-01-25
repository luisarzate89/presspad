import React, { Component } from "react";
import axios from "axios";
import { Row, Col, message, Spin } from "antd";
import { Elements } from "react-stripe-elements";

import randomProfile from "../../../assets/random-profile.jpg";
import DisabledPopOver from "../../Common/DisabledPopOver";
import Checklist from "../../Common/Checklist";
import ListingGallery from "../../Common/Profile/ListingGallery";
import PaymentsPlan from "./PaymentsPlan";
import BookingInfo from "./BookingInfo";
import PayNowModal from "./PayNowModal";
import BookingRequestSection from "./BookingRequestSection";

import {
  getDiscountDays,
  calculatePrice,
  createInstallments,
  getFirstUnpaidInstallment,
} from "./helpers";

import {
  API_GET_BOOKING_URL,
  API_COUPON_URL,
} from "../../../constants/apiRoutes";
import { Error404, Error500 } from "../../../constants/navRoutes";

import {
  PageWrapper,
  SectionWrapperContent,
  SectionTitle,
  BlueLink,
} from "../../Common/general";
import {
  Header,
  ProfilePicDiv,
  HeaderDiv,
  Headline,
  Address,
  Symbol,
  ParagraphHeadline,
  Paragraph,
} from "../../Common/Profile/Profiles.style";

import {
  AboutSectionDataContainer,
  AboutSectionDataRow,
  AboutSectionDataCell,
} from "../InternProfile/HostView/HostView.style";

import starSign from "../../../assets/star-sign-symbol.svg";

export default class BookingView extends Component {
  state = {
    checklistObj: {},
    installments: [],
    newInstallments: [],
    listing: {
      userProfile: { organisation: {}, profileImage: {} },
      photos: [],
    },
    bookingInfo: {},
    couponInfo: {
      couponCode: "",
      discountDays: 0,
      discountRate: 0,
      couponDiscount: 0,
      isCouponLoading: null,
      error: "",
    },
    coupons: [],
    payNow: false,
    upfront: true,
    isLoading: null,
  };

  async componentDidMount() {
    const { role } = this.props;
    this.setState({ isLoading: true, role });
    const getBookingUrl = API_GET_BOOKING_URL.replace(
      ":id",
      this.props.match.params.id,
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
            endDate,
            coupons,
            intern: internId,
            _id: bookingId,
          },
        },
      } = await axios.get(getBookingUrl);
      const checklistObj = checkList.reduce((acc, curr) => {
        acc[curr._id] = { ...curr };
        return acc;
      }, {});

      this.setState({
        checklistObj,
        installments,
        listing,
        bookingInfo: {
          price,
          payedAmount,
          status,
          startDate,
          endDate,
          internId,
          bookingId,
        },
        coupons,
        isLoading: false,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
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
      checked,
    } = e.target;

    const { checklistObj } = this.state;
    try {
      await axios.patch(`/api/checkilsts/answers/${id}`, {
        isChecked: checked,
      });
      this.setState({
        checklistObj: {
          ...checklistObj,
          [id]: { ...checklistObj[id], isChecked: checked },
        },
      });
    } catch (err) {
      message.destroy();
      message.error("Something went wrong, try again later");
    }
  };

  handleCouponChange = async e => {
    const code = e.target.value;
    if (!code) {
      return this.setState({
        couponInfo: {
          ...this.state.couponInfo,
          isCouponLoading: false,
          couponDiscount: 0,
          couponCode: "",
          error: "",
        },
      });
    }
    // only send requests if the code is valid
    if (
      !code ||
      typeof code !== "string" ||
      code.length < 7 ||
      code.length > 14
    ) {
      this.setState({
        couponInfo: { ...this.state.couponInfo, couponCode: code },
      });
    } else {
      this.setState(
        {
          couponInfo: {
            ...this.state.couponInfo,
            couponCode: code,
            isCouponLoading: true,
            error: false,
          },
        },
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
            } = this.state;

            const { discountDays } = getDiscountDays({
              bookingStart: startDate,
              bookingEnd: endDate,
              couponStart,
              couponEnd,
              usedDays,
            });
            this.setState(prevState => {
              const newCouponState = {
                ...this.state.couponInfo,
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
            this.setState({
              couponInfo: {
                ...this.state.couponInfo,
                isCouponLoading: false,
                error: errorMsg,
                couponDiscount: 0,
              },
            });
          }
        },
      );
    }
  };

  handlePayNowClick = payNow => this.setState({ payNow });

  handlePaymentMethod = upfront => this.setState({ upfront });

  render() {
    const {
      listing: {
        address,
        photos,
        userProfile: {
          profileImage,
          badge,
          bio,
          organisation,
          jobTitle,
          user,
          school,
          hometown,
          gender,
        },
      },
      checklistObj,
      installments,
      coupons,
      couponInfo,
      isLoading,
      bookingInfo,
      payNow,
      upfront,
      role,
    } = this.state;
    const name = user && user[0] && user[0].name;

    const bookingId = this.props.match.params.id;

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

    if (isLoading) return <Spin />;
    return (
      <PageWrapper>
        <Elements>
          <PayNowModal
            couponInfo={
              couponInfo.error ? { ...couponInfo, couponCode: "" } : couponInfo
            }
            bookingId={bookingInfo.bookingId}
            paymentInfo={paymentInfo}
            visible={payNow}
            handlePayNowClick={this.handlePayNowClick}
          />
        </Elements>
        <Header>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", width: "90%" }}>
              <ProfilePicDiv
                src={(profileImage && profileImage.url) || randomProfile}
                onError={e => (e.target.src = randomProfile)}
                adminView={bookingInfo.status === "confirmed"}
              />
              <HeaderDiv>
                <Headline>
                  {name}
                  <span>
                    {(jobTitle || organisation) &&
                      ` - A ${jobTitle || "_"} at ${
                      organisation ? organisation.name : "_"
                      }`}
                  </span>
                </Headline>

                <Address>
                  {address &&
                    `${address.street ? `${address.street}, ` : ""}
                ${address.city ? address.city : ""}`}
                </Address>
              </HeaderDiv>
            </div>
            {badge && <Symbol src={starSign} />}
          </div>
        </Header>
        <ListingGallery {...listingPhotos} isLoading={isLoading} />
        <Row gutter={24}>
          {/* ToDo add loading skeleton */}
          <Col lg={16} md={14} sm={24}>
            <section>
              <SectionWrapperContent style={{ minHeight: 200 }}>
                <SectionTitle>About me</SectionTitle>
                <ParagraphHeadline>
                  {jobTitle} - {organisation.name}
                </ParagraphHeadline>
                <Paragraph>{bio}</Paragraph>
                <AboutSectionDataContainer>
                  {!!name && (
                    <AboutSectionDataRow>
                      <AboutSectionDataCell bold>Name:</AboutSectionDataCell>
                      <AboutSectionDataCell>{name}</AboutSectionDataCell>
                    </AboutSectionDataRow>
                  )}
                  {!!address && (
                    <>
                      {!!address.street && (
                        <AboutSectionDataRow>
                          <AboutSectionDataCell bold>
                            Address:
                          </AboutSectionDataCell>
                          <AboutSectionDataCell>
                            {address.street}
                          </AboutSectionDataCell>
                        </AboutSectionDataRow>
                      )}

                      {!!address.city && (
                        <AboutSectionDataRow>
                          <AboutSectionDataCell bold />
                          <AboutSectionDataCell>
                            {address.city}
                          </AboutSectionDataCell>
                        </AboutSectionDataRow>
                      )}

                      {!!address.postcode && (
                        <AboutSectionDataRow>
                          <AboutSectionDataCell bold />
                          <AboutSectionDataCell>
                            {address.postcode}
                          </AboutSectionDataCell>
                        </AboutSectionDataRow>
                      )}
                    </>
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
            {role === "host" && (
              <BookingRequestSection
                internId={this.state.bookingInfo.internId}
              />
            )}
            {bookingInfo.status === "confirmed" ? (
              <>
                <Checklist
                  checklistObj={checklistObj}
                  handleChange={this.handleChecklistChange}
                />
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
            ) : (
                ""
              )}
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
