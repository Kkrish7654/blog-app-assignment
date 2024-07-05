import React, { useEffect, useState } from "react";
import axios from "../lib/axiosConfig";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Blogpage = () => {
  const [blogs, setBlogs] = useState<any>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios({
          method: "GET",
          url: "/blogs/get-all",
        });

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
        <h1 className="text-2xl font-bold mb-4 text-center">Top Stories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs
            ?.map((blog: any) => (
              <div className="col-span-2 row-span-2 relative bg-gray-200 p-4 flex items-end">
                <img
                  src={`${imagePath}${blog.imageUrl}`}
                  alt="Story 1"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="relative z-10  p-4 bg-black bg-opacity-50 text-white">
                  <h2 className="text-xl font-bold">{blog.title}</h2>
                  <p>{blog.content}</p>
                  <p className="text-pink-500">{blog.author?.name}</p>
                </div>

                <div className="flex items-end w-full justify-end relative">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="float-right bg-black text-white p-3"
                  >
                    View Blog
                  </Link>
                </div>
              </div>
            ))
            .slice(0, 1)}

          {blogs?.map((blog: any) => (
            <div className="bg-gray-200 p-4">
              <img
                src={`${imagePath}${blog.imageUrl}`}
                alt="Story 2"
                className="w-full h-auto mb-2"
              />
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-pink-500">{blog.author?.name}</p>
              <div className="flex items-end w-full justify-end relative">
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

export default Blogpage;
