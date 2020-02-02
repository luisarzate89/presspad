import React from 'react';
import { Col, Row } from 'antd';
import fields from '../../../../constants/fields';
import Field from '../Field';
import {
  SectionWrapper,
  SectionContent,
  Description,
} from '../ProfileComponents.style';
import Title from '../Title';

const AboutYou = ({
  data = {},
  errors = {},
  name = '',
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
      {!isAdmin && (
        <Description>
          This information you provide in this section will be made available to
          the hosts you apply for.
        </Description>
      )}
      <Title
        title={isAdmin ? name : 'About you'}
        hint={
          !isAdmin && 'You need to fill out this information to use PressPad'
        }
      />
      <SectionContent>
        <Row gutter={25} type="flex">
          <Col xs={24} sm={12}>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <Field
                  {...fields['birthDate']}
                  value={data['birthDate']}
                  error={errors['birthDate']}
                  {...props}
                />
              </Col>
              <Col xs={24} md={12}>
                <Field
                  {...fields['hometown']}
                  value={data['hometown']}
                  error={errors['hometown']}
                  {...props}
                />
              </Col>
            </Row>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <Field
                  {...fields['gender']}
                  value={data['gender']}
                  error={errors['gender']}
                  {...props}
                />
              </Col>
              <Col xs={24} md={12}>
                <Field
                  {...fields['school']}
                  value={data['school']}
                  error={errors['school']}
                  {...props}
                  padding="1rem 0 0 0"
                />
              </Col>
            </Row>

            <Row gutter={25}>
              <Col xs={24} md={12}>
                <Field
                  {...fields['profileImage']}
                  value={data['profileImage']}
                  error={errors['profileImage']}
                  {...props}
                />
              </Col>
              <Col xs={24} md={12}>
                <Field
                  {...fields['interests']}
                  value={data['interests']}
                  error={errors['interests']}
                  {...props}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={12}>
            <Field
              {...fields['bio']}
              value={data['bio']}
              error={errors['bio']}
              {...props}
              paddingSmall="1rem 0 0 0"
            />
          </Col>
        </Row>
      </SectionContent>
    </SectionWrapper>
  );
};

export default AboutYou;
