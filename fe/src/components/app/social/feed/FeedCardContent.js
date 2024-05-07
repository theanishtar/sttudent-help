import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Image } from "react-bootstrap";
import createMarkup from "helpers/createMarkup";
import FeedEvent from "./FeedEvent";
import FeedUrl from "./FeedUrl";
import FeedGallery from "components/app/social/feed/FeedGallery";
import FalconLightBox from "components/common/FalconLightBox";
import { CONSTANTS } from "@/constants/contants";

const FeedCardContent = ({ status, imgSrc, gallery, feedEvent, url }) => {
  const [showLess, setshowLess] = useState(true);

  const content = showLess
    ? status?.slice(0, CONSTANTS.defaultShowTextLength)
    : status;
  const shouldShowButton = status?.length > CONSTANTS.defaultShowTextLength;

  const changeShow = () => {
    setshowLess(!showLess);
  };

  return (
    <Card.Body>
      {!!status && (
        <>
          <div dangerouslySetInnerHTML={createMarkup(content)} />
          {shouldShowButton && (
            <p className="fw-bold cursor-pointer" onClick={changeShow}>
              {showLess ? "Show more" : "Show Less"}
            </p>
          )}
        </>
      )}
      {!!imgSrc && (
        <FalconLightBox image={imgSrc}>
          <Image src={imgSrc} fluid rounded />
        </FalconLightBox>
      )}
      {!!gallery && <FeedGallery images={gallery} />}
      {!!feedEvent && <FeedEvent {...feedEvent} />}
      {!!url && <FeedUrl {...url} />}
    </Card.Body>
  );
};

FeedCardContent.propTypes = {
  status: PropTypes.string,
  imgSrc: PropTypes.string,
  gallery: PropTypes.array,
  feedEvent: PropTypes.object,
  url: PropTypes.object,
  video: PropTypes.object,
};

export default FeedCardContent;
