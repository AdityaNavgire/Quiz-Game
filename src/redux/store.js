import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "./reducers/quizSlice";

export const store = configureStore({
  reducer: {
    quizData: quizSlice,
  },
});
