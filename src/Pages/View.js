import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import PostFeed from "./MainPages/PostFeed";
import PostAddForm from "./MainPages/PostCreateForm";
import Profile from "./User/Profile";
import ChangePassword from "./ChangePassword/ChangePassword";
import ProfileEdit from "./User/ProfileEdit";

const View = (props) => {
  const { token, user } = props;
  const location = useLocation();

  return (
    <div className="container-fluid align-items-center">
      <div className="row justify-content-center">
        <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center position-relative">
          <Sidebar user={user} token={token} />
        </div>
        <div className="col-lg-10 col-md-9 col-sm-8 col-12">
          {location.pathname === "/home" ? (
            <PostFeed token={token} user={user} />
          ) : location.pathname === "/postAdd" ? (
            <PostAddForm token={token} />
          ) : location.pathname === "/profile" ? (
            <Profile token={token} user={user} />
          ) : location.pathname === "/edit-user" ? (
            <ProfileEdit token={token} />
          ) : location.pathname === "/change-password" ? (
            <ChangePassword token={token} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.accessToken,
    user: state.auth.user,
  };
};

export default compose(connect(mapStateToProps))(View);
