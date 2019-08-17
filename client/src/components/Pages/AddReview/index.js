import React from "react";

import Avatar from "./Avatar";
import CallForReview from "./CallForReview";
import ComponentWrapper from "./ComponentWrapper";
import ReviewSection from "./ReviewForm";

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
