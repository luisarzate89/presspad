import React from "react";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "./../Title";
import { Row, Col } from "antd";
import Field from "./../Field";
import fields from "./../../../../constants/fields";

const AboutYouDetails = ({
  data = {},
  errors = {},
  handleChange,
  handleError
}) => {
  return (
    <SectionWrapper>
      <Title
        title="About you"
        hint="You need to fill out this information to use PressPad"
      />
      <SectionContent>
        <Row gutter={25} type="flex">
          <Col xs={24}>
            <Field
              {...fields["photoID"]}
              value={data["photoID"]}
              error={errors["photoID"]}
              handleChange={handleChange}
            />
          </Col>
          <Col xs={24}>
            <Field
              {...fields["hearAboutPressPadAnswer"]}
              value={data["hearAboutPressPadAnswer"]}
              error={errors["hearAboutPressPadAnswer"]}
              handleChange={handleChange}
            />
          </Col>
          <Col xs={24}>
            <Field
              {...fields["phoneNumber"]}
              value={data["phoneNumber"]}
              error={errors["phoneNumber"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default AboutYouDetails;
