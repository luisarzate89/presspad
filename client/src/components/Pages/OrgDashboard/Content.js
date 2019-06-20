import React, { Component } from "react";
import { Row, Col, Avatar, Table, Badge as AntdBadge, Icon } from "antd";
import Update from "./Update";
import { Link } from "react-router-dom";
import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  HiText,
  Section,
  SectionTitile,
  SectionWrapperContent,
  UpdateList,
  ProfileImage,
  InfoTable,
  InfoTableRow,
  TD,
  TH,
  Card,
  BlueLink,
  InternsTableWrapper
} from "./OrgDashboard.style";

import { tagColors } from "./../../../theme";

// import helpers

import homeIcon from "./../../../assets/home-icon.svg";
import invoiceIcon from "./../../../assets/invoice-icon.svg";
import contantIcon from "./../../../assets/contact-icon.svg";

const columns = windowWidth => {
  const columnsObject = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        windowWidth <= 690 ? (
          <Link to={`/interns/${record._id}`}>
            <BlueLink>
              <AntdBadge color={tagColors[record.status]} text={text} />
            </BlueLink>
          </Link>
        ) : (
          <Link to={`/interns/${record._id}`}>
            <BlueLink>{text}</BlueLink>
          </Link>
        )
    }
  ];
  if (windowWidth > 1110) {
    columnsObject.push({
      title: "Email",
      dataIndex: "email",
      key: "email"
    });
  }

  if (windowWidth > 400) {
    columnsObject.push({
      title: "Spent credits",
      dataIndex: "spentCredits",
      key: "spentCredits"
    });
  }

  columnsObject.push({
    title: "Available credits",
    dataIndex: "credits",
    key: "credits"
  });

  if (windowWidth > 800) {
    columnsObject.push({
      title: "Total credits",
      dataIndex: "credits",
      key: "totalCredits"
    });
  }
  if (windowWidth > 690) {
    columnsObject.push({
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: status => <AntdBadge color={tagColors[status]} text={status} />
    });
  }

  columnsObject.push({
    title: "Action",
    key: "action",
    render: (text, record) =>
      windowWidth <= 590 ? (
        <BlueLink>
          <Icon type="plus" />
        </BlueLink>
      ) : (
        <span>
          <BlueLink>Add credits</BlueLink>
        </span>
      )
  });

  return columnsObject;
};

class Content extends Component {
  render() {
    const { state, name, windowWidth } = this.props;
    const { details, notifications, interns } = state;

    const currentlyHosted = interns.filter(item => item.status === "At host")
      .length;

    return (
      <PageWrapper>
        <ContentWrapper>
          <HeaderWrapper>
            <Row gutter={20} type="flex" justify="start">
              <Col xs={24} sm={4} lg={3}>
                <Avatar
                  size="large"
                  icon="user"
                  src={(details && details.logo) || undefined}
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
              </Col>
              <Col span={20}>
                <HiText>
                  Hi {name.split(" ")[0]}, here’s how your interns are doing
                </HiText>
              </Col>
            </Row>
          </HeaderWrapper>

          {/* First row */}
          <Row gutter={20} type="flex" justify="start">
            {/* Your updates col */}
            <Col
              sm={24}
              lg={16}
              style={{
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Section style={{ marginBottom: "20px" }}>
                <SectionWrapperContent style={{ minHeight: "200px" }}>
                  <SectionTitile>Your updates</SectionTitile>
                  <UpdateList>
                    {notifications.map(item => (
                      <Update item={item} />
                    ))}
                  </UpdateList>
                </SectionWrapperContent>
              </Section>

              <Section>
                <Row gutter={20} type="flex" justify="start">
                  <Col xs={24} sm={8} style={{ height: "auto" }}>
                    <SectionWrapperContent>
                      <Card>
                        <img src={invoiceIcon} alt="Invoices" />
                        <BlueLink>Invoices</BlueLink>
                      </Card>
                    </SectionWrapperContent>
                  </Col>
                  <Col xs={24} sm={8} style={{ height: "auto" }}>
                    <SectionWrapperContent>
                      <Card>
                        <img src={homeIcon} alt="View Hosts" />
                        <BlueLink>View Hosts</BlueLink>
                      </Card>
                    </SectionWrapperContent>
                  </Col>
                  <Col xs={24} sm={8} style={{ height: "auto" }}>
                    <SectionWrapperContent>
                      <Card>
                        <img src={contantIcon} alt="Contact PressPad" />
                        <BlueLink>Contact PressPad</BlueLink>
                      </Card>
                    </SectionWrapperContent>
                  </Col>
                </Row>
              </Section>
            </Col>
            <Col sm={24} lg={8}>
              <Section>
                <SectionWrapperContent
                  style={{ padding: "5px", height: "375px" }}
                >
                  <ProfileImage src={details && details.logo} />

                  <InfoTable>
                    <tbody>
                      <InfoTableRow header className="header">
                        <TH position="left">Your plan:</TH>
                        <TH position="center">{details.plan}</TH>
                        <TH position="right">Upgrade</TH>
                      </InfoTableRow>
                      <InfoTableRow>
                        <TD position="left">Available credits:</TD>
                        <TD position="center">{details.credits}</TD>
                        <TD position="right">Purchase credits</TD>
                      </InfoTableRow>
                      <InfoTableRow>
                        <TD position="left">Interns:</TD>
                        <TD position="center">{interns.length}</TD>
                        <TD position="right">Add intern</TD>
                      </InfoTableRow>
                      <InfoTableRow>
                        <TD position="left">Currently hosted:</TD>
                        <TD position="center">{currentlyHosted}</TD>
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
            style={{ marginTop: "20px" }}
          >
            <Col sm={24}>
              <Section style={{ marginBottom: "20px" }}>
                <SectionWrapperContent style={{ padding: 0 }}>
                  <InternsTableWrapper>
                    <Table
                      columns={columns(windowWidth)}
                      dataSource={interns}
                    />
                  </InternsTableWrapper>
                </SectionWrapperContent>
              </Section>
            </Col>
          </Row>
        </ContentWrapper>
      </PageWrapper>
    );
  }
}

export default Content;
