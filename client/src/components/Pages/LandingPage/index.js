import React, { Component } from "react";
import Header from "./../../Common/Header";
import {
  Wrapper,
  HeroSection,
  HeroImage,
  Iframe,
  DescriptionSection,
  Description,
  DescriptionImage,
  FindMoreSestion,
  FindMoreCard
} from "./LandingPage.style";
import heroImage from "./../../../assets/landin-page-hero-image.png";
import descriptionImage from "./../../../assets/description-image.png";
import organizationFindMore from "./../../../assets/organization.png";

class LandingPage extends Component {
  render() {
    return (
      <Wrapper>
        <HeroSection src={heroImage}>
          <Iframe
            src="https://www.youtube.com/embed/OCWj5xgu5Ng"
            frameBorder="0"
          />
        </HeroSection>
        <DescriptionSection>
          <div className="imageWrapper">
            <DescriptionImage src={descriptionImage} />
          </div>
          <div className="descriptionWrapper">
            <Description>
              Let’s make something clear: we would love for unpaid internships
              to become entirely a thing of the past. We’re not trying to enable
              unpaid placements, but everyone knows that changing policy and
              work culture will take time. We are working with other
              organisations to campaign for living wage internships. Until this
              changes we want PressPad to exist for anyone and everyone that
              needs it.
            </Description>
          </div>
        </DescriptionSection>
        <FindMoreSestion>
          <div className="descriptionWrapper">
            <Description>
              PressPad matches young journalists with professional journalists
              in London with a spare room who act as hosts and mentors for those
              completing placements. Our service levels the playing field thus
              diversifying the media industry.
            </Description>
          </div>
          <FindMoreCard>
            <img src={organizationFindMore} />
          </FindMoreCard>
        </FindMoreSestion>
      </Wrapper>
    );
  }
}

export default LandingPage;
