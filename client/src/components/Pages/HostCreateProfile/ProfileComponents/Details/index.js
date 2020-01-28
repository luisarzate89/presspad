import React from "react";
import { Row, Col } from "antd";
import {
  SectionWrapper,
  SectionContent,
  Description,
} from "../../../../Common/ProfileComponents/ProfileComponents.style";

import Title from "../../../../Common/ProfileComponents/Title";
import Field from "../../../../Common/ProfileComponents/Field";
import fields from "../../../../../constants/fields";

const Details = ({
  data = {},
  errors = {},
  handleChange,
  handleError,
  userId,
  role,
  isAdmin,
  name,
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
      {!isAdmin && (
        <Description>
          None of the details you supply below will be made public and will only
          be available to PressPad for verification purposes, to improve our
          service and to monitor our impact.
        </Description>
      )}
      <Title
        title={isAdmin ? name : "About you"}
        hint={
          !isAdmin && "You need to fill out this information to use PressPad"
        }
      />
      <SectionContent>
        <Row gutter={0}>
          <Col xs={24} md={12}>
            <Field
              {...fields["photoID"]}
              value={data["photoID"]}
              error={errors["photoID"]}
              {...props}
            />
          </Col>
        </Row>
        <Row gutter={0}>
          <Col xs={24} md={20}>
            <Field
              {...fields["hearAboutPressPadAnswer"]}
              value={data["hearAboutPressPadAnswer"]}
              error={errors["hearAboutPressPadAnswer"]}
              {...props}
            />
          </Col>
        </Row>

        <Row gutter={0}>
          <Col xs={24} md={12} lg={8}>
            <Field
              {...fields["phoneNumber"]}
              value={data["phoneNumber"]}
              error={errors["phoneNumber"]}
              {...props}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default Details;
