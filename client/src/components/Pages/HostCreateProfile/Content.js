import React, { Component } from "react";
import { Row, Col, Avatar, Divider, Input, Checkbox, DatePicker } from "antd";

import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  HiText,
  HeaderButtonsWrapper,
  Section,
  SectionTitle,
  SectionWrapperContent,
  Label,
  UploadText,
  UploadButton,
  PhotoWrapper,
  ErrorWrapper,
  Error
} from "./HostCreateProfile.style";

import { ProgressBar, ProgressRing } from "../../Common/progress";

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

class Content extends Component {
  render() {
    const {
      handleOtherInfo,
      directUploadToGoogle,
      handleInputChange,
      handleSubmit,
      disabledStartDate,
      disabledEndDate,
      onEndChange,
      onStartChange,
      handleAddMoreRanges,
      state,
      name
    } = this.props;

    const {
      profileImage: {
        dataUrl: profileImageDataUrl,
        isLoading: isProfileImageLoading,
        loading: profileImageLoading
      },
      offerImages1: {
        dataUrl: offerImages1DataUrl,
        loading: offerImages1Loading,
        isLoading: isOfferImages1Loading
      },
      offerImages2: {
        dataUrl: offerImages2DataUrl,
        loading: offerImages2Loading,
        isLoading: isOfferImages2Loading
      },
      offerImages3: {
        dataUrl: offerImages3DataUrl,
        loading: offerImages3Loading,
        isLoading: isOfferImages3Loading
      },
      errors
    } = state;

    return (
      <PageWrapper>
        <ContentWrapper>
          <HeaderWrapper>
            <Row gutter={20} type="flex" justify="start">
              <Col xs={24} sm={4} lg={3}>
                <ErrorWrapper>
                  <div style={{ textAlign: "center" }}>
                    {/*neccesarry for ProgressRing*/}
                    <div style={{ position: "relative", width: 86 }}>
                      <ProgressRing
                        radius={43}
                        stroke={2}
                        progress={profileImageLoading}
                        style={{
                          position: "absolute",
                          zIndex: 1,
                          left: 0,
                          marginTop: -3
                        }}
                      />
                      <Avatar
                        size="large"
                        icon="user"
                        src={profileImageDataUrl}
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "0 auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "42px",
                          backgroundColor: errors.profileImage ? "red" : "none"
                        }}
                      />
                    </div>
                  </div>
                  <Error>{errors.profileImage}</Error>
                </ErrorWrapper>
              </Col>
              <Col span={20}>
                <HiText>
                  Hi {name.split(" ")[0]}, please complete your profile
                </HiText>
                <HeaderButtonsWrapper>
                  {isProfileImageLoading ? (
                    <UploadButton disabled>Add profile photo</UploadButton>
                  ) : (
                    <UploadButton as="label" htmlFor="profileImage">
                      Add profile photo
                    </UploadButton>
                  )}
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={directUploadToGoogle}
                    accept="image/*"
                    style={{ display: "none" }}
                    data-is-private="false"
                  />
                  <UploadButton onClick={handleSubmit}>Submit</UploadButton>
                </HeaderButtonsWrapper>
              </Col>
            </Row>
          </HeaderWrapper>

          <Section>
            <SectionTitle>About me</SectionTitle>
            <SectionWrapperContent>
              <Row gutter={25} type="flex">
                <Col xs={24} lg={14}>
                  <Label htmlFor="bio">Bio</Label>
                  <ErrorWrapper error={errors.bio} marginBottom="40px">
                    <TextArea
                      name="bio"
                      onChange={handleInputChange}
                      rows={7}
                      id="bio"
                      placeholder="Introduce yourself to interns"
                      value={state.bio}
                      style={{
                        border: errors.bio ? "none" : "1px solid #d9d9d9"
                      }}
                    />
                    <Error>{errors.bio}</Error>
                  </ErrorWrapper>
                </Col>
                <Col xs={24} lg={10}>
                  <Label htmlFor="interests">Interests</Label>
                  <TextArea
                    name="interests"
                    onChange={handleInputChange}
                    rows={7}
                    id={"interests"}
                    placeholder="Add some of your interests"
                    style={{ marginBottom: "40px" }}
                  />
                </Col>
              </Row>
              <Row gutter={25} type="flex">
                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="organisationName">Organisation</Label>
                  <ErrorWrapper
                    error={errors.organisationName}
                    marginBottom="20px"
                  >
                    <Input
                      name="organisationName"
                      onChange={handleInputChange}
                      value={state.organisationName}
                      id="organisationName"
                      style={{
                        border: errors.organisationName
                          ? "none"
                          : "1px solid #d9d9d9"
                      }}
                    />
                    <Error>{errors.organisationName}</Error>
                  </ErrorWrapper>
                </Col>

                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="organisationWebsite">
                    Organisation website
                  </Label>
                  <ErrorWrapper
                    error={errors.organisationWebsite}
                    marginBottom="20px"
                  >
                    <Input
                      name="organisationWebsite"
                      onChange={handleInputChange}
                      value={state.organisationWebsite}
                      id="organisationWebsite"
                      style={{
                        border: errors.organisationWebsite
                          ? "none"
                          : "1px solid #d9d9d9"
                      }}
                    />
                    <Error>{errors.organisationWebsite}</Error>
                  </ErrorWrapper>
                </Col>
              </Row>

