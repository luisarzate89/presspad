import styled from "styled-components";
import { colors } from "./../../../theme";
export const CardContainer = styled.div`
  .ant-tabs-bar {
    margin: 0;
  }

  .ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane {
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.04);
    padding: 1rem;
  }

  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    color: ${colors.fontPrimary};
    opacity: 0.5;
    margin: 0 5px;
  }

  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    opacity: 1;
  }

  .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    border-color: transparent;
    background: transparent;
  }

  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    box-shadow: 0px 10px 25px -10px rgba(0, 0, 0, 0.4);
    border-bottom: 0;
    background: #fff;
  }
`;
