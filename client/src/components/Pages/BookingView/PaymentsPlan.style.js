import styled from "styled-components";
import { colors, shadows } from "../../../theme";

export const InfoMessage = styled.p`
  color: #a5a3a3;
  font-weight: bold;
  padding: 15px;
`;

export const TabPanWrapper = styled.div`
  max-width: 350px;
  min-height: 300px;
  margin: 0 auto;
  text-align: center;
`;

export const InputLabel = styled.label`
  font-size: 1rem;
  color: ${colors.fontLightBlack};
  line-height: 2rem;
`;

export const InputDiv = styled.div`
  width: 50%;
  margin-bottom: 1rem;
`;

export const BookingInfoWrapper = styled.div`
  border-bottom: 1px solid ${colors.lightGray};
  margin-bottom: 3.13rem;
`;

export const InfoText = styled.p`
  font-weight: 500;
  margin: 0 2rem;
`;

export const InfoValue = styled.span`
  display: block;
  text-align: ${({ align }) => align};
  font-weight: 800;
  font-size: 1.56rem;
  margin-bottom: ${({ mbottom }) => mbottom};
  opacity: ${({ light }) => (light ? 0.7 : "")};
`;

export const ErrorMsg = styled.p`
  color: ${colors.red};
  margin-top: 0.1rem;
  margin-left: 0.5rem;
`;

export const CardWrapper = styled.div`
  margin: 1rem 2rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  box-shadow: ${shadows.card};
  background-color: ${colors.white};
`;

export const PaymentModalTitle = styled.h2`
  font-weight: 800;
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem 0 3rem 0;
  opacity: 0.8;
`;