              <Row gutter={25} type="flex">
                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="jobTitle">Job title</Label>
                  <ErrorWrapper error={errors.jobTitle} marginBottom="20px">
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      onChange={handleInputChange}
                      value={state.jobTitle}
                      style={{
                        border: errors.jobTitle ? "none" : "1px solid #d9d9d9"
                      }}
                    />
                    <Error>{errors.jobTitle}</Error>
                  </ErrorWrapper>
                </Col>
              </Row>
            </SectionWrapperContent>
          </Section>
          {/* Your PressPad offer */}
          <Section>
            <SectionTitle>Your PressPad offer</SectionTitle>
            <SectionWrapperContent>
              <Row gutter={25} type="flex">
                {/* Address */}
                <Col xs={24} sm={24} lg={8}>
                  <Label htmlFor="addressline1">Address</Label>
                  <ErrorWrapper marginBottom="10px">
                    <Input
                      name="addressLine1"
                      placeholder="Street"
                      id="addressline1"
                      onChange={handleInputChange}
                      value={state.addressLine1}
                      style={{
                        display: "inline",
                        border: errors.addressLine1
                          ? "1px solid red"
                          : "1px solid #dbdbdb"
                      }}
                    />
                    <Error style={{ position: "relative" }}>
                      {errors.addressLine1}
                    </Error>
                  </ErrorWrapper>
                  <ErrorWrapper marginBottom="10px">
                    <Input
                      name="addressLine2"
                      onChange={handleInputChange}
                      value={state.addressLine2}
                      placeholder="Borough"
                      style={{
                        display: "inline",
                        border: errors.addressLine2
                          ? "1px solid red"
                          : "1px solid #d9d9d9"
                      }}
                    />
                    <Error style={{ position: "relative" }}>
                      {errors.addressLine2}
                    </Error>
                  </ErrorWrapper>
                  <ErrorWrapper marginBottom="10px">
                    <Input
                      name="addressCity"
                      value={state.addressCity}
                      onChange={handleInputChange}
                      placeholder="City"
                      style={{
                        display: "inline",
                        border: errors.addressCity
                          ? "1px solid red"
                          : "1px solid #d9d9d9"
                      }}
                    />
                    <Error style={{ position: "relative" }}>
                      {state.errors.addressCity}
                    </Error>
                  </ErrorWrapper>
                  <ErrorWrapper marginBottom="10px">
                    <Input
                      name="addressPostCode"
                      value={state.addressPostCode}
                      onChange={handleInputChange}
                      placeholder="Postcode"
                      style={{
                        display: "inline",
                        border: errors.addressPostCode
                          ? "1px solid red"
                          : "1px solid #d9d9d9"
                      }}
                    />
                    <Error style={{ position: "relative" }}>
                      {errors.addressPostCode}
                    </Error>
                  </ErrorWrapper>
                </Col>
                <Col xs={24} sm={24} lg={16}>
                  <Label>Photos</Label>
                  <Row gutter={25} type="flex">
                    <Col xs={24} sm={16} lg={16}>
                      <ErrorWrapper marginBottom="12.5px">
                        <ProgressBar progress={offerImages1Loading}>
                          <PhotoWrapper
                            imageSrc={offerImages1DataUrl}
                            error={errors.offerImages1}
                          >
                            {isOfferImages1Loading ? (
                              <UploadButton disabled>Add photo</UploadButton>
                            ) : (
                              <UploadButton as="label" htmlFor="offerImages1">
                                Add photo
                                <input
                                  type="file"
                                  id="offerImages1"
                                  onChange={directUploadToGoogle}
                                  name="offerImages1"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  data-is-private="false"
                                />
                              </UploadButton>
                            )}
                          </PhotoWrapper>
                        </ProgressBar>
                        <Error>{errors.offerImages1}</Error>
                      </ErrorWrapper>
                    </Col>
                    <Col xs={24} sm={8} lg={8}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "100%"
                        }}
                      >
                        <ErrorWrapper marginBottom="12.5px">
                          <ProgressBar
                            progress={offerImages2Loading}
                            height="calc( (257px / 2) - 12.5px)"
                          >
                            <PhotoWrapper
                              small
                              imageSrc={offerImages2DataUrl}
                              error={errors.offerImages2}
                            >
                              {isOfferImages2Loading ? (
                                <UploadButton disabled>Add photo</UploadButton>
                              ) : (
                                <UploadButton as="label" htmlFor="offerImages2">
                                  Add photo
                                  <input
                                    type="file"
                                    id="offerImages2"
                                    onChange={directUploadToGoogle}
                                    name="offerImages2"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    data-is-private="false"
                                  />
                                </UploadButton>
                              )}
                            </PhotoWrapper>
                          </ProgressBar>
                          <Error>{errors.offerImages2}</Error>
                        </ErrorWrapper>

                        <ErrorWrapper marginBottom="12.5px">
                          <ProgressBar
                            progress={offerImages3Loading}
                            height="calc( (257px / 2) - 12.5px)"
                          >
                            <PhotoWrapper
                              small
                              imageSrc={offerImages3DataUrl}
                              error={errors.offerImages3}
                            >
                              {isOfferImages3Loading ? (
                                <UploadButton disabled>Add photo</UploadButton>
                              ) : (
                                <UploadButton as="label" htmlFor="offerImages3">
                                  Add photo
                                  <input
                                    type="file"
                                    id="offerImages3"
                                    onChange={directUploadToGoogle}
                                    name="offerImages3"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    data-is-private="false"
                                  />
                                </UploadButton>
                              )}
                            </PhotoWrapper>
                          </ProgressBar>
                          <Error>{errors.offerImages3}</Error>
                        </ErrorWrapper>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={25} type="flex">
                <Col xs={24} sm={24} lg={8}>
                  {/* Other information */}
                  <Label htmlFor="Other information">Other information</Label>

                  <CheckboxGroup
                    style={{ width: "100%" }}
                    onChange={handleOtherInfo}
                  >
                    <Row>
                      <Col sm={12} xs={24} style={{ marginBottom: "10px" }}>
                        <Checkbox value="Pets allowed">Pets allowed</Checkbox>
                      </Col>
                      <Col sm={12} xs={24} style={{ marginBottom: "10px" }}>
                        <Checkbox value="LGBTQ friendly">
                          LGBTQ friendly
                        </Checkbox>
                      </Col>
                      <Col sm={12} xs={24} style={{ marginBottom: "10px" }}>
                        <Checkbox value="No kids">No kids</Checkbox>
                      </Col>
                      <Col sm={12} xs={24} style={{ marginBottom: "10px" }}>
                        <Checkbox value="Non-smoking">Non-smoking</Checkbox>
                      </Col>
                      <Col sm={12} xs={24} style={{ marginBottom: "10px" }}>
                        <Checkbox value="No other flatmates">
                          No other flatmates
                        </Checkbox>
                      </Col>
                      <Col sm={12} xs={24} style={{ marginBottom: "10px" }}>
                        <Checkbox value="NOften away">Often away</Checkbox>
                      </Col>
                    </Row>
                  </CheckboxGroup>
                </Col>
                <Col xs={24} sm={24} lg={16}>
                  <Label htmlFor="offerDescription">Your neighbourhood</Label>
                  <ErrorWrapper
                    error={errors.offerDescription}
                    marginBottom="10px"
                  >
                    <TextArea
                      placeholder="Say a few things about your neighbourhood"
                      id="offerDescription"
                      rows={5}
                      name="offerDescription"
                      onChange={handleInputChange}
                      value={state.offerDescription}
                    />
                    <Error>{errors.offerDescription}</Error>
                  </ErrorWrapper>
                </Col>
              </Row>
              <Row gutter={25} type="flex">
                <Col xs={24}>
                  <Label>Availability</Label>

                  <Row gutter={25} type="flex">
                    <Col xs={24} lg={12}>
                      {state.availableDates.map((item, index) => (
                        <div key={index} style={{ marginBottom: "25px" }}>
                          {index !== 0 && (
                            <Divider
                              style={{
                                marginTop: "25px",
                                background: "none"
                              }}
                            />
                          )}
                          <Col xs={24} sm={2}>
                            <Label light>From</Label>
                          </Col>

                          <Col xs={24} sm={10}>
                            <DatePicker
                              disabledDate={value =>
                                disabledStartDate(index, value)
                              }
                              format="YYYY-MM-DD"
                              value={item.startDate}
                              placeholder="Start"
                              onChange={value => onStartChange(index, value)}
                            />
                          </Col>
                          <Col xs={24} sm={2}>
                            <Label light>Until</Label>
                          </Col>
                          <Col xs={24} sm={10}>
                            <DatePicker
                              disabledDate={value =>
                                disabledEndDate(index, value)
                              }
                              format="YYYY-MM-DD"
                              value={item.endDate}
                              placeholder="End"
                              onChange={value => onEndChange(index, value)}
                              open={item.endOpen}
                            />
                          </Col>
                        </div>
                      ))}
                    </Col>
                  </Row>
                  {state.availableDates.length > 0 && (
                    <>
                      <UploadText
                        style={{
                          marginTop: "20px",
                          display: "block"
                        }}
                        onClick={handleAddMoreRanges}
                      >
                        + Add more
                      </UploadText>
                      <Error>{errors.availableDates}</Error>
                    </>
                  )}
                </Col>
              </Row>
            </SectionWrapperContent>
          </Section>
        </ContentWrapper>
      </PageWrapper>
    );
  }
}

export default Content;
