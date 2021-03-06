/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Row,
  Col,
  Avatar,
  Table,
  Modal,
  Select,
  DatePicker,
  Empty,
  Icon,
  Skeleton,
} from 'antd';
import moment from 'moment';
import { Elements } from 'react-stripe-elements';

import Button from '../../Common/Button';
import { calculatePrice } from '../../../helpers';

import Update from './Update';
import CouponsColumns from './CouponsColumns';
import AddFundsModal from './AddFundsModal';
import DisabledPopOver from '../../Common/DisabledPopOver';

import { HOSTS_URL } from '../../../constants/navRoutes';

import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  HiText,
  Section,
  SectionTitle,
  SectionWrapperContent,
  UpdateList,
  ProfileImage,
  InfoTable,
  InfoTableRow,
  TD,
  Card,
  BlueLink,
  BlueLink1,
  InternsTableWrapper,
  ModalTitle,
  ModalContentWrapper,
  ModalDescription,
  Label,
  Error,
  ErrorWrapper,
} from './OrgDashboard.style';
import { colors } from '../../../theme';

import homeIcon from '../../../assets/home-icon.svg';
import invoiceIcon from '../../../assets/invoice-icon.svg';
import contantIcon from '../../../assets/contact-icon.svg';
import logPlaceholder from '../../../assets/logo-placeholder.png';

const { Option } = Select;

class Content extends Component {
  render() {
    let potentialCost = 0;
    const {
      state,
      name,
      windowWidth,
      onEndChange,
      handleStartOpenChange,
      handleEndOpenChange,
      disabledEndDate,
      onStartChange,
      disabledStartDate,
      onSelectInternChange,
      handleOpenModal,
      handleFilterInInterns,
      onInternSearch,
      handleDiscountChange,
      handleCloseModals,
      handleSubmitCreateCoupon,
      handlePayNowClick,
      handleAccountUpdate,
      markAsSeen,
      handleViewMoreToggle,
      stripe,
    } = this.props;

    const {
      details,
      account,
      coupons,
      discountRate,
      startValue,
      endValue,
      endOpen,
      errors,
      showAddFunds,
      discountPrice,
      notifications,
      slicedNotifications,
      viewNotificationNum,
    } = state;
    if (startValue && endValue) {
      const range = moment.range(startValue, endValue);

      // price after discount
      potentialCost = (calculatePrice(range) * discountRate) / 100;
    }

    const currentlyHosted = coupons.filter(item => item.status === 'At host')
      .length;

    const internsWithNewOne = state.addedNewInternName
      ? [...state.interns, { _id: 'removeIt', name: state.addedNewInternName }]
      : state.interns;
    const liveCoupons = coupons.filter(
      item =>
        moment(item.endDate).valueOf() > moment().valueOf() &&
        moment(item.startDate).valueOf() <= moment().valueOf(),
    ).length;

    return (
      <PageWrapper>
        <Elements>
          <AddFundsModal
            handleAccountUpdate={handleAccountUpdate}
            handlePayNowClick={handlePayNowClick}
            showAddFunds={showAddFunds}
            account={account}
            stripe={stripe}
          />
        </Elements>
        <ContentWrapper>
          <HeaderWrapper>
            <Row gutter={20} type="flex" justify="start">
              <Col xs={24} sm={4} lg={3}>
                <Avatar
                  size="large"
                  icon="user"
                  src={
                    (details && details.logo && details.logo.url) ||
                    logPlaceholder
                  }
                  style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '42px',
                    border: '1px solid rgba(0, 0, 0, 0.15)',
                  }}
                />
              </Col>
              <Col span={20}>
                <HiText>
                  Hi {name.split(' ')[0]}, here’s how your interns are doing
                </HiText>
              </Col>
            </Row>
          </HeaderWrapper>

