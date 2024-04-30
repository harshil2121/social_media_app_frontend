import { api, handleResponse, handleError } from "./apiServics";

export const getAllUserList = (token, data) =>
  api(token)
    .post(`/api/users/getAlluser`, data)
    .then(handleResponse)
    .catch(handleError);

export const editUser = (token, id, data) =>
  api(token)
    .put(`/api/users/edit/${id}`, data)
    .then(handleResponse)
    .catch(handleError);

export const getByDataUserID = (token, id) =>
  api(token)
    .get(`/api/users/get/${id}`)
    .then(handleResponse)
    .catch(handleError);

export const changePasswordApi = (token, data) =>
  api(token)
    .post(`/api/users/change-password`, data)
    .then(handleResponse)
    .catch(handleError);
