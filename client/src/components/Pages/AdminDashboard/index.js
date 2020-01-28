/* eslint-disable no-nested-ternary */
import React, { Component } from "react";
import axios from "axios";

import { Input, Button, Icon, message } from "antd";

// SUB COMPONENTS
import ClientTable from "./ClientTable";
import InternTable from "./InternTable";
import HostTable from "./HostTable";
import PaymentsTable from "./PaymentsTable";
import SearchBar from "../../Common/SearchBar";
import InternProfile from "../InternProfile/AdminOrInternView";
import HostProfile from "../HostProfile";

// STYLING
import {
  Wrapper,
  TopSection,
  Title,
  DashboardMenu,
  MenuItem,
  MainSection,
  ContentTitle,
  HostWrapper,
} from "./AdminDashboard.style";

// API ROUTES
import {
  API_ADMIN_STATS_URL,
  API_UPDATE_WITHDRAW_REQUEST_URL,
} from "../../../constants/apiRoutes";
import { filterArray } from "../../../helpers";

export default class AdminDashboard extends Component {
  state = {
    activeLink: "clients",
    loading: false,
    data: [],
    filteredData: [],
    highlightVal: "",
    axiosSource: null,
    internView: {
      on: false,
      internId: "",
    },
    hostView: {
      on: false,
      hostId: "",
      hostName: "",
      email: "",
    },
  };

  componentDidMount() {
    this.selectSection("clients");
  }

  triggerInternView = (internId = "") => {
    this.setState(prev => {
      const newState = { ...prev };
      newState.internView.on = !newState.internView.on;
      newState.internView.internId = internId;
      return newState;
    });
  };

  triggerHostView = (hostId = "", hostName = "", email = "") => {
    this.setState(prev => {
      const newState = { ...prev };
      newState.hostView.on = !newState.hostView.on;
      newState.hostView.hostId = hostId;
      newState.hostView.hostName = hostName;
      newState.hostView.email = email;
      return newState;
    });
  };

  selectSection = section => {
    const { axiosSource } = this.state;

    if (axiosSource) axiosSource.cancel("Cancel axios request");

    this.setState(
      {
        activeLink: section,
        loading: true,
        data: [],
        filteredData: [],
        axiosSource: axios.CancelToken.source(),
        internView: { on: false, internId: "" },
        hostView: { on: false, hostId: "" },
      },
      () => {
        const { axiosSource: newAxiosSource } = this.state;

        axios
          .post(
            API_ADMIN_STATS_URL,
            { userType: section },
            { cancelToken: newAxiosSource.token },
          )
          .then(({ data }) => {
            this.setState({ data, filteredData: data, loading: false });
          })
          .catch(err => {
            let errorMsg = "Something went wrong";
            if (err.response && err.response.status !== 500) {
              errorMsg = err.response.data.error;
            }
            if (err.message !== "Cancel axios request") {
              message.error(errorMsg);
            }
            this.setState({ loading: false });
          });
      },
    );
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
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
            backgound: "red",
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
    },
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    // this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    // this.setState({ searchText: "" });
  };

  hideProfile = () => {
    const { activeLink } = this.state;
    this.selectSection(activeLink);
  };

  handleSearchBar = ({ target: { value } }) => {
    const { data } = this.state;
    const filteredData = filterArray(data, value);
    this.setState({ filteredData, highlightVal: value });
  };

  handleConfirm = async (id, type) => {
    const { data: _data, filteredData: _filteredData } = this.state;
    try {
      await axios.patch(
        `${API_UPDATE_WITHDRAW_REQUEST_URL.replace(":id", id)}`,
        { type },
      );
      message.success(`The request have been ${type} successfully`);

      // update the table dataSource
      const data = _data.map(request => {
        let newRequest = { ...request };
        if (request._id === id) {
          newRequest = { ...request, status: type };
        }
        return newRequest;
      });
      // update the table filteredData
      const filteredData = _filteredData.map(request => {
        let newRequest = { ...request };
        if (request._id === id) {
          newRequest = { ...request, status: type };
        }
        return newRequest;
      });

      this.setState({ data, filteredData });
    } catch (error) {
      message.error("something went wrong");
    }
  };

  render() {
    const {
      activeLink,
      loading,
      filteredData,
      highlightVal,
      internView,
      hostView,
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
              active={activeLink === "hosts"}
            >
              Hosts
            </MenuItem>
            <MenuItem
              onClick={() => this.selectSection("payments")}
              active={activeLink === "payments"} // change here
            >
              Payments
            </MenuItem>
          </DashboardMenu>
        </TopSection>
        {internView.on ? (
          <InternProfile
            {...this.props}
            internId={internView.internId}
            triggerInternView={this.triggerInternView}
          />
        ) : hostView.on ? (
          <HostProfile
            {...this.props}
            hostId={hostView.hostId}
            hostName={hostView.hostName}
            hostEmail={hostView.email}
            triggerHostView={this.triggerHostView}
          />
        ) : (
          <MainSection>
            <ContentTitle>
              {activeLink.toLowerCase() === "payments"
                ? "Withdraw requests"
                : `Your ${activeLink}`}
            </ContentTitle>
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
                triggerInternView={this.triggerInternView}
              />
            )}
            {activeLink === "hosts" && (
              <HostWrapper>
                <HostTable
                  getColumnSearchProps={this.getColumnSearchProps}
                  loading={loading}
                  data={filteredData}
                  highlightVal={highlightVal}
                  triggerHostView={this.triggerHostView}
                />
              </HostWrapper>
            )}
            {activeLink === "payments" && (
              <HostWrapper>
                <PaymentsTable
                  getColumnSearchProps={this.getColumnSearchProps}
                  loading={loading}
                  data={filteredData}
                  showProfile={this.showProfile}
                  highlightVal={highlightVal}
                  handleConfirm={this.handleConfirm}
                />
              </HostWrapper>
            )}
          </MainSection>
        )}
      </Wrapper>
    );
  }
}
