import React from 'react';
import PropTypes from 'prop-types';
import FeedCardHeader from './FeedCardHeader';
import { Card } from 'react-bootstrap';
import FeedCardContent from './FeedCardContent';
import FeedCardFooter from './FeedCardFooter';

const FeedCard = ({ feed, ...rest }) => {
  const galleryLength = feed?.content?.gallery?.length;

  const user = {
    name: feed?.user?.full_name,
    avatar: feed?.user?.profile_photo,
    time: '11 hrs',
    privacy: 'friends',
    share: 'album',
    status: feed?.user?.is_active && "status-online"
  }

  const content = {
    status: feed?.content?.status,
    imgSrc: galleryLength === 1 ? feed?.content.gallery[0] : null,
    gallery: galleryLength > 1 ? feed?.content.gallery : null,
    url: feed?.content?.url,
    feedEvent: feed?.content?.feedEvent
  }

  const details = {
    countLCS: {
      like: feed.like_count
    }
  };

  return (
    <Card {...rest}>
      {!!user && <FeedCardHeader {...user} />}
      {!!content && <FeedCardContent {...content} />}
      {!!details && <FeedCardFooter id={feed._id} {...details} feeds={feed} />}
    </Card>
  );
};

FeedCard.Header = FeedCardHeader;

FeedCard.propTypes = {
  feed: PropTypes.object
};

export default FeedCard;
