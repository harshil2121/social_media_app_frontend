import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useNavigate } from "react-router-dom";
import { checkApi, loginApi } from "../../apiServices/authServices";
import enhancer from "./enhancer/loginEnhancer";
import AuthActions from "../../redux/auth/actions";
import NavigationActions from "../../redux/navigation/actions";
import { Eye, EyeOff } from "react-feather";

const { login, check } = AuthActions;
const { success, error, fetching } = NavigationActions;

const LoginPage = (props) => {
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
    token,
  } = props;
  const navigate = useNavigate();
  const [pwdView, togglePwdView] = useState(false);

  const checkLogin = async () => {
    fetching();
    await checkApi(token).then((data) => {
      if (data.success) {
        check(data.data);
        success();
        navigate("/home");
      } else {
        error();
      }
    });
  };

  useEffect(() => {
    token !== null && checkLogin();
    // eslint-disable-next-line
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    handleSubmit();
    if (isValid) {
      await loginApi(values).then((data) => {
        if (data.success) {
          props.login(data.data);
          navigate("/home");
          success(data.message);
        } else {
          error(data.message);
        }
      });
    }
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
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="user-box">
          <input
            type="text"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label>Username</label>
          <Error className="error-msg-show" field="email" />
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
        <button type="submit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
        <div className="text-center mt-3 acc-text">
          Don't have an account ?{" "}
          <label className="link-label" onClick={() => navigate("/register")}>
            Sign Up
          </label>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.accessToken,
    isFetching: state.navigation.isFetching,
  };
};

export default compose(
  enhancer,
  connect(mapStateToProps, {
    check,
    login,
    success,
    error,
    fetching,
  })
)(LoginPage);
