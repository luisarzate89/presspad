import React from "react";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "../Title";
import { Row, Col } from "antd";
import Field from "../Field";
import fields from "../../../../constants/fields";

const Demographic = ({ data = {}, errors = {}, handleChange, handleError }) => {
  return (
    <SectionWrapper>
      <Title
        title="Extra demographic questions"
        hint="If you do not wish to disclose, please select ‘I’d prefer not to say"
      />
      <SectionContent>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["sexualOrientation"]}
              value={data["sexualOrientation"]}
              error={errors["sexualOrientation"]}
              handleChange={handleChange}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["degreeLevel"]}
              value={data["degreeLevel"]}
              error={errors["degreeLevel"]}
              handleChange={handleChange}
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
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["earningOfParents"]}
              value={data["earningOfParents"]}
              error={errors["earningOfParents"]}
              handleChange={handleChange}
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
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["parentsWorkInPress"]}
              value={data["parentsWorkInPress"]}
              error={errors["parentsWorkInPress"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["caringResponsibilities"]}
              value={data["caringResponsibilities"]}
              error={errors["caringResponsibilities"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["allergies"]}
              value={data["allergies"]}
              error={errors["allergies"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["consentedOnPressPadTerms"]}
              value={data["consentedOnPressPadTerms"]}
              error={errors["consentedOnPressPadTerms"]}
              handleChange={handleChange}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default Demographic;
