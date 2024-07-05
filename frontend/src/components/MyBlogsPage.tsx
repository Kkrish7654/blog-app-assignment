import React, { useEffect, useState } from "react";
import axios from "../lib/axiosConfig";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const MyBlogpage = () => {
  const [blogs, setBlogs] = useState<any>([]);

  useEffect(() => {
    const authorId: any = localStorage.getItem("id");

    async function fetchBlogs() {
      try {
        const res = await axios({
          method: "GET",
          url: `/blogs/get-by-author/${authorId}`,
        });

        console.log(res);

        setBlogs(res.data?.data?.data);
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    }

    fetchBlogs();
  }, []);

  console.log(blogs);
  // need image path
  const imagePath = "http://localhost:3001/";

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">My Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs?.map((blog: any) => (
            <div className="bg-gray-200 p-4">
              <img
                src={`${imagePath}${blog.imageUrl}`}
                alt="Story 2"
                className="w-full h-auto mb-2"
              />
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-pink-500">{blog.author?.name}</p>

              <Link to={`/edit-blog/${blog._id}`} className="float-right">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1.3em"
                  width="1.3em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                </svg>
              </Link>

              <div className="flex items-end w-full justify-start relative">
                <Link
                  to={`/blog/${blog._id}`}
                  className="float-right bg-black text-white p-3"
                >
                  View Blog
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogpage;
