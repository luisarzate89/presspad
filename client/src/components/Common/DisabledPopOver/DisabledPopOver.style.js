/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { size } from '../../../theme';

export const ContentWrapper = styled.div`
  font-family: Roboto, sans-serif;
  width: 100%;
  font-style: normal;
  font-weight: bold;
  cursor: not-allowed;
  color: #0ac7e7;
  text-align: ${({ position }) => position || 'center'};

  a {
    cursor: not-allowed;
  }

  @media (max-width: ${size.mobileXL}) {
    font-size: 14px;
  }
`;
