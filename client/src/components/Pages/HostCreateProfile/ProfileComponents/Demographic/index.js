import React from "react";
import { Row, Col } from "antd";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "../Title";
import Field from "../../../../Common/ProfileComponents/Field";
import fields from "../../../../../constants/fields";

const Demographic = ({
  data = {},
  errors = {},
  handleChange,
  handleError,
  userId,
  role,
  isAdmin,
}) => (
  <SectionWrapper>
    <Title
      title="Extra demographic questions"
      hint={
        !isAdmin &&
        "If you do not wish to disclose, please select ‘I’d prefer not to say"
      }
    />
    <SectionContent>
      <Row gutter={25}>
        <Col xs={24} sm={12}>
          <Field
            {...fields["sexualOrientation"]}
            value={data["sexualOrientation"]}
            error={errors["sexualOrientation"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Field
            {...fields["degreeLevel"]}
            value={data["degreeLevel"]}
            error={errors["degreeLevel"]}
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
            {...fields["ethnicity"]}
            value={data["ethnicity"]}
            error={errors["ethnicity"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Field
            {...fields["earningOfParents"]}
            value={data["earningOfParents"]}
            error={errors["earningOfParents"]}
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
            {...fields["disability"]}
            value={data["disability"]}
            error={errors["disability"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Field
            {...fields["parentsWorkInPress"]}
            value={data["parentsWorkInPress"]}
            error={errors["parentsWorkInPress"]}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>

      <Row gutter={25} style={{ marginTop: "1rem" }}>
        <Col xs={24} sm={20}>
          <Field
            {...fields["caringResponsibilities"]}
            value={data["caringResponsibilities"]}
            error={errors["caringResponsibilities"]}
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
            {...fields["consentedOnPressPadTerms"]}
            value={data["consentedOnPressPadTerms"]}
            error={errors["consentedOnPressPadTerms"]}
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

export default Demographic;
