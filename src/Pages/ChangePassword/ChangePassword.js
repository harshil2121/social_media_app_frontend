import React, { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { compose } from "redux";
import { changePasswordApi } from "../../apiServices/userApiServices";
import navigationAction from "../../redux/navigation/actions";
import formikEnhancer from "./enhancer/chnagePasswordEnhancer";

const { success, error, fetching } = navigationAction;

function ChangePassword(props) {
  const {
    handleBlur,
    handleChange,
    values,
    errors,
    submitCount,
    touched,
    token,
    resetForm,
  } = props;
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePasswordApi(token, values)
      .then((res) => {
        if (res.success) {
          success(res.message);
          resetForm();
        } else {
          error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Error = (props) => {
    const field = props.field;
    if ((errors[field] && touched[field]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field]}
        </span>
      );
    } else {
      return <span />;
    }
  };

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="card p-4 change-pass-container">
        <h2 className="mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <label htmlFor="currentPassword" className="form-label">
              Current Password:
            </label>
            <input
              type={passwordVisibility.currentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />
            <button
              type="button"
              className={`toggle-password-btn ${
                passwordVisibility.currentPassword ? "text-primary" : ""
              }`}
              onClick={() => togglePasswordVisibility("currentPassword")}
            >
              {passwordVisibility.currentPassword ? (
                <EyeOff className="sm-svg" />
              ) : (
                <Eye className="sm-svg" />
              )}
            </button>
            <Error field="currentPassword" />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="newPassword" className="form-label">
              New Password:
            </label>
            <input
              type={passwordVisibility.newPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />
            <button
              type="button"
              className={`toggle-password-btn ${
                passwordVisibility.newPassword ? "text-primary" : ""
              }`}
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              {passwordVisibility.newPassword ? (
                <EyeOff className="sm-svg" />
              ) : (
                <Eye className="sm-svg" />
              )}
            </button>
            <Error field="newPassword" />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password:
            </label>
            <input
              type={passwordVisibility.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />
            <button
              type="button"
              className={`toggle-password-btn ${
                passwordVisibility.confirmPassword ? "text-primary" : ""
              }`}
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {passwordVisibility.confirmPassword ? (
                <EyeOff className="sm-svg" />
              ) : (
                <Eye className="sm-svg" />
              )}
            </button>
            <Error field="confirmPassword" />
          </div>
          <button type="submit" className="save-butn">
            Change Password
          </button>
          &ensp;
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="back-butn"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.accessToken,
  };
};

export default compose(
  formikEnhancer,
  connect(mapStateToProps, { success, error, fetching })
)(ChangePassword);
