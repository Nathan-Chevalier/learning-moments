import "./posts.css";
import { useState, useEffect } from "react";
import { getAllPosts } from "../../services/postService";
import { getAllTopics } from "../../services/topicService";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showTopic, setShowTopic] = useState(0);

  useEffect(() => {
    getAllPosts().then((postArray) => {
      setPosts(postArray);
    });
    getAllTopics().then((topicArray) => {
      setTopics(topicArray);
    });
  }, []);

  useEffect(() => {
    if (showTopic > 0) {
      const postFilter = posts.filter(
        (post) => post.topicId === parseInt(showTopic)
      );
      setFilteredPosts(postFilter);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, showTopic]);

  return (
    <>
      <div>
        <div className="filter-bar">
          <div>
            <h2>All Posts</h2>
          </div>
          <div>
            <select
              className="topic-filter"
              onChange={(event) => {
                setShowTopic(event.target.value);
              }}
            >
              <option value={0}> Displaying All Topics</option>
              {topics.map((topic) => {
                return <option value={topic.id}>{topic.name}</option>;
              })}
            </select>
          </div>
        </div>
        <ul>
          {filteredPosts.map((post) => {
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
