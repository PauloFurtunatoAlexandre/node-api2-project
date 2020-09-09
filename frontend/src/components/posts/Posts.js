import React from "react";

const Posts = (props) => {
  return (
    <div className="posts-list">
      <h2>{props.post.title}</h2>
      <p>{props.post.contents}</p>
    </div>
  );
};

export default Posts;
