import React from "react";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "./../Title";
import { Row, Col } from "antd";
import Field from "./../Field";
import fields from "./../../../../constants/fields";

const AboutYou = ({ errors = {}, handleError }) => {
  return (
    <SectionWrapper>
      <Title
        title="About you"
        hint="You need to fill out this information to use PressPad"
      />
      <SectionContent>
        <Row gutter={25} type="flex">
          <Col xs={24} sm={12}>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <Field {...fields["birthDate"]} error={errors["birthDate"]} />
              </Col>
              <Col xs={24} md={12}>
                <Field {...fields["hometown"]} error={errors["hometown"]} />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <Field {...fields["gender"]} error={errors["gender"]} />
              </Col>
              <Col xs={24} md={12}>
                <Field {...fields["school"]} error={errors["school"]} />
              </Col>
            </Row>

            <Row gutter={25}>
              <Col xs={24} md={12}>
                <Field
                  {...fields["profileImage"]}
                  error={errors["profileImage"]}
                />
              </Col>
              <Col xs={24} md={12}>
                <Field
                  {...fields["interests"]}
                  error={errors["interests"]}
                  handleError={handleError}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={12}>
            <Field {...fields["bio"]} error={errors["bio"]} />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default AboutYou;
