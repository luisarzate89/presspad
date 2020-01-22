import React from "react";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "./../Title";
import { Row, Col } from "antd";
import Field from "./../Field";
import fields from "./../../../../constants/fields";

import { Description } from "./../ProfileComponents.style";
const AboutYou = ({
  data = {},
  name = "",
  errors = {},
  handleChange,
  handleError,
  userId,
  isAdmin = false
}) => {
  return (
    <SectionWrapper>
      {!isAdmin && (
        <Description>
          This information you provide in this section will be made available to
          the hosts you apply for.
        </Description>
      )}
      <Title
        title={isAdmin ? name : "About you"}
        hint={
          !isAdmin && "You need to fill out this information to use PressPad"
        }
      />
      <SectionContent>
        <Row gutter={25} type="flex">
          <Col xs={24} sm={12}>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <Field
                  {...fields["birthDate"]}
                  value={data["birthDate"]}
                  error={errors["birthDate"]}
                  handleChange={handleChange}
                  handleError={handleError}
                  userId={userId}
                />
              </Col>
              <Col xs={24} md={12}>
                <Field
                  {...fields["hometown"]}
                  value={data["hometown"]}
                  error={errors["hometown"]}
                  handleChange={handleChange}
                  handleError={handleError}
                  userId={userId}
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <Field
                  {...fields["gender"]}
                  value={data["gender"]}
                  error={errors["gender"]}
                  handleChange={handleChange}
                  handleError={handleError}
                  userId={userId}
                />
              </Col>
              <Col xs={24} md={12}>
                <Field
                  {...fields["school"]}
                  value={data["school"]}
                  error={errors["school"]}
                  handleChange={handleChange}
                  handleError={handleError}
                  userId={userId}
                />
              </Col>
            </Row>

            <Row gutter={25}>
              <Col xs={24} md={12}>
                <Field
                  {...fields["profileImage"]}
                  value={data["profileImage"]}
                  error={errors["profileImage"]}
                  handleChange={handleChange}
                  handleError={handleError}
                  userId={userId}
                />
              </Col>
              <Col xs={24} md={12}>
                <Field
                  {...fields["interests"]}
                  value={data["interests"]}
                  error={errors["interests"]}
                  handleError={handleError}
                  userId={userId}
                  handleChange={handleChange}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["bio"]}
              value={data["bio"]}
              error={errors["bio"]}
              handleChange={handleChange}
              handleError={handleError}
              userId={userId}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default AboutYou;
