import React, { Component } from "react";
import { Row, Col, Avatar, Input, Checkbox, DatePicker } from "antd";
// import moment from "moment";

import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  HiText,
  AddProfilePhotoButton,
  Section,
  SectionTitile,
  SectionWrapperContent,
  Label,
  UploadText,
  UploadButton,
  PhotoWrapper
} from "./InternCreateProfile.style";
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;

function onChange(checkedValues) {
  console.log("checked = ", checkedValues);
}

class InternCreateProfile extends Component {
  render() {
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
                />
              </Col>
              <Col span={20}>
                <HiText>Hi Emily, please complete your profile</HiText>
                <AddProfilePhotoButton>
                  <UploadButton>Add profile photo</UploadButton>
                </AddProfilePhotoButton>
              </Col>
            </Row>
          </HeaderWrapper>

          <Section>
            <SectionTitile>About me</SectionTitile>
            <SectionWrapperContent>
              <Row gutter={25} type="flex">
                <Col xs={24} lg={14}>
                  <Label htmlFor="Bio">Bio</Label>
                  <TextArea
                    rows={7}
                    id="Bio"
                    style={{ marginBottom: "40px" }}
                    placeholder="Introduce yourself to interns"
                  />
                </Col>
                <Col xs={24} lg={10}>
                  <Label htmlFor="Interests">Interests</Label>
                  <TextArea
                    rows={7}
                    id={"Interests"}
                    placeholder="Add some of your interests"
                    style={{ marginBottom: "40px" }}
                  />
                </Col>
              </Row>
              <Row gutter={25} type="flex">
                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="Organisation">Organisation</Label>
                  <Input id="Organisation" style={{ marginBottom: "20px" }} />
                </Col>

                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="Organisation website">
                    Organisation website
                  </Label>
                  <Input
                    id="Organisation website"
                    style={{ marginBottom: "20px" }}
                  />
                </Col>
              </Row>

              <Row gutter={25} type="flex">
                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="Job title">Job title</Label>
                  <Input id="Job title" style={{ marginBottom: "20px" }} />
                </Col>

                <Col xs={24} sm={15} lg={12}>
                  <Label htmlFor="Press pass">Press pass</Label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Input
                      id="Press pass"
                      style={{ marginBottom: "20px", display: "inline" }}
                    />
                    <UploadText>browse file</UploadText>
                  </div>
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
                  <Label htmlFor="address">Address</Label>
                  <Input
                    placeholder="Address line 1"
                    id="address"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    placeholder="Address line 2"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    placeholder="City"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    placeholder="Postcode"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                </Col>
                <Col xs={24} sm={24} lg={16}>
                  <Label>Photos</Label>
                  <Row gutter={25} type="flex">
                    <Col xs={24} sm={16} lg={16}>
                      <PhotoWrapper>
                        <UploadButton>Add photo</UploadButton>
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
                        <PhotoWrapper small direction="bottom">
                          <UploadButton>Add photo</UploadButton>
                        </PhotoWrapper>
                        <PhotoWrapper small direction="top">
                          <UploadButton>Add photo</UploadButton>
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

                  <CheckboxGroup style={{ width: "100%" }} onChange={onChange}>
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
                <Col xs={24} sm={20} lg={16}>
                  <Label>Availability</Label>
                  <Row gutter={25} type="flex">
                    <Col xs={8} sm={8}>
                      <Label light>From</Label>
                    </Col>
                    <Col xs={8} sm={8}>
                      <Label light>To</Label>
                    </Col>
                  </Row>
                  <Row gutter={25} type="flex">
                    <Col xs={16} sm={16}>
                      <RangePicker onChange={onChange} />
                    </Col>
                    <Col xs={2} sm={2}>
                      <UploadText
                        style={{
                          marginBottom: 0,
                          display: "inline-block",
                          height: "100%"
                        }}
                      >
                        + Add more
                      </UploadText>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </SectionWrapperContent>
          </Section>
        </ContentWrapper>
      </PageWrapper>
    );
  }
}

export default InternCreateProfile;
