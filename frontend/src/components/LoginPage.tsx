import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "../lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";

const LoginPage: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const res = await axios({
        method: "POST",
        url: "/users/login",
        data: values,
      });

      if (res.status === 201) {
        localStorage.setItem("accesstoken", res.data.data.token);
        localStorage.setItem("id", res.data.data.data.id);
        window.location.href = "/";
      }
    } catch (error) {
      toast.error("Incorrect Credentials!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex gap-5 justify-end">
            <Link
              to="/signup"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Signup
            </Link>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
