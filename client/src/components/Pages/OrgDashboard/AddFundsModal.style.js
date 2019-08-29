import styled from "styled-components";

import { colors, shadows } from "../../../theme";

export const InfoMessage = styled.p`
  color: #a5a3a3;
  font-weight: bold;
  padding: 15px;
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
