import React from "react";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "./../Title";
import { Row, Col } from "antd";
import Field from "./../Field";
import fields from "./../../../../constants/fields";

const OtherInformation = ({ errors = {}, handleError }) => {
  return (
    <SectionWrapper>
      <Title
        title="Other information"
        hint="You don’t need to answer now but will be required to fill these in before being able to complete a booking."
      />
      <SectionContent>
        <Row gutter={0}>
          <Col xs={24} sm={24}>
            <Field {...fields["organisation"]} error={errors["organisation"]} />
          </Col>
          <Col xs={24}>
            <Field
              {...fields["useReasonAnswer"]}
              error={errors["useReasonAnswer"]}
            />
          </Col>
          <Col xs={24}>
            <Field {...fields["issueAnswer"]} error={errors["issueAnswer"]} />
          </Col>
          <Col xs={24}>
            <Field
              {...fields["mentorDescribeAnswer"]}
              error={errors["mentorDescribeAnswer"]}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default OtherInformation;
