import React from "react";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "./../Title";
import { Row, Col } from "antd";
import Field from "./../Field";
import fields from "./../../../../constants/fields";

const OtherInformation = ({
  data = {},
  errors = {},
  handleChange,
  handleError
}) => {
  return (
    <SectionWrapper>
      <Title
        title="Other information"
        hint="You don’t need to answer now but will be required to fill these in before being able to complete a booking."
      />
      <SectionContent>
        <Row gutter={0}>
          <Col xs={24} sm={24}>
            <Field
              {...fields["organisation"]}
              value={data["organisation"]}
              error={errors["organisation"]}
              handleChange={handleChange}
            />
          </Col>
          <Col xs={24}>
            <Field
              {...fields["useReasonAnswer"]}
              value={data["useReasonAnswer"]}
              error={errors["useReasonAnswer"]}
              handleChange={handleChange}
            />
          </Col>
          <Col xs={24}>
            <Field
              {...fields["issueAnswer"]}
              value={data["issueAnswer"]}
              error={errors["issueAnswer"]}
              handleChange={handleChange}
            />
          </Col>
          <Col xs={24}>
            <Field
              {...fields["mentorDescribeAnswer"]}
              value={data["mentorDescribeAnswer"]}
              error={errors["mentorDescribeAnswer"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default OtherInformation;
