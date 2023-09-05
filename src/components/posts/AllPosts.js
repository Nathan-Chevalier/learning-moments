import { useState, useEffect } from "react";
import { getAllPosts } from "../../services/postService";
import "./posts.css";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((postArray) => {
      setPosts(postArray);
    });
  }, []);

  return (
    <>
      <div>
        <div className="filter-bar">
          <div>
            <h2>All Posts</h2>
          </div>
          <div></div>
        </div>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id} className="post-list">
                <div className="post-title">{post.title}</div>
                <div className="post-topic">Topic: {post.topic.name}</div>
                <div className="likes">Likes: {post.postLikes.length}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
