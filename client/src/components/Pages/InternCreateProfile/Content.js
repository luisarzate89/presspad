import React, { Component } from "react";

import {
  AboutYouProfile,
  OtherInformationProfile,
  AboutYouDetails,
  OtherInformationDetails,
  Demographic
} from "./../../Common/ProfileComponents";
import TabbedView from "./../../Common/TabbedView";

import { PageWrapper, ContentWrapper } from "./InternCreateProfile.style";

import HeaderWrapper from "./HeaderWrapper";
export default ({ name, data, errors, handleChange }) => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <HeaderWrapper error="" imageUrl="" name={name} loading={50} />
        <TabbedView
          tabsTitle={["Profile", "Details"]}
          tabsContent={[
            <>
              <AboutYouProfile
                data={data}
                errors={errors}
                handleChange={handleChange}
              />
              <OtherInformationProfile
                data={data}
                errors={errors}
                handleChange={handleChange}
              />
            </>,
            <>
              <AboutYouDetails
                data={data}
                errors={errors}
                handleChange={handleChange}
              />
              <OtherInformationDetails
                data={data}
                errors={errors}
                handleChange={handleChange}
              />
              <Demographic
                data={data}
                errors={errors}
                handleChange={handleChange}
              />
            </>
          ]}
        />
      </ContentWrapper>
    </PageWrapper>
  );
};
