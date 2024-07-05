import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/partials/Header";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import MyBlogs from "./pages/MyBlogs";
import BlogEditPage from "./pages/EditBlog";
import BlogView from "./pages/ViewBlog";

const isLoggedIn = () => {
  // Replace this with your actual login logic
  return !!localStorage.getItem("accesstoken");
};

const App: React.FC = () => {
  return (
    <main className="container mx-auto max-w-7xl">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={isLoggedIn() ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/edit-blog/:id" element={<BlogEditPage />} />
          <Route path="/blog/:id" element={<BlogView />} />
          <Route
            path="/post-blog"
            element={isLoggedIn() ? <Post /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-blog"
            element={isLoggedIn() ? <MyBlogs /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
