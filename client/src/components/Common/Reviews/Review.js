import React from "react";

import { Rate } from "antd";

import {
  ReviewWrapper,
  ReviewHeader,
  SubTitle,
  ReviewBody,
} from "./Reviews.style";

const Review = ({ rate, name, jobTitle, reviewBody }) => (
  <ReviewWrapper>
    <ReviewHeader>
      <SubTitle>
        {name}, {jobTitle}
      </SubTitle>{" "}
      <Rate disabled defaultValue={rate} style={{ color: "#5EBFD0" }} />
    </ReviewHeader>
    <ReviewBody>{reviewBody}</ReviewBody>
  </ReviewWrapper>
);

export default Review;
