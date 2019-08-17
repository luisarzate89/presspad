import React from "react";

import {
  ImageSection,
  MainImageDiv,
  MainImage,
  SubImage,
  SideImageDiv
} from "./ListingGallery.style.js";

function ListingGallery({ img1, img2, img3 }) {
  return (
    <ImageSection>
      <MainImageDiv>
        <MainImage src={img1} />
      </MainImageDiv>
      <SideImageDiv>
        <SubImage src={img2} />
        <SubImage src={img3} />
      </SideImageDiv>
    </ImageSection>
  );
}

export default ListingGallery;
