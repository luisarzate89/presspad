import styled from 'styled-components';

import { colors } from '../../../../theme';

export const InfoWrapper = styled.div`
  margin-right: 4rem;
`;

export const InfoText = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;
export const InfoValue = styled.div`
  font-weight: bold;
  font-size: 25px;
  line-height: 25px;
  margin-top: 9px;
`;

export const MainSection = styled.section`
  width: 100%;
  margin-top: 7px;
  display: flex;
  @media (max-width: 775.98px) {
    margin-top: 0px;
    flex-direction: column;
  }
`;

// export const MoreAboutSection = styled.section`
//   width: 100%;
//   margin-left: 15px;
//   min-width: 300px;

//   @media (max-width: 775.98px) {
//     width: 100%;
//     margin-left: 0px;
//   }
// `;

export const BioSection = styled.section`
  width: 35%;
  margin-left: 15px;
  min-width: 300px;

  @media (max-width: 775.98px) {
    width: 100%;
    margin-left: 0px;
  }
`;

export const AboutSection = styled.section`
  width: 65%;
  margin-left: 0px;
  min-width: 300px;

  @media (max-width: 775.98px) {
    width: 100%;
    margin-left: 0px;
  }
`;

export const AboutSectionDataContainer = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media (max-width: 1400px) {
    width: 50%;
  }
  @media (max-width: 1250px) {
    width: 60%;
  }
  @media (max-width: 1100px) {
    width: 80%;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const AboutSectionDataRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: ${({ pushDown = false }) => (pushDown ? '38' : '15')}px;
`;

export const AboutSectionDataCell = styled.div`
  font-weight: ${({ bold = false }) => (bold ? 'bold' : 'normal')};
  width: ${({ fullWidth = false }) => (fullWidth ? '100' : '50')}%;
  text-align: left;
`;

export const ProfilePicDiv = styled.div`
  width: 250px;
  height: 250px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(${({ src }) => src});

  @media (max-width: 575.98px) {
    width: 170px;
    height: 140px;
    margin-bottom: 20px;
  }
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

export const SymbolHeadline = styled.h3`
  font-weight: 300;
  margin-right: 5px;
  font-size: 16px;
  text-align: left;
  color: ${colors.fontLightBlack};
  line-height: 2;
`;

export const IconDiv = styled.div`
  line-height: 2.1;
  opacity: 0.5;
`;
