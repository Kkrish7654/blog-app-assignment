import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "../lib/axiosConfig";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignupPage: React.FC = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const res = await axios({
        method: "POST",
        url: "/users/register",
        data: values,
      });

      if (res.data.type === "exist") {
        toast.error("Email Already Exist with this Email Id");
      } else {
        toast.success("User Registered Successfully");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

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

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold mb-2"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex gap-5 justify-end">
              <Link
                to={"/login"}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </Link>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default SignupPage;
