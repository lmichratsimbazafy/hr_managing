import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios, { AxiosRequestConfig } from "axios";
import { AuthServices } from "./services/authservice";
import { Provider } from "react-redux";
import store from "./services/redux-services/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./component/navigation/Router";

axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = await AuthServices.getAccessToken();
  const server = process.env.REACT_APP_API_URL;

  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
  }
  config.baseURL = server;
  return config;
});

const theme = createTheme();

function App() {
  return (
    <Provider {...{ store }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
