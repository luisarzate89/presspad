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

import { ProgressRing, ProgressBar } from "../../Common/progress/";

const { TextArea } = Input;

class Content extends Component {
  render() {
    const {
      handleInputChange,
      handleSubmit,
      state,
      directUploadToGoogle,
      name
    } = this.props;

    const {
      profileImage: {
        dataUrl: profileImageDataUrl,
        isLoading: isProfileImageLoading,
        loading: profileImageLoading
      },
      photoIDFile: {
        name: photoIDFileName,
        loading: photoIDLoading,
        isLoading: isPhotoIDLoading
      },
      offerLetter: {
        name: offerLetterName,
        loading: offerLetterLoading,
        isLoading: isOfferLetterLoading
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
                  <div
                    style={{
                      textAlign: "center"
                    }}
                  >
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
            <SectionTitile>About me</SectionTitile>
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
                          error={errors.PhotoID}
                          marginBottom="20px"
                        >
                          <ProgressBar progress={photoIDLoading}>
                            <Input
                              id="PhotoID"
                              style={{
                                border: errors.PhotoID
                                  ? "none"
                                  : "1px solid #d9d9d9",
                                display: "inline"
                              }}
                              value={photoIDFileName}
                              placeholder="No file has been uploaded"
                              disabled={!!photoIDFileName}
                            />
                          </ProgressBar>
                          <Error>{errors.photoID}</Error>
                        </ErrorWrapper>
                      </Col>
                      <Col xs={9} sm={9} lg={9}>
                        {isPhotoIDLoading ? (
                          <UploadText disabled>browse file</UploadText>
                        ) : (
                          <UploadText as="label" htmlFor="photoID">
                            browse file
                            <input
                              type="file"
                              id="photoID"
                              onChange={directUploadToGoogle}
                              name="photoIDFile"
                              style={{ display: "none" }}
                              data-is-private={true}
                            />
                          </UploadText>
                        )}
                      </Col>
                    </div>
                  </Row>
                  <Label htmlFor="offerLetter">Offer letter</Label>
                  <Row gutter={25} type="flex">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Col xs={20} sm={20} lg={20}>
                        <ErrorWrapper
                          error={errors.offerLetter}
                          marginBottom="20px"
                        >
                          <ProgressBar progress={offerLetterLoading}>
                            <Input
                              id="offerLetter2"
                              style={{
                                border: errors.offerLetter
                                  ? "none"
                                  : "1px solid #d9d9d9",
                                display: "inline"
                              }}
                              value={offerLetterName}
                              placeholder="No file has been uploaded"
                              disabled={!!offerLetterName}
                            />
                          </ProgressBar>
                          <Error>{errors.offerLetter}</Error>
                        </ErrorWrapper>
                      </Col>
                      <Col xs={9} sm={9} lg={9}>
                        {isOfferLetterLoading ? (
                          <UploadText disabled>browse file</UploadText>
                        ) : (
                          <UploadText as="label" htmlFor="offerLetter">
                            browse file
                            <input
                              type="file"
                              id="offerLetter"
                              onChange={directUploadToGoogle}
                              name="offerLetter"
                              data-is-private={true}
                              style={{ display: "none" }}
                            />
                          </UploadText>
                        )}
                      </Col>
                    </div>
                  </Row>
                </Col>
                <Col xs={24} lg={12}>
                  <Row gutter={0} type="flex">
                    <Col xs={24} sm={24}>
                      <Label htmlFor="reference1Name">Reference 1</Label>
                    </Col>
                    <Row gutter={25} type="flex">
                      <Col xs={24} sm={12}>
                        <ErrorWrapper
                          error={errors.reference1name}
                          marginBottom="20px"
                        >
                          <Input
                            name="reference1Name"
                            onChange={handleInputChange}
                            value={state.reference1.name}
                            placeholder="Name"
                            id="reference1Name"
                            style={{
                              border: errors.reference1Name
                                ? "none"
                                : "1px solid #d9d9d9"
                            }}
                          />
                          <Error>{errors.reference1name}</Error>
                        </ErrorWrapper>
                      </Col>
                      <Col xs={24} sm={12}>
                        <ErrorWrapper
                          error={errors.reference1contact}
                          marginBottom="20px"
                        >
                          <Input
                            name="reference1Contact"
                            onChange={handleInputChange}
                            value={state.reference1.contact}
                            placeholder="Contact"
                            style={{
                              border: errors.reference1contact
                                ? "none"
                                : "1px solid #d9d9d9"
                            }}
                          />
                          <Error>{errors.reference1contact}</Error>
                        </ErrorWrapper>
                      </Col>
                    </Row>
                  </Row>

                  <Row gutter={0} type="flex">
                    <Col xs={24} sm={24}>
                      <Label htmlFor="reference2Name">Reference 2</Label>
                    </Col>

                    <Row gutter={25} type="flex">
                      <Col xs={24} sm={12}>
                        <ErrorWrapper
                          error={errors.reference2name}
                          marginBottom="20px"
                        >
                          <Input
                            name="reference2Name"
                            onChange={handleInputChange}
                            value={state.reference2.name}
                            placeholder="Name"
                            id="reference2Name"
                            style={{
                              border: errors.reference2name
                                ? "none"
                                : "1px solid #d9d9d9"
                            }}
                          />
                          <Error>{errors.reference2name}</Error>
                        </ErrorWrapper>
                      </Col>
                      <Col xs={24} sm={12}>
                        <ErrorWrapper
                          error={errors.reference2contact}
                          marginBottom="20px"
                        >
                          <Input
                            name="reference2Contact"
                            onChange={handleInputChange}
                            value={state.reference2.contact}
                            placeholder="Contact"
                            style={{
                              border: errors.reference2contact
                                ? "none"
                                : "1px solid #d9d9d9"
                            }}
                          />
                          <Error>{errors.reference2contact}</Error>
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