          {/* First row */}
          <Row gutter={20} type="flex" justify="start">
            {/* Your updates col */}
            <Col
              xs={24}
              sm={24}
              lg={16}
              style={{
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Section style={{ marginBottom: '20px' }}>
                <SectionWrapperContent
                  style={{ minHeight: '200px' }}
                  onMouseEnter={markAsSeen}
                  onTouchStart={markAsSeen}
                >
                  <SectionTitle>Your updates</SectionTitle>
                  <UpdateList>
                    {slicedNotifications.length > 0 ? (
                      slicedNotifications.map(item => (
                        <Update key={item._id} item={item} />
                      ))
                    ) : (
                      <Empty description="No Updates" />
                    )}
                  </UpdateList>
                  {notifications.length > 3 && (
                    <BlueLink
                      data-name="updates"
                      onClick={handleViewMoreToggle}
                      style={{ marginTop: '2rem', textAlign: 'center' }}
                    >
                      {viewNotificationNum ? 'View more' : 'View less'}
                    </BlueLink>
                  )}
                </SectionWrapperContent>
              </Section>

              <Section>
                <Row gutter={24} type="flex" justify="start">
                  <Col xs={24} sm={8} style={{ height: 'auto' }}>
                    <SectionWrapperContent>
                      <Card>
                        <img src={invoiceIcon} alt="Invoices" />
                        <DisabledPopOver>
                          <BlueLink>Invoices</BlueLink>
                        </DisabledPopOver>
                      </Card>
                    </SectionWrapperContent>
                  </Col>
                  <Col xs={24} sm={8} style={{ height: 'auto' }}>
                    <SectionWrapperContent>
                      <Card>
                        <img src={homeIcon} alt="View Hosts" />
                        {/* <DisabledPopOver> */}
                        <BlueLink1 to={HOSTS_URL}>View Hosts</BlueLink1>
                        {/* </DisabledPopOver> */}
                      </Card>
                    </SectionWrapperContent>
                  </Col>
                  <Col xs={24} sm={8} style={{ height: 'auto' }}>
                    <SectionWrapperContent>
                      <Card>
                        <img src={contantIcon} alt="Contact PressPad" />
                        <DisabledPopOver>
                          <BlueLink>Contact PressPad</BlueLink>
                        </DisabledPopOver>
                      </Card>
                    </SectionWrapperContent>
                  </Col>
                </Row>
              </Section>
            </Col>
            <Col xs={24} sm={24} lg={8} style={{ marginBottom: '20px' }}>
              <Section style={{ height: '100%' }}>
                <SectionWrapperContent
                  style={{ marginBottom: 0, height: '100%' }}
                >
                  <ProfileImage
                    src={
                      (details && details.logo && details.logo.url) ||
                      logPlaceholder
                    }
                    onError={e => (e.target.src = logPlaceholder)}
                  />

                  <InfoTable>
                    <tbody>
                      <InfoTableRow header className="header">
                        <TD position="left" bold>
                          Available funds:
                        </TD>
                        <TD position="center" bold>
                          £
                          {(account &&
                            (account.currentBalance / 100).toFixed(2)) ||
                            0}
                        </TD>
                        <TD position="right">
                          <BlueLink onClick={() => handlePayNowClick(true)}>
                            Add funds
                          </BlueLink>
                        </TD>
                      </InfoTableRow>
                      <InfoTableRow>
                        <TD position="left">Live Discount codes:</TD>
                        <TD position="center" bold>
                          {liveCoupons || 0}
                        </TD>
                        <TD position="right">
                          {account.currentBalance >= 100 ? (
                            <>
                              {state.addCouponLoading ? (
                                <BlueLink>
                                  <Skeleton
                                    loading={state.addCouponLoading}
                                    title={false}
                                    active
                                    paragraph={{ rows: 1, width: '95%' }}
                                  />
                                </BlueLink>
                              ) : (
                                <BlueLink onClick={handleOpenModal}>
                                  Add codes
                                </BlueLink>
                              )}
                            </>
                          ) : (
                            <DisabledPopOver
                              title="No Enough Fund"
                              message="Add More Funds"
                              position="left"
                            >
                              Add codes
                            </DisabledPopOver>
                          )}
                        </TD>
                      </InfoTableRow>

                      <InfoTableRow>
                        <TD position="left">Your Codes values:</TD>
                        <TD position="center" bold>
                          £
                          {(account &&
                            (account.couponsValue / 100).toFixed(2)) ||
                            0}
                        </TD>
                      </InfoTableRow>

                      <InfoTableRow>
                        <TD position="left">Currently hosted:</TD>
                        <TD position="center" bold>
                          {currentlyHosted}
                        </TD>
                        <TD position="right" />
                      </InfoTableRow>
                    </tbody>
                  </InfoTable>
                </SectionWrapperContent>
              </Section>
            </Col>
          </Row>

          <Row
            gutter={20}
            type="flex"
            justify="start"
            style={{ marginTop: '20px' }}
          >
            <Col sm={24}>
              <Section style={{ marginBottom: '20px' }}>
                <SectionWrapperContent style={{ padding: 0 }}>
                  <InternsTableWrapper>
                    <Table
                      columns={CouponsColumns(windowWidth)}
                      dataSource={coupons}
                    />
                  </InternsTableWrapper>
                </SectionWrapperContent>
              </Section>
            </Col>
          </Row>
        </ContentWrapper>
        <Modal
          visible={state.isCouponModalOpen}
          onCancel={handleCloseModals}
          footer={false}
        >
          <ModalContentWrapper>
            <ModalTitle>Create Coupon</ModalTitle>
            <div>
              <ModalDescription bold>Funds available: </ModalDescription>
              <ModalDescription bold>
                £{(account.currentBalance / 100).toFixed(2)}{' '}
              </ModalDescription>
            </div>

            <div>
              <ModalDescription bold>Potential Cost: </ModalDescription>
              <ModalDescription
                bold
                red={account.currentBalance - potentialCost < 100}
              >
                £{Number(potentialCost / 100).toFixed(2)}{' '}
              </ModalDescription>
            </div>

            {account.currentBalance - potentialCost < 100 && (
              <div>
                <BlueLink onClick={() => handlePayNowClick(true)}>
                  Add funds
                </BlueLink>
              </div>
            )}

            {/* ------------------------------------------ */}
            {/* ----------------Select the user----------- */}
            {!state.code ? (
              <>
                <Row
                  gutter={8}
                  type="flex"
                  justify="center"
                  align="middle"
                  style={{
                    width: '100%',
                    marginBottom:
                      errors.internName || errors.internId ? '20px' : 0,
                  }}
                >
                  <Col span={8}>
                    <Label>Intern:</Label>
                  </Col>
                  <Col span={12}>
                    <ErrorWrapper>
                      <Select
                        labelInValue
                        placeholder="Select your Intern"
                        onSelect={onSelectInternChange}
                        showSearch
                        onSearch={onInternSearch}
                        filterOption={handleFilterInInterns}
                        style={{
                          width: '100%',
                          border:
                            errors.internName || errors.internId
                              ? '1px solid red'
                              : '1px solid #d9d9d9',
                        }}
                        optionLabelProp="label"
                      >
                        {state.interns &&
                          internsWithNewOne.map(item => (
                            <Option
                              value={item._id}
                              key={item._id}
                              label={item.name}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  textTransform: 'capitalize',
                                }}
                              >
                                {item.name}
                                {item._id !== 'removeIt' && (
                                  <Icon
                                    type="user"
                                    style={{ color: colors.lightBlue }}
                                  />
                                )}
                              </div>
                            </Option>
                          ))}
                      </Select>
                      <Error>{errors.internName || errors.internId}</Error>
                    </ErrorWrapper>
                  </Col>
                </Row>

                {/* ------------------------------------- */}
                {/* ----------- dates ranges ------------ */}
                <Row
                  gutter={8}
                  type="flex"
                  justify="center"
                  align="middle"
                  style={{
                    width: '100%',
                    marginBottom: errors.startDate ? '20px' : 0,
                  }}
                >
                  <Col span={8}>
                    <Label>Start Date:</Label>
                  </Col>
                  <Col span={12}>
                    <ErrorWrapper>
                      <DatePicker
                        disabledDate={disabledStartDate}
                        format="YYYY-MM-DD"
                        value={startValue}
                        placeholder="Start Date"
                        onChange={onStartChange}
                        onOpenChange={handleStartOpenChange}
                        style={{
                          width: '100%',
                          border: errors.startDate
                            ? '1px solid red'
                            : '1px solid #d9d9d9',
                        }}
                      />
                      <Error>{errors.startDate}</Error>
                    </ErrorWrapper>
                  </Col>
                </Row>

                <Row
                  gutter={8}
                  type="flex"
                  justify="center"
                  align="middle"
                  style={{
                    width: '100%',
                    marginBottom: errors.endDate ? '20px' : 0,
                  }}
                >
                  <Col span={8}>
                    <Label>End Date:</Label>
                  </Col>
                  <Col span={12}>
                    <ErrorWrapper>
                      <DatePicker
                        disabledDate={disabledEndDate}
                        format="YYYY-MM-DD"
                        value={endValue}
                        placeholder="End Date"
                        onChange={onEndChange}
                        open={endOpen}
                        onOpenChange={handleEndOpenChange}
                        style={{
                          width: '100%',
                          border: errors.endDate
                            ? '1px solid red'
                            : '1px solid #d9d9d9',
                        }}
                      />
                      <Error>{errors.endDate}</Error>
                    </ErrorWrapper>
                  </Col>
                </Row>

                {/* ----------------------------------- */}
                {/* ---------- discount % ------------- */}
                <Row
                  gutter={8}
                  type="flex"
                  justify="center"
                  align="middle"
                  style={{
                    width: '100%',
                    marginBottom: errors.discountRate ? '20px' : 0,
                  }}
                >
                  <Col span={8}>
                    <Label>Discount:</Label>
                  </Col>
                  <Col span={12}>
                    <ErrorWrapper>
                      <Select
                        // defaultValue="0"
                        placeholder="Pick %"
                        onChange={handleDiscountChange}
                        style={{
                          width: '140px',
                          border: errors.discountRate
                            ? '1px solid red'
                            : '1px solid #d9d9d9',
                        }}
                      >
                        {/* add discount rates */}
                        {[10, 25, 50, 100].map(rate => (
                          <Option key={rate} value={rate}>
                            % {rate}
                          </Option>
                        ))}
                      </Select>
                      <Error>{errors.discountRate}</Error>
                    </ErrorWrapper>
                  </Col>
                </Row>

                <div>
                  <ModalDescription bold>Coupon cost: </ModalDescription>
                  <ModalDescription bold>
                    £{(discountPrice / 100).toFixed(2)}{' '}
                  </ModalDescription>
                </div>

                <Button
                  label="Create Coupon"
                  type="secondary"
                  style={{ marginTop: '2rem' }}
                  onClick={handleSubmitCreateCoupon}
                  loading={state.apiLoading}
                  disabled={account.currentBalance - potentialCost < 0}
                />
                <Button
                  label="Cancel"
                  type="cancel"
                  nobgc
                  style={{ width: '135px' }}
                  onClick={handleCloseModals}
                />
              </>
            ) : (
              <>
                <Row
                  gutter={30}
                  type="flex"
                  justify="space-around"
                  align="middle"
                  style={{
                    width: '100%',
                    marginBottom: errors.withdrawValue ? '20px' : 0,
                  }}
                >
                  <div style={{ maxWidth: '200px' }}>
                    <ModalDescription bold>Created Code: </ModalDescription>
                    <ModalDescription bold style={{ color: colors.lightBlue }}>
                      {state.code}
                    </ModalDescription>
                  </div>
                </Row>
                <Row>
                  <ModalDescription style={{ textDecoration: 'center' }}>
                    Please copy and share this code with your intern so they can
                    use it when finding a place to stay.
                  </ModalDescription>
                </Row>
              </>
            )}
          </ModalContentWrapper>
        </Modal>
      </PageWrapper>
    );
  }
}

export default Content;
