import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from "../utils/index";

const customFetch = async (url, { body, ...customConfig }) => {
  //LOCALSTORAGE_TOKEN_KEY is the key to getting the log-in token from local storage
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    //because our api server accepts only form-urlencoded content
    "content-type": "application/x-www-form-urlencoded",
  };

  if (token) {
    //if token exists in localStorage, then add it to the headers
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

// export const getPosts = (limit) => {
//   return customFetch(API_URLS.posts(limit), {
//     method: "GET",
//   });
// };
export const getPosts = (page = 1, limit = 5) => {
  return customFetch(
    "https://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5",
    {
      method: "GET",
    }
  );
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
