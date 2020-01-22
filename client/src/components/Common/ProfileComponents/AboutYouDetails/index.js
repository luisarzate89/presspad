import React from "react";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "./../Title";
import { Row, Col } from "antd";
import Field from "./../Field";
import fields from "./../../../../constants/fields";

import { Description } from "./../ProfileComponents.style";

const AboutYouDetails = ({
  data = {},
  name = "",
  errors = {},
  handleChange,
  handleError,
  userId,
  isAdmin = false
}) => {
  return (
    <SectionWrapper>
      {!isAdmin && (
        <Description>
          None of the details you supply below will be made public and will only
          be available to PressPad for verification purposes, to improve our
          service and to monitor our impact.
        </Description>
      )}
      <Title
        title={isAdmin ? name : "About you"}
        hint={
          !isAdmin && "You need to fill out this information to use PressPad"
        }
      />
      <SectionContent>
        <Row gutter={25} type="flex">
          <Col xs={24} style={{ margin: "1rem 0" }}>
            <Field
              {...fields["photoID"]}
              value={data["photoID"]}
              error={errors["photoID"]}
              handleChange={handleChange}
              handleError={handleError}
              userId={userId}
            />
          </Col>
          <Col xs={24} md={16}>
            <Field
              {...fields["hearAboutPressPadAnswer"]}
              value={data["hearAboutPressPadAnswer"]}
              error={errors["hearAboutPressPadAnswer"]}
              handleChange={handleChange}
              handleError={handleError}
              userId={userId}
            />
          </Col>
        </Row>
        <Row gutter={25} type="flex">
          <Col xs={24} md={8} style={{ marginTop: "1rem" }}>
            <Field
              {...fields["phoneNumber"]}
              value={data["phoneNumber"]}
              error={errors["phoneNumber"]}
              handleChange={handleChange}
              handleError={handleError}
              userId={userId}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default AboutYouDetails;
