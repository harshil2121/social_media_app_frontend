import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import formikEnhancer from "./enhancer/PostCreate";
import NavigationAction from "../../redux/navigation/actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPost } from "../../apiServices/postApiServices";
import { useNavigate } from "react-router-dom";

const { success, error, fetching } = NavigationAction;

const NewPostPage = (props) => {
  const {
    token,
    success,
    errors,
    values,
    setFieldValue,
    touched,
    submitCount,
  } = props;

  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFieldValue("files", [...values.files, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", values.description);
      values.files.forEach((file) => {
        formData.append("postimg", file);
      });

      await createPost(token, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.success) {
            success(res.message);
            navigate("/home");
          } else {
            error(res.message);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
  ];

  const Error = ({ field }) => {
    if ((errors[field] && touched[field]) || submitCount > 0) {
      return <span className="error-msg">{errors[field]}</span>;
    } else {
      return <span />;
    }
  };

  return (
    <div className="col-12 d-flex flex-row justify-content-center align-items-start">
      <div className="card p-4 create-post-container">
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Content:</label>
            <ReactQuill
              theme="snow"
              name="description"
              id="description"
              modules={modules}
              formats={formats}
              value={values.description}
              onChange={(dec) => setFieldValue("description", dec)}
            />
            <Error field="description" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="formFileMultiple">
              Upload Files:
            </label>
            <input
              type="file"
              id="formFileMultiple"
              name="files"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>
          <div className="d-flex align-items-center">
            <button
              type="submit"
              // disabled={
              //   values?.description == "<p><br></p>" ||
              //   // values?.description?.length === 0 ||
              //   values?.files?.length === 0
              // }
              className="save-butn"
            >
              Create Post
            </button>
            &ensp;
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="back-butn"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.accessToken,
  };
};

export default compose(
  formikEnhancer,
  connect(mapStateToProps, { success, error, fetching })
)(NewPostPage);
