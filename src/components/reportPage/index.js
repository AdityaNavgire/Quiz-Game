import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Progress from "../progress";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import {
  vistedFn,
  quizAnswerFn,
  attemptedFn,
  reset,
} from "../../redux/reducers/quizSlice";

const ReportPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizQuestions, quizAnswer, attempted } = useSelector(
    (state) => state.quizData
  );
  let hash = {};
  quizAnswer?.forEach((data, i) => {
    console.log(data, "Date");
    hash[data?.questionNumber] = data?.answer;
  });
  console.log(quizQuestions);
  console.log(quizAnswer, "Answer");
  console.log(hash, "Hash");
  console.log(attempted, "attempted");
  // Logic to calculate success percentage
  let percentage;
  const calculatePercentage = (data) => {
    percentage = (data / quizQuestions?.length) * 100;
    return percentage;
  };
  const correctAnswer = () => {
    const onlyValues = Object.values(hash);
    let count = [];
    console.log(onlyValues.includes("Honey Fungus"), "On");
    for (let i = 0; i < quizQuestions.length; i++) {
      if (onlyValues?.includes(quizQuestions[i]?.correct_answer)) {
        console.log(quizQuestions[i]?.correct_answer, "Ansee");
        count.push(quizQuestions[i]?.correct_answer);
      }
    }
    calculatePercentage(count?.length);
    return count?.length;
  };
  const handleBackToLogin = () => {
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="report">
      <div className="header">
        <div>
          <span className="margin_left_small margin_top_small">
            Report Page
          </span>
        </div>
        <div className="margin_right_small">
          <span>
            {" "}
            <Button
              variant="contained"
              size="small"
              onClick={handleBackToLogin}
              sx={{ marginRight: "5px" }}
            >
              Back to Login
            </Button>
          </span>
        </div>
      </div>
      <div className="report_container">
        <div className="report_grid_two margin_top_extra_small">
          <div>
            <h5>
              Attempted : {attempted?.length} out of {quizQuestions?.length}
              <br />
              Correct Answer : {correctAnswer()} out of {quizQuestions?.length}
            </h5>
            <div>
              <Progress percentage={percentage || 0} />
            </div>
          </div>
        </div>
        <div className="report_grid_one margin_top_extra_small">
          <div>
            {quizQuestions?.length > 0
              ? quizQuestions.map((data, i) => (
                  <>
                    <h5>
                      {i + 1} {data?.question}
                    </h5>
                    <p className="small_font">
                      Correct answer : {data?.correct_answer}
                      <span style={{ marginLeft: "10px" }}>
                        {" "}
                        Your Answer :{" "}
                        {Object.keys(hash)?.length > 0 ? hash[i + 1] : "NA"}
                      </span>
                    </p>
                  </>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
