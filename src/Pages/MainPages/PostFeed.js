import React, { useState, useEffect, useRef } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getAllPost, likePost } from "../../apiServices/postApiServices";
import defaultImg from "../../assest/image/profile.png";
import { getAllUserList } from "../../apiServices/userApiServices";
import {
  userFollowApi,
  userUnFollowApi,
} from "../../apiServices/followApiServices";

const PostFeed = (props) => {
  const { token, user } = props;
  const [posts, setPosts] = useState([]);
  const [postLength, setPostLength] = useState(0);
  const [allUser, setAllUser] = useState([]);
  const [allUserLength, setAllUserLength] = useState(0);
  const [Like, setLike] = useState(false);
  const [Follow, setFollow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const pageRef = useRef(1);
  const userRef = useRef(1);

  const postDataPage = async (page) => {
    setLoading(true);
    let dataForLoad = {
      pageNumber: page,
      pageSize: 10,
    };
    await getAllPost(token, dataForLoad).then((res) => {
      if (res.success) {
        setPostLength(res.data.totalCount);
        let data = res.data.posts?.map((item) => {
          return {
            ...item,
            description: item?.description ? item.description : null,
            img: item.img ? item.img : null,
            liked_user_ids: item.liked_user_ids
              ? item.liked_user_ids.split(",")
              : [],
          };
        });
        if (page === 1) {
          setPosts(data);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...data]);
        }
      }
      setLoading(false);
    });
  };

  const FollowerSuggetionList = async (userPage) => {
    setLoading1(true);
    let dataObj = {
      pageNumber: userPage,
      pageSize: 5,
    };
    await getAllUserList(token, dataObj)
      .then((res) => {
        if (res.success) {
          setAllUserLength(res.data.totalCount);
          let data = res?.data?.users?.map((item) => {
            return {
              ...item,
            };
          });
          if (userPage === 1) {
            setAllUser(data);
          } else {
            setAllUser((prevPosts) => [...prevPosts, ...data]);
          }
        }
        setLoading1(false);
      })
      .catch((err) => {
        setLoading1(false);
        console.log("err", err);
      });
  };

  const loadMorePosts = async () => {
    pageRef.current++;
    await postDataPage(pageRef.current);
  };

  const handleLike = async (postId) => {
    await likePost(token, postId)
      .then((res) => {
        setLike(!Like);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const loadMoreUsers = async () => {
    userRef.current++;
    await FollowerSuggetionList(userRef.current);
  };

  const handleFollow = async (userId) => {
    console.log("Followed user:", userId);
    await userFollowApi(token, userId)
      .then((res) => {
        console.log(res);
        setFollow(!Follow);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnfollow = async (userId) => {
    console.log("UNFollowed user:", userId);
    await userUnFollowApi(token, userId)
      .then((res) => {
        console.log(res);
        setFollow(!Follow);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    postDataPage(pageRef.current);
    // eslint-disable-next-line
  }, [Like]);

  useEffect(() => {
    FollowerSuggetionList(userRef.current);
    // eslint-disable-next-line
  }, [Follow]);

  return (
    <>
      <div className="col-12 d-flex flex-row justify-content-center align-items-start">
        <div className="col-lg-9 col-md-8 col-sm-12">
          <div className="post-list">
            {posts.map((post, index) => (
              <div key={index} className="post-item">
                <div className="user-info">
                  <div className="menu-icon">
                    <img
                      src={
                        post?.author_img
                          ? `${process.env.REACT_APP_BACKEND_URI_UPLOAD}/${post?.author_img}`
                          : defaultImg
                      }
                      alt="User"
                      className="user-image"
                    />
                    <span className="user-name text-left">
                      {post.author_name}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="post-content">
                  {post.description ? (
                    <>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post?.description,
                        }}
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {post?.image_filename && (
                    <div className="media-container">
                      {post?.image_filename.endsWith(".mp4") ||
                      post?.image_filename.endsWith(".avi") ||
                      post?.image_filename.endsWith(".webm") ||
                      post?.image_filename.endsWith(".mov") ||
                      post?.image_filename.endsWith(".mkv") ? (
                        <video
                          className="media"
                          src={`${process.env.REACT_APP_BACKEND_URI_UPLOAD}/posts/${post.image_filename}`}
                          controls
                          autoPlay
                          preload="auto"
                        />
                      ) : (
                        <img
                          className="media"
                          src={`${process.env.REACT_APP_BACKEND_URI_UPLOAD}/posts/${post.image_filename}`}
                          alt="Post"
                        />
                      )}
                    </div>
                  )}
                </div>

                <hr />
                <div className="button-container">
                  <button onClick={() => handleLike(post.id)}>
                    {post?.liked_user_ids?.includes(String(user?.id)) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}

                    <span className="">
                      {post.like_count > 0 ? post.like_count : 0}
                    </span>
                  </button>
                </div>
              </div>
            ))}

            {postLength === posts.length ? (
              <></>
            ) : (
              <>
                {loading && (
                  <div className="d-flex align-items-center">
                    <div
                      className="spinner-grow"
                      style={{ width: "3rem", height: "3rem" }}
                      role="status"
                    ></div>
                    &ensp;&ensp;
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {!loading && (
                  <div className="menu-icon load-more" onClick={loadMorePosts}>
                    Load more..
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12 mt-2">
          <div className="user-list ">
            <ul>
              {allUser.map((g) => (
                <li key={g.id}>
                  <span>
                    <img
                      src={
                        g.logo
                          ? `${process.env.REACT_APP_BACKEND_URI_UPLOAD}/${g.logo}`
                          : defaultImg
                      }
                      alt={g.username}
                    />
                    <span>{g.username}</span>
                  </span>
                  {g.is_following ? (
                    <button onClick={() => handleUnfollow(g.id)}>
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={() => handleFollow(g.id)}>Follow</button>
                  )}
                </li>
              ))}
            </ul>

            {allUserLength === allUser.length ? (
              <></>
            ) : (
              <>
                {loading1 && (
                  <div className="d-flex align-items-center">
                    <div
                      className="spinner-grow"
                      style={{ width: "3rem", height: "3rem" }}
                      role="status"
                    ></div>
                    &ensp;&ensp;
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {!loading1 && (
                  <div
                    className="menu-icon text-center load-more"
                    onClick={loadMoreUsers}
                  >
                    Load more..
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFeed;
