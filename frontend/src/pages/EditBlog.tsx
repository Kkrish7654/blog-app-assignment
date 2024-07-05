import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";

const BlogEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>({
    title: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios({
          method: "GET",
          url: `/blogs/get/${id}`,
        });

        setBlog(res.data?.data?.data);
      } catch (error) {
        toast.error("Failed to fetch blog");
        console.error(error);
      }
    }

    fetchBlog();
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  const handleFormSubmit = async (values: any) => {
    try {
      // const formData = new FormData();
      // formData.append("title", values.title);
      // formData.append("content", values.content);
      // formData.append("image", values.imageUrl);

      const token = localStorage.getItem("accessToken");
      const res = await axios({
        method: "PUT",
        url: `/blogs/update/${id}`,
        data: values,
      });

      toast.success("Blog updated successfully");
      window.location.href = "/my-blog";
    } catch (error) {
      toast.error("Failed to update blog");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <Formik
        initialValues={{
          title: blog.title || "",
          content: blog.content || "",
          imageUrl: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-gray-700 font-bold mb-2"
              >
                Content
              </label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="imageUrl"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("imageUrl", event.currentTarget.files?.[0]);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Blog
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BlogEditPage;
