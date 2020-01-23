import React from "react";
import { Row, Col } from "antd";
import { SectionWrapper, SectionContent } from "../ProfileComponents.style";

import Title from "../Title";
import Field from "../Field";
import fields from "../../../../constants/fields";

const Demographic = ({
  data = {},
  errors = {},
  handleChange,
  handleError,
  userId,
  role,
  isAdmin = false,
}) => {
  const props = {
    handleChange,
    handleError,
    userId,
    role,
    readOnly: isAdmin,
  };

  return (
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
              {...props}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["degreeLevel"]}
              value={data["degreeLevel"]}
              error={errors["degreeLevel"]}
              {...props}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["ethnicity"]}
              value={data["ethnicity"]}
              error={errors["ethnicity"]}
              {...props}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["earningOfParents"]}
              value={data["earningOfParents"]}
              error={errors["earningOfParents"]}
              {...props}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["disability"]}
              value={data["disability"]}
              error={errors["disability"]}
              {...props}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields["parentsWorkInPress"]}
              value={data["parentsWorkInPress"]}
              error={errors["parentsWorkInPress"]}
              {...props}
            />
          </Col>
        </Row>

        <Row gutter={25} style={{ marginTop: "1rem" }}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["caringResponsibilities"]}
              value={data["caringResponsibilities"]}
              error={errors["caringResponsibilities"]}
              {...props}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["allergies"]}
              value={data["allergies"]}
              error={errors["allergies"]}
              {...props}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields["consentedOnPressPadTerms"]}
              value={data["consentedOnPressPadTerms"]}
              error={errors["consentedOnPressPadTerms"]}
              {...props}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default Demographic;
