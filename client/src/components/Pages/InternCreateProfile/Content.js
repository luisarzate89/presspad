import React, { Component } from "react";
import { Row, Col, Avatar, Input } from "antd";

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
  ErrorWrapper,
  Error
} from "./InternCreateProfile.style";

const { TextArea } = Input;

class Content extends Component {
  render() {
    const {
      handleAddFile,
      handleInputChange,
      handleSubmit,
      state,
      name
    } = this.props;

    const pressPassFileName = state.pressPass.file
      ? state.pressPass.file.name
      : "";

    const photoIDFileName = state.photoIDFile.file
      ? state.photoIDFile.file.name
      : "";

    const offerLetterName = state.offerLetter.file
      ? state.offerLetter.file.name
      : "";

    return (
      <PageWrapper>
        <ContentWrapper>
          <HeaderWrapper>
            <Row gutter={20} type="flex" justify="start">
              <Col span={2}>
                <ErrorWrapper>
                  <Avatar
                    size="large"
                    icon="user"
                    src={state.profileImage.dataUrl}
                    style={{
                      backgroundColor: state.errors.profileImage
                        ? "red"
                        : "none",
                      marginRight: "26px"
                    }}
                  />
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
                    onChange={handleAddFile}
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
                  <Label htmlFor="favouriteArticle">Favourite article</Label>
                  <TextArea
                    name="favouriteArticle"
                    onChange={handleInputChange}
                    rows={7}
                    id="favouriteArticle"
                    placeholder="Share a short description of a recent article you liked"
                    style={{ marginBottom: "40px" }}
                  />
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
                            onChange={handleAddFile}
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

          <Section>
            <SectionTitile>Verify your details</SectionTitile>
            <SectionWrapperContent>
              <Row gutter={25} type="flex">
                <Col xs={24} lg={12}>
                  <Label htmlFor="photoID">Photo ID</Label>
                  <Row gutter={25} type="flex">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Col xs={20} sm={20} lg={20}>
                        <ErrorWrapper
                          error={state.errors.PhotoID}
                          marginBottom="20px"
                        >
                          <Input
                            id="PhotoID"
                            style={{
                              border: state.errors.PhotoID
                                ? "none"
                                : "1px solid #d9d9d9",
                              display: "inline"
                            }}
                            value={photoIDFileName}
                            placeholder="No file has been uploaded"
                            disabled={!!photoIDFileName}
                          />
                          <Error>{state.errors.photoID}</Error>
                        </ErrorWrapper>
                      </Col>
                      <Col xs={9} sm={9} lg={9}>
                        <UploadText as="label" htmlFor="photoID">
                          browse file
                          <input
                            type="file"
                            id="photoID"
                            onChange={handleAddFile}
                            name="photoIDFile"
                            style={{ display: "none" }}
                          />
                        </UploadText>
                      </Col>
                    </div>
                  </Row>
                  <Label htmlFor="offerLetter">Offer letter</Label>
                  <Row gutter={25} type="flex">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Col xs={20} sm={20} lg={20}>
                        <ErrorWrapper
                          error={state.errors.offerLetter}
                          marginBottom="20px"
                        >
                          <Input
                            id="offerLetter2"
                            style={{
                              border: state.errors.offerLetter
                                ? "none"
                                : "1px solid #d9d9d9",
                              display: "inline"
                            }}
                            value={offerLetterName}
                            placeholder="No file has been uploaded"
                            disabled={!!offerLetterName}
                          />
                          <Error>{state.errors.offerLetter}</Error>
                        </ErrorWrapper>
                      </Col>
                      <Col xs={9} sm={9} lg={9}>
                        <UploadText as="label" htmlFor="offerLetter">
                          browse file
                          <input
                            type="file"
                            id="offerLetter"
                            onChange={handleAddFile}
                            name="offerLetter"
                            style={{ display: "none" }}
                          />
                        </UploadText>
                      </Col>
                    </div>
                  </Row>
                </Col>
                <Col xs={24} lg={12}>
                  <Row gutter={25} type="flex">
                    <Label htmlFor="reference1Name">Reference 1</Label>
                    <Row gutter={25} type="flex">
                      <Col xs={24} sm={12}>
                        <ErrorWrapper
                          error={state.errors.reference1Name}
                          marginBottom="20px"
                        >
                          <Input
                            name="reference1Name"
                            onChange={handleInputChange}
                            value={state.reference1Name}
                            placeholder="Name"
                            id="reference1Name"
                            style={{
                              border: state.errors.reference1Name
                                ? "none"
                                : "1px solid #d9d9d9"
                            }}
                          />
                          <Error>{state.errors.reference1Name}</Error>
                        </ErrorWrapper>
                      </Col>
                      <Col xs={24} sm={12}>
                        <ErrorWrapper
                          error={state.errors.reference1Contanct}
                          marginBottom="20px"
                        >
                          <Input
                            name="reference1Contanct"
                            onChange={handleInputChange}
                            value={state.reference1Contanct}
                            placeholder="Contact"
                            style={{
                              border: state.errors.reference1Contanct
                                ? "none"
                                : "1px solid #d9d9d9"
                            }}
                          />
                          <Error>{state.errors.reference1Contanct}</Error>
                        </ErrorWrapper>
                      </Col>
                    </Row>
                  </Row>

                  <Row gutter={25} type="flex">
                    <Label htmlFor="reference2Name">Reference 2</Label>
                    <Row gutter={25} type="flex">
                      <Col xs={24} sm={12}>
                        <ErrorWrapper
                          error={state.errors.reference2Name}
                          marginBottom="20px"
                        >
                          <Input
                            name="reference2Name"
                            onChange={handleInputChange}
                            value={state.reference2Name}
                            placeholder="Name"
                            id="reference2Name"
                            style={{
                              border: state.errors.reference2Name
                                ? "none"
                                : "1px solid #d9d9d9"
                            }}
                          />
                          <Error>{state.errors.reference2Name}</Error>
                        </ErrorWrapper>
                      </Col>
                      <Col xs={24} sm={12}>
                        <ErrorWrapper
                          error={state.errors.reference2Contanct}
                          marginBottom="20px"
                        >
                          <Input
                            name="reference2Contanct"
                            onChange={handleInputChange}
                            value={state.reference2Contanct}
                            placeholder="Contact"
                            style={{
                              border: state.errors.reference2Contanct
                                ? "none"
                                : "1px solid #d9d9d9"
                            }}
                          />
                          <Error>{state.errors.reference2Contanct}</Error>
                        </ErrorWrapper>
                      </Col>
                    </Row>
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

export default Content;
