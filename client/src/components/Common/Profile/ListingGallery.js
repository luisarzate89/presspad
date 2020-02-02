import React from 'react';
import { Carousel } from 'antd';

import {
  ImageSection,
  MainImageDiv,
  MainImage,
  SubImage,
  SideImageDiv,
} from './ListingGallery.style';

// assets
import ListingPlaceholder from '../../../assets/listing-placeholder.jpg';

function ListingGallery({ img1, img2, img3, windowWidth = window.innerWidth }) {
  return (
    <ImageSection>
      {windowWidth < 776 ? (
        // <MainImageDiv>

        <Carousel autoplay effect="fade" style={{ width: '100%' }}>
          <MainImage
            src={img1 || ListingPlaceholder}
            onError={e => (e.target.src = ListingPlaceholder)}
          />
          <MainImage
            src={img2 || ListingPlaceholder}
            onError={e => (e.target.src = ListingPlaceholder)}
          />
          <MainImage
            src={img3 || ListingPlaceholder}
            onError={e => (e.target.src = ListingPlaceholder)}
          />
        </Carousel>
      ) : (
        // </MainImageDiv>
        <>
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
        </>
      )}
    </ImageSection>
  );
}

export default ListingGallery;
