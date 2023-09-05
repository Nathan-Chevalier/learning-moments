import { useState, useEffect } from "react";
import { getAllPosts } from "../services/postService";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((postArray) => {
      setPosts(postArray);
    });
  }, []);

  return <></>;
};
