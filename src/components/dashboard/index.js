import React, { useEffect, useState } from "react";
import {
  quizList,
  vistedFn,
  quizAnswerFn,
  attemptedFn,
  answerObjectFn,
} from "../../redux/reducers/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import Popup from "../popup/index";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [selectQuestion, setSelectQuestion] = useState(0);
  const [onlyAnswer, setOnlyAnswer] = useState([]);
  const [open, setOpen] = useState(false);

  const { quizQuestions, visited, attempted } = useSelector(
    (state) => state.quizData
  );

  // Calling Quiz api once.
  useEffect(() => {
    dispatch(quizList());
  }, []);

  // Logic for combining options of the quiz question
  const copyOfQuizQuestions = [...quizQuestions];
  let radioOptions = copyOfQuizQuestions?.map((data) => {
    let output = [...data?.incorrect_answers, data.correct_answer];
    return output;
  });

  // Logic to store selected answer along with question into redux store
  const handleChange = (event) => {
    let questionNumber = selectQuestion + 1;
    let obj = {};
    obj["answer"] = event.target.value;
    dispatch(quizAnswerFn({ ...obj, questionNumber }));
    dispatch(attemptedFn(questionNumber));
    setOnlyAnswer((pre) => [...pre, event.target.value]);
    setSelectedValue(event.target.value);
  };
  const getVisitedColor = (i) => {
    if (attempted.includes(i)) {
      return "#50c878";
    } else if (visited.includes(i)) {
      return "#1976d2";
    }
  };

  // Logic to navigate to next and mark visited flag and if answer are not sleceted then mark those question as NA
  const handleNextQuestion = () => {
    if (!selectedValue) {
      let questionNumber = selectQuestion + 1;
      let obj = {};
      obj["answer"] = "NA";
      dispatch(quizAnswerFn({ ...obj, questionNumber }));
    }
    setSelectQuestion((prev) => prev + 1);
    dispatch(vistedFn(selectQuestion + 1));
    setSelectedValue("");
  };

  // Logic to submit the quiz
  const handleSubmitQuiz = () => {
    setOpen(true);
  };
  const alreadyChecked = (data) => {
    if (onlyAnswer?.includes(data)) {
      return data;
    }
  };
  const timer = () => {
    navigate("/report-page");
  };
  return (
    <>
      <div className="dashboard">
        <div className="header">
          <div>
            <span className="margin_left_small margin_top_small">Quiz Now</span>
          </div>
          <div className="margin_right_small">
            <span>
              {" "}
              <Countdown date={Date.now() + 1800000} onComplete={timer} />
            </span>
          </div>
        </div>
        <div className="main_container">
          {/* Quiz section */}
          <div className="grid_one margin_top_meduim margin_left_small">
            <div>
              {quizQuestions?.length > 0
                ? `${selectQuestion + 1}` +
                  ". " +
                  quizQuestions[selectQuestion]?.question
                : null}
            </div>
            <div>
              {radioOptions
                ? radioOptions[selectQuestion]?.map((data) => (
                    <FormControl
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={selectedValue || alreadyChecked(data)}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value={data}
                          control={<Radio />}
                          label={data}
                        />
                      </RadioGroup>
                    </FormControl>
                  ))
                : null}
            </div>

            <div className="login_button margin_left_meduim">
              {selectQuestion <= 13 && quizQuestions?.length > 0 ? (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleNextQuestion}
                    sx={{ marginRight: "5px" }}
                  >
                    Next
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleSubmitQuiz}
                  >
                    Submit Quiz
                  </Button>
                </>
              ) : quizQuestions?.length > 0 ? (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </Button>
              ) : (
                "Please wait data is fetching"
              )}
            </div>
          </div>

          {/* Details section */}
          <div className="grid_two margin_top_meduim margin_right_small">
            <div>
              <p>
                All Questions / You can switch to any question by clicking on
                below question number
              </p>
              {quizQuestions?.map((data, i) => (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setSelectQuestion(i);
                    dispatch(vistedFn(i + 1));
                  }}
                  sx={{
                    backgroundColor: getVisitedColor(i + 1),
                    width: "3rem",
                    marginRight: "4px",
                    marginBottom: "5px",
                  }}
                >
                  {i + 1}
                </IconButton>
              ))}
            </div>
            <div className="flex">
              <p className="square_visited"></p>
              <p>Visited</p>
            </div>
            <div className="flex">
              <p className="square_attempted"></p>
              <p>Attempted</p>
            </div>
          </div>

          {/* Confirmation popup */}
          <div>{open && <Popup open={open} setOpen={setOpen} />}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
