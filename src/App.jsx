import React, { useEffect, useState, createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import axios from "./axiosccon";
import Layout from "./Component/layout/Layout";
import QuestionForm from "./Pages/Question"; // Corrected import
import AnswerComponent from "./Pages/answer";
import Dashboard from "./Pages/Dashbord";
import "./App.css";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();

  const checkUser = async () => {
    try {
      if (token) {
        const { data } = await axios.get("/users/check", {
          headers: { Authorization: "Bearer " + token },
        });
        setUser(data);
      } else {
        Navigate("/login");
      }
    } catch (error) {
      console.log(error.response);
      Navigate("/login");
    }
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    // Perform login logic here, set token, user data, etc.
    // For example, if you get a token from your API response:
    // localStorage.setItem("token", response.data.token);
    // setUser(response.data.user);
    // Navigate to the home page after successful login
    Navigate("/");
  };

  const handleLogout = () => {
    // Perform logout logic here, clear token, user data, etc.
    // For example:
    // localStorage.removeItem("token");
    // setUser({});
    // Navigate to the login page after logout
    localStorage.removeItem("token");
    setUser({});
    Navigate("/login");
  };

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout isLoggedIn={!!token} onLogout={handleLogout}>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout isLoggedIn={!!token} onLogout={handleLogout}>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout isLoggedIn={!!token} onLogout={handleLogout}>
              <Login onLogin={handleLogin} />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout isLoggedIn={!!token} onLogout={handleLogout}>
              <Register />
            </Layout>
          }
        />
        {/* New Route for QuestionForm */}
        <Route
          path="/questionform"
          element={
            <Layout isLoggedIn={!!token} onLogout={handleLogout}>
              <QuestionForm />
            </Layout>
          }
        />
        {/* Updated Route for AnswerComponent with question ID parameter */}
        <Route
          path="/answer/:questionId"
          element={
            <Layout isLoggedIn={!!token} onLogout={handleLogout}>
              <AnswerComponent />
            </Layout>
          }
        />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
