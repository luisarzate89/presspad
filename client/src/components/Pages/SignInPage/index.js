import React, { Component } from "react";
import { Input } from "antd";

// STYLING
import {
  Wrapper,
  HeaderText,
  SignInForm,
  InputLabel,
  InputDiv,
  ReferralText,
  Disclaimer
} from "./SignInPage.style";

export default class SignInPage extends Component {
  render() {
    return (
      <Wrapper>
        <HeaderText>Sign In</HeaderText>
        <SignInForm>
          <InputDiv>
            <InputLabel for="email">Email</InputLabel>
            <Input
              placeholder="Enter your email"
              name="email"
              id="email"
              type="text"
              size="large"
            />
          </InputDiv>
          <InputDiv>
            <InputLabel for="password">Password</InputLabel>
            <Input.Password
              placeholder="Enter your password"
              name="password"
              id="password"
              type="text"
              size="large"
            />
          </InputDiv>
        </SignInForm>
      </Wrapper>
    );
  }
}
