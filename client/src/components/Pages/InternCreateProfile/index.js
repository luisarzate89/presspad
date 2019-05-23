import React, { Component } from "react";
import { Row, Col, Avatar, Divider, Input, Checkbox, DatePicker } from "antd";
import moment from "moment";

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

class InternCreateProfile extends Component {
  state = {
    profileImage: {
      dataUrl: null,
      file: null
    },
    bio: "",
    interests: "",
    organisation: {
      name: "",
      website: ""
    },
    jobTitle: "",
    offer: {
      // address
      line1: "",
      line2: "",
      city: "",
      postcode: "",

      description: "",
      otherInfo: [String],
      price: ""
    },
    availableDates: [
      {
        startDate: null,
        endDate: null,
        startValue: null,
        endValue: null,
        endOpen: false
      }
      // {
      //   startDate: null,
      //   endDate: null,
      //   startValue: null,
      //   endValue: null,
      //   endOpen: false
      // }
      // {
      //   startDate: null,
      //   endDate: null,
      //   startValue: null,
      //   endValue: null,
      //   endOpen: false
      // }
    ],
    offerImages1: {
      dataUrl: null,
      file: null
    },
    offerImages2: {
      dataUrl: null,
      file: null
    },
    offerImages3: {
      dataUrl: null,
      file: null
    },
    pressPass: {}
  };

  handleOtherInfo = otherInfo => {
    this.setState({ otherInfo });
  };

  handleAddProfile = ({ target }) => {
    const { files, name } = target;
    const image = files && files[0];
    var reader = new FileReader();

    reader.onload = () => {
      var dataUrl = reader.result;

      this.setState({
        [name]: {
          dataUrl,
          file: image
        }
      });
    };

    image && reader.readAsDataURL(image);
  };

  handelInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  nestedSetStat = (value, name, cb) => {
    const [parent, child] = name.split(".");
    const parentValue = this.state[parent];
    this.setState({ [parent]: { ...parentValue, [child]: value } }, () => {
      cb && cb();
    });
  };

  handelNestedInputChange = ({ target }) => {
    const { value, name } = target;
    this.nestedSetStat(value, name);
  };

  handlDateRage = (index, dateString) => {
    const [startDate, endDate] = dateString;

    const { availableDates } = this.state;
    const newAvailableDates = [...availableDates];
    newAvailableDates[index] = {
      startDate,
      endDate
    };

    this.setState({ availableDates: newAvailableDates });
  };

  disabledStartDate = (index, startValue) => {
    const endValue = this.state.availableDates[index].endValue;
    if (!startValue || !endValue) {
      return startValue && startValue < moment().endOf("day");
    }
    return (
      startValue.valueOf() > endValue.valueOf() ||
      (startValue && startValue < moment().endOf("day"))
    );
  };

  disabledEndDate = (index, endValue) => {
    const startValue = this.state.availableDates[index].startValue;
    if (!endValue || !startValue) {
      return endValue && endValue < moment().endOf("day");
    }
    return (
      endValue.valueOf() <= startValue.valueOf() ||
      (endValue && endValue < moment().endOf("day"))
    );
  };

  changeSelectedDate = (index, field, value) => {
    const { availableDates } = this.state;

    const newAvailableDates = [...availableDates];
    const obj = {
      [field]: value
    };

    if (field === "startValue") {
      obj.endOpen = true;
    } else if (field === "endValue") {
      obj.endOpen = false;
    }

    newAvailableDates[index] = { ...newAvailableDates[index], ...obj };

    this.setState({ availableDates: newAvailableDates });
  };

  onStartChange = (index, value) => {
    this.changeSelectedDate(index, "startValue", value);
  };

  onEndChange = (index, value) => {
    this.changeSelectedDate(index, "endValue", value);
  };

  handleAddMoreRanges = () => {
    const { availableDates } = this.state;
    const newAvailableDates = [...availableDates];
    newAvailableDates.push({
      startDate: null,
      endDate: null,
      startValue: null,
      endValue: null,
      endOpen: false
    });
    this.setState({ availableDates: newAvailableDates });
  };

