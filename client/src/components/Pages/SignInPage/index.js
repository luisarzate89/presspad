import React, { Component } from "react";
import { Input } from "antd";
import axios from "axios";

// COMMON COMPONENTS
import Button from "./../../Common/Button";

// CONSTANTS
import { API_LOGIN_URL } from "./../../../constants/apiRoutes";
import { DASHBOARD_URL } from "./../../../constants/navRoutes";

// STYLING
import {
  Wrapper,
  HeaderText,
  SignInForm,
  InputLabel,
  InputDiv,
  ErrorMsg
} from "./SignInPage.style";

export default class SignInPage extends Component {
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

  validateForm = () => {
    const { fields } = this.state;
    const errors = {};
    let formIsValid = true;
    if (!fields.email) {
      formIsValid = false;
      errors.emailError = "* Please enter your email";
    }

    if (typeof fields.email !== "undefined") {
      // regular expression for email validation
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields.email)) {
        formIsValid = false;
        errors.emailError = "* Please enter valid email";
      }
    }

    if (!fields.password) {
      formIsValid = false;
      errors.passwordError = "* Please enter your password";
    }

    if (fields.password.length < 6) {
      formIsValid = false;
      errors.passwordError = "* Password must be 6 characters or longer";
    }

    this.setState({
      errors
    });
    return formIsValid;
  };

  onFormSubmit = e => {
    const { fields } = this.state;
    e.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      const { email, password } = fields;
      const loginData = { email, password };
      axios
        .post(API_LOGIN_URL, loginData)
        .then(({ data }) => {
          this.props.handleChangeState({ ...data, isLoggedIn: true });
          this.props.history.push(DASHBOARD_URL);
        })
        .catch(err => {
          this.setState({ msg: "error" });
        });
    }
  };

  render() {
    const { fields, errors, msg } = this.state;
    const { email, password } = fields;
    const { emailError, passwordError } = errors;
    const { onInputChange, onFormSubmit } = this;
    return (
      <Wrapper>
        <HeaderText>Sign In</HeaderText>
        <SignInForm>
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
          <Button label="Sign in" type="primary" onClick={onFormSubmit} />
          <ErrorMsg>{msg}</ErrorMsg>
        </SignInForm>
      </Wrapper>
    );
  }
}
