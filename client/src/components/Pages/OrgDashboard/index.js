import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { message } from 'antd';
import schema from './schema';
import { calculatePrice } from '../../../helpers';

import {
  API_ORGS_DASHBOARD_URL,
  API_INTERNS_URL,
  API_COUPONS_URL,
  API_NOTIFICATION_URL,
} from '../../../constants/apiRoutes';

import Content from './Content';

const moment = extendMoment(Moment);

class OrganizationDashboard extends Component {
  state = {
    details: {},
    notifications: [],
    slicedNotifications: [],
    viewNotificationNum: 3,
    markAsSeen: false,
    coupons: [],
    account: {},
    interns: [],
    isCouponModalOpen: false,
    loaded: false,
    internsLoaded: false,
    addedNewInternName: null,
    isNumberInputActive: false,
    discountRate: 0,
    discountPrice: 0,
    code: null,
    addCouponLoading: false,
    showAddFunds: false,
    errors: {},
  };

  componentDidMount() {
    this.fetchOrgData();

    document.addEventListener('keypress', e => {
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
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '.',
        ',',
      ];
      if (!numbers.includes(e.key) && isNumberInputActive) {
        e.preventDefault();
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', () => {});
  }

  fetchOrgData = () => {
    axios
      .get(API_ORGS_DASHBOARD_URL)
      .then(res => {
        const [details, notifications, coupons] = res.data;

        const sortedNotification = notifications.sort((a, b) => {
          if (Moment(a.createdAt).isAfter(b.createdAt)) {
            return -1;
          }
          return 1;
        });
        const { account } = details[0];
        this.setState(({ viewNotificationNum }) => ({
          details: details[0] || {},
          notifications: sortedNotification,
          slicedNotifications: sortedNotification.slice(
            0,
            viewNotificationNum + 1,
          ),
          account,
          coupons,
          loaded: true,
        }));
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || 'Something went wrong');
      });
  };

  handleSubmitCreateCoupon = () => {
    const {
      internName,
      internId,
      discountRate,
      startValue,
      endValue,
      account,
    } = this.state;

    const range = moment.range(startValue, endValue);
    const price = (calculatePrice(range) * discountRate) / 100;

    if (account.currentBalance - price < 0) {
      return message.error('No Enough Money!');
    }

    this.validate().then(res => {
      res &&
        this.setState({ code: null, apiLoading: true }, () => {
          axios
            .post(API_COUPONS_URL, {
              internName,
              intern: internId,
              discountRate,
              startDate: moment(startValue).format('YYYY-MM-DD'),
              endDate: moment(endValue).format('YYYY-MM-DD'),
            })
            .then(({ data }) => {
              const { code } = data;
              this.setState({
                code,
                apiLoading: false,
              });
              // update organisation data
              this.fetchOrgData();
            })
            .catch(() => {
              this.setState({ apiLoading: false });
              return message.error('Something went wrong!');
            });
        });
    });
  };

  handleOpenModal = async () => {
    try {
      this.setState({ addCouponLoading: true });

      const { data: interns } = await axios.get(API_INTERNS_URL);

      this.setState({
        interns,
        addCouponLoading: false,
        isCouponModalOpen: true,
        code: null,
      });
    } catch (err) {
      const error =
        err.response && err.response.data && err.response.data.error;
      message.error(error || 'Something went wrong');
    }
  };

  handleCloseModals = () => {
    this.setState({ isCouponModalOpen: false });
  };

  handleFilterInInterns = (input, option) =>
    option.props.label.includes(input.toLowerCase());

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    } else {
      this.setState({ endValue: undefined });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return endValue && endValue < moment().subtract(1, 'day');
    }
    return (
      endValue.valueOf() <= startValue.valueOf() ||
      (endValue && endValue < moment().subtract(1, 'day'))
    );
  };

  onChange = (field, value) => {
    const {
      attemptedToSubmit,
      startValue,
      endValue,
      discountRate,
    } = this.state;

    const rangeObj = { startValue, endValue };
    // update start and end values with the recent changes
    rangeObj[field] = value;

    let discountPrice = 0;
    if (rangeObj.startValue && rangeObj.endValue && discountRate) {
      const daysPrice = calculatePrice(
        moment.range(rangeObj.startValue, rangeObj.endValue),
      );
      discountPrice = (daysPrice * discountRate) / 100;
    }

    this.setState(
      {
        [field]: value,
        discountPrice,
      },
      () => {
        if (attemptedToSubmit) {
          this.validate();
        }
      },
    );
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    // false mean not disabled
    if (!startValue || !endValue) {
      return startValue && startValue < moment().subtract(1, 'day');
    }

    return (
      startValue.valueOf() > endValue.valueOf() ||
      (startValue && startValue < moment().subtract(1, 'day'))
    );
  };

  onSelectInternChange = ({ key, label }) => {
    const { addedNewInternName, attemptedToSubmit } = this.state;
    this.setState(
      {
        internName: label || addedNewInternName,
        internId: key === 'removeIt' ? null : key,
        addedNewInternName: null,
      },
      () => {
        if (attemptedToSubmit) {
          this.validate();
        }
      },
    );
  };

  onInternSearch = value => {
    const { attemptedToSubmit } = this.state;

    value &&
      this.setState(
        {
          addedNewInternName: value,
          internId: null,
          internName: value,
        },
        () => {
          if (attemptedToSubmit) {
            this.validate();
          }
        },
      );
  };

  handleBlurNumberInput = () => {
    this.setState({ isNumberInputActive: false });
  };

  handleFocusNumberInput = () => {
    this.setState({ isNumberInputActive: true });
  };

  handleDiscountChange = value => {
    const { attemptedToSubmit, startValue, endValue } = this.state;

    let discountPrice = 0;
    if (startValue && endValue) {
      discountPrice =
        (calculatePrice(moment.range(startValue, endValue)) * Number(value)) /
        100;
    }
    this.setState({ discountRate: value, discountPrice }, () => {
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
      startValue,
    } = this.state;

    return schema
      .validate(
        {
          discountRate,
          internName,
          internId,
          startDate: startValue,
          endDate: endValue,
        },
        { abortEarly: false },
      )
      .then(res => {
        this.setState({ errors: {}, attemptedToSubmit: true });
        return res;
      })
      .catch(err => {
        const errors = {};
        err.inner.forEach(element => {
          errors[element.path.split('.')[0]] = element.message;
        });
        this.setState({ errors, attemptedToSubmit: true });
      });
  };

  handlePayNowClick = show => this.setState({ showAddFunds: show });

  handleAccountUpdate = account =>
    this.setState({ account, showAddFunds: false });

  markAsSeen = async () => {
    const { notifications, slicedNotifications, markAsSeen } = this.state;
    if (!markAsSeen) {
      try {
        const newNotifications = slicedNotifications.map(ele => ({ ...ele }));
        const notificationsIds = slicedNotifications.reduce((acc, curr, i) => {
          if (!curr.seenForOrg) {
            acc.push(curr._id);
            newNotifications[i].loading = true;
          }
          return acc;
        }, []);

        this.setState({
          markAsSeen: true,
          slicedNotifications: newNotifications,
        });
        if (notificationsIds[0]) {
          await axios.patch(`${API_NOTIFICATION_URL}/seen`, notificationsIds);

          const updatedNotifications = notifications.map(update => {
            if (notificationsIds.includes(update._id)) {
              return {
                ...update,
                seenForOrg: true,
                loading: false,
              };
            }
            return update;
          });

          this.setState(({ viewNotificationNum }) => ({
            notifications: updatedNotifications,
            slicedNotifications: viewNotificationNum
              ? updatedNotifications.slice(0, viewNotificationNum)
              : updatedNotifications,
          }));
        }
      } catch (error) {
        this.setState({ markAsSeen: false, slicedNotifications });
        message.error('Something went wrong');
      }
    }
  };

  handleViewMoreToggle = ({
    target: {
      dataset: { name },
    },
  }) => {
    if (name === 'updates') {
      this.setState(({ viewNotificationNum, notifications }) => ({
        viewNotificationNum: viewNotificationNum ? undefined : 3,
        slicedNotifications: viewNotificationNum
          ? notifications
          : notifications.slice(0, 3),
        markAsSeen: false,
      }));
    }
  };

  render() {
    const { name, windowWidth, stripe } = this.props;

    return (
      <Content
        name={name}
        windowWidth={windowWidth}
        stripe={stripe}
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
        handlePayNowClick={this.handlePayNowClick}
        handleAccountUpdate={this.handleAccountUpdate}
        markAsSeen={this.markAsSeen}
        handleViewMoreToggle={this.handleViewMoreToggle}
      />
    );
  }
}

export default OrganizationDashboard;
