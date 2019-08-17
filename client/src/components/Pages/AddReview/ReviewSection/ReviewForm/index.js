import React from "react";
import { Rate, Checkbox, Button } from "antd";
import ReviewFormWrapper from "../../Wrappers/ReviewFormWrapper";
import ReviewFormHeaders from "./ReviewFormHeaders";
import TextArea from "./TextArea";
import { RateStyle, CheckboxStyle, ButtonStyle } from "./Styles"

const ReviewForm = () => {
  return (
    <ReviewFormWrapper>
    <ReviewFormHeaders>Rating</ReviewFormHeaders>
    <Rate style={RateStyle} />
    <ReviewFormHeaders>Review</ReviewFormHeaders>
    <TextArea />
    <ReviewFormHeaders>Report a problem</ReviewFormHeaders>
    <p>
      If you believe there has been inapropriate behavior during your intern&apos;s stay
      please tick the box below.
    </p>
    <Checkbox style={CheckboxStyle}>
      Report inapropriate behavior
    </Checkbox>
    <Button style={ButtonStyle} type="primary">Send Review</Button>
    </ReviewFormWrapper>
  );
};

export default ReviewForm;
