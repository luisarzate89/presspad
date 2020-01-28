import React from "react";
import { Row, Col } from "antd";
import {
  SectionWrapper,
  SectionContent,
} from "../../../../Common/ProfileComponents/ProfileComponents.style";

import Title from "../../../../Common/ProfileComponents/Title";
import Field from "../../../../Common/ProfileComponents/Field";
import fields from "../../../../../constants/fields";

const OtherInformationDetails = ({
  data = {},
  errors = {},
  handleChange,
  handleError,
  userId,
  role,
  isAdmin,
}) => {
  const props = {
    userId,
    role,
    readOnly: isAdmin,
    handleChange,
    handleError,
  };

  return (
    <SectionWrapper>
      <Title title="Other information" />
      <SectionContent>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["reference1Name"]}
              value={data["reference1"]}
              error={errors["reference1"]}
              {...props}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["reference1Email"]}
              value={data["reference1"]}
              error={errors["reference1"]}
              {...props}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["reference2Name"]}
              value={data["reference2"]}
              error={errors["reference2"]}
              {...props}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["reference2Email"]}
              value={data["reference2"]}
              error={errors["reference2"]}
              {...props}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={20}>
            <Field
              {...fields["DBSCheck"]}
              value={data["DBSCheck"]}
              error={errors["DBSCheck"]}
              {...props}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={20}>
            <Field
              {...fields["pressCard"]}
              value={data["pressCard"]}
              error={errors["pressCard"]}
              {...props}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default OtherInformationDetails;
