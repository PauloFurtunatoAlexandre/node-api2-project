import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Posts from "./components/posts/Posts";

const App = () => {
  const [posts, setPosts] = useState([]);
  // let posts = [];

  const fetchPosts = () => {
    console.log("clicked");
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => {
        setPosts(res.data);
        // posts = res.data;
        console.log("posts: ", posts);
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <div className="App">
      <h1>Blog Posts</h1>
      <button onClick={() => fetchPosts()}>Fetch Posts</button>
      {posts.map((post) => {
        return <Posts key={post.id} post={post} />;
      })}
    </div>
  );
};

export default App;
