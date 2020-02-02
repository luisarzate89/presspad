/* eslint-disable import/prefer-default-export */
import styled, { keyframes } from 'styled-components';
import { colors } from '../../../theme';

const ballPulseSync = keyframes`
  33% {
    transform: translateY(4px);
  }
  66% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const BallPulse = styled.div`
  display: inline-block;
  margin-left: 0.6rem;

  div {
    background-color: ${colors.lightBlue};
    width: 8px;
    height: 8px;
    border-radius: 100%;
    margin: 0.5px;
    animation-fill-mode: both;
    display: inline-block;
  }

  div:nth-child(1) {
    animation: ${ballPulseSync} 0.6s -0.14s infinite ease-in-out;
  }

  div:nth-child(2) {
    animation: ${ballPulseSync} 0.6s -0.07s infinite ease-in-out;
  }

  div:nth-child(3) {
    animation: ${ballPulseSync} 0.6s 0s infinite ease-in-out;
  }
`;
