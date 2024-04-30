import { api, handleResponse, handleError } from "./apiServics";

export const createPost = (token, data) =>
  api(token)
    .post("/api/post/create", data)
    .then(handleResponse)
    .catch(handleError);

export const editPost = (token, id, data) =>
  api(token)
    .put(`/api/post/edit/${id}`, data)
    .then(handleResponse)
    .catch(handleError);

export const getByPostId = (token, id) =>
  api(token)
    .get(`/api/post/getbypsotId/${id}`)
    .then(handleResponse)
    .catch(handleError);

export const getAllPost = (token, data) =>
  api(token)
    .post("/api/post/getall", data)
    .then(handleResponse)
    .catch(handleError);

export const deletePost = (token, id) =>
  api(token)
    .delete(`/api/post/delete/${id}`)
    .then(handleResponse)
    .catch(handleError);

export const likePost = (token, id) =>
  api(token)
    .get(`/api/post/likes/${id}`)
    .then(handleResponse)
    .catch(handleError);
