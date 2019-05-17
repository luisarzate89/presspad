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
  display: flex;
  justify-content: space-around;
  padding: 130px;
  flex-wrap: wrap;

  .imageWrapper {
    width: 40%;
    min-width: 400px;
    display: flex;
    align-items: center;
    margin: 0 20px;
    @media (max-width: 1160px) {
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
`;

export const FindMoreSestion = styled.div`
  background: #fbfbfb;
  padding: 165px 180px 100px;

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
  width: 300px;
`;
