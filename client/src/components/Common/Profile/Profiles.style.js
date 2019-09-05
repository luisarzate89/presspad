import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Rate } from "antd";

import { ReactComponent as BackArrowIcon } from "../../../assets/back-arrow.svg";
import { shadows, colors } from "../../../theme";

export const Wrapper = styled.div`
  width: 80%;
  padding-bottom: 5rem;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 575.98px) {
    width: 95%;
  }
`;

// Backlink
export const LinkDiv = styled.div`
  margin-top: 15px;
  height: 25px;
`;

export const BackLinkDiv = styled.div`
  margin-left: -10px;
  display: flex;
  justify-content: flex-start;
`;

export const BackLink = styled(Link)`
  color: ${colors.links};
  text-decoration: none;
  font-weight: 500;
  line-height: 1;
`;

export const Arrow = styled(BackArrowIcon)`
  width: 4vw;
`;

// Header
export const Header = styled.header`
  margin-top: 15px;
  display: ${({ flex }) => (flex ? "flex" : "static")};
  margin-bottom: 25px;

  @media (max-width: 575.98px) {
    margin-bottom: 0px;
    /* flex-direction: column;
    align-items: center; */
  }
`;

export const HeaderDiv = styled.div`
  height: 90px;
  width: 75%;
  /* display: flex; */
  flex-direction: column;
  margin-left: 25px;
  text-align: left;

  @media (max-width: 575.98px) {
    height: auto;
    width: 100%;
    margin-left: 0px;
    text-align: center;
  }
`;

export const Headline = styled.h1`
  font-weight: 900;
  font-size: 28px;
  color: ${colors.fontPrimary};
`;

export const Card = styled.div`
  width: 100%;
  box-shadow: ${shadows.card};
  margin-top: ${props => props.mt};
  min-height: ${props => props.mh};
  width: ${props => props.w};
`;

export const InnerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`;

export const StarRate = styled(Rate)`
  font-size: 16px;
`;

// Fonts
export const SubHeadline = styled.h2`
  font-weight: 600;
  font-size: 22px;
  text-align: left;
  color: ${colors.fontLightBlack};
  margin-top: 10px;
`;

export const ParagraphHeadline = styled.h3`
  font-size: 16px;
  text-align: left;
  font-weight: 400;
  color: ${colors.fontLightBlack};
  margin-top: 5px;
`;

export const Paragraph = styled.p`
  font-size: 16px;
  text-align: left;
  font-weight: 300;
  color: ${colors.fontLightBlack};
  margin-top: 8px;
`;

export const AdminTopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BackToAdmin = styled.div`
  color: ${colors.links};
  cursor: pointer;
  font-weight: 500;
  line-height: 1;
`;

export const MultipleButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const SymbolDiv = styled.div`
  position: relative;
  width: 25%;

  @media (max-width: 775.98px) {
    width: 100%;
  }
`;

export const Symbol = styled.div`
  width: 38px;
  height: 50px;
  background-image: url(${({ src }) => src});
  right: 0;
  bottom: 0;
  position: absolute;
`;

const blurPic = css`
  filter: blur(2px);
  -webkit-filter: blur(2px);
`;

export const ProfilePicDiv = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(${({ src }) => src});
  ${props => !props.adminView && blurPic};
`;

export const Address = styled.h3`
  font-size: 16px;
  color: ${colors.fontLightBlack};
  margin-top: auto;
`;

// Images Section

export const ImageSection = styled.section`
  margin-top: 15px;
  height: 400px;
  display: flex;
  align-items: center;

  @media (max-width: 775.98px) {
    height: auto;
    flex-direction: column;
    padding-top: 20px;
  }
`;

export const MainImageDiv = styled.div`
  width: 65%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 775.98px) {
    width: 100%;
  }
`;

export const MainImage = styled.div`
  width: 100%;
  height: 380px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${({ src }) => src});
`;

export const SideImageDiv = styled.div`
  width: 35%;
  height: 380px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;

  @media (max-width: 775.98px) {
    width: 100%;
    margin-left: 0px;
  }
`;
export const SubImage = styled.div`
  width: 100%;
  height: 185px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${({ src }) => src});
`;
