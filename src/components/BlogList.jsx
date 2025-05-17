import React, { useEffect, useState } from "react";
import { databases } from "../appwriteConfig";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.REACT_APP_APPWRITE_DATABASE_ID,
          process.env.REACT_APP_APPWRITE_COLLECTION_ID
        );
        
        const publishedBlogs = response.documents.filter(doc => doc.published);
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <h1>Blog Articles</h1>
      {blogs.map(blog => (
        <Link to={`/blog/${blog.$id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div key={blog.$id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem", cursor: "pointer" }}>
            <h2>{blog.title}</h2>
            <p><strong>Author:</strong> {blog.author}</p>
            <p><em>{new Date(blog.created_at).toLocaleDateString()}</em></p>
            <p>{blog.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
