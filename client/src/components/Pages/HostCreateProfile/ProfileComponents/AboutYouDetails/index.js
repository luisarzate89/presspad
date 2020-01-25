import React from "react";
import { Row, Col } from "antd";
import {
  SectionWrapper,
  SectionContent,
  Description
} from "../../../../Common/ProfileComponents/ProfileComponents.style";

import Title from "../../../../Common/ProfileComponents/Title";

import Field from "../../../../Common/ProfileComponents/Field";
import fields from "../../../../../constants/fields";

const AboutYouDetails = ({
  data = {},
  errors = {},
  handleChange,
  handleError,
  userId,
  role
}) => {
  return (
    <SectionWrapper>
      <Description>
        None of the details you supply below will be made public and will only
        be available to PressPad for verification purposes, to improve our
        service and to monitor our impact.
      </Description>
      <Title
        title="About you"
        hint="You need to fill out this information to use PressPad"
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
              role={role}
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
              role={role}
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
              role={role}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default AboutYouDetails;
