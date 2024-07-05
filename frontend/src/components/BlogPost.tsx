// src/components/BlogForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";

const BlogPost: React.FC = () => {
  const initialValues = {
    title: "",
    content: "",
    image: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  const handleSubmit = async (values: any) => {
    const authorId: any = localStorage.getItem("id");
    const token = localStorage.getItem("accesstoken");

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("authorId", authorId);
      formData.append("image", values.image); 

      const res = await axios.post("/blogs/post", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      });

      toast.success("Blog created successfully");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Upload Blog</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                rows="5"
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
                name="image"
                onChange={(event: any) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BlogPost;
