import styled from "styled-components";

export const Wrapper = styled.div``;

export const HeroSection = styled.div`
  height: 100vh;
  background-image: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0.0001) 0%,
      #000000 162.48%
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
    min-width: 400px;
    display: flex;
    align-items: center;
    margin: 0 20px;
    @media (max-width: 900px) {
      margin-bottom: 50px;
    }
  }

  .descriptionWrapper {
    display: flex;
    align-items: center;
    width: 40%;
    min-width: 400px;
    margin: 0 20px;
  }
`;

export const DescriptionImage = styled.img`
  width: 100%;
  box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.215882);
`;

export const Description = styled.p`
  font-family: Raleway;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;
  color: #07294a;
  @media (max-width: 900px) {
    text-align: center;
  }
`;

export const FindMoreSestion = styled.div`
  background: #fbfbfb;
  padding: 165px 0 100px;

  .section__content {
    max-width: 1078px;
    margin: 0 auto;
  }

  .descriptionWrapper {
    display: flex;
    align-items: center;
    width: 70%;
    min-width: 400px;
    margin: 0 20px;
    text-align: center;
    margin: 0 auto;
  }
`;

export const FindMoreCard = styled.div`
  position: relative;
  min-width: 260px;
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
  color: #545455;
  margin-bottom: 30px;
`;

export const CardDescription = styled.p`
  font-family: Raleway;
  font-weight: 300;
  font-size: 18px;
  text-align: center;
  color: #07294a;
  margin-bottom: 77px;
  line-height: 30px;
`;

export const CardButton = styled.button`
  display: block;
  color: #ffffff;
  background: #0ac7e7;
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
`;

export const FindMoreWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  flex-wrap: wrap;
`;
