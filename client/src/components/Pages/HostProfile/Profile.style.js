import styled from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as BackArrowIcon } from "../../../assets/back-arrow.svg";

import { size, colors } from "./../../../theme";

export const Wrapper = styled.div`
   {
    width: 80%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid;
  }
`;

export const LinkDiv = styled.div`
   {
    height: 70px;
  }
`;
export const BackLinkDiv = styled.div`
   {
    display: flex;
    justify-content: flex-start;
    border: 1px solid red;
  }
`;

export const Arrow = styled(BackArrowIcon)`
  height: 1rem;
  width: 7vw;
`;

export const BackLink = styled(Link)`
  color: ${colors.links};
  text-decoration: none;
  font-weight: 500;
`;
