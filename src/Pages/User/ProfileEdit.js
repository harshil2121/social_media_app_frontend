import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { compose } from "redux";
import { editUser } from "../../apiServices/userApiServices";
import authActions from "../../redux/auth/actions";
import NavigationActions from "../../redux/navigation/actions";
import formikEnhancer from "./enhancer/profileEnhancer";
import defaultImg from "../../assest/image/profile.png";

const { setuser } = authActions;
const { success, error, fetching } = NavigationActions;

const Profile = (props) => {
  const {
    setuser,
    success,
    error,
    values,
    setValues,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
    setFieldValue,
    isValid,
    token,
    user,
  } = props;
  const navigate = useNavigate();
  const statusOptions = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

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

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("logoPreview", reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFieldValue("logo", null);
      setFieldValue("logoPreview", null);
    }
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    if (isValid) {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("status", values.status);
      formData.append("logo", values.logo ? values.logo : user.logo);

      await editUser(token, values.id, formData)
        .then((res) => {
          if (res.success) {
            success(res.message);
            setuser({
              ...user,
              logo: res.data.logo,
            });
            navigate("/home");
          } else {
            error(res.message);
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  };

  useEffect(() => {
    if (user) {
      setValues(user);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="col-12 d-flex flex-row justify-content-center align-items-start">
      <div className="card p-4 profile-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmitData} className="profile-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error field="username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error field="email" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error field="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="logo">Logo</label>
            <input
              type="file"
              className="form-control-file"
              id="logo"
              accept=".png, .jpg, .jpeg"
              onChange={handleLogoChange}
            />
            {values.logoPreview ? (
              <img
                src={values.logoPreview}
                className="logo-preview"
                alt="thumb"
              />
            ) : (
              <>
                {user.logo === null ? (
                  <img
                    src={defaultImg}
                    alt="name"
                    width="130"
                    height="130"
                    className="logo-preview"
                  />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URI_UPLOAD}/${values.logo}`}
                    alt="Name"
                    className="logo-preview"
                  />
                )}
              </>
            )}
            <Error field="logo" />{" "}
            {/* Display any errors related to the logo field */}
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              className="form-control"
              id="status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Status</option>
              {statusOptions.map((option, idx) => (
                <option key={`idx${idx}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="save-butn">
            Save Changes
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
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.accessToken,
    user: state.auth.user,
    isFetching: state.navigation.isFetching,
  };
};

export default compose(
  formikEnhancer,
  connect(mapStateToProps, {
    setuser,
    success,
    error,
    fetching,
  })
)(Profile);
