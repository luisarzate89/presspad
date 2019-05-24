import React, { Component } from "react";
import { Input, Checkbox } from "antd";
import axios from "axios";

// COMMON COMPONENTS
import Button from "./../../Common/Button";

// CONSTANTS
import {
  API_SIGNUP_URL,
  API_CHECK_REFERRAL_URL,
  DASHBOARD_URL,
  MYPROFILE_URL
} from "./../../../constants/apiRoutes";
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
  ButtonWrapper,
  ReferralWrapper,
  Disclaimer,
  DisclaimerText,
  ReferralText
} from "./SignUpPage.style";

export default class SignUpPage extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null,
    userType: null,
    referral: null,
    referralError: null
  };

  componentDidMount() {
    const { userType } = this.props;
    this.setState({ userType });

    userType === "host" && this.checkValidReferral();
  }

  // function to check if the host is using a valid referral link
  checkValidReferral = () => {
    const referralId = ("hello", window.location.href.split("/")[5]);
    axios
      .post(API_CHECK_REFERRAL_URL, { referralId })
      .then(referralUser => this.setState({ referral: referralUser.data }))
      .catch(err => this.setState({ referralError: err }));
  };

  // host checkbox function
  onCheckboxChange = e => {
    const { fields } = this.state;
    fields[e.target.name] = e.target.checked;
    this.setState({
      fields
    });
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
    const { fields, userType } = this.state;
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

    if (!fields.orgCode && userType === USER_TYPES.intern) {
      formIsValid = false;
      errors.orgCodeError = "* Please enter your unique code";
    }

    if (!fields.organisation && userType === USER_TYPES.organisation) {
      formIsValid = false;
      errors.organisationError = "* Please enter your organisation";
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

    // for hosts make sure they've ticked the disclaimer
    if (!fields.checkbox) {
      errors.disclaimerError = "* You must agree in order to sign up";
      formIsValid = false;
    }

    this.setState({
      errors
    });

    return formIsValid;
  };

  onFormSubmit = e => {
    const { fields, userType, referral } = this.state;
    fields.role = userType;
    if (userType === "host") fields.referral = referral.id;
    e.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      console.log("SUCCESS");
      const userInfo = { ...fields };

      axios
        .post(API_SIGNUP_URL, { userInfo })
        .then(({ data }) => {
          this.props.handleChangeState({ ...data, isLoggedIn: true });
          ["admin", "organisation"].includes(data.role)
            ? this.props.history.push(DASHBOARD_URL)
            : this.props.history.push(MYPROFILE_URL);
        })
        .catch(err => {
          this.setState({ msg: "error" });
        });
    } else {
      console.log("NOOO");
    }
  };

  render() {
    const { fields, errors, msg, referralError, referral } = this.state;
    const { email, password, password2, name, orgCode, organisation } = fields;
    const {
      nameError,
      emailError,
      orgCodeError,
      organisationError,
      passwordError,
      password2Error,
      disclaimerError
    } = errors;
    const { onInputChange, onFormSubmit, onCheckboxChange } = this;
    const { userType } = this.props;

    if (referralError)
      return (
        <Wrapper>
          <HeaderText>
            Sorry, we cannot find a user for this referral link. Please contact
            them again and try with another link.
          </HeaderText>
        </Wrapper>
      );

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
          {userType === USER_TYPES.organisation && (
            <FormHeader>
              Please fill in the details below to create your organisation’s
              PressPad account
            </FormHeader>
          )}
          {userType === USER_TYPES.host && (
            <FormHeader>
              Please choose a password to create your account and become a
              PressPad host
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
          <ReferralWrapper>
            {referral && (
              <ReferralText>
                You have been referred by {referral.name}
              </ReferralText>
            )}
            <Disclaimer>
              <Checkbox name="checkbox" onChange={onCheckboxChange} />
              <DisclaimerText>
                By ticking this box you agree we can contact your reference in
                order to verify your profile
              </DisclaimerText>
            </Disclaimer>
            <ErrorMsg>{disclaimerError}</ErrorMsg>
          </ReferralWrapper>
          <ButtonWrapper>
            <Button label="Sign up" type="primary" onClick={onFormSubmit} />
          </ButtonWrapper>
          <ErrorMsg>{msg}</ErrorMsg>
        </SignUpForm>
      </Wrapper>
    );
  }
}
