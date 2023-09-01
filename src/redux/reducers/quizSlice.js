import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizQuestions: [],
  loading: false,
  status: null,
  visited: [],
  attempted: [],
  quizAnswer: [],
  answersObject: {},
};
export const quizList = createAsyncThunk("quizlist", async () => {
  let response = await fetch("https://opentdb.com/api.php?amount=15&type=multiple");
  let data = await response.json();
  return data?.results;
});
export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    vistedFn: (state, action) => {
      state.visited.push(action.payload);
    },
    attemptedFn: (state, action) => {
      state.attempted.push(action.payload);
    },
    quizAnswerFn: (state, action) => {
      state.quizAnswer.push(action.payload);
    },
    answerObjectFn: (state, action) => {
      console.log(action.payload, "action.payload");
      state.answersObject = action.payload;
    },
    reset: () => initialState
  },
  extraReducers: {
    [quizList.fulfilled]: (state, action) => {
      state.quizQuestions = action.payload;
      state.status = null;
    },
    [quizList.pending]: (state) => {
      state.status = "Fetching. Please wait a moment...";
    },
    [quizList.rejected]: (state) => {
      state.status = "Failed to fetch data...";
    },
  },
});

export const { vistedFn, quizAnswerFn, attemptedFn, answerObjectFn, reset } = quizSlice.actions;
export default quizSlice.reducer;
