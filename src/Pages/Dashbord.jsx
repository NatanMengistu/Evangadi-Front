import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import { AppState } from "../App";
import classes from "../Pages/dashboard.module.css";
import QuestionForm from "./Question";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

function Dashboard() {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://evangadi-back-6.onrender.com/api/question/all-questions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    fetchQuestions();
  }, []);

  const handleToggleQuestionForm = () => {
    setShowQuestionForm(!showQuestionForm);
  };

  return (
    <div className={classes.main}>
      <div className={classes.questionpage} style={{ display: "flex" }}>
        <button onClick={handleToggleQuestionForm}>Ask Question</button>
        <h3 style={{ marginLeft: "auto", marginRight: "20px" }}>
          Welcome: {user.username}
        </h3>
      </div>
      <h1>Question</h1>

      {showQuestionForm ? (
        <QuestionForm />
      ) : (
        <ul className={classes.questionList} style={{ margin: "0 auto" }}>
          {questions.map((question) => (
            <li key={question.questionid} className={classes.questionItem}>
              <hr />
              <div className={classes.questionContent}>
                <div className={classes.questionTitle}>
                  <AccountCircleOutlinedIcon
                    style={{ marginRight: "10px", fontSize: "40px" }}
                  />
                  <strong>Title:</strong> {question.title}
                  <Link
                    onClick={() =>
                      localStorage.setItem(
                        "questionInfo",
                        JSON.stringify(question)
                      )
                    }
                    to={`/answer/${questions.questionid}`}
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                  >
                    <ArrowForwardIosOutlinedIcon
                      style={{
                        fontSize: "24px",
                        verticalAlign: "middle",
                        marginLeft: "1400px",
                      }}
                    />
                  </Link>
                </div>
                <div className={classes.questionDescription}>
                  <strong>Description:</strong> {question.description}
                </div>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
