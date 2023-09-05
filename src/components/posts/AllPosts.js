import "./posts.css";
import { useState, useEffect } from "react";
import { getAllPosts } from "../../services/postService";
import { getAllTopics } from "../../services/topicService";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showTopic, setShowTopic] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // ? Sets initial post & topic arrays
  useEffect(() => {
    getAllPosts().then((postArray) => {
      setPosts(postArray);
    });
    getAllTopics().then((topicArray) => {
      setTopics(topicArray);
    });
  }, []);

  // ? Filters posts by topic selector
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

  // ? Searches posts & filters results
  useEffect(() => {
    const foundPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(foundPosts);
  }, [posts, searchTerm]);

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
          <div>
            <input
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              type="text"
              placeholder="Search Posts..."
              className="post-search"
            />
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
