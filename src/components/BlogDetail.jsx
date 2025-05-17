import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { databases } from "../appwriteConfig";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await databases.getDocument(
          process.env.REACT_APP_APPWRITE_DATABASE_ID,
          process.env.REACT_APP_APPWRITE_COLLECTION_ID,
          id
        );

        if (response.published) {
          setBlog(response);
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p><strong>Author:</strong> {blog.author}</p>
      <p><em>{new Date(blog.created_at).toLocaleDateString()}</em></p>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
