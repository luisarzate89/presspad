import React, { Component } from "react";
import { Input } from "antd";
import axios from "axios";

// COMMON COMPONENTS
import Button from "./../../Common/Button";

// CONSTANTS
import { API_LOGIN_URL } from "./../../../constants/apiRoutes";
import USER_TYPES from "./../../../constants/userTypes";

// STYLING
import {
  Wrapper,
  HeaderText,
  SignUpForm,
  FormHeader,
  InputLabel,
  InputDiv,
  ErrorMsg,
  ButtonWrapper
} from "./SignUpPage.style";

export default class SignUpPage extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null
  };

  onInputChange = e => {
    const { fields } = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  };

  render() {
    const { fields, errors, msg } = this.state;
    const { email, password, password2, name, orgCode } = fields;
    const { nameError, emailError, passwordError, password2Error } = errors;
    const { onInputChange } = this;
    const { userType } = this.props;
    console.log(userType);
    console.log(USER_TYPES);
    return (
      <Wrapper>
        <HeaderText>
          Opening the door to diversity in the media through mentorship &
          hosting
        </HeaderText>
        <SignUpForm>
          {userType === USER_TYPES.intern && (
            <FormHeader>
              Please choose a password to complete your PressPad sign up process
            </FormHeader>
          )}
          <InputDiv>
            <InputLabel htmlFor="email">Name</InputLabel>
            <Input
              placeholder="Enter your full name"
              name="name"
              id="name"
              type="text"
              size="large"
              onChange={onInputChange}
              value={name}
            />
            <ErrorMsg>{nameError}</ErrorMsg>
          </InputDiv>
          <InputDiv>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              placeholder="Enter your email"
              name="email"
              id="email"
              type="text"
              size="large"
              onChange={onInputChange}
              value={email}
            />
            <ErrorMsg>{emailError}</ErrorMsg>
          </InputDiv>
          {userType === USER_TYPES.intern && (
            <InputDiv>
              <InputLabel htmlFor="orgCode">Organisation code</InputLabel>
              <Input
                placeholder="Enter your unique code"
                name="orgCode"
                id="orgCode"
                type="text"
                size="large"
                onChange={onInputChange}
                value={orgCode}
              />
              <ErrorMsg>{emailError}</ErrorMsg>
            </InputDiv>
          )}
          <InputDiv>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input.Password
              placeholder="Enter your password"
              name="password"
              id="password"
              type="text"
              size="large"
              onChange={onInputChange}
              value={password}
            />
            <ErrorMsg>{passwordError}</ErrorMsg>
          </InputDiv>
          <InputDiv>
            <InputLabel htmlFor="password2">Confirm Password</InputLabel>
            <Input.Password
              placeholder="Re-enter your password"
              name="password"
              id="password2"
              type="text"
              size="large"
              onChange={onInputChange}
              value={password2}
            />
            <ErrorMsg>{password2Error}</ErrorMsg>
          </InputDiv>
          <ButtonWrapper>
            <Button label="Sign in" type="primary" />
          </ButtonWrapper>

          <ErrorMsg>{msg}</ErrorMsg>
        </SignUpForm>
      </Wrapper>
    );
  }
}
