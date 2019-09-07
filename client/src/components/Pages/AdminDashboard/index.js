import React, { Component } from "react";
import axios from "axios";

import { Input, Button, Icon, message } from "antd";

// SUB COMPONENTS
import ClientTable from "./ClientTable";
import InternTable from "./InternTable";
import HostTable from "./HostTable";
import HostProfile from "./../HostProfile/index";
import PaymentsTable from "./PaymentsTable";
import SearchBar from "../../Common/SearchBar";

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
import { filterArray } from "../../../helpers";

export default class AdminDashboard extends Component {
  state = {
    activeLink: "clients",
    loading: false,
    data: [],
    filteredData: [],
    highlightVal: "",
    hostProfile: false,
    axiosSource: null
  };

  selectSection = section => {
    const { axiosSource } = this.state;

    axiosSource && axiosSource.cancel("Cancel axios request");

    this.setState(
      {
        activeLink: section,
        loading: true,
        data: [],
        filteredData: [],
        hostProfile: null,
        axiosSource: axios.CancelToken.source()
      },
      () => {
        const { axiosSource } = this.state;

        axios
          .post(
            API_ADMIN_STATS_URL,
            { userType: section },
            { cancelToken: axiosSource.token }
          )
          .then(({ data }) => {
            this.setState({ data, filteredData: data, loading: false });
          })
          .catch(err => {
            let errorMsg = "Something went wrong";
            if (err.response && err.response.status !== 500) {
              errorMsg = err.response.data.error;
            }
            if (err.message !== "cancel axios request") {
              message.error(errorMsg);
            }
            this.setState({ loading: false });
          });
      }
    );
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

  hideProfile = () => {
    const { activeLink } = this.state;
    this.setState({ hostProfile: null });
    this.selectSection(activeLink);
  };

  handleSearchBar = ({ target: { value } }) => {
    const filteredData = filterArray(this.state.data, value);
    this.setState({ filteredData, highlightVal: value });
  };

  render() {
    const {
      activeLink,
      loading,
      filteredData,
      highlightVal,
      hostProfile
    } = this.state;

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
          <SearchBar
            data={filteredData}
            handleSearchBar={this.handleSearchBar}
            highlightVal={highlightVal}
          />
          {activeLink === "clients" && (
            <ClientTable
              getColumnSearchProps={this.getColumnSearchProps}
              loading={loading}
              data={filteredData}
              highlightVal={highlightVal}
            />
          )}
          {activeLink === "interns" && (
            <InternTable
              getColumnSearchProps={this.getColumnSearchProps}
              loading={loading}
              data={filteredData}
              highlightVal={highlightVal}
            />
          )}
          {activeLink === "hosts" && (
            <HostWrapper hide={hostProfile}>
              <HostTable
                getColumnSearchProps={this.getColumnSearchProps}
                loading={loading}
                data={filteredData}
                highlightVal={highlightVal}
              />
            </HostWrapper>
          )}
          {activeLink === "payments" && (
            <HostWrapper hide={hostProfile}>
              <PaymentsTable
                getColumnSearchProps={this.getColumnSearchProps}
                loading={loading}
                data={filteredData}
                showProfile={this.showProfile}
                highlightVal={highlightVal}
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
        </MainSection>
      </Wrapper>
    );
  }
}
