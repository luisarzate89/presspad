import React from "react";
import { Input, Checkbox } from "antd";
// COMMON COMPONENTS
import Button from "./../../Common/Button";

import USER_TYPES from "./../../../constants/userTypes";
import {
  TERMS_CONDITIONS,
  PRIVACY_POLICY,
} from "../../../constants/externalLinks";

// STYLING
import {
  Wrapper,
  HeaderText,
  SignUpForm,
  FormHeader,
  InputLabel,
  InputDiv,
  ErrorMsg,
  ButtonWrapper,
  Disclaimer,
  DisclaimerText,
  DisclaimerWrapper,
} from "./SignUpPage.style";

export default props => {
  const {
    fields,
    errors,
    msg,
    onInputChange,
    onFormSubmit,
    onCheckboxChange,
    userType,
    isLoading,
  } = props;
  const { email, password, password2, name, organisation, checkbox } = fields;
  const {
    nameError,
    emailError,
    organisationError,
    passwordError,
    password2Error,
    disclaimerError,
  } = errors;

  return (
    <Wrapper>
      <HeaderText>
        Opening the door to diversity in the media through mentorship & hosting
      </HeaderText>
      <SignUpForm>
        {(userType === USER_TYPES.intern || userType === USER_TYPES.host) && (
          <FormHeader>
            Please fill in the details below to sign up to PressPad
          </FormHeader>
        )}
        {userType === USER_TYPES.organisation && (
          <FormHeader>
            Please fill in the details below to create your organisation’s
            PressPad account
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
        <InputDiv isError={emailError}>
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
        {userType === USER_TYPES.organisation && (
          <InputDiv>
            <InputLabel htmlFor="organisation">Organisation</InputLabel>
            <Input
              placeholder="Enter your organisation"
              name="organisation"
              id="organisation"
              type="text"
              size="large"
              onChange={onInputChange}
              value={organisation}
            />
            <ErrorMsg>{organisationError}</ErrorMsg>
          </InputDiv>
        )}
        <InputDiv>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input.Password
            placeholder="Enter your password"
            name="password"
            id="password"
            type="password"
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
            name="password2"
            id="password2"
            type="password"
            size="large"
            onChange={onInputChange}
            value={password2}
          />
          <ErrorMsg>{password2Error}</ErrorMsg>
        </InputDiv>
        {(userType === "host" || userType === "intern") && (
          <DisclaimerWrapper>
            <Disclaimer>
              <Checkbox
                name="checkbox"
                checked={checkbox}
                onChange={onCheckboxChange}
              />
              <DisclaimerText>
                By signing up, I agree to the
                <a
                  href={TERMS_CONDITIONS}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp;Terms & Conditions&nbsp;
                </a>
                and PressPad
                <a
                  href={PRIVACY_POLICY}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp;Privacy Policy
                </a>
              </DisclaimerText>
            </Disclaimer>
          </DisclaimerWrapper>
        )}
        <ButtonWrapper>
          <Button
            label="Sign Up"
            type="primary"
            onClick={onFormSubmit}
            loading={isLoading}
          />
        </ButtonWrapper>
        <DisclaimerWrapper>
          <ErrorMsg>{disclaimerError}</ErrorMsg>
        </DisclaimerWrapper>
        <ErrorMsg>{msg}</ErrorMsg>
      </SignUpForm>
    </Wrapper>
  );
};
