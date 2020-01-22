import React from "react";
import { Row, Col } from "antd";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "../Title";
import Field from "../Field";
import fields from "../../../../constants/fields";

const OtherInformation = ({
  data = {},
  errors = {},
  handleChange,
  handleError,
  userId,
  role,
  isAdmin = false,
}) => (
  <SectionWrapper>
    <Title
      title="Other information"
      hint={
        !isAdmin &&
        "You don’t need to answer now but will be required to fill these in before being able to complete a booking."
      }
    />
    <SectionContent>
      <Row gutter={0}>
        <Col xs={24} md={8}>
          <Field
            {...fields["organisation"]}
            value={data["organisation"]}
            error={errors["organisation"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
        <Col xs={24}>
          <Field
            {...fields["useReasonAnswer"]}
            value={data["useReasonAnswer"]}
            error={errors["useReasonAnswer"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
        <Col xs={24}>
          <Field
            {...fields["issueAnswer"]}
            value={data["issueAnswer"]}
            error={errors["issueAnswer"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
        <Col xs={24}>
          <Field
            {...fields["mentorDescribeAnswer"]}
            value={data["mentorDescribeAnswer"]}
            error={errors["mentorDescribeAnswer"]}
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

export default OtherInformation;
