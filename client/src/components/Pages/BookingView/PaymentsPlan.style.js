import styled from "styled-components";
import { colors } from "../../../theme";

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

export const PaymentInfoRow = styled.div`
  height: 2.5rem;
  display: flex;
`;
