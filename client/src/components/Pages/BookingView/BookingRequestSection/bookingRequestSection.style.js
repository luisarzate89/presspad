import styled from "styled-components";

import { colors, shadows } from "../../../../theme";

export const BookingDetailsCard = styled.div`
  box-shadow: ${shadows.card};
  margin-top: 30px;
  min-height: 400px;
  width: 100%;

  @media (max-width: 775.98px) {
    width: 100%;
    margin-top: auto;
    min-height: auto;
  }
`;

export const BookingDetailsInnerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`;

export const BookingDetailsContainer = styled.div`
  display: flex;
  padding-top: 20px;

  @media (max-width: 575.98px) {
    padding-top: 0px;
    flex-direction: column;
    justify-content: center;
  }
`;

export const BookingDetailsDiv = styled.div`
  width: 140px;
  color: ${colors.fontLightBlack};
  text-align: left;
  color: ${colors.fontLightBlack};

  @media (max-width: 600px) {
    width: 100%;
    text-align: center;
  }
`;

export const BookingDetailsHeadline = styled.h3`
  font-weight: 500;
  font-size: 16px;
`;

export const BookingDetailsText = styled.p`
  font-weight: 300;
  font-size: 25px;
`;

export const RadioContainer = styled.div`
  text-align: left;

  @media (max-width: 600px) {
    padding-left: 2rem;
  }
`;

export const ButtonDiv = styled.div`
  text-align: left;
  margin-left: 20px;
  padding: 30px 0;

  @media (max-width: 575.98px) {
    margin-left: 0px;
    text-align: center;
  }
`;

export const Button = styled.button`
  background: ${props => (props.reject ? `none` : `${colors.lightBlue}`)};
  border-radius: 19px;
  font-size: 16px;
  color: ${props => (props.reject ? ` ${colors.orange}` : `${colors.white}`)};
  border: ${props => (props.reject ? `1px solid ${colors.orange}` : `none`)};
  padding: 0.3rem 1.5rem;
  margin: 0;
  margin-right: 20px;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  :focus,
  :hover {
    transform: ${props => (!props.disabled ? "scale(1.1)" : "")};
  }
  @media (max-width: 575.98px) {
    margin-top: 10px;
  }
`;
