import React, { useState } from "react";
import enhancer from "./enhancer/signUpEnhancer";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import { compose } from "redux";
import { connect } from "react-redux";
import NavigationActions from "../../redux/navigation/actions";
import { loginApi, register } from "../../apiServices/authServices";
import authActions from "../../redux/auth/actions";

const { success, error, fetching } = NavigationActions;
const { login } = authActions;

const Register = (props) => {
  const {
    success,
    error,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
    handleSubmit,
    isValid,
  } = props;
  const navigate = useNavigate();
  const [pwdView, togglePwdView] = useState(false);
  const [pwdView1, togglePwdView1] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    handleSubmit();
    if (isValid) {
      fetching();
      setLoading(true);
      var formData = new FormData();
      for (const property in values) {
        formData.append(property, values[property]);
      }
      await register(formData).then(async (data) => {
        if (data.success) {
          success(data.message);
          setLoading(false);
          await loginApi({
            email: values.email,
            password: values.password,
          }).then((loginData) => {
            if (loginData.success) {
              // success(loginData.message);
              props.login(loginData.data);
              navigate("/home");
            } else {
              error(data.message);
            }
          });
        } else {
          error(data.message);
          setLoading(false);
        }
      });
    }
    setLoading(false);
  };

  const Error = (props) => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </span>
      );
    } else {
      return <span />;
    }
  };

  return (
    <div className="login-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            id="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error className="error-msg-show" field="username" />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error className="error-msg-show" field="email" />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type={pwdView ? "text" : "password"}
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span
            type="button"
            className="toggle-password-btn" // Add a custom class for styling
            onClick={() => togglePwdView(!pwdView)}
          >
            {pwdView ? (
              <EyeOff className="sm-svg" />
            ) : (
              <Eye className="sm-svg" />
            )}
          </span>
          <label htmlFor="password">Password</label>
          {error && <Error className="error-msg-show" field="password" />}
        </div>
        <div className="user-box">
          <input
            type="number"
            name="phone"
            id="phone"
            className="no-arrows"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error className="error-msg-show" field="phone" />
          <label>Phone Number</label>
        </div>

        {/* <div className="user-box">
          <input
            type={pwdView ? "text" : "password"}
            id="confirm_password"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span
            type="button"
            className="toggle-password-btn" // Add a custom class for styling
            onClick={() => togglePwdView1(!pwdView)}
          >
            {pwdView1 ? (
              <EyeOff className="sm-svg" />
            ) : (
              <Eye className="sm-svg" />
            )}
          </span>
          <label htmlFor="confirm_password">Confirm Password</label>
          {error && (
            <Error className="error-msg-show" field="confirm_password" />
          )}
        </div> */}
        <button type="submit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Sign Up
        </button>
        <div className="text-center mt-3 acc-text">
          Already have an account?{" "}
          <label className="link-label" onClick={() => navigate("/")}>
            Log In
          </label>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isFetching: state.navigation.isFetching,
  };
};
export default compose(
  enhancer,
  connect(mapStateToProps, { login, success, error, fetching })
)(Register);
