import "./App.scss";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import OAuthLogin from "./components/authentication/card/OAuthLogin";
import AuthSimpleLayout from "./layouts/AuthSimpleLayout";
import Main from "Main";
import Layout from "layouts/Layout";
// import { useStore } from "./hooks/useStore";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
