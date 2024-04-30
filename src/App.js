import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/Login/Login";
import RegistrationPage from "./Pages/SignUp/SignUp";
import View from "./Pages/View";
import "./assest/CSS/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App(props) {
  const { token } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {token ? (
          <>
            <Route path="/home" element={<View />} />
            <Route path="/postAdd" element={<View />} />
            <Route path="/edit-user" element={<View />} />
            <Route path="/profile" element={<View />} />
            <Route element={<View />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/" />} />{" "}
          </>
        )}
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.accessToken,
  };
};

export default compose(connect(mapStateToProps))(App);
