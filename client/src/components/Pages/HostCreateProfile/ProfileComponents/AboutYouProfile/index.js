import React from "react";
import { Row, Col } from "antd";
import {
  SectionWrapper,
  SectionContent,
  Description,
} from "../ProfileComponents.style";

import Title from "../Title";
import Field from "../../../../Common/ProfileComponents/Field";
import fields from "../../../../../constants/fields";

const AboutYou = ({
  data = {},
  errors = {},
  handleChange,
  handleError,
  userId,
  role,
  name,
  isAdmin,
}) => (
  <SectionWrapper>
    {!isAdmin && (
      <Description>
        This information you provide in this section will be made available to
        the hosts you apply for.
      </Description>
    )}
    <Title
      title={isAdmin ? name : "About you"}
      hint={!isAdmin && "You need to fill out this information to use PressPad"}
    />
    <SectionContent>
      <Row gutter={25} type="flex">
        <Col xs={24} sm={12}>
          <Row gutter={25}>
            <Col xs={24} md={12}>
              <Field
                {...fields.birthDate}
                value={data.birthDate}
                error={errors.birthDate}
                handleChange={handleChange}
                handleError={handleError}
                userId={userId}
                role={role}
              />
            </Col>
            <Col xs={24} md={12}>
              <Field
                {...fields.hometown}
                value={data.hometown}
                error={errors.hometown}
                handleChange={handleChange}
                handleError={handleError}
                userId={userId}
                role={role}
              />
            </Col>
          </Row>
          <Row gutter={25}>
            <Col xs={24} md={12}>
              <Field
                {...fields.gender}
                value={data.gender}
                error={errors.gender}
                handleChange={handleChange}
                handleError={handleError}
                userId={userId}
                role={role}
              />
            </Col>
            <Col xs={24} md={12}>
              <Field
                {...fields.school}
                value={data.school}
                error={errors.school}
                handleChange={handleChange}
                handleError={handleError}
                userId={userId}
                role={role}
              />
            </Col>
          </Row>

          <Row gutter={25}>
            <Col xs={24} md={12}>
              <Field
                {...fields.profileImage}
                value={data.profileImage}
                error={errors.profileImage}
                handleChange={handleChange}
                handleError={handleError}
                userId={userId}
                role={role}
              />
            </Col>
            <Col xs={24} md={12}>
              <Field
                {...fields.interests}
                value={data.interests}
                error={errors.interests}
                handleError={handleError}
                userId={userId}
                role={role}
                handleChange={handleChange}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={12}>
          <Field
            {...fields.bio}
            value={data.bio}
            error={errors.bio}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>

      <Row style={{ margin: "1rem 0" }}>
        <Col xs={24} sm={12}>
          <Field
            {...fields.jobTitle}
            value={data.jobTitle}
            error={errors.jobTitle}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>
      <Row style={{ margin: "1rem 0" }}>
        <Col xs={24} sm={12}>
          <Field
            {...fields.organisation}
            value={data.organisation}
            error={errors.organisation}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>

      <Row style={{ margin: "1rem 0" }}>
        <Col xs={24} sm={12}>
          <Field
            {...fields.workingArea}
            value={data.workingArea}
            error={errors.workingArea}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>

      <Row gutter={25} type="flex">
        <Col xs={24}>
          <Field
            {...fields.hostingReasonAnswer}
            value={data.hostingReasonAnswer}
            error={errors.hostingReasonAnswer}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>

      <Row gutter={25} type="flex">
        <Col xs={24}>
          <Field
            {...fields.mentoringExperienceAnswer}
            value={data.mentoringExperienceAnswer}
            error={errors.mentoringExperienceAnswer}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>

      <Row gutter={25} type="flex">
        <Col xs={24}>
          <Field
            {...fields.industryExperienceAnswer}
            value={data.industryExperienceAnswer}
            error={errors.industryExperienceAnswer}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>

      <Row gutter={25} type="flex">
        <Col xs={24}>
          <Field
            {...fields.backgroundAnswer}
            value={data.backgroundAnswer}
            error={errors.backgroundAnswer}
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

export default AboutYou;
