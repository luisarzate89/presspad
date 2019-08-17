import React from "react";

import Avatar from "./Avatar";
import CallForReview from "./CallForReview";
import ComponentWrapper from "./Wrappers/ComponentWrapper";
import ReviewSection from "./ReviewSection";

const AddReview = () => {
  return (
    <ComponentWrapper>
      <Avatar />
      <CallForReview />
      <ReviewSection />
    </ComponentWrapper>
  );
};

export default AddReview;
