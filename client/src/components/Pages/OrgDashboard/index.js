import React, { Component } from "react";
import axios from "axios";
import Moment from "moment";
import schema from "./schema";
import { calculatePrice } from "./../../../helpers";
import { extendMoment } from "moment-range";
import { message } from "antd";

import {
  API_ORGS_DASHBOARD_URL,
  API_INTERNS_URL,
  API_COUPONS_URL
} from "./../../../constants/apiRoutes";

import Content from "./Content";

const moment = extendMoment(Moment);

class OrganizationDashboard extends Component {
  state = {
    details: {},
    notifications: [],
    coupons: [],
    account: {},
    interns: [],
    isCouponModalOpen: false,
    loaded: false,
    internsLoaded: false,
    addedNewInternName: null,
    isNumberInputActive: false,
    discountRate: 0,
    code: null
  };

  componentDidMount() {
    axios.get(API_ORGS_DASHBOARD_URL).then(res => {
      const [details, notifications, coupons] = res.data;

      const { account } = details[0];
      this.setState({
        details: details[0] || {},
        notifications,
        account,
        coupons,
        loaded: true
      });
    });

    document.addEventListener("keypress", e => {
      const { isNumberInputActive } = this.state;
      const numbers = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        ".",
        ","
      ];
      if (!numbers.includes(e.key) && isNumberInputActive) {
        e.preventDefault();
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", () => {});
  }

  handleSubmitCreateCoupon = () => {
    const {
      internName,
      internId,
      discountRate,
      startValue,
      endValue,
      account
    } = this.state;

    const range = moment.range(startValue, endValue);
    const price = calculatePrice(range);
    if (account.currentBalance - price < 0) {
      return message.error("No Enough Money!");
    }

    this.validate().then(res => {
      res &&
        this.setState({ code: null, apiLoading: true }, () => {
          axios
            .post(API_COUPONS_URL, {
              internName,
              intern: internId,
              discountRate,
              startDate: moment(startValue).format("YYYY-MM-DD"),
              endDate: moment(endValue).format("YYYY-MM-DD")
            })
            .then(({ data }) => {
              const { code } = data;
              this.setState({ code, apiLoading: false });
            })
            .catch(() => {
              this.setState({ apiLoading: false });
              return message.error("Something went wrong!");
            });
        });
    });
  };

  handleOpenModal = () => {
    const { internsLoaded } = this.state;
    !internsLoaded
      ? axios.get(API_INTERNS_URL).then(res => {
          this.setState({
            interns: res.data,
            internsLoaded,
            isCouponModalOpen: true,
            code: null
          });
        })
      : this.setState({ isCouponModalOpen: true, code: null });
  };

  handleCloseModals = () => {
    this.setState({ isCouponModalOpen: false });
  };
  handleFilterInInterns = (input, option) =>
    option.props.label.includes(input.toLowerCase());

  onEndChange = value => {
    this.onChange("endValue", value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return endValue && endValue < moment().subtract(1, "day");
    }
    return (
      endValue.valueOf() <= startValue.valueOf() ||
      (endValue && endValue < moment().subtract(1, "day"))
    );
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = value => {
    this.onChange("startValue", value);
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    // false mean not disabled
    if (!startValue || !endValue) {
      return startValue && startValue < moment().subtract(1, "day");
    }

    return (
      startValue.valueOf() > endValue.valueOf() ||
      (startValue && startValue < moment().subtract(1, "day"))
    );
  };

  onSelectInternChange = ({ key, label }) => {
    const { addedNewInternName } = this.state;
    this.setState({
      internName: label || addedNewInternName,
      internId: key === "removeIt" ? null : key,
      addedNewInternName: null
    });
  };

  onInternSearch = value => {
    value &&
      this.setState({
        addedNewInternName: value,
        internId: null,
        internName: value
      });
  };

  handleBlurNumberInput = () => {
    this.setState({ isNumberInputActive: false });
  };

  handleFocusNumberInput = () => {
    this.setState({ isNumberInputActive: true });
  };

  handleDiscountChange = value => {
    const { attemptedToSubmit } = this.state;

    this.setState({ discountRate: value }, () => {
      if (attemptedToSubmit) {
        this.validate();
      }
    });
  };

  validate = () => {
    const {
      discountRate,
      internName,
      internId,
      endValue,
      startValue
    } = this.state;

    return schema
      .validate(
        {
          discountRate,
          internName,
          internId,
          startDate: startValue,
          endDate: endValue
        },
        { abortEarly: false }
      )
      .then(res => {
        this.setState({ errors: {} });
        return res;
      })
      .catch(err => {
        const errors = {};
        err.inner.forEach(element => {
          errors[element.path.split(".")[0]] = element.message;
        });
        this.setState({ errors });
      });
  };

  render() {
    const { name, windowWidth } = this.props;

    return (
      <Content
        name={name}
        windowWidth={windowWidth}
        state={this.state}
        onEndChange={this.onEndChange}
        handleStartOpenChange={this.handleStartOpenChange}
        handleEndOpenChange={this.handleEndOpenChange}
        disabledEndDate={this.disabledEndDate}
        onStartChange={this.onStartChange}
        dateRender={this.dateRender}
        disabledStartDate={this.disabledStartDate}
        onSelectInternChange={this.onSelectInternChange}
        handleOpenModal={this.handleOpenModal}
        handleFilterInInterns={this.handleFilterInInterns}
        onInternSearch={this.onInternSearch}
        handleBlurNumberInput={this.handleBlurNumberInput}
        handleFocusNumberInput={this.handleFocusNumberInput}
        handleDiscountChange={this.handleDiscountChange}
        handleCloseModals={this.handleCloseModals}
        handleSubmitCreateCoupon={this.handleSubmitCreateCoupon}
      />
    );
  }
}

export default OrganizationDashboard;
