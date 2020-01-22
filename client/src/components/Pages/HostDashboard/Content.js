import React from "react";
import { withRouter } from "react-router-dom";

import {
  Col,
  Row,
  Avatar,
  Empty,
  Table,
  Modal,
  InputNumber,
  Input
} from "antd";
import { getStringTime } from "./../../../helpers";

import Update from "./../../Common/Update";
import Button from "./../../Common/Button";
import randomProfile from "../../../assets/random-profile.jpg";

import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  HiText,
  SectionWrapperContent,
  SectionTitle,
  UpdateList,
  BookingsTableWrapper,
  BlueLink,
  ListItem,
  Number,
  ButtonsWrapper,
  ModalTitle,
  ModalContentWrapper,
  ModalDescription,
  Label,
  BoldTitle,
  Error,
  ErrorWrapper
} from "./HostDashboard.style";

import BookingSection from "./../../Common/BookingSection";
import { bookingsColumns, withdrawRequestsColumns } from "./TablesColumns";

const Content = ({
  // props and state
  windowWidth,
  name,
  role,
  viewNumber,
  bankName,
  bankSortCode,
  accountNumber,
  bookings,
  updates,
  withdrawModalOpen,
  donateModalOpen,
  nextGuest,
  nextGuestProfile,
  nextBooking,
  account,
  profile,
  apiLoading,
  withdrawRequests,
  errors,
  history,

  // functions
  handleViewMoreToggle,
  handleBlurNumberInput,
  handleFocusNumberInput,
  handleNumberChange,
  handleInpuChange,
  handleOpenModal,
  handleCloseModals,
  handleSubmitDonate,
  handleSubmitWithdrawRequest
}) => {
  return (
    <PageWrapper className="wrapper">
      <ContentWrapper className="child">
        <HeaderWrapper>
          <Row gutter={20} type="flex" justify="start">
            <Col xs={24} sm={4} lg={3}>
              {/*neccesarry for ProgressRing*/}
              <div style={{ position: "relative", width: 86 }}>
                <Avatar
                  size="large"
                  icon="user"
                  src={(profile.profileImage && profile.profileImage.url) || ""}
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "42px",
                    border: "1px solid rgba(0, 0, 0, 0.15)"
                  }}
                />
              </div>
            </Col>
            <Col span={20}>
              <HiText>
                Hi {name.split(" ")[0]}
                {Object.keys(nextBooking).length > 0 && (
                  <>
                    , your next guest is arriving
                    <BoldTitle>
                      {" "}
                      {getStringTime(nextBooking.startDate)}
                    </BoldTitle>
                    .
                  </>
                )}
              </HiText>
            </Col>
          </Row>
        </HeaderWrapper>
        {Object.keys(nextBooking).length > 0 ? (
          <BookingSection
            jobTitle={nextGuestProfile.jobTitle}
            bio={nextGuestProfile.bio}
            name={nextGuest.name}
            userId={nextGuest._id}
            organisationName={
              (nextGuestProfile.organisation &&
                nextGuestProfile.organisation.name) ||
              "N/A"
            }
            bookingId={nextBooking._id}
            startDate={nextBooking.endDate}
            endDate={nextBooking.startDate}
            profileImage={
              (nextGuestProfile.profileImage &&
                nextGuestProfile.profileImage.url) ||
              randomProfile
            }
            title={"Your next guest"}
            userRole={"intern"}
            role={role}
          />
        ) : (
          <SectionWrapperContent style={{ minHeight: 200 }}>
            <SectionTitle>Your next guest</SectionTitle>
            <Empty description="No upcoming guests" />
          </SectionWrapperContent>
        )}
        <section>
          <SectionWrapperContent style={{ minHeight: 200 }}>
            <SectionTitle>Your updates</SectionTitle>
            <UpdateList>
              {updates.length > 0 ? (
                updates.map(item => (
                  <Update item={item} key={item._id} userRole="host" />
                ))
              ) : (
                <Empty description="No updates, chill out :)" />
              )}
            </UpdateList>
          </SectionWrapperContent>
        </section>
        <Row gutter={20} type="flex" justify="start">
          <Col lg={24} xl={16} xs={24} sm={24}>
            <SectionWrapperContent
              style={{ minHeight: 357, height: "calc(100% - 20px)" }}
            >
              <SectionTitle>Your bookings</SectionTitle>
              {bookings.length > 0 ? (
                <BookingsTableWrapper>
                  <Table
                    columns={bookingsColumns(windowWidth)}
                    dataSource={bookings.slice(0, viewNumber)}
                    rowKey={"_id"}
                    pagination={false}
                    onRow={record => {
                      return {
                        onClick: () => history.push(`booking/${record._id}`),
                        style: { cursor: "pointer" }
                      };
                    }}
                  />
                  {bookings.length > 3 && (
                    <BlueLink
                      onClick={handleViewMoreToggle}
                      style={{ marginTop: "2rem", textAlign: "center" }}
                    >
                      {viewNumber ? "View more" : "View less"}
                    </BlueLink>
                  )}
                </BookingsTableWrapper>
              ) : (
                <Empty description="You have no bookings yet" />
              )}
            </SectionWrapperContent>
          </Col>
          <Col xl={8} lg={24} md={24} xs={24}>
            <SectionWrapperContent style={{ minHeight: 357 }}>
              <ListItem>How much you’ve earned so far</ListItem>
              <Number blue>£{account.income}</Number>
              <ListItem>How much you’ve donated</ListItem>
              <Number>£{account.donation}</Number>
              <ListItem>How much you’ve withdrew</ListItem>
              <Number>£{account.withdrawal}</Number>
              <ListItem>How much you can withdraw</ListItem>
              <Number>£{account.currentBalance}</Number>
              <ButtonsWrapper>
                <Button
                  label="Withdraw funds"
                  type="secondary"
                  style={{ width: "135px" }}
                  onClick={handleOpenModal}
                  name="withdrawModalOpen"
                  disabled={
                    !account.currentBalance || !account.currentBalance > 0
                  }
                />
                <Button
                  label="Donate funds"
                  type="secondary"
                  style={{ width: "135px" }}
                  onClick={handleOpenModal}
                  name="donateModalOpen"
                  disabled={
                    !account.currentBalance || !account.currentBalance > 0
                  }
                />
              </ButtonsWrapper>
            </SectionWrapperContent>
          </Col>
        </Row>
        <Col sm={24} xs={24}>
          <SectionWrapperContent
            style={{ minHeight: 357, height: "calc(100% - 20px)" }}
          >
            <SectionTitle>Your Withdraw Requests</SectionTitle>
            {withdrawRequests.length > 0 ? (
              <BookingsTableWrapper>
                <Table
                  columns={withdrawRequestsColumns(windowWidth)}
                  dataSource={withdrawRequests.slice(0, viewNumber)}
                  rowKey={"_id"}
                  pagination={false}
                />
                {bookings.length > 3 && (
                  <BlueLink
                    onClick={handleViewMoreToggle}
                    style={{ marginTop: "2rem", textAlign: "center" }}
                  >
                    {viewNumber ? "View more" : "View less"}
                  </BlueLink>
                )}
              </BookingsTableWrapper>
            ) : (
              <Empty description="You didn't make any withdraw request" />
            )}
          </SectionWrapperContent>
        </Col>
      </ContentWrapper>
      <div>
        <Modal
          footer={false}
          visible={donateModalOpen}
          onCancel={handleCloseModals}
        >
          <ModalContentWrapper>
            <ModalTitle>Donate funds</ModalTitle>
            <ModalDescription>
              How much would you like to donate to the PressPad fund?
            </ModalDescription>
            <div>
              <ModalDescription bold>Funds available: </ModalDescription>
              <ModalDescription bold>
                £{account.currentBalance}{" "}
              </ModalDescription>
            </div>
            <ErrorWrapper>
              <InputNumber
                onBlur={handleBlurNumberInput}
                onFocus={handleFocusNumberInput}
                defaultValue={account.currentBalance}
                max={account.currentBalance}
                min={0}
                size="large"
                style={{
                  width: "140px",
                  border: errors.donateValue
                    ? "1px solid red"
                    : "1px solid #d9d9d9"
                }}
                formatter={value =>
                  `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/£\s?|(,*)/g, "")}
                onChange={value => handleNumberChange("donateValue", value)}
              />
              <Error>{errors.donateValue}</Error>
            </ErrorWrapper>
            <Button
              label="Donate funds"
              type="secondary"
              style={{ width: "135px" }}
              onClick={handleSubmitDonate}
              loading={apiLoading}
            />
            <Button
              label="Cancel"
              type="cancel"
              nobgc
              style={{ width: "135px" }}
              onClick={handleCloseModals}
            />
          </ModalContentWrapper>
        </Modal>
      </div>
      <Modal
        visible={withdrawModalOpen}
        footer={false}
        onCancel={handleCloseModals}
      >
        <ModalContentWrapper>
          <ModalTitle>Withdraw funds</ModalTitle>
          <ModalDescription>
            Please input your bank details and the amount you’d like to withdraw{" "}
          </ModalDescription>
          <div>
            <ModalDescription bold>Funds available: </ModalDescription>
            <ModalDescription bold>£{account.currentBalance} </ModalDescription>
          </div>

          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{
              width: "100%",
              marginBottom: errors.bankName ? "20px" : 0
            }}
          >
            <Col span={10}>
              <Label>Bank name</Label>
            </Col>
            <Col span={12}>
              <ErrorWrapper error={errors.bankName}>
                <Input
                  size="large"
                  name="bankName"
                  value={bankName}
                  onChange={handleInpuChange}
                />
                <Error>{errors.bankName}</Error>
              </ErrorWrapper>
            </Col>
          </Row>
          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{
              width: "100%",
              marginBottom: errors.bankSortCode ? "20px" : 0
            }}
          >
            <Col span={10}>
              <Label>Account sort code</Label>
            </Col>
            <Col span={12}>
              <ErrorWrapper error={errors.bankSortCode}>
                <Input
                  size="large"
                  name="bankSortCode"
                  value={bankSortCode}
                  onChange={handleInpuChange}
                />
                <Error>{errors.bankSortCode}</Error>
              </ErrorWrapper>
            </Col>
          </Row>
          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{
              width: "100%",
              marginBottom: errors.accountNumber ? "20px" : 0
            }}
          >
            <Col span={10}>
              <Label>Account number</Label>
            </Col>
            <Col span={12}>
              <ErrorWrapper error={errors.accountNumber}>
                <Input
                  size="large"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={handleInpuChange}
                />
                <Error>{errors.accountNumber}</Error>
              </ErrorWrapper>
            </Col>
          </Row>

          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{
              width: "100%",
              marginBottom: errors.withdrawValue ? "20px" : 0
            }}
          >
            <Col span={10}>
              <Label>Amount</Label>
            </Col>
            <Col span={12}>
              <ErrorWrapper>
                <InputNumber
                  onBlur={handleBlurNumberInput}
                  onFocus={handleFocusNumberInput}
                  defaultValue={account.currentBalance}
                  max={account.currentBalance}
                  min={0}
                  size="large"
                  style={{
                    width: "140px",
                    border: errors.withdrawValue
                      ? "1px solid red"
                      : "1px solid #d9d9d9"
                  }}
                  formatter={value =>
                    `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/£\s?|(,*)/g, "")}
                  onChange={value => handleNumberChange("withdrawValue", value)}
                />
                <Error>{errors.withdrawValue}</Error>
              </ErrorWrapper>
            </Col>
          </Row>

          <Button
            label="Donate funds"
            type="secondary"
            style={{ width: "135px" }}
            onClick={handleSubmitWithdrawRequest}
            loading={apiLoading}
          />
          <Button
            label="Cancel"
            type="cancel"
            nobgc
            style={{ width: "135px" }}
            onClick={handleCloseModals}
          />
        </ModalContentWrapper>
      </Modal>
    </PageWrapper>
  );
};

export default withRouter(Content);
