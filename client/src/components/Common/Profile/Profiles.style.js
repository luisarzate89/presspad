import styled, { css } from "styled-components";
import { Rate } from "antd";

import { ReactComponent as BackArrowIcon } from "../../../assets/back-arrow.svg";
import { shadows, colors, size } from "../../../theme";

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
`;

export const BackLinkDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;

export const BackLink = styled.button`
  color: ${colors.links};
  text-decoration: none;
  font-weight: 500;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Arrow = styled(BackArrowIcon)`
  margin-right: 0.5rem;
`;

// Header
export const Header = styled.header`
  padding-top: 2rem;
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "space-between"};
  align-items: ${({ alignItems }) => alignItems || "start"};
`;

export const HeaderDiv = styled.div`
  margin-left: 1rem;
  text-align: left;

  @media (max-width: 600px) {
    height: auto;
    width: 100%;
    margin-left: 0px;
    text-align: center;
    padding: 0 0.5rem 0 0.8rem;
    text-align: left;
  }
`;

export const Headline = styled.h1`
  font-weight: 900;
  font-size: 1.9rem;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  color: ${colors.fontBlack};
  margin-bottom: 0;
  span {
    font-weight: 500;
    font-size: 26px;
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

export const Card = styled.div`
  width: 100%;
  padding: 0.8rem;
  box-shadow: ${shadows.card};
  margin-top: ${props => props.mt};
  min-height: ${props => props.mh};
  width: ${props => props.w};

  @media (max-width: 600px) {
    min-height: 250px;
  }
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
  margin-bottom: 0px;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const ParagraphHeadline = styled.h3`
  font-size: 16px;
  text-align: left;
  font-weight: ${({ bold = false }) => (bold ? "bold" : "400")};
  color: ${colors.fontLightBlack};
  margin-top: 5px;
  margin-bottom: 0;

  @media (max-width: ${size.mobileM}) {
    font-size: 14px;
  }
`;

export const Paragraph = styled.p`
  font-size: 16px;
  text-align: left;
  font-weight: 300;
  color: #8a8a8a;
  margin-bottom: 2rem;
`;

export const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  position: relative;
`;

export const AdminTopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  @media (max-width: ${size.mobileXL}) {
    flex-direction: column;
    align-items: flex-start;
  }
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
  // background: image(${({ src }) => src})
  background-image: ${({ src, defaultPic }) =>
    `url(${src}), url(${defaultPic})`};
  ${props => !props.adminView && blurPic};

  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
  }
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

export const ShowMoreSection = styled.div`
  display: flex;
  margin-top: 2rem;
  width: 90%;
  justify-content: space-between;

  a {
    width: 100%;
  }

  @media (max-width: 900px) {
    width: 110%;

    a {
      padding: 0.5rem;
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    text-align: center;

    div {
      width: 100%;
    }

    a {
      padding: 1rem;
    }
  }
`;
