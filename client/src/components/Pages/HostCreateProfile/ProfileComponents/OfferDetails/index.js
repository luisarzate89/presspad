import React from "react";
import { Row, Col } from "antd";
import {
  SectionWrapper,
  SectionContent,
} from "../../../../Common/ProfileComponents/ProfileComponents.style";

import ListingGallery from "../../../../Common/Profile/ListingGallery";

import Title from "../../../../Common/ProfileComponents/Title";
import Field from "../../../../Common/ProfileComponents/Field";
import fields from "../../../../../constants/fields";

const OfferDetails = ({
  data = {},
  errors = {},
  handleChange,
  handleError,
  userId,
  role,
  // date Range
  disabledStartDate,
  disabledEndDate,
  onEndChange,
  onStartChange,
  handleAddMoreRanges,
  deleteDate,
  availableDates,
  isAdmin,
  name,
}) => (
  <SectionWrapper>
    <Title
      title={`${isAdmin ? `${name.split(" ")[0]}'s` : "Your"} Presspad Offer`}
    />
    <SectionContent>
      <Row gutter={25}>
        <Col xs={24} sm={isAdmin ? 24 : 8}>
          {isAdmin ? (
            <ListingGallery
              img1={data.photos1 && data.photos1.fileName}
              img2={data.photos2 && data.photos2.fileName}
              img3={data.photos3 && data.photos3.fileName}
            />
          ) : (
            <Row gutter={25}>
              <Col xs={24}>
                <Field
                  {...fields.photos1}
                  value={data.photos1}
                  error={errors.photos1}
                  handleChange={handleChange}
                  handleError={handleError}
                  userId={userId}
                  role={role}
                />
              </Col>
              <Col xs={24}>
                <Field
                  {...fields.photos2}
                  value={data.photos2}
                  error={errors.photos2}
                  handleChange={handleChange}
                  handleError={handleError}
                  userId={userId}
                  role={role}
                />
              </Col>
              <Col xs={24}>
                <Field
                  {...fields.photos3}
                  value={data.photos3}
                  error={errors.photos3}
                  handleChange={handleChange}
                  handleError={handleError}
                  userId={userId}
                  role={role}
                />
              </Col>
            </Row>
          )}
        </Col>
        <Col xs={24} sm={16}>
          <Field
            {...fields.address}
            value={data.address}
            error={errors.address}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>
      <Row gutter={25}>
        <Col xs={24}>
          <Field
            {...fields.availableDates}
            value={data.availableDates}
            error={errors.availableDates}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
            disabledStartDate={disabledStartDate}
            disabledEndDate={disabledEndDate}
            onEndChange={onEndChange}
            onStartChange={onStartChange}
            handleAddMoreRanges={handleAddMoreRanges}
            deleteDate={deleteDate}
            availableDates={availableDates}
          />
        </Col>
      </Row>
      <Row gutter={25} style={{ marginBottom: "1rem" }}>
        <Col xs={24}>
          <Field
            {...fields.accommodationChecklist}
            value={data.accommodationChecklist}
            error={errors.accommodationChecklist}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>

      <Row gutter={25}>
        <Col xs={24}>
          <Field
            {...fields.neighbourhoodDescription}
            value={data.neighbourhoodDescription}
            error={errors.neighbourhoodDescription}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>

      <Row gutter={25}>
        <Col xs={24}>
          <Field
            {...fields.otherInfo}
            value={data.otherInfo}
            error={errors.otherInfo}
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

export default OfferDetails;
