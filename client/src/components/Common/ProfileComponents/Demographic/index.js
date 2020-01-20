import React from "react";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "../Title";
import { Row, Col } from "antd";
import Field from "../Field";
import fields from "../../../../constants/fields";

const Demographic = ({ errors = {}, handleError }) => {
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
              error={errors["sexualOrientation"]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field {...fields["degreeLevel"]} error={errors["degreeLevel"]} />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field {...fields["ethnicity"]} error={errors["ethnicity"]} />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["earningOfParents"]}
              error={errors["earningOfParents"]}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field {...fields["disability"]} error={errors["disability"]} />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["parentsWorkInPress"]}
              error={errors["parentsWorkInPress"]}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["caringResponsibilities"]}
              error={errors["caringResponsibilities"]}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field {...fields["allergies"]} error={errors["allergies"]} />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["consentedOnPressPadTerms"]}
              error={errors["consentedOnPressPadTerms"]}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default Demographic;
