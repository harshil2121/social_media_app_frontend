import { api, handleResponse, handleError } from "./apiServics";

export const loginApi = (data) =>
  api().post("/api/users/login", data).then(handleResponse).catch(handleError);

export const logoutApi = (token) =>
  api(token).get("/api/users/logout").then(handleResponse).catch(handleError);

export const register = (data) =>
  api()
    .post("/api/users/register", data)
    .then(handleResponse)
    .catch(handleError);

export const checkApi = (token) =>
  api(token).get("/api/users/check").then(handleResponse).catch(handleError);

export const forgotPassword = (data) =>
  api()
    .post("/api/users/forgot-password", data)
    .then(handleResponse)
    .catch(handleError);

export const resetPassword = (data, token) =>
  api()
    .put(`/api/users/reset-password/${token}`, data)
    .then(handleResponse)
    .catch(handleError);
