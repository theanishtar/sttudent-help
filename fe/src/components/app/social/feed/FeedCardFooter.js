import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Form } from "react-bootstrap";
import av3 from "assets/img/team/3.jpg";
import FeedReactions from "./FeedReactions";
import FeedActionButtons from "./FeedActionButtons";
import Flex from "components/common/Flex";
import Avatar from "components/common/Avatar";
import Comments from "./Comments";

const FeedCardFooter = ({
  id,
  countLCS,
  reactions,
  comments,
  otherComments,
  feeds,
}) => {
  const [comment, setComment] = useState("");

  const submitComment = (e) => {
    e.preventDefault();
  };

  return (
    <Card.Footer className="bg-light pt-0">
      <FeedReactions {...countLCS} />
      <FeedActionButtons id={id} reactions={reactions} feeds={feeds} />
      <Form onSubmit={submitComment}>
        <Flex alignItems="center" className="border-top border-200 pt-3">
          <Avatar src={av3} size="xl" />
          <Form.Control
            type="text"
            className="rounded-pill ms-2 fs--1"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Flex>
      </Form>
      {!!comments && (
        <Comments comments={comments} loadComment={otherComments} />
      )}
    </Card.Footer>
  );
};

FeedCardFooter.propTypes = {
  id: PropTypes.string.isRequired,
  countLCS: PropTypes.object.isRequired,
  reactions: PropTypes.object,
  comments: PropTypes.array,
  otherComments: PropTypes.string,
  feeds: PropTypes.object,
};

FeedCardFooter.defaultProps = {
  countLCS: { like: 0 },
  comments: [],
};

export default FeedCardFooter;
