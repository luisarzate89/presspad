import React, { Component } from "react";
import { Carousel } from "antd";
import {
  Wrapper,
  HeroSection,
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
  FindMoreWrapper,
  TestimonialSection,
  CarouselWrapper,
  Quote,
  TestimonialWords
} from "./LandingPage.style";
import heroImage from "./../../../assets/landin-page-hero-image.png";
import descriptionImage from "./../../../assets/description-image.png";
import descriptionImage2 from "./../../../assets/description-image-2.png";
import quote from "./../../../assets/quote.png";

import { ReactComponent as Arrow } from "../../../assets/arrow.svg";
import organizationFindMore from "./../../../assets/organization.png";
import hostFindMore from "./../../../assets/host.png";
import internFindMore from "./../../../assets/intern.png";

class LandingPage extends Component {
  state = {
    slideIndex: 0
  };

  afterChange = slideIndex => {
    this.setState({
      slideIndex
    });
  };

  handleLeftArrow = (current, next) => {
    this.carousel.prev(1);
  };

  handleRightArrow = () => {
    this.carousel.next(1);
  };

  render() {
    return (
      <Wrapper>
        <HeroSection src={heroImage}>
          <Iframe
            src="https://www.youtube.com/embed/OCWj5xgu5Ng"
            frameBorder="0"
          />
        </HeroSection>
        {/* first description section */}
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
        {/* second description section */}
        <DescriptionSection>
          <div className="section__content">
            <div className="descriptionWrapper">
              <Description>
                We're looking for partners, funders, & investors to help us grow
                our online platform so we can sign up more hosts, and help more
                interns! Check out our Pitch Deck with all the info you need.
              </Description>
            </div>
            <div className="imageWrapper">
              <DescriptionImage src={descriptionImage2} />
            </div>
          </div>
        </DescriptionSection>
        <TestimonialSection>
          <CarouselWrapper>
            <Arrow
              width="95"
              transform="rotate(180)"
              onClick={this.handleLeftArrow}
              style={{
                position: "absolute",
                height: "100px",
                left: "-100px",
                top: "50%",
                transform: " translateY(-50%) rotate(180deg)",
                cursor: "pointer"
              }}
            />
            <Carousel
              autoplay
              dots={false}
              afterChange={this.afterChange}
              ref={node => (this.carousel = node)}
            >
              <div>
                <TestimonialWords>
                  <Quote src={quote} />
                  Staying with Emily was an absolute pleasure. I learned a great
                  deal about how to approach politicians and very much enjoyed
                  the city. We managed to go to a few journalistic events as
                  well and met some amazing people!
                </TestimonialWords>
              </div>
              <div>
                <TestimonialWords>
                  <Quote src={quote} />I learned a great deal about how to
                  approach politicians and very much enjoyed the city. We
                  managed to go to a few journalistic events as well and met
                  some amazing people!
                </TestimonialWords>
              </div>
            </Carousel>
            <Arrow
              width="95"
              onClick={this.handleRightArrow}
              style={{
                position: "absolute",
                height: "100px",
                right: "-100px",
                top: "50%",
                transform: " translateY(-50%)",
                cursor: "pointer"
              }}
            />
          </CarouselWrapper>
        </TestimonialSection>
      </Wrapper>
    );
  }
}

export default LandingPage;
