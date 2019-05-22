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

    if (["password", "password2"].includes(e.target.name))
      this.passwordValidation();
  };

  passwordValidation = e => {
    const { fields } = this.state;
    const errors = {};
    let formIsValid = true;

    // regex for password validation
    const pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g);

    if (!pattern.test(fields.password)) {
      errors.passwordError =
        "* Password must include at least 8 characters, 1 Uppercase character and 1 number";
      formIsValid = false;
    } else if (fields.password !== fields.password2) {
      errors.password2Error = "* Passwords do not match";
      formIsValid = false;
    }

    this.setState({
      errors
    });

    return formIsValid;
  };

  validateForm = () => {
    const { fields } = this.state;
    const errors = {};
    let formIsValid = true;

    if (!fields.name) {
      formIsValid = false;
      errors.nameError = "* Please enter your name";
    }

    if (!fields.email) {
      formIsValid = false;
      errors.emailError = "* Please enter your email";
    }

    if (!fields.orgCode) {
      formIsValid = false;
      errors.orgCodeError = "* Please enter your unique code";
    }

    if (typeof fields.email !== "undefined") {
      // regular expression for email validation
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields.email)) {
        formIsValid = false;
        errors.emailError = "* Please enter valid email.";
      }
    }

    // regex for password validation
    const passwordPattern = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g
    );

    if (!passwordPattern.test(fields.password)) {
      errors.passwordError =
        "* Password must include at least 8 characters, 1 Uppercase character and 1 number";
      formIsValid = false;
    }

    if (fields.password !== fields.password2) {
      errors.password2Error = "* Passwords do not match";
      formIsValid = false;
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
      console.log("SUCCESS");
      // const { email, password } = fields;
      // const loginData = { email, password };
      // axios
      //   .post(API_LOGIN_URL, loginData)
      //   .then(({ data }) => {
      //     this.props.handleChangeState({ ...data, isLoggedIn: true });
      //     ["admin", "organisation"].includes(data.role)
      //       ? this.props.history.push(DASHBOARD_URL)
      //       : this.props.history.push(MYPROFILE_URL);
      //   })
      //   .catch(err => {
      //     this.setState({ msg: "error" });
      //   });
    } else {
      console.log("NOOO");
    }
  };

  render() {
    const { fields, errors, msg } = this.state;
    const { email, password, password2, name, orgCode } = fields;
    const {
      nameError,
      emailError,
      orgCodeError,
      passwordError,
      password2Error
    } = errors;
    const { onInputChange, onFormSubmit } = this;
    const { userType } = this.props;
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
              <ErrorMsg>{orgCodeError}</ErrorMsg>
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
          <ButtonWrapper>
            <Button label="Sign in" type="primary" onClick={onFormSubmit} />
          </ButtonWrapper>

          <ErrorMsg>{msg}</ErrorMsg>
        </SignUpForm>
      </Wrapper>
    );
  }
}
