import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Row } from 'react-bootstrap';
import FalconLightBoxGallery from 'components/common/FalconLightBoxGallery';

const FeedGallery = ({ images }) => {

  return (
    <FalconLightBoxGallery images={images}>
      {setImgIndex => (
        <Row className="g-2">
          {images.map((imageUrl, index) => {
            const checkIsOddImage = images.length % 2 !== 0;
            const isFirstImageOfOdd = checkIsOddImage && index === 0;

            return (
              <Col key={index} xs={isFirstImageOfOdd ? 12 : 6} className="text-center">
                <Image
                  width={isFirstImageOfOdd ? "60%" : "100%"}
                  src={imageUrl}
                  fluid
                  rounded
                  onClick={() => setImgIndex(index)}
                />
              </Col>
            )
          })}
        </Row>
      )}
    </FalconLightBoxGallery>
  );
};

FeedGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
};

export default FeedGallery;
