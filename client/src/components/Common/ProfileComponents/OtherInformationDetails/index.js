import React from "react";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "../Title";
import { Row, Col } from "antd";
import Field from "../Field";
import fields from "../../../../constants/fields";

const OtherInformationDetails = ({
  data = {},
  errors = {},
  handleChange,
  handleError
}) => {
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
              handleChange={handleChange}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["reference1Contact"]}
              value={data["reference1"]}
              error={errors["reference1"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["reference2Name"]}
              value={data["reference2"]}
              error={errors["reference2"]}
              handleChange={handleChange}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["reference2Contact"]}
              value={data["reference2"]}
              error={errors["reference2"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["offerLetter"]}
              value={data["offerLetter"]}
              error={errors["offerLetter"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["internshipOfficeAddress"]}
              value={data["internshipOfficeAddress"]}
              error={errors["internshipOfficeAddress"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["emergencyContactName"]}
              value={data["emergencyContact"]}
              error={errors["emergencyContact"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["emergencyContactNumber"]}
              value={data["emergencyContact"]}
              error={errors["emergencyContact"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["emergencyContactEmail"]}
              value={data["emergencyContact"]}
              error={errors["emergencyContact"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["DBSCheck"]}
              value={data["DBSCheck"]}
              error={errors["DBSCheck"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default OtherInformationDetails;
