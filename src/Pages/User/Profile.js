import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getByDataUserID } from "../../apiServices/userApiServices";
import defaultImg from "../../assest/image/profile.png";

function UserProfile(props) {
  const { token, user } = props;
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({});
  const [dataFollower, setDataFollower] = useState({});
  const [dataFollowing, setDataFollowing] = useState({});

  const userData = async () => {
    await getByDataUserID(token, user.id)
      .then((res) => {
        console.log("ertyerty", res);
        setDataUser(res.data.user);
        setDataFollower(res.data.followers);
        setDataFollowing(res.data.following);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    userData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="user-profile">
      <header className="profile-header">
        <div className="profile-photo">
          <img
            alt="Profile"
            src={
              dataUser.logo
                ? `${process.env.REACT_APP_BACKEND_URI_UPLOAD}/${dataUser.logo}`
                : defaultImg
            }
          />
          <section className="profile-info">
            <div className="profile-username">
              <h2>{dataUser.username}</h2>
            </div>
            <div className="profile-stats">
              <div>
                <span>
                  <span>{dataFollower?.count}</span> followers
                </span>
              </div>
              <div>
                <span>
                  <span>{dataFollowing?.count}</span> following
                </span>
              </div>
            </div>
          </section>
        </div>
        <div className="edit-buttons">
          <button className="save-butn" onClick={() => navigate("/edit-user")}>
            Edit Profile
          </button>
        </div>
      </header>
    </div>
  );
}

export default UserProfile;
