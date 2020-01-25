import React from "react";
import { Row, Col } from "antd";
import {
  SectionWrapper,
  SectionContent
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
  role
}) => (
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
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Field
            {...fields["reference1Email"]}
            value={data["reference1"]}
            error={errors["reference1"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
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
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Field
            {...fields["reference2Email"]}
            value={data["reference2"]}
            error={errors["reference2"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>
      <Row gutter={25}>
        <Col xs={24} sm={20}>
          <Field
            {...fields["DBSCheck"]}
            value={data["DBSCheck"]}
            error={errors["DBSCheck"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>
      <Row gutter={25}>
        <Col xs={24} sm={20}>
          <Field
            {...fields["pressCard"]}
            value={data["pressCard"]}
            error={errors["pressCard"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>
      {/* 

      <Row gutter={25}>
        <Col xs={24} sm={12}>
          <Field
            {...fields["emergencyContactName"]}
            value={data["emergencyContact"]}
            error={errors["emergencyContact"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
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
            handleError={handleError}
            userId={userId}
            role={role}
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
            handleError={handleError}
            userId={userId}
            role={role}
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
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row> */}
    </SectionContent>
  </SectionWrapper>
);

export default OtherInformationDetails;
