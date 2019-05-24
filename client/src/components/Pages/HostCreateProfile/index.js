import React, { Component } from "react";
import {
  Row,
  Col,
  Avatar,
  Divider,
  Input,
  Checkbox,
  DatePicker,
  message
} from "antd";
import * as Yup from "yup";

import {
  disabledEndDate,
  disabledStartDate,
  checkSelectedRange
} from "./helpers";

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

const MILLISECONDS_IN_A_DAY = 86400000;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const schema = Yup.object().shape({
  profileImage: Yup.mixed().required("Required"),
  bio: Yup.string().required("Required"),
  organisationName: Yup.string().required("Required"),
  organisationWebsite: Yup.string()
    .url("Not a valid link")
    .required("Required"),
  jobTitle: Yup.string().required("Required"),
  pressPass: Yup.mixed().required("Required")
});

class InternCreateProfile extends Component {
  state = {
    profileImage: {
      dataUrl: null,
      file: null
    },
    bio: "",
    interests: "",
    organisationName: "",
    organisationWebsite: "",

    jobTitle: "",
    addressLine1: "",
    addressLine2: "",
    addressCity: "",
    addressPostCode: "",
    offerDescription: "",
    offerOtherInfo: [],

    availableDates: [
      {
        startDate: null,
        endDate: null,
        startValue: null,
        endValue: null,
        endOpen: false
      }
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
    pressPass: {},
    errors: {}
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

  hsndleSubmit = e => {
    const { profileImage, pressPass } = this.state;
    const state = {
      ...this.state,
      profileImage: profileImage.file,
      pressPass: pressPass.dataUrl
    };
    e.preventDefault();
    schema.validate(state, { abortEarly: false }).catch(err => {
      const errors = {};
      err.inner.forEach(element => {
        errors[element.path] = element.message;
      });
      console.log(errors);

      this.setState({ errors });
    });
  };

  disabledStartDate = (index, startValue) => {
    const { availableDates } = this.state;
    return disabledStartDate(index, startValue, availableDates);
  };

  disabledEndDate = (index, endValue) => {
    const { availableDates } = this.state;
    return disabledEndDate(index, endValue, availableDates);
  };

  changeSelectedDate = (index, field, value) => {
    const { availableDates } = this.state;

    const newAvailableDates = [...availableDates];
    const obj = {
      [field]: value
    };
    const { startValue } = newAvailableDates[index];

    let isDatePicked;
    if (field === "startValue") {
      obj.endOpen = true;
    } else if (field === "endValue") {
      obj.endOpen = false;

      isDatePicked = checkSelectedRange(startValue, value, newAvailableDates);
    }

    if (isDatePicked) {
      return message.warning("Cannot select intersected ranges");
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

  // add new available dates range
  handleAddMoreRanges = () => {
    const { availableDates } = this.state;

    const emptyRanges = availableDates.reduce((prev, curr) => {
      const { endValue, startValue } = curr;
      if (!endValue || !startValue) {
        return true;
      }
      return prev || false;
    }, false);

    if (emptyRanges) {
      return message.warning("fill the previous ranges");
    }

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
                <HeaderButtonsWrapper>
                  <UploadButton as="label" htmlFor="profileImage">
                    Add profile photo
                  </UploadButton>
                  <p>{this.state.errors.profileImage}</p>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={this.handleAddProfile}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <UploadButton onClick={this.hsndleSubmit}>
                    Submit
                  </UploadButton>
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
                  <Label htmlFor="organisationName">Organisation</Label>
                  <Input
                    name="organisationName"
                    onChange={this.handelInputChange}
                    value={this.state.organisationName}
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
                    onChange={this.handelInputChange}
                    value={this.state.organisationWebsite}
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
                    name="addressLine1"
                    placeholder="Address line 1"
                    id="addressline1"
                    onChange={this.handelInputChange}
                    value={this.state.addressLine1}
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    name="addressline2"
                    onChange={this.handelInputChange}
                    value={this.state.addressline2}
                    placeholder="Address line 2"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    name="addressCity"
                    value={this.state.addressCity}
                    onChange={this.handelInputChange}
                    placeholder="City"
                    style={{ marginBottom: "10px", display: "inline" }}
                  />
                  <Input
                    name="addressPostCode"
                    value={this.state.addressPostCode}
                    onChange={this.handelInputChange}
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
