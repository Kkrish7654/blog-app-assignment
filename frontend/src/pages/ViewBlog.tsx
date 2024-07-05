// BlogView.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axiosConfig";
import toast from "react-hot-toast";

const BlogView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
  });

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`/blogs/get/${id}`);
        setBlog(res.data?.data?.data);
      } catch (error) {
        toast.error("Failed to fetch blog");
        console.error(error);
      }
    }

    fetchBlog();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <div className="mb-4">
        <p className="text-gray-500">By: {blog.author?.name}</p>
      </div>
      {blog.imageUrl && (
        <img
          src={`http://localhost:3001${blog.imageUrl}`}
          alt={blog.title}
          className="mb-4"
        />
      )}
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogView;
