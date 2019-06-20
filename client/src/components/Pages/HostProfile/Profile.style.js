import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows } from "./../../../theme";

export const MainSection = styled.section`
  width: 100%;
  margin-top: 7px;
  display: flex;
  @media (max-width: 775.98px) {
    margin-top: 0px;
    flex-direction: column;
  }
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

export const AboutMe = styled(InnerCard)`
  height: 200px;
`;

export const OtherInfo = styled(InnerCard)`
  margin-top: 10px;
  height: 200px;
`;

export const PressPadOffer = styled(InnerCard)`
  margin-top: 10px;
  height: 300px;
`;

export const Reviews = styled(InnerCard)`
  margin-top: 10px;
  height: 350px;
`;

export const ReviewsSection = styled.div`
  display: flex;
`;

export const ReviewsBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;
  width: 50%;
`;

export const ReviewsHeader = styled.div`
  display: flex;
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
`;

const InnerSideCard = styled.div`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`;

export const CalendarDiv = styled(InnerSideCard)`
  height: 400px;
`;

export const List = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
`;

export const ListItem = styled.li`
  margin-top: 8px;
  font-weight: 300;
  width: calc(100% / 3);
`;

export const TextContentDiv = styled.div`
  width: 65%;
`;
