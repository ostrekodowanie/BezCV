import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./providers/login";
import { Provider, useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import ReactGA from "react-ga";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

ReactGA.initialize("G-H8CK9Y5CQB");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
