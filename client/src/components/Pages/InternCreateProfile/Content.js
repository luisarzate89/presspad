import React from "react";

import {
  AboutYouProfile,
  OtherInformationProfile,
  AboutYouDetails,
  OtherInformationDetails,
  Demographic
} from "./../../Common/ProfileComponents";
import TabbedView from "./../../Common/TabbedView";
import Button from "./../../Common/Button";

import { PageWrapper, ContentWrapper } from "./InternCreateProfile.style";

import HeaderWrapper from "./HeaderWrapper";
export default ({
  name,
  data,
  errors,
  handleChange,
  handleError,
  userId,
  onChangeTabs,
  activeKey,
  handleSubmit
}) => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <HeaderWrapper error="" imageUrl="" name={name} loading={50} />
        <TabbedView
          activeKey={activeKey}
          onChange={onChangeTabs}
          tabsTitle={["Profile", "Details"]}
          tabsContent={[
            <>
              <AboutYouProfile
                data={data}
                errors={errors}
                handleChange={handleChange}
                handleError={handleError}
                userId={userId}
              />
              <OtherInformationProfile
                data={data}
                errors={errors}
                handleChange={handleChange}
                handleError={handleError}
                userId={userId}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "2rem"
                }}
              >
                <Button
                  label="Next"
                  type="primary"
                  onClick={() => onChangeTabs("Details")}
                />
              </div>
            </>,
            <>
              <AboutYouDetails
                data={data}
                errors={errors}
                handleChange={handleChange}
                handleError={handleError}
                userId={userId}
              />
              <OtherInformationDetails
                data={data}
                errors={errors}
                handleChange={handleChange}
                handleError={handleError}
                userId={userId}
              />
              <Demographic
                data={data}
                errors={errors}
                handleChange={handleChange}
                handleError={handleError}
                userId={userId}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "2rem"
                }}
              >
                <Button label="Submit" type="primary" onClick={handleSubmit} />
              </div>
            </>
          ]}
        />
      </ContentWrapper>
    </PageWrapper>
  );
};
