import React from 'react';
import { Row, Col } from 'antd';
import { SectionWrapper, SectionContent } from '../ProfileComponents.style';

import Title from '../Title';
import Field from '../Field';
import fields from '../../../../constants/fields';

const OtherInformationDetails = ({
  data = {},
  errors = {},
  handleChange,
  handleError,
  userId,
  role,
  isAdmin,
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
      <Title title="Other information" />
      <SectionContent>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields['reference1Name']}
              value={data['reference1']}
              error={errors['reference1']}
              {...props}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields['reference1Email']}
              value={data['reference1']}
              error={errors['reference1']}
              {...props}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields['reference2Name']}
              value={data['reference2']}
              error={errors['reference2']}
              {...props}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields['reference2Email']}
              value={data['reference2']}
              error={errors['reference2']}
              {...props}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12} style={{ marginBottom: '0.5rem' }}>
            <Field
              {...fields['offerLetter']}
              value={data['offerLetter']}
              error={errors['offerLetter']}
              {...props}
            />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields['internshipOfficeAddress']}
              value={data['internshipOfficeAddress']}
              error={errors['internshipOfficeAddress']}
              {...props}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields['emergencyContactName']}
              value={data['emergencyContact']}
              error={errors['emergencyContact']}
              {...props}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields['emergencyContactNumber']}
              value={data['emergencyContact']}
              error={errors['emergencyContact']}
              {...props}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields['emergencyContactEmail']}
              value={data['emergencyContact']}
              error={errors['emergencyContact']}
              {...props}
            />
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xs={24} sm={12}>
            <Field
              {...fields['DBSCheck']}
              value={data['DBSCheck']}
              error={errors['DBSCheck']}
              {...props}
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default OtherInformationDetails;
