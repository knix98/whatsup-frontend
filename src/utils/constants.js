const API_ROOT = "";

// all the values below are in a functional form, so that some values(required by the url) could be passed as arguments
export const API_URLS = {
  posts: (limit) => `${API_ROOT}/posts?limit=${limit}`,
  // posts: (limit) => `${API_ROOT}/posts/getposts?limit=${limit}`,
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  editUser: () => `${API_ROOT}/users/edit`,
  userInfo: (userId) => `${API_ROOT}/users/${userId}`,
  createFriendship: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
};

//this key will be used to store the token in local-storage, when a user logs in
export const LOCALSTORAGE_TOKEN_KEY = "__whatsup_token__";
