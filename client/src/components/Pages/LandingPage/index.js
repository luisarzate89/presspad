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
  FindMoreCard,
  CardTitle,
  CardDescription,
  CardButton,
  CardIcon,
  FindMoreWrapper
} from "./LandingPage.style";
import heroImage from "./../../../assets/landin-page-hero-image.png";
import descriptionImage from "./../../../assets/description-image.png";
import organizationFindMore from "./../../../assets/organization.png";
import hostFindMore from "./../../../assets/host.png";
import internFindMore from "./../../../assets/intern.png";

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
          <div className="section__content">
            <div className="imageWrapper">
              <DescriptionImage src={descriptionImage} />
            </div>
            <div className="descriptionWrapper">
              <Description>
                Let’s make something clear: we would love for unpaid internships
                to become entirely a thing of the past. We’re not trying to
                enable unpaid placements, but everyone knows that changing
                policy and work culture will take time. We are working with
                other organisations to campaign for living wage internships.
                Until this changes we want PressPad to exist for anyone and
                everyone that needs it.
              </Description>
            </div>
          </div>
        </DescriptionSection>
        <FindMoreSestion>
          <div className="section__content">
            <div className="descriptionWrapper">
              <Description>
                PressPad matches young journalists with professional journalists
                in London with a spare room who act as hosts and mentors for
                those completing placements. Our service levels the playing
                field thus diversifying the media industry.
              </Description>
            </div>
            <FindMoreWrapper>
              <FindMoreCard>
                <CardIcon src={organizationFindMore} />
                <CardTitle>Organisation</CardTitle>
                <CardDescription>
                  Interested in your interns’ growth? Sign up to PressPad,
                  choose the plan that best fits your needs, or better yet, why
                  not create a custom one and let your interns start their
                  search for a host and mentor.
                </CardDescription>
                <CardButton>Find out more</CardButton>
              </FindMoreCard>
              <FindMoreCard>
                <CardIcon src={hostFindMore} />
                <CardTitle>Host</CardTitle>
                <CardDescription>
                  Looking to learn more from industry professionals? If your
                  organisation is already a PressPad member, all you need to do
                  is ask to be invited. If they’re not, find out how you can
                  introduce them to PressPad.
                </CardDescription>
                <CardButton>Find out more</CardButton>
              </FindMoreCard>
              <FindMoreCard>
                <CardIcon src={internFindMore} />
                <CardTitle>Intern</CardTitle>
                <CardDescription>
                  Want to be a mentor and a host? At the moment, our hosting
                  programme works on referral only basis, but we’ll soon start
                  receiving applications. Sign up to our newsletter and we’ll
                  let you know..
                </CardDescription>
                <CardButton>Find out more</CardButton>
              </FindMoreCard>
            </FindMoreWrapper>
          </div>
        </FindMoreSestion>
      </Wrapper>
    );
  }
}

export default LandingPage;
