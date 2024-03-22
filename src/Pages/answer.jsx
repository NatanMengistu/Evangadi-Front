import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import classes from "../Pages/Anwer.module.css"; // Corrected file name
import { Link, useParams } from "react-router-dom";

function AnswerComponent() {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState({});
  const { questionId } = useParams(); // Get the questionId from URL params
  const [previouslyAnsweredQuestionId, setPreviouslyAnsweredQuestionId] =
    useState("");
  console.log(questionId);
  const fetchQuestion = async () => {
    try {
      const random = question;
      console.log(random);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://evangadi-back-6.onrender.com/api/answer/getTopQuestion",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setQuestion(response.data.question || {});
      } else {
        setMessage("Failed to fetch question.");
      }
    } catch (error) {
      console.error("Error fetching question:", error.message);
      setMessage("An error occurred while fetching question.");
    }
  };

  const fetchAnswers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://evangadi-back-6.onrender.com/api/answer/allAnswers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        setAnswers(response.data.answers || []);
      } else {
        setMessage("Failed to fetch answers.");
      }
    } catch (error) {
      console.error("Error fetching answers:", error.message);
      setMessage("An error occurred while fetching answers.");
    }
  };

  const previouslyAnsweredQuestionInfo = localStorage.getItem("questionInfo");

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
    console.log(previouslyAnsweredQuestionInfo);
    if (previouslyAnsweredQuestionInfo) {
      const previouslyAnsweredQuestion = JSON.parse(
        previouslyAnsweredQuestionInfo
      );
      setPreviouslyAnsweredQuestionId(previouslyAnsweredQuestion.questionid);
      console.log(previouslyAnsweredQuestion.questionid);
    }
  }, []);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const postAnswer = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://evangadi-back-6.onrender.com/api/answer/createAnswer/${previouslyAnsweredQuestionId}`,
        { answer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage("Answer posted successfully.");
        setAnswer("");
        fetchAnswers();
      } else {
        setMessage("Failed to post answer.");
      }
    } catch (error) {
      console.error("Error posting answer:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className={classes.answer_container}>
      <h2>Question</h2>
      <div>
        <p>title: {JSON.parse(previouslyAnsweredQuestionInfo)?.title}</p>
        <p>
          description: {JSON.parse(previouslyAnsweredQuestionInfo)?.description}
        </p>
      </div>
      <hr />
      <h3 style={{ marginLeft: "15px" }}>Answers from the community</h3>
      <hr />
      <div>
        {message && <p>{message}</p>}
        {answers.length > 0 ? (
          <div>
            {console.log(
              "previouslyAnsweredQuestionId",
              previouslyAnsweredQuestionId
            )}

            {answers.map(
              (ans, index) =>
                // Here, directly compare with previouslyAnsweredQuestionId
                ans.questionid === previouslyAnsweredQuestionId && (
                  <div key={index} className={classes.answerItem}>
                    <PersonPinIcon
                      style={{
                        marginRight: "10px",
                        verticalAlign: "middle",
                        fontSize: "40px",
                      }}
                    />
                    <div style={{ display: "inline-block" }}>
                      <strong>Answer ID:</strong> {ans.answerid}
                      <br />
                      <strong>User ID:</strong> {ans.userId}
                      <br />
                      <strong>Answer:</strong> {ans.answer}
                      <br />
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <p>No answers yet.</p>
        )}
      </div>
      <h2 style={{ textAlign: "center" }}>Answer To Top Question</h2>
      <Link
        to="/questionform"
        style={{ textDecoration: "none", color: "black" }}
      >
        <p style={{ textAlign: "center" }}>Go to Question page</p>
      </Link>
      <br />
      <br />
      <textarea
        className={classes.textA}
        id="answer"
        value={answer}
        onChange={handleAnswerChange}
        rows="4"
        cols="50"
        required
        placeholder="Your answer..."
      ></textarea>
      <br />
      <button type="submit" onClick={postAnswer}>
        Post Your Answer
      </button>
    </div>
  );
}

export default AnswerComponent;
