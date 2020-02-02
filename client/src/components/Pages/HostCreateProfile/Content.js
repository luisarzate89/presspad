import React from 'react';

import {
  AboutYouProfile,
  OfferDetails,
  Details,
  OtherInformation,
  Demographic,
} from './ProfileComponents';

import TabbedView from '../../Common/TabbedView';
import Button from '../../Common/Button';

import { PageWrapper, ContentWrapper } from './HostCreateProfile.style';

import HeaderWrapper from './HeaderWrapper';

export default ({
  name,
  data,
  errors,
  handleChange,
  handleError,
  userId,
  onChangeTabs,
  activeKey,
  handleSubmit,
  profilePhotoUrl,
  role,
  loading,
  // Date
  disabledStartDate,
  disabledEndDate,
  onEndChange,
  onStartChange,
  handleAddMoreRanges,
  deleteDate,
  availableDates,
}) => (
  <PageWrapper>
    <ContentWrapper>
      <HeaderWrapper
        error=""
        imageUrl={profilePhotoUrl}
        name={name}
        loading={0}
      />
      <TabbedView
        activeKey={activeKey}
        onChange={onChangeTabs}
        tabsTitle={['Profile', 'Offer', 'Details']}
        tabsContent={[
          <>
            <AboutYouProfile
              data={data}
              errors={errors}
              handleChange={handleChange}
              handleError={handleError}
              userId={userId}
              role={role}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '2rem',
              }}
            >
              <Button
                label="Next"
                type="primary"
                onClick={() => onChangeTabs('Offer')}
              />
            </div>
          </>,
          <>
            <OfferDetails
              data={data}
              errors={errors}
              handleChange={handleChange}
              handleError={handleError}
              userId={userId}
              role={role}
              // dates
              disabledStartDate={disabledStartDate}
              disabledEndDate={disabledEndDate}
              onEndChange={onEndChange}
              onStartChange={onStartChange}
              handleAddMoreRanges={handleAddMoreRanges}
              deleteDate={deleteDate}
              availableDates={availableDates}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '2rem',
              }}
            >
              <Button
                label="Next"
                type="primary"
                onClick={() => onChangeTabs('Details')}
              />
            </div>
          </>,
          <>
            <Details
              data={data}
              errors={errors}
              handleChange={handleChange}
              handleError={handleError}
              userId={userId}
              role={role}
            />

            <OtherInformation
              data={data}
              errors={errors}
              handleChange={handleChange}
              handleError={handleError}
              userId={userId}
              role={role}
            />

            <Demographic
              data={data}
              errors={errors}
              handleChange={handleChange}
              handleError={handleError}
              userId={userId}
              role={role}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '2rem',
              }}
            >
              <Button
                label="Submit"
                type="primary"
                onClick={handleSubmit}
                loading={loading}
              />
            </div>
          </>,
        ]}
      />
    </ContentWrapper>
  </PageWrapper>
);
