import styled from "styled-components";

import { colors, shadows } from "./../../../theme";

import { InnerCard } from "../../Common/Profile/Profiles.style";

// Main Section
export const MainSection = styled.section`
  width: 100%;
  margin-top: 7px;
   display: flex;
  @media (max-width: 775.98px) {
    margin-top: 0px;
    flex-direction: column;
  }
`;

export const BookingDetailsCard = styled.div`
  box-shadow: ${shadows.card};
  margin-top: 30px;
  min-height: 400px;
  width: 65%;

  @media (max-width: 775.98px) {
    width: 100%;
    margin-top: auto;
    min-height: auto;
  }
`;

export const BookingDetailsInnerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`;

export const JobTitle = styled.h3`
  font-size: 16px;
  line-height: 19px;
  font-style: italic;
  font-weight: 300;
  color: ${colors.fontLightBlack};

  @media (max-width: 575.98px) {
    text-align: left;
  }
`;

export const SymbolDiv = styled.div`
  display: flex;

  @media (max-width: 575.98px) {
    flex-direction: column;
  }
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

export const BioContainer = styled.div`
  max-width: 600px;
`;

export const BookingDetailsContainer = styled.div`
  display: flex;
  padding-top: 20px;

  @media (max-width: 575.98px) {
    padding-top: 0px;
    flex-direction: column;
    justify-content: center;
  }
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

  @media (max-width: 575.98px) {
    margin-left: 0px;
    text-align: center;
  }
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
  @media (max-width: 575.98px) {
    margin-top: 10px;
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

  @media (max-width: 575.98px) {
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
   }
`;

export const MoreAboutSection = styled.section`
  width: 35%;
  margin-left: 15px;

  @media (max-width: 775.98px) {
    width: 100%;
    margin-left: 0px;
  }
`;

export const ReviewsCard = styled.div`
  box-shadow: ${shadows.card};
  margin-top: 30px;
  min-height: 400px;

  @media (max-width: 575.98px) {
    margin-top: 0px;
    min-height: 0px;
  }
`;

export const Reviews = styled(InnerCard)`
  padding-top: 10px;
  width: 100%;
  margin-left: 15px;

  @media (max-width: 575.98px) {
    margin-left: 0px;
    padding-top: 0px;
    min-height: 0px;
  }
`;

export const ReviewsSection = styled.div`
  padding-top: 20px;
  width: 98%;

  @media (max-width: 575.98px) {
    padding-top: 0px;
    width: 100%;
  }
`;

export const ReviewsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
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
  padding-right: 15px;

  @media (max-width: 575.98px) {
    padding-right: 5px;
  }
`;

export const ReviewText = styled.p`
  font-weight: 300;
  font-size: 16px;
`;
