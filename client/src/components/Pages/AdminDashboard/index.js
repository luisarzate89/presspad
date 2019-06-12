import React, { Component } from "react";

import { Table, Input, Button, Icon, Tag } from "antd";

// SUB COMPONENTS
import ClientTable from "./ClientTable";
import InternTable from "./InternTable";
import HostTable from "./HostTable";

// STYLING
import {
  Wrapper,
  TopSection,
  Title,
  DashboardMenu,
  MenuItem,
  MainSection,
  ContentTitle,
  SearchWrapper,
  SearchInput,
  Filters,
  ResultsWrapper
} from "./AdminDashboard.style";

export default class AdminDashboard extends Component {
  state = {
    activeLink: "clients"
  };

  selectSection = section => {
    console.log("reached");
    this.setState({ activeLink: section });
  };

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

  render() {
    const { activeLink } = this.state;

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
          </DashboardMenu>
        </TopSection>
        <MainSection>
          {activeLink === "clients" && (
            <ClientTable getColumnSearchProps={this.getColumnSearchProps} />
          )}
          {activeLink === "interns" && (
            <InternTable getColumnSearchProps={this.getColumnSearchProps} />
          )}
          {activeLink === "hosts" && (
            <HostTable getColumnSearchProps={this.getColumnSearchProps} />
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
