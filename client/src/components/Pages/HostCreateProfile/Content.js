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
  PhotoWrapper
} from "./HostCreateProfile.style";

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

class Content extends Component {
  render() {
    const {
      handleOtherInfo,
      handleAddProfile,
      handelInputChange,
      handleSubmit,
      disabledStartDate,
      disabledEndDate,
      onEndChange,
      onStartChange,
      handleAddMoreRanges,
      state
    } = this.props;
    const pressPassFileName = state.pressPass.file
      ? state.pressPass.file.name
      : "";

    return (
      <PageWrapper>
        <ContentWrapper>
          <HeaderWrapper>
            <Row gutter={20} type="flex" justify="start">
              <Col span={2}>
                <Avatar
                  size="large"
                  icon="user"
                  style={{ marginRight: "26px" }}
                  src={state.profileImage.dataUrl}
                />
              </Col>
              <Col span={20}>
                <HiText>Hi Emily, please complete your profile</HiText>
                <HeaderButtonsWrapper>
                  <UploadButton as="label" htmlFor="profileImage">
                    Add profile photo
                  </UploadButton>
                  <p>{state.errors.profileImage}</p>
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
                  <TextArea
                    name="bio"
                    onChange={handelInputChange}
                    rows={7}
                    id="bio"
                    style={{ marginBottom: "40px" }}
                    placeholder="Introduce yourself to interns"
                    value={state.bio}
                  />
                </Col>
                <Col xs={24} lg={10}>
                  <Label htmlFor="interests">Interests</Label>
                  <TextArea
                    namr="interests"
                    onChange={handelInputChange}
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
                  <Input
                    name="organisationName"
                    onChange={handelInputChange}
                    value={state.organisationName}
                    id="organisationName"
                    style={{ marginBottom: "20px" }}
                  />
                </Col>

                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="organisationWebsite">
                    Organisation website
                  </Label>
                  <Input
                    name="organisationWebsite"
                    onChange={handelInputChange}
                    value={state.organisationWebsite}
                    id="organisationWebsite"
                    style={{ marginBottom: "20px" }}
                  />
                </Col>
              </Row>

              <Row gutter={25} type="flex">
                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="jobTitle">Job title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    onChange={handelInputChange}
                    value={state.jobTitle}
                    style={{ marginBottom: "20px" }}
                  />
                </Col>

                <Col xs={24} sm={15} lg={12}>
                  <Label htmlFor="Press pass">Press pass</Label>
                  <Row gutter={25} type="flex">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Col xs={18} sm={18} lg={18}>
                        <Input
                          id="Press pass"
                          style={{ marginBottom: "20px", display: "inline" }}
                          value={pressPassFileName}
                          placeholder="No file has been uploaded"
                          disabled={!!pressPassFileName}
                        />
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
                  <Input
                    name="addressLine1"
                    placeholder="Address line 1"
                    id="addressline1"
                    onChange={handelInputChange}
                    value={state.addressLine1}
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    name="addressline2"
                    onChange={handelInputChange}
                    value={state.addressline2}
                    placeholder="Address line 2"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    name="addressCity"
                    value={state.addressCity}
                    onChange={handelInputChange}
                    placeholder="City"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    name="addressPostCode"
                    value={state.addressPostCode}
                    onChange={handelInputChange}
                    placeholder="Postcode"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                </Col>
                <Col xs={24} sm={24} lg={16}>
                  <Label>Photos</Label>
                  <Row gutter={25} type="flex">
                    <Col xs={24} sm={16} lg={16}>
                      <PhotoWrapper imageSrc={state.offerImages1.dataUrl}>
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
                        <Checkbox value="NOften away">
                          No other flatmates
                        </Checkbox>
                      </Col>
                    </Row>
                  </CheckboxGroup>
                </Col>
                <Col xs={24} sm={24} lg={16}>
                  <Label htmlFor="Your neighbourhood">Your neighbourhood</Label>
                  <TextArea
                    placeholder="Say a few things about your neighbourhood"
                    id="Your neighbourhood"
                    rows={5}
                  />
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
                    <UploadText
                      style={{
                        marginTop: "20px",
                        display: "block"
                      }}
                      onClick={handleAddMoreRanges}
                    >
                      + Add more
                    </UploadText>
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
