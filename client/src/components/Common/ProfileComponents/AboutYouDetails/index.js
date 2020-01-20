import React from "react";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "./../Title";
import { Row, Col } from "antd";
import Field from "./../Field";
import fields from "./../../../../constants/fields";

const AboutYouDetails = ({ errors = {}, handleError }) => {
  return (
    <SectionWrapper>
      <Title
        title="About you"
        hint="You need to fill out this information to use PressPad"
      />
      <SectionContent>
        <Row gutter={25} type="flex">
          <Col xs={24}>
            <Field {...fields["photoID"]} error={errors["photoID"]} />
          </Col>
          <Col xs={24}>
            <Field
              {...fields["hearAboutPressPadAnswer"]}
              error={errors["hearAboutPressPadAnswer"]}
            />
          </Col>
          <Col xs={24}>
            <Field {...fields["phoneNumber"]} error={errors["phoneNumber"]} />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default AboutYouDetails;
