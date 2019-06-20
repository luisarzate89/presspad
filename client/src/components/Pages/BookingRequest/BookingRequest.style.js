import styled from "styled-components";
import { Link } from "react-router-dom";

import { Rate } from "antd";

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

export const BackLink = styled(Link)`
  color: ${colors.links};
  text-decoration: none;
  font-weight: 500;
  line-height: 1;
`;

export const Arrow = styled(BackArrowIcon)`
  width: 4vw;
`;

export const Header = styled.header`
  margin-top: 15px;
  display: flex;
`;

export const HeaderDiv = styled.div`
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
  color: ${colors.fontLightBlack};
`;

export const JobTitle = styled.h3`
  font-size: 16px;
  line-height: 19px;
  font-style: italic;
  font-weight: 300;
  color: ${colors.fontLightBlack};
`;

export const SymbolDiv = styled.div`
  display: flex;
`;

export const SymbolContainer = styled.div`
  display: flex;
  margin-right: 15px;
`;

export const Symbol = styled.div`
  left: 0px;
  margin-right: 5px;
  width: 30px;
  height: 30px;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center center;
`;

export const IconDiv = styled.div`
  line-height: 2.1;
  opacity: 0.5;
`;

export const SymbolHeadline = styled.h3`
  font-weight: 300;
  margin-right: 5px;
  font-size: 16px;
  text-align: left;
  color: ${colors.fontLightBlack};
  line-height: 2;
`;

export const MainSection = styled.section`
  width: 100%;
  margin-top: 7px;
  display: flex;
  justify-content: center;
`;

export const TextContentDiv = styled.div`
  width: 65%;
`;

export const BioContainer = styled.div`
  max-width: 600px;
`;

export const Card = styled.div`
  width: 100%;
  box-shadow: ${shadows.card};
  margin-top: 30px;
  min-height: 400px;
`;

export const InnerCard = styled.div`
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
`;

export const BookingDetailsDiv = styled.div`
  width: 140px;
  color: ${colors.fontLightBlack};
  text-align: left;
  color: ${colors.fontLightBlack};
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
`;

export const ButtonDiv = styled.div`
  text-align: left;
  margin-left: 20px;
  padding-top: 20px;
`;

export const Button = styled.button`
  background: ${props => (props.reject ? `none` : `${colors.lightBlue}`)}
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
  transition: background 250ms ease-in-out,
  transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  :focus, :hover {
    transform: ${props => (!props.disabled ? "scale(1.1)" : "")}
  }
`;

export const ProfilePicDiv = styled.div`
  width: 250px;
  height: 250px;
  border: 1px solid;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  // background-image: url(${({ src }) => src});

`;

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

export const AvailableHosting = styled.div`
  width: 35%;
  margin-left: 15px;
`;

export const Reviews = styled(InnerCard)`
  padding-top: 10px;
  width: 100%;
  margin-left: 15px;
`;

export const ReviewsSection = styled.div`
  padding-top: 20px;
  width: 98%;
`;

export const ReviewsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
`;

export const ReviewsHeader = styled.div`
  display: flex;
`;

export const StarRate = styled(Rate)`
  font-size: 16px;
`;

export const ReviewHeadline = styled.h4`
  font-size: 16px;
  font-weight: 500;
  line-height: 2;
  padding-right: 15px;
`;

export const ReviewText = styled.p`
  font-weight: 300;
  font-size: 16px;
`;

export const MoreReviewsLink = styled(Link)`
  text-align: left;
  color: ${colors.links};
  text-decoration: none;
`;