  render() {
    const pressPassFileName = this.state.pressPass.file
      ? this.state.pressPass.file.name
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
                  src={this.state.profileImage.dataUrl}
                />
              </Col>
              <Col span={20}>
                <HiText>Hi Emily, please complete your profile</HiText>
                <AddProfilePhotoButton>
                  <UploadButton as="label" htmlFor="profileImage">
                    Add profile photo
                  </UploadButton>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={this.handleAddProfile}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </AddProfilePhotoButton>
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
                    onChange={this.handelInputChange}
                    rows={7}
                    id="bio"
                    style={{ marginBottom: "40px" }}
                    placeholder="Introduce yourself to interns"
                    value={this.state.bio}
                  />
                </Col>
                <Col xs={24} lg={10}>
                  <Label htmlFor="interests">Interests</Label>
                  <TextArea
                    namr="interests"
                    onChange={this.handelInputChange}
                    rows={7}
                    id={"interests"}
                    placeholder="Add some of your interests"
                    style={{ marginBottom: "40px" }}
                  />
                </Col>
              </Row>
              <Row gutter={25} type="flex">
                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="organisation">Organisation</Label>
                  <Input
                    name="organisation.name"
                    onChange={this.handelNestedInputChange}
                    value={this.state.organisation.name}
                    id="organisation"
                    style={{ marginBottom: "20px" }}
                  />
                </Col>

                <Col xs={24} sm={12} lg={9}>
                  <Label htmlFor="organisation.website">
                    Organisation website
                  </Label>
                  <Input
                    name="organisation.website"
                    onChange={this.handelNestedInputChange}
                    value={this.state.organisation.website}
                    id="organisation.website"
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
                    onChange={this.handelInputChange}
                    value={this.state.jobTitle}
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
                          disabled={!!pressPassFileName}
                        />
                      </Col>
                      <Col xs={9} sm={9} lg={9}>
                        <UploadText as="label" htmlFor="pressPass">
                          browse file
                          <input
                            type="file"
                            id="pressPass"
                            onChange={this.handleAddProfile}
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
                    name="offer.line1"
                    placeholder="Address line 1"
                    id="addressline1"
                    onChange={this.handelNestedInputChange}
                    value={this.state.offer.line1}
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    name="offer.line2"
                    onChange={this.handelNestedInputChange}
                    value={this.state.offer.line2}
                    placeholder="Address line 2"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    name="offer.city"
                    value={this.state.offer.city}
                    onChange={this.handelNestedInputChange}
                    placeholder="City"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    name="offer.postcode"
                    value={this.state.offer.postcode}
                    onChange={this.handelNestedInputChange}
                    placeholder="Postcode"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                </Col>
                <Col xs={24} sm={24} lg={16}>
                  <Label>Photos</Label>
                  <Row gutter={25} type="flex">
                    <Col xs={24} sm={16} lg={16}>
                      <PhotoWrapper imageSrc={this.state.offerImages1.dataUrl}>
                        <UploadButton as="label" htmlFor="offerImages1">
                          Add photo
                          <input
                            type="file"
                            id="offerImages1"
                            onChange={this.handleAddProfile}
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
                          imageSrc={this.state.offerImages2.dataUrl}
                        >
                          <UploadButton as="label" htmlFor="offerImages2">
                            Add photo
                            <input
                              type="file"
                              id="offerImages2"
                              onChange={this.handleAddProfile}
                              name="offerImages2"
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                          </UploadButton>
                        </PhotoWrapper>
                        <PhotoWrapper
                          small
                          direction="top"
                          imageSrc={this.state.offerImages3.dataUrl}
                        >
                          <UploadButton as="label" htmlFor="offerImages3">
                            Add photo
                            <input
                              type="file"
                              id="offerImages3"
                              onChange={this.handleAddProfile}
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
                    onChange={this.handleOtherInfo}
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
                      {this.state.availableDates.map((item, index) => (
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
                                  this.disabledStartDate(index, value)
                                }
                                format="YYYY-MM-DD"
                                value={item.startValue}
                                placeholder="Start"
                                onChange={value =>
                                  this.onStartChange(index, value)
                                }
                              />
                            </Col>
                            <Col xs={24} sm={2}>
                              <Label light>Until</Label>
                            </Col>
                            <Col xs={24} sm={10}>
                              <DatePicker
                                disabledDate={value =>
                                  this.disabledEndDate(index, value)
                                }
                                format="YYYY-MM-DD"
                                value={item.endValue}
                                placeholder="End"
                                onChange={value =>
                                  this.onEndChange(index, value)
                                }
                                open={item.endOpen}
                              />
                            </Col>
                          </div>
                        </>
                      ))}
                    </Col>
                  </Row>
                  {this.state.availableDates.length > 0 && (
                    <UploadText
                      style={{
                        marginTop: "20px",
                        display: "block"
                      }}
                      onClick={this.handleAddMoreRanges}
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

export default InternCreateProfile;
