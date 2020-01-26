import React, { Component } from "react";

import axios from "axios";
import Review from "./Review";
import { API_REVIEWS } from "../../../constants/apiRoutes";
import { Wrapper, MainTitle } from "./Reviews.style";

class Reviews extends Component {
  state = {
    reviews: [],
    completedStays: null,
  };

  async componentDidMount() {
    const { userId } = this.props;
    await axios.get(API_REVIEWS, { params: { to: userId } });
  }

  render() {
    const { completedStays, role, reviews } = this.state;
    const { name } = this.props;

    return (
      <Wrapper>
        <MainTitle>
          {role === "intern" ? (
            <>
              {name} has stayed with {completedStays}
              host{completedStays > 1 ? "s" : ""} so far
            </>
          ) : (
            <>
              {name} has hosted {completedStays}
              intern{completedStays > 1 ? "s" : ""} so far
            </>
          )}
        </MainTitle>
        {reviews.map(({ rate, reviewerName, jobTitle, reviewBody }) => (
          <Review
            rate={rate}
            name={reviewerName}
            jobTitle={jobTitle}
            reviewBody={reviewBody}
          />
        ))}
      </Wrapper>
    );
  }
}
export default Reviews;
