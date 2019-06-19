import React, { Component } from "react";
import {
  Row,
  Col,
  Avatar,
  Input,
  Checkbox,
  Table,
  Badge as AntdBadge
} from "antd";

import {
  PageWrapper,
  ContentWrapper,
  HeaderWrapper,
  HiText,
  Section,
  SectionTitile,
  SectionWrapperContent,
  Badge,
  UpdateList,
  UpdateItem,
  BlueSpan,
  UpdateDate,
  ProfileImage,
  InfoTable,
  InfoTableRow,
  TD,
  TH,
  Card,
  BlueLink
} from "./OrgDashboard.style";

import homeIcon from "./../../../assets/home-icon.svg";
import invoiceIcon from "./../../../assets/invoice-icon.svg";
import contantIcon from "./../../../assets/contact-icon.svg";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Emaile",
    dataIndex: "email",
    key: "email",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Spent credits",
    dataIndex: "spentCredits",
    key: "spentCredits"
  },
  {
    title: "Available credits",
    dataIndex: "availableCredits",
    key: "availableCredits"
  },
  {
    title: "Total credits",
    dataIndex: "totalCredits",
    key: "totalCredits"
  },

  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: status => <AntdBadge color="#108ee9" text={status} />
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <BlueLink>Add credits</BlueLink>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    email: "test@gmail.com",
    spentCredits: "15,218",
    availableCredits: "248",
    totalCredits: "18456",
    address: "New York No. 1 Lake Park",
    status: "active"
  },
  {
    key: "2",
    name: "Jim Green",
    email: "test@gmail.com",
    spentCredits: "15,218",
    availableCredits: "248",
    totalCredits: "18456",
    address: "London No. 1 Lake Park",
    status: "active"
  },
  {
    key: "3",
    name: "Joe Black",
    email: "test@gmail.com",
    spentCredits: "15,218",
    availableCredits: "248",
    totalCredits: "18456",
    address: "Sidney No. 1 Lake Park",
    status: "active"
  }
];

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

class Content extends Component {
  render() {
    const {
      handleAddProfile,
      handelInputChange,
      handleSubmit,

      state,
      name
    } = this.props;

    return (
      <PageWrapper>
        <ContentWrapper>
          <HeaderWrapper>
            <Row gutter={20} type="flex" justify="start">
              <Col xs={24} sm={4} lg={3}>
                <Avatar
                  size="large"
                  icon="user"
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "42px"
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
                <SectionWrapperContent>
                  <SectionTitile>Your updates</SectionTitile>

                  <UpdateList>
                    <UpdateItem>
                      Andrew has matched with a <BlueSpan>host</BlueSpan> -{" "}
                      <UpdateDate>just now</UpdateDate>
                      <Badge>new</Badge>
                    </UpdateItem>
                  </UpdateList>
                </SectionWrapperContent>
              </Section>

              <Section>
                <Row gutter={20} type="flex" justify="start">
                  <Col sm={24} lg={8} style={{ height: "auto" }}>
                    <SectionWrapperContent>
                      <Card>
                        <img src={invoiceIcon} alt="Invoices" />
                        <BlueLink>Invoices</BlueLink>
                      </Card>
                    </SectionWrapperContent>
                  </Col>
                  <Col sm={24} lg={8} style={{ height: "auto" }}>
                    <SectionWrapperContent>
                      <Card>
                        <img src={homeIcon} alt="View Hosts" />
                        <BlueLink>View Hosts</BlueLink>
                      </Card>
                    </SectionWrapperContent>
                  </Col>
                  <Col sm={24} lg={8} style={{ height: "auto" }}>
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
                <SectionWrapperContent style={{ padding: "5px" }}>
                  <ProfileImage src="https://dreamguys.co.in/preadmin/hospital/assets/img/placeholder.jpg" />

                  <InfoTable>
                    <tbody>
                      <InfoTableRow header>
                        <TH position="left">Your plan:</TH>
                        <TH position="center">BASIC</TH>
                        <TH position="right">Upgrade</TH>
                      </InfoTableRow>
                      <InfoTableRow>
                        <TD position="left">Available credits:</TD>
                        <TD position="center">2,400</TD>
                        <TD position="right">Purchase credits</TD>
                      </InfoTableRow>
                      <InfoTableRow>
                        <TD position="left">Interns:</TD>
                        <TD position="center">4</TD>
                        <TD position="right">Add intern</TD>
                      </InfoTableRow>
                      <InfoTableRow>
                        <TD position="left">Currently hosted:</TD>
                        <TD position="center">2</TD>
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
            {/* Your updates col */}
            <Col sm={24}>
              <Section style={{ marginBottom: "20px" }}>
                <SectionWrapperContent style={{ padding: 0 }}>
                  <Table columns={columns} dataSource={data} />
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
