import { api, handleResponse, handleError } from "./apiServics";

export const userFollowApi = (token, id) =>
  api(token)
    .get(`/api/follow/user-follow/${id}`)
    .then(handleResponse)
    .catch(handleError);

export const userUnFollowApi = (token, id) =>
  api(token)
    .get(`/api/follow/user-unfollow/${id}`)
    .then(handleResponse)
    .catch(handleError);
