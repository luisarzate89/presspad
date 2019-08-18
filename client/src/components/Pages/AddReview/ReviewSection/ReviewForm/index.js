import React, { Component } from "react";
import { Rate, Checkbox, Button } from "antd";
import axios from "axios";

import ReviewFormWrapper from "../../Wrappers/ReviewFormWrapper";
import ReviewFormHeaders from "./ReviewFormHeaders";
import TextArea from "./TextArea";
import { RateStyle, CheckboxStyle, ButtonStyle } from "./Styles"

class ReviewForm extends Component {

  state = {
    rating: null,
    message: "",
    to: "", // reviewed id
    from: "", // reviewer id
    booking: "", // booking id
  }

  /**
   * mocks the actual behavior.
   * For now it will set the reviewer's id as the receiving user.
   * will need a new backend query and controller to work properly
   */
  componentDidMount() {
    // should request the current booking via params.
  }

  onRateChange = (rating) => {
    this.setState({ rating: rating })
  }

  onTextAreaChange = ({ target: {value} }) => {
    this.setState({ message: value })
  }

  /**
   * this needs refactoring to have actual logic after the request is fired.
   */
  onButtonClick = () => {
    axios.post(`api/users/${this.state.to}/reviews`, this.state)
    .then(res => console.log(res))
    .catch(err => console.log(err.response))
  }

  render() {
    return (
      <ReviewFormWrapper>
        <ReviewFormHeaders>Rating</ReviewFormHeaders>
        <Rate onChange={this.onRateChange} style={RateStyle} />
        <ReviewFormHeaders>Review</ReviewFormHeaders>
        <TextArea onChange={this.onTextAreaChange}/>
        <ReviewFormHeaders>Report a problem</ReviewFormHeaders>
        <p>
          If you believe there has been inapropriate behavior during your intern&apos;s stay
          please tick the box below.
        </p>
        <Checkbox style={CheckboxStyle}>
          Report inapropriate behavior
        </Checkbox>
        <Button onClick={this.onButtonClick} style={ButtonStyle} type="primary">Send Review</Button>
      </ReviewFormWrapper>
    );
  }
};

export default ReviewForm;
