import styled from "styled-components";

import { colors, shadows, borders } from "../../../theme";

export const InfoMessage = styled.p`
  color: #a5a3a3;
  font-weight: bold;
  margin: 0;
  font-size: 1.1rem;
  padding-left: 2rem;
`;

export const CardWrapper = styled.div`
  .StripeElement {
    margin: 1.5rem 2rem;
    padding: 0.5rem;
    border-radius: 0.2rem;
    box-shadow: ${shadows.card};
    background-color: ${colors.white};
    border: ${borders.stripeBorder};
  }
  .StripeElement--focus {
    box-shadow: ${shadows.stripeBorder};
  }
  .StripeElement--invalid {
    border: ${borders.error};
    box-shadow: none;
  }
`;

export const PaymentModalTitle = styled.h2`
  font-weight: 800;
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem 0 3rem 0;
  opacity: 0.8;
`;
