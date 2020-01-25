import React, { Component } from "react";
import axios from "axios";

// CONSTANTS
import {
  API_SIGNUP_URL,
  API_GET_ORGS_URL,
  DASHBOARD_URL,
} from "./../../../constants/apiRoutes";

import USER_TYPES from "./../../../constants/userTypes";

import {
  HOST_COMPLETE_PROFILE_URL,
  INTERN_COMPLETE_PROFILE_URL,
  Error500,
} from "./../../../constants/navRoutes";

import SignUp from "./SignUp";

export default class SignUpPage extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null,
    userType: null,
    existingOrgs: [],
    isLoading: false,
  };

  componentDidMount() {
    const { userType } = this.props;
    this.setState({ userType });

    userType === "organisation" && this.getAllOrgs();

    window.scrollTo(0, 0);
  }

  // host checkbox function
  onCheckboxChange = e => {
    const { fields } = this.state;
    fields[e.target.name] = e.target.checked;
    this.setState({
      fields,
    });
  };

  // get all organisations for client side validation
  getAllOrgs = async () => {
    const { history } = this.props;
    try {
      const orgs = await axios.get(API_GET_ORGS_URL);
      if (orgs.data.length > 0) {
        const orgNames = orgs.data.map(organisation => {
          return {
            name: organisation.name,
            email: organisation.orgDetails.email,
          };
        });
        this.setState({ existingOrgs: orgNames });
      }
    } catch (err) {
      history.push(Error500);
    }
  };

  // check organisation already exists
  checkOrg = () => {
    const { fields, existingOrgs } = this.state;
    const { organisation } = fields;

    const matchedOrg = existingOrgs.filter(
      org =>
        org.name.toLowerCase().trim() === organisation.toLowerCase().trim(),
    );

    return matchedOrg;
  };

  onInputChange = e => {
    const { fields } = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
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

    if (fields.password && fields.password.length < 8) {
      errors.passwordError = "Password is too short.";
      formIsValid = false;
    } else if (!pattern.test(fields.password)) {
      errors.passwordError =
        "Password requires 8 characters including at least 1 uppercase character and 1 number.";
      formIsValid = false;
    } else if (fields.password !== fields.password2) {
      errors.password2Error = "Passwords do not match.";
      formIsValid = false;
    }

    this.setState({
      errors,
    });

    return formIsValid;
  };

  validateForm = () => {
    const { fields, userType } = this.state;
    const errors = {};
    let formIsValid = true;

    if (!fields.name) {
      formIsValid = false;
      errors.nameError = "Please enter your name.";
    }

    if (!fields.email) {
      formIsValid = false;
      errors.emailError = "Please enter your email.";
    }

    if (!fields.organisation && userType === USER_TYPES.organisation) {
      formIsValid = false;
      errors.organisationError = "* Please enter your organisation";
    }

    if (fields.organisation && userType === USER_TYPES.organisation) {
      const matchedOrg = this.checkOrg(fields.organisation);
      if (matchedOrg.length > 0) {
        formIsValid = false;
        errors.organisationError = `* ${matchedOrg[0].name} already has an account created by ${matchedOrg[0].email}`;
      }
    }

    if (typeof fields.email !== "undefined") {
      // regular expression for email validation
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );
      if (!pattern.test(fields.email)) {
        formIsValid = false;
        errors.emailError = "Please enter valid email.";
      }
    }

    // regex for password validation
    const passwordPattern = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g,
    );

    if (fields.password && fields.password.length < 8) {
      errors.passwordError = "Password is too short.";
      formIsValid = false;
    } else if (!passwordPattern.test(fields.password)) {
      errors.passwordError =
        "Password requires 8 characters including at least 1 uppercase character and 1 number.";
      formIsValid = false;
    }

    if (fields.password !== fields.password2) {
      formIsValid = false;
      errors.password2Error = "Passwords do not match";
    }

    // for hosts make sure they've ticked the disclaimer
    if ((userType === "host" || userType === "intern") && !fields.checkbox) {
      formIsValid = false;
      errors.disclaimerError =
        "You need to agree with the Terms & Conditions and PressPad Privacy Policy in order to complete the signup";
    }

    this.setState({
      errors,
    });

    return formIsValid;
  };

  onFormSubmit = async e => {
    const { fields, userType } = this.state;
    const { handleChangeState, history } = this.props;
    fields.role = userType;
    e.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      const userInfo = { ...fields };
      try {
        this.setState({ isLoading: true });
        const { data } = await axios.post(API_SIGNUP_URL, { userInfo });
        handleChangeState({ ...data, isLoggedIn: true });
        if (["admin", "organisation"].includes(data.role)) {
          this.setState({ isLoading: false });
          history.push(DASHBOARD_URL);
        } else if (data.role === "intern") {
          this.setState({ isLoading: false });
          history.push(INTERN_COMPLETE_PROFILE_URL);
        } else if (["host", "superhost"].includes(data.role)) {
          this.setState({ isLoading: false });
          history.push(HOST_COMPLETE_PROFILE_URL);
        }
      } catch (err) {
        if (err.response) {
          if (err.response.data.error.includes("Email")) {
            this.setState({
              errors: {
                emailError: err.response.data.error,
              },
              isLoading: false,
            });
          } else
            this.setState({ msg: err.response.data.error, isLoading: false });
        }
      }
    }
  };

  render() {
    const { onInputChange, onFormSubmit, onCheckboxChange } = this;
    const { userType } = this.props;

    return (
      <SignUp
        {...this.state}
        userType={userType}
        onInputChange={onInputChange}
        onFormSubmit={onFormSubmit}
        onCheckboxChange={onCheckboxChange}
      />
    );
  }
}
