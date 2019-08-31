import React from "react";

import {
  ImageSection,
  MainImageDiv,
  MainImage,
  SubImage,
  SideImageDiv
} from "./ListingGallery.style.js";

// assets
import ListingPlaceholder from "../../../assets/listing-placeholder.jpg";

function ListingGallery({ img1, img2, img3 }) {
  return (
    <ImageSection>
      <MainImageDiv>
        <MainImage
          src={img1 || ListingPlaceholder}
          onError={e => (e.target.src = ListingPlaceholder)}
        />
      </MainImageDiv>
      <SideImageDiv>
        <SubImage
          src={img2 || ListingPlaceholder}
          onError={e => (e.target.src = ListingPlaceholder)}
        />
        <SubImage
          src={img3 || ListingPlaceholder}
          onError={e => (e.target.src = ListingPlaceholder)}
        />
      </SideImageDiv>
    </ImageSection>
  );
}

export default ListingGallery;
