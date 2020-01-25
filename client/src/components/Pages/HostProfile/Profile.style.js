import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows } from "./../../../theme";
import { ReactComponent as BackArrowIcon } from "../../../assets/back-arrow.svg";

const classNames = {
  reactCalendar: ".react-calendar",
  reactCalendarNavigation: ".react-calendar__navigation"
};

export const MainSection = styled.section`
  width: 100%;
  margin-top: 7px;
  display: flex;

  @media (max-width: 775.98px) {
    margin-top: 0px;
    flex-direction: column;
  }
`;

export const Wrapper = styled.div`
  width: 80%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

export const LinkDiv = styled.div`
  margin: 2rem 0;
  height: 25px;
`;

export const BackLinkDiv = styled.div`
  margin-left: -10px;
  display: flex;
  justify-content: flex-start;
`;

export const AdminTopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MultipleButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Arrow = styled(BackArrowIcon)`
  width: 4vw;
`;

export const BackToAdmin = styled.div`
  color: ${colors.links};
  cursor: pointer;
  font-weight: 500;
  line-height: 1;
`;

export const BackLink = styled(Link)`
  color: ${colors.links};
  text-decoration: none;
  font-weight: 500;
  line-height: 1;
`;

const blurPic = css`
  filter: blur(2px);
  -webkit-filter: blur(2px);
`;

export const ProfilePic = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center center;
  ${props => !props.adminView && blurPic}
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

export const Card = styled.div`
  width: 100%;
  box-shadow: ${shadows.card};
  background-color: ${colors.white};
`;

const InnerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`;

export const InfoCard = styled(InnerCard)`
  margin-bottom: 1rem;
  padding: 1rem;
  @media (max-width: 775.98px) {
    height: auto;
  }
`;

export const Reviews = styled(InnerCard)`
  margin-top: 10px;
  min-height: 380px;
  @media (max-width: 775.98px) {
    height: auto;
  }
`;

export const ReviewsSection = styled.div`
  display: flex;

  @media (max-width: 775.98px) {
    flex-direction: column;
  }
`;

export const ReviewsBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;
  width: 50%;

  @media (max-width: 775.98px) {
    padding: 0px;
    width: 100%;
  }
`;

export const ReviewsHeader = styled.div`
  display: flex;
  @media (max-width: 575.98px) {
    flex-direction: column;
  }
`;

export const ReviewHeadline = styled.h4`
  font-size: 16px;
  font-weight: 500;
  line-height: 2;
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

export const AvailableHosting = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 15px;
  background-color: ${colors.white};
  height: auto;

  @media (max-width: 775.98px) {
    width: 100%;
    margin-left: 0;
    padding-top: 20px;
  }
`;

const InnerSideCard = styled.div.attrs(classNames)`
  width: 95%;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 775.98px) {
    width: 100%;
  }

  ${classNames.reactCalendar} {
    pointer-events: ${props => (props.userRole === "host" ? "none" : "all")};
  }

  ${classNames.reactCalendarNavigation} {
    button {
      min-width: 50px;
      pointer-events: all;
      background: none;
    }
  }
`;

export const CalendarDiv = styled(InnerSideCard)`
  height: 400px;
  background-color: ${colors.white};

  @media (max-width: 775.98px) {
    height: auto;
  }
`;

export const SubHeadline = styled.h2`
  font-weight: 600;
  font-size: 22px;
  text-align: left;
  color: ${colors.fontLightBlack};
  margin-top: 5px;
`;

export const List = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  text-align: left;

  @media (max-width: 775.98px) {
    flex-direction: column;
  }
`;

export const ListItem = styled.li`
  margin-top: 8px;
  font-weight: 300;
  width: calc(100% / 3);

  @media (max-width: 775.98px) {
    width: 100%;
  }
`;

export const TextContentDiv = styled.div`
  width: 65%;

  @media (max-width: 775.98px) {
    padding-top: 20px;
    width: 100%;
  }
`;

export const EditButton = styled(Link)`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #0ac7e7;
  padding: 7px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: block;
  width: 100px;
  height: fit-content;
  text-align: center;
  margin-left: 1rem;
`;

export const Strong = styled.span`
  font-size: 1em;
  font-weight: 700;
`;
