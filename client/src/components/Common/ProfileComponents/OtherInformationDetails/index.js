import React from "react";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "../Title";
import { Row, Col } from "antd";
import Field from "../Field";
import fields from "../../../../constants/fields";

const OtherInformationDetails = ({ errors = {}, handleError }) => {
  return (
    <SectionWrapper>
      <Title title="Other information" />
      <SectionContent>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["reference1Name"]}
              error={errors["reference1Name"]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["reference1Contact"]}
              error={errors["reference1Contact"]}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["reference2Name"]}
              error={errors["reference2Name"]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["reference2Contact"]}
              error={errors["reference2Contact"]}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field {...fields["offerLetter"]} error={errors["offerLetter"]} />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["internshipOfficeAddress"]}
              error={errors["internshipOfficeAddress"]}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["emergencyContactName"]}
              error={errors["emergencyContactName"]}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["emergencyContactNumber"]}
              error={errors["emergencyContactNumber"]}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["emergencyContactEmail"]}
              error={errors["emergencyContactEmail"]}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field {...fields["DBSCheck"]} error={errors["DBSCheck"]} />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default OtherInformationDetails;
