import React, { Component } from "react";
import { Row, Col, Avatar, Divider, Input, Checkbox, DatePicker } from "antd";

import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  HiText,
  HeaderButtonsWrapper,
  Section,
  SectionTitile,
  SectionWrapperContent,
  Label,
  UploadText,
  UploadButton,
  PhotoWrapper,
  ErrorWrapper,
  Error
} from "./HostCreateProfile.style";

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

class Content extends Component {
  render() {
    const {
      handleOtherInfo,
      handleAddProfile,
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
    const pressPassFileName = state.pressPass.file
      ? state.pressPass.file.name
      : "";

    return (
      <PageWrapper>
        <ContentWrapper>
          <HeaderWrapper>
            <Row gutter={20} type="flex" justify="start">
              <Col xs={24} sm={4} lg={3}>
                <ErrorWrapper>
                  <div
                    style={{
                      textAlign: "center"
                    }}
                  >
                    <Avatar
                      size="large"
                      icon="user"
                      src={state.profileImage.dataUrl}
                      style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "42px",
                        backgroundColor: state.errors.profileImage
                          ? "red"
                          : "none"
                      }}
                    />
                  </div>
                  <Error>{state.errors.profileImage}</Error>
                </ErrorWrapper>
              </Col>
              <Col span={20}>
                <HiText>
                  Hi {name.split(" ")[0]}, please complete your profile
                </HiText>
                <HeaderButtonsWrapper>
                  <UploadButton as="label" htmlFor="profileImage">
                    Add profile photo
                  </UploadButton>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={handleAddProfile}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <UploadButton onClick={handleSubmit}>Submit</UploadButton>
                </HeaderButtonsWrapper>
              </Col>
            </Row>
          </HeaderWrapper>

          <Section>
            <SectionTitile>About me</SectionTitile>
            <SectionWrapperContent>
              <Row gutter={25} type="flex">
                <Col xs={24} lg={14}>
                  <Label htmlFor="bio">Bio</Label>
                  <ErrorWrapper error={state.errors.bio} marginBottom="40px">
                    <TextArea
                      name="bio"
                      onChange={handleInputChange}
                      rows={7}
                      id="bio"
                      placeholder="Introduce yourself to interns"
                      value={state.bio}
                      style={{
                        border: state.errors.bio ? "none" : "1px solid #d9d9d9"
                      }}
                      border={false}
                    />
                    <Error>{state.errors.bio}</Error>
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
                    error={state.errors.organisationName}
                    marginBottom="20px"
                  >
                    <Input
                      name="organisationName"
                      onChange={handleInputChange}
                      value={state.organisationName}
                      id="organisationName"
                      style={{
                        border: state.errors.organisationName
                          ? "none"
                          : "1px solid #d9d9d9"
                      }}
                    />
                    <Error>{state.errors.organisationName}</Error>
                  </ErrorWrapper>
                </Col>

                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="organisationWebsite">
                    Organisation website
                  </Label>
                  <ErrorWrapper
                    error={state.errors.organisationWebsite}
                    marginBottom="20px"
                  >
                    <Input
                      name="organisationWebsite"
                      onChange={handleInputChange}
                      value={state.organisationWebsite}
                      id="organisationWebsite"
                      style={{
                        border: state.errors.organisationWebsite
                          ? "none"
                          : "1px solid #d9d9d9"
                      }}
                    />
                    <Error>{state.errors.organisationWebsite}</Error>
                  </ErrorWrapper>
                </Col>
              </Row>

              <Row gutter={25} type="flex">
                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="jobTitle">Job title</Label>
                  <ErrorWrapper
                    error={state.errors.jobTitle}
                    marginBottom="20px"
                  >
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      onChange={handleInputChange}
                      value={state.jobTitle}
                      style={{
                        border: state.errors.jobTitle
                          ? "none"
                          : "1px solid #d9d9d9"
                      }}
                    />
                    <Error>{state.errors.jobTitle}</Error>
                  </ErrorWrapper>
                </Col>

                <Col xs={24} sm={15} lg={12}>
                  <Label htmlFor="Press pass">Press pass</Label>
                  <Row gutter={25} type="flex">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Col xs={18} sm={18} lg={18}>
                        <ErrorWrapper
                          error={state.errors.pressPass}
                          marginBottom="20px"
                        >
                          <Input
                            id="Press pass"
                            style={{
                              border: state.errors.pressPass
                                ? "none"
                                : "1px solid #d9d9d9",
                              display: "inline"
                            }}
                            value={pressPassFileName}
                            placeholder="No file has been uploaded"
                            disabled={!!pressPassFileName}
                          />
                          <Error>{state.errors.pressPass}</Error>
                        </ErrorWrapper>
                      </Col>
                      <Col xs={9} sm={9} lg={9}>
                        <UploadText as="label" htmlFor="pressPass">
                          browse file
                          <input
                            type="file"
                            id="pressPass"
                            onChange={handleAddProfile}
                            name="pressPass"
                            style={{ display: "none" }}
                          />
                        </UploadText>
                      </Col>
                    </div>
                  </Row>
                </Col>
              </Row>
            </SectionWrapperContent>
          </Section>
          {/* Your PressPad offer */}
          <Section>
            <SectionTitile>Your PressPad offer</SectionTitile>
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
                        border: state.errors.addressLine1
                          ? "1px solid red"
                          : "1px solid #dbdbdb"
                      }}
                    />
                    <Error style={{ position: "relative" }}>
                      {state.errors.addressLine1}
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
                        border: state.errors.addressLine2
                          ? "1px solid red"
                          : "1px solid #d9d9d9"
                      }}
                    />
                    <Error style={{ position: "relative" }}>
                      {state.errors.addressLine2}
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
                        border: state.errors.addressCity
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
                        border: state.errors.addressPostCode
                          ? "1px solid red"
                          : "1px solid #d9d9d9"
                      }}
                    />
                    <Error style={{ position: "relative" }}>
                      {state.errors.addressPostCode}
                    </Error>
                  </ErrorWrapper>
                </Col>
                <Col xs={24} sm={24} lg={16}>
                  <Label>Photos</Label>
                  <Row gutter={25} type="flex">
                    <Col xs={24} sm={16} lg={16}>
                      <PhotoWrapper
                        imageSrc={state.offerImages1.dataUrl}
                        error={state.errors.offerImages1}
                      >
                        <UploadButton as="label" htmlFor="offerImages1">
                          Add photo
                          <input
                            type="file"
                            id="offerImages1"
                            onChange={handleAddProfile}
                            name="offerImages1"
                            accept="image/*"
                            style={{ display: "none" }}
                          />
                        </UploadButton>
                      </PhotoWrapper>
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
                        <PhotoWrapper
                          small
                          direction="bottom"
                          imageSrc={state.offerImages2.dataUrl}
                          error={state.errors.offerImages2}
                        >
                          <UploadButton as="label" htmlFor="offerImages2">
                            Add photo
                            <input
                              type="file"
                              id="offerImages2"
                              onChange={handleAddProfile}
                              name="offerImages2"
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                          </UploadButton>
                        </PhotoWrapper>

                        <PhotoWrapper
                          small
                          direction="top"
                          imageSrc={state.offerImages3.dataUrl}
                          error={state.errors.offerImages3}
                        >
                          <UploadButton as="label" htmlFor="offerImages3">
                            Add photo
                            <input
                              type="file"
                              id="offerImages3"
                              onChange={handleAddProfile}
                              name="offerImages3"
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                          </UploadButton>
                        </PhotoWrapper>
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
                    error={state.errors.offerDescription}
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
                    <Error>{state.errors.offerDescription}</Error>
                  </ErrorWrapper>
                </Col>
              </Row>
              <Row gutter={25} type="flex">
                <Col xs={24}>
                  <Label>Availability</Label>

                  <Row gutter={25} type="flex">
                    <Col xs={24} lg={12}>
                      {state.availableDates.map((item, index) => (
                        <>
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
                        </>
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
                      <Error>{state.errors.availableDates}</Error>
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
