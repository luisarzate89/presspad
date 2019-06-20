import styled from "styled-components";

import { colors, shadows } from "./../../../theme";

export const Wrapper = styled.div`
  padding-top: 6rem;

  height: 100%;
`;

export const TopSection = styled.div`
  background-color: ${colors.white};
  padding: 0 10rem;
`;

export const Title = styled.h2`
  color: ${colors.primary};
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 3rem;
`;

export const DashboardMenu = styled.div`
  display: flex;
`;

export const MenuItem = styled.div`
  margin-right: 3rem;
  margin-bottom: 0;
  font-size: 1.5rem;
  color: ${props => (props.active ? colors.secondary : colors.gray)};
  font-weight: 500;
  cursor: pointer;
  position: relative;

  &:after {
    content: " ";
    position: absolute;
    width: ${props => props.active && "100%"};
    left: 0;
    bottom: -3px;
    border-bottom: 3px ${colors.secondary} solid;
  }
`;

export const MainSection = styled.div`
  background-color: ${colors.blueGray};
  width: 100%;
  display: flex;
  padding: 4rem 10rem;
  flex-direction: column;
  position: relative;

  /* div {
    width: 100%;
  } */

  /* BESPOKE STYLING FOR ANTD TABLE */
  .ant-table-wrapper {
    width: 100% !important;
  }

  .ant-table-body {
    background: ${colors.white} !important;
    box-shadow: ${shadows.card} !important;
    width: 100% !important;
  }

  .ant-table-thead > tr > th {
    background: ${colors.white} !important;
    font-weight: 500 !important;
  }

  .ant-table-tbody {
    color: ${colors.black} !important;
    width: 100% !important;
  }

  /* styling of organisation field */
  .orgCol {
    font-weight: 900 !important;
  }

  /* styling of name field */
  .nameCol {
    color: ${colors.secondary} !important;
  }

  .ant-table-column-title {
    color: ${colors.black} !important;
  }
`;

export const ContentTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${colors.black};
  margin-top: 0;
  margin-bottom: 2rem;
  text-transform: capitalize;
  display: ${props => props.hide && "none"};
`;

export const ProfileWrapper = styled.div`
  z-index: 2;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

export const HostWrapper = styled.div`
  display: ${props => props.hide && "none"};
`;
