import React, { useEffect } from "react";
import CreatePost from "./CreatePost";
import FeedCard from "./FeedCard";
import classNames from "classnames";
import { usePosts } from "@/hooks/posts";

const FeedContent = () => {
  const { dataPosts, getDataPosts } = usePosts();

  useEffect(() => {
    (async () => await getDataPosts())();
  }, []);

  return (
    <>
      <CreatePost className="mb-3" />
      {dataPosts?.map((post, index) => (
        <FeedCard
          key={post.id}
          feed={post}
          className={classNames({ "mb-3": index + 1 !== post.length })}
        />
      ))}
    </>
  );
};

export default FeedContent;
