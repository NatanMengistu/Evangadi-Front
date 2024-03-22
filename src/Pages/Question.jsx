import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import ".question.mod .modele.css.css";
import "./question.css";
import axios from "axios";

function Question() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const response = await axios.post(
        "https://evangadi-back-6.onrender.com/api/question/createQuestion",
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Question created:", response.data);

      setTitle("");
      setDescription("");
      setErrorMessage("");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      console.error("Error creating question:", error.message);
      setErrorMessage("Failed to create question. Please try again.");
    }
  };

  return (
    <div className="container">
      <section className="steps">
        <h1>Steps to Write a Good Question</h1>
        <ul>
          <li>Summarize your problem</li>
          <li>Describe your problem in more detail</li>
          <li>Describe what you tried and what you expected to happen</li>
          <li>Review your question</li>
        </ul>
      </section>
      <br />
      <br />
      <br />
      <h2>Ask a Public Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p style={{ textAlign: "center" }}>Go to question page</p> <br />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Question description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Post Your Question</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Question;
