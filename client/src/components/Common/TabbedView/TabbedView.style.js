/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { colors } from '../../../theme';

export const CardContainer = styled.div`
  .ant-tabs-bar {
    margin: 0;
  }

  .ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane {
    box-shadow: 0px 0px 13px 1px rgba(0, 0, 0, 0.04);
    // width: 97%;
    // margin: 0 1rem 1rem;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.04);
    background-color: white;
  }

  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    color: ${colors.fontPrimary};
    opacity: 0.5;
    margin-right: 5px;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.04);
    background-color: white;
    font-size: 1.125rem;
  }

  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    opacity: 1;
  }

  .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    border-color: transparent;
    background: transparent;
  }

  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.04);
    border-bottom: 0;
    background-color: white;
  }
`;
