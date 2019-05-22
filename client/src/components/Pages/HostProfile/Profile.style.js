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
  }
`;

export const LinkDiv = styled.div`
   {
    margin-top: 15px;
    height: 25px;
  }
`;
export const BackLinkDiv = styled.div`
   {
    margin-left: -10px;
    display: flex;
    justify-content: flex-start;
  }
`;

export const Arrow = styled(BackArrowIcon)`
  width: 4vw;
`;

export const BackLink = styled(Link)`
  color: ${colors.links};
  text-decoration: none;
  font-weight: 500;
  line-height: 1;
`;

export const Header = styled.div`
  margin-top: 15px;
  border: 1px solid blue;
  display: flex;
`;

export const ProfilePicDiv = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(${({ src }) => src});
  filter: blur(2px);
  -webkit-filter: blur(2px);
`;

export const HeadlineDiv = styled.div`
  height: 90px;
  width: 75%;
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  text-align: left;
`;

export const Headline = styled.h1`
  font-weight: 900;
  font-size: 28px;
`;

export const Address = styled.h3`
  font-size: 16px;
  margin-top: auto;
`;

export const SymbolDiv = styled.div`
  position: relative;
  width: 25%;
`;

export const Symbol = styled.div`
  width: 38px;
  height: 50px;
  background-image: url(${({ src }) => src});
  right: 0;
  bottom: 0;
  position: absolute;
`;
