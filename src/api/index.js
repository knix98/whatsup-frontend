import axios from "axios";

import {
  API_URLS,
  getFormBody,
  SESSIONSTORAGE_TOKEN_KEY,
} from "../utils/index";

const customFetch = async (url, { body, ...customConfig }) => {
  //SESSIONSTORAGE_TOKEN_KEY is the key to getting the log-in token from session storage
  const token = window.sessionStorage.getItem(SESSIONSTORAGE_TOKEN_KEY);

  const headers = {
    //because our api server accepts only form-urlencoded content
    "content-type": "application/x-www-form-urlencoded",
  };

  if (token) {
    //if token exists in sessionStorage, then add it to the headers
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers, //if 'headers' object was also present inside customConfig, then key-values of ...customConfig.headers will be stored here(not outside)
    },
  };

  if (body) {
    //if body is present, then add it to the config as well
    //body is form body. We have to convert form body to urlencoded string
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config); //the response recieved wud be a json string
    const data = await response.json(); //converting into js object

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message); //if data.success was false
  } catch (error) {
    console.error("error");
    return {
      message: error.message,
      success: false,
    };
  }
};

//axiosFetch wud be used for posting multipart form only (for user image and post image)
//because axios wud automatically calculate and add the boundary header required for sending a multipart formData
const axiosFetch = async (url, formData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const token = window.sessionStorage.getItem(SESSIONSTORAGE_TOKEN_KEY);
  if (token) {
    //if token exists in sessionStorage, then add it to the headers
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios.post(url, formData, config);
    const data = response.data; //axios response is already in json

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message); //if data.success was false
  } catch (error) {
    console.error("error");
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = () => {
  return customFetch(API_URLS.posts(), {
    method: "GET",
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};

export const register = (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: "POST",
    body: { name, email, password, confirm_password: confirmPassword },
  });
};

export const editProfile = (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: "PUT",
    body: { id: userId, name, password, confirm_password: confirmPassword },
  });
};

export const uploadPic = (formData) => {
  return axiosFetch(API_URLS.uploadPic(), formData);
};

export const fetchUserProfile = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: "GET",
  });
};

export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: "POST",
  });
};

export const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: "POST",
  });
};

export const addPost = (formData) => {
  return axiosFetch(API_URLS.createPost(), formData);
};

export const deletePost = (postId) => {
  return customFetch(API_URLS.deletePost(postId), {
    method: "DELETE",
  });
};

export const createComment = (content, postId) => {
  return customFetch(API_URLS.createComment(), {
    method: "POST",
    body: {
      post_id: postId,
      content,
    },
  });
};

export const deleteComment = (commentId) => {
  return customFetch(API_URLS.deleteComment(commentId), {
    method: "DELETE",
  });
};

export const toggleLike = (itemId, itemType) => {
  return customFetch(API_URLS.toggleLike(itemId, itemType), {
    method: "POST",
  });
};

export const searchUsers = (searchText) => {
  return customFetch(API_URLS.searchUsers(searchText), {
    method: "GET",
  });
};
