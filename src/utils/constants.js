const API_ROOT = "";

// all the values below are in a functional form, so that some values(required by the url) could be passed as arguments
export const API_URLS = {
  posts: (limit) => `${API_ROOT}/posts/getposts?limit=${limit}`,
  createPost: () => `${API_ROOT}/posts/create`,
  deletePost: (postId) => `${API_ROOT}/posts/delete?post_id=${postId}`,
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  editUser: () => `${API_ROOT}/users/edit`,
  uploadPic: () => `${API_ROOT}/users/upload_pic`,
  userInfo: (userId) => `${API_ROOT}/users/${userId}`,
  searchUsers: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
  createFriendship: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
  createComment: () => `${API_ROOT}/comments/create`,
  deleteComment: (commentId) =>
    `${API_ROOT}/comments/delete?comment_id=${commentId}`,
  toggleLike: (itemId, itemType) =>
    `${API_ROOT}/likes/toggle?likeable_id=${itemId}&likeable_type=${itemType}`, // itemType is 'Post'/'Comment'
};

//this key will be used to store the token in local-storage, when a user logs in
export const SESSIONSTORAGE_TOKEN_KEY = "__whatsup_token__";
