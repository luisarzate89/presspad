import styled from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as BackArrowIcon } from "../../../assets/back-arrow.svg";

import { shadows, colors } from "./../../../theme";

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

export const Header = styled.header`
  margin-top: 15px;
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
  color: ${colors.fontPrimary};
`;

export const Address = styled.h3`
  font-size: 16px;
  color: ${colors.fontLightBlack}
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

export const ImageSection = styled.section`
  margin-top: 15px;
  height: 400px;
  display: flex;
  align-items: center;
`;

export const MainImageDiv = styled.div`
  width: 65%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainImage = styled.div`
  width: 100%
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
`;
export const SubImage = styled.div`
  width: 100%;
  height: 185px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${({ src }) => src});
`;

export const MainSection = styled.section`
  width: 100%;
  border: 1px solid;
  margin-top: 7px;
  display: flex;
  justify-content: center;
`;

export const TextContentDiv = styled.div`
  width: 65%;
`;

export const Card = styled.div`
  width: 100%;
  box-shadow: ${shadows.card};
`;

const InnerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`;

export const AboutMe = styled(InnerCard)`
  height: 150px;
`;

export const OtherInfo = styled(InnerCard)`
  margin-top: 10px;
  height: 150px;
`;

export const PressPadOffer = styled.div`
  width: 100%
  height: 180px;
  border: 2px solid pink;
  margin-top: 10px;
`;

export const Reviews = styled.div`
  width: 100%
  height: 180px;
  border: 2px solid pink;
  margin-top: 10px;

`;

export const AvailableHosting = styled.div`
  width: 35%;
  border: 1px solid green;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 5px;
`;

export const CalendarDiv = styled.div`
  width: 100%;
  height: 185px;
  border: 2px solid pink;
`;

export const PricingDiv = styled.div`
  width: 100%;
  height: 185px;
  border: 2px solid pink;
  margin-top: 10px;
`;

export const SubHeadline = styled.h2`
  font-weight: 600;
  font-size: 22px;
  text-align: left;
  color: ${colors.fontLightBlack};
  margin-top: 5px;
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
  margin-top: 5px;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
`;

export const ListItem = styled.li`
  display: inline-block;
  width: calc(100% / 3);
`;
