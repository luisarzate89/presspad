import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../assets/arrow.svg';
import { size, colors } from '../../../theme';

export const Wrapper = styled.div`
  .ant-carousel .slick-slide {
    text-align: center;
    overflow: hidden;
  }
`;

export const HeroSection = styled.div`
  height: 100vh;
  background-image: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0.0001) 0%,
      ${colors.black} 162.48%
    ),
    url(${({ src }) => src});
  background-size: cover;
  position: relative;
`;

export const HeroImage = styled.img`
  width: 105%;
`;

export const Iframe = styled.iframe`
  width: 45%;
  height: 26vw;
  position: absolute;
  right: 12%;
  top: 22%;
  min-width: 320px;

  @media (max-width: ${size.mobileXL}) {
    right: 0;
    width: 100%;
    height: 75vh;
    top: initial;
    bottom: 0;
  }
`;

export const DescriptionSection = styled.div`
  padding: 130px 0 100px;

  .section__content {
    max-width: 1078px;
    margin: 0 auto;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
  }

  .imageWrapper {
    width: 40%;
    min-width: 300px;
    display: flex;
    align-items: center;
    margin: 0 20px;
  }

  .descriptionWrapper {
    display: flex;
    align-items: center;
    width: 40%;
    min-width: 300px;
    margin: 0 20px;
  }
`;

export const DescriptionImage = styled.img`
  width: 100%;
  box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.215882);
  @media (max-width: 900px) {
    margin-bottom: 50px;
  }
`;

export const Description = styled.p`
  font-family: Raleway;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;
  color: ${colors.fontPrimary};
  @media (max-width: 900px) {
    text-align: center;
  }
`;

export const FindMoreSestion = styled.div`
  background-color: ${colors.grayWhite};
  padding: 165px 0 100px;

  .section__content {
    max-width: 1078px;
    margin: 0 auto;
  }

  .descriptionWrapper {
    display: flex;
    align-items: center;
    width: 70%;
    min-width: 300px;
    margin: 0 20px;
    text-align: center;
    margin: 0 auto;
  }
`;

export const FindMoreCard = styled.div`
  position: relative;
  min-width: 300px;
  text-align: center;
  margin: 100px auto 0;
  padding: 0 20px;
  width: 30%;
`;

export const CardIcon = styled.img`
  height: 70px;
  margin-bottom: 47px;
`;

export const CardTitle = styled.h4`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: ${colors.gray};
  margin-bottom: 30px;
`;

export const CardDescription = styled.p`
  font-family: Raleway;
  font-weight: 300;
  font-size: 18px;
  text-align: center;
  color: ${colors.fontPrimary};
  margin-bottom: 77px;
  line-height: 30px;
`;

export const CardButton = styled(Link)`
  display: block;
  color: ${colors.white};
  background: ${colors.lightBlue};
  box-sizing: border-box;
  padding: 10px 20px;
  font-family: Raleway;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  margin: 0 auto;
  border: none;
  width: 170px;
  position: absolute;
  bottom: 0;
  transform: translateX(-50%);
  left: 50%;
  cursor: pointer;
  to: ${props => props.to};
`;

export const FindMoreWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  flex-wrap: wrap;
`;

export const TestimonialSection = styled.div`
  padding: 225px 0 100px;
  background-color: ${colors.grayWhite};
`;

export const CarouselWrapper = styled.div`
  width: 70%;
  max-width: 830px;
  margin: 0 auto;
  position: relative;
`;

export const Quote = styled.img`
  display: inline !important;
  margin-right: 20px;
`;

export const TestimonialWords = styled.p`
  font-family: Raleway;
  font-style: italic;
  font-weight: 200;
  font-size: 25px;
  line-height: 35px;
  letter-spacing: 1px;
  color: ${colors.fontBlack};
`;

export const Arrow = styled(ArrowIcon)`
  height: 100px;
  top: 50%;
  width: 7vw;
  max-width: 90px;
  transform: translateY(-50%)
    ${({ direction }) => (direction === 'left' ? 'rotate(180deg)' : '')};
  cursor: pointer;
  position: absolute;
  transition: all 0.2s ease-in-out;

  ${({ direction }) => direction}: -12vw;

  @media (max-width: 900px) {
    display: none;
  }

  :hover {
    transform: translateY(-50%)
      ${({ direction }) => (direction === 'left' ? 'rotate(180deg)' : '')}
      scale(1.1);
  }
`;
