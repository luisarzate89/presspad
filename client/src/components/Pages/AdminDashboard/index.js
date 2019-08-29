import React, { Component } from "react";
import axios from "axios";

import { Input, Button, Icon } from "antd";

// SUB COMPONENTS
import ClientTable from "./ClientTable";
import InternTable from "./InternTable";
import HostTable from "./HostTable";
import HostProfile from "./../HostProfile/index";
import PaymentsTable from "./PaymentsTable";

// STYLING
import {
  Wrapper,
  TopSection,
  Title,
  DashboardMenu,
  MenuItem,
  MainSection,
  ContentTitle,
  ProfileWrapper,
  HostWrapper
} from "./AdminDashboard.style";

// API ROUTES
import { API_ADMIN_STATS_URL } from "./../../../constants/apiRoutes";

export default class AdminDashboard extends Component {
  state = {
    activeLink: "clients",
    loading: false,
    data: [],
    hostProfile: false
  };

  selectSection = section => {
    this.setState({
      activeLink: section,
      loading: true,
      data: [],
      hostProfile: null
    });
    axios
      .post(API_ADMIN_STATS_URL, { userType: section })
      .then(({ data }) => {
        this.setState({ data, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.selectSection("clients");
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div styled={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{
            width: 188,
            marginBottom: 8,
            display: "block",
            backgound: "red"
          }}
          id="tableInput"
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "red" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  showProfile = userId => {
    this.setState({ hostProfile: userId });
  };

  hideProfile = () => {
    const { activeLink } = this.state;
    this.setState({ hostProfile: null });
    this.selectSection(activeLink);
  };

  render() {
    const { activeLink, loading, data, hostProfile } = this.state;

    return (
      <Wrapper>
        <TopSection>
          <Title>Your Dashboard</Title>
          <DashboardMenu>
            <MenuItem
              onClick={() => this.selectSection("clients")}
              active={activeLink === "clients"}
            >
              Clients
            </MenuItem>
            <MenuItem
              onClick={() => this.selectSection("interns")}
              active={activeLink === "interns"}
            >
              Interns
            </MenuItem>
            <MenuItem
              onClick={() => this.selectSection("hosts")}
              active={activeLink === "hosts" || hostProfile}
            >
              Hosts
            </MenuItem>
            <MenuItem
              onClick={() => this.selectSection("payments")}
              active={activeLink === "payments" || hostProfile} // change here
            >
              Payments
            </MenuItem>
          </DashboardMenu>
        </TopSection>
        <MainSection>
          <ContentTitle hide={hostProfile}>Your {activeLink}</ContentTitle>
          {activeLink === "clients" && (
            <ClientTable
              getColumnSearchProps={this.getColumnSearchProps}
              loading={loading}
              data={data}
            />
          )}
          {activeLink === "interns" && (
            <InternTable
              getColumnSearchProps={this.getColumnSearchProps}
              loading={loading}
              data={data}
            />
          )}
          {activeLink === "hosts" && (
            <HostWrapper hide={hostProfile}>
              <HostTable
                getColumnSearchProps={this.getColumnSearchProps}
                loading={loading}
                data={data}
                showProfile={this.showProfile}
              />
            </HostWrapper>
          )}
          {activeLink === "payments" && (
            <HostWrapper hide={hostProfile}>
              <PaymentsTable
                getColumnSearchProps={this.getColumnSearchProps}
                loading={loading}
                data={data}
                showProfile={this.showProfile}
              />
            </HostWrapper>
          )}
          {hostProfile && (
            <ProfileWrapper>
              <HostProfile
                hostId={hostProfile}
                adminView={true}
                hideProfile={this.hideProfile}
              />
            </ProfileWrapper>
          )}
          {/* <ContentTitle>Your Placeholder</ContentTitle>
          <SearchWrapper>
            <SearchInput />
            <Filters />
          </SearchWrapper>
          <ResultsWrapper>
            <div>TABLE FROM ANTD TO GO HERE</div>
          </ResultsWrapper> */}
        </MainSection>
      </Wrapper>
    );
  }
}
