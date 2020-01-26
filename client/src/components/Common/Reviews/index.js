import React, { Component } from "react";

import axios from "axios";
import { Skeleton } from "antd";
import Review from "./Review";
import { API_REVIEWS } from "../../../constants/apiRoutes";
import { Wrapper, MainTitle, SubTitle } from "./Reviews.style";

class Reviews extends Component {
  state = {
    reviews: [],
    completedBookingsCount: null,
    loading: false,
  };

  async componentDidMount() {
    const { userId } = this.props;

    this.setState({ loading: true }, async () => {
      const {
        data: { reviews, completedBookingsCount },
      } = await axios.get(API_REVIEWS, {
        params: { to: userId },
      });
      this.setState({ loading: false, reviews, completedBookingsCount });
    });
  }

  render() {
    const { completedBookingsCount, reviews, loading } = this.state;
    const { name, userRole: role } = this.props;

    return (
      <Wrapper>
        <MainTitle>
          {role === "intern" ? (
            <>
              {completedBookingsCount ? (
                <>
                  {name} has stayed with {completedBookingsCount} host
                  {completedBookingsCount > 1 ? "s" : ""} so far
                </>
              ) : (
                <>{name} hans&apos;t completed any stay yet</>
              )}
            </>
          ) : (
            <>
              {completedBookingsCount ? (
                <>
                  {name} hans&apos;t hosted {completedBookingsCount} intern
                  {completedBookingsCount > 1 ? "s" : ""} so far
                </>
              ) : (
                <>{name} hans&apos;t hosted any intern yet</>
              )}
            </>
          )}
        </MainTitle>
        <Skeleton loading={loading} active avatar>
          {reviews && reviews.length ? (
            reviews.map(({ rate, name: reviewerName, jobTitle, message }) => (
              <Review
                rate={rate}
                name={reviewerName}
                jobTitle={jobTitle}
                message={message}
              />
            ))
          ) : (
            <SubTitle>{name} has no reviews yet</SubTitle>
          )}
        </Skeleton>
        {loading && <Skeleton loading={loading} active avatar />}
      </Wrapper>
    );
  }
}
export default Reviews;
