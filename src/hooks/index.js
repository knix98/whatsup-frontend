import { useContext, useState, useEffect } from "react";
import jwt from "jwt-decode";

import { AuthContext, PostsContext } from "../providers";
import {
  editProfile,
  login as userLogin,
  register,
  getPosts,
} from "../api/index";
import {
  setItemInSessionStorage,
  SESSIONSTORAGE_TOKEN_KEY,
  removeItemFromSessionStorage,
  getItemFromSessionStorage,
} from "../utils";

//custom hook for useContext
export const useAuth = () => {
  //the initial value for useContext wud be AuthContext that was made inside '../providers/AuthProvider'
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); //this 'loading' state is for the first time only whenever AuthProvider component mounts
  //and wud always remain false after the useEffect does its job after the first monuting(see below, useEffect sets loading to false)

  //this useEffect will ensure that whenever user refreshes the page, and
  //hence the whole app renders again, then the user which was already logged in,
  //doesn't get lost
  useEffect(() => {
    const userToken = getItemFromSessionStorage(SESSIONSTORAGE_TOKEN_KEY);

    if (userToken) {
      const user = jwt(userToken);
      setUser(user);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);

      //save the JWT recieved in local storage
      setItemInSessionStorage(
        SESSIONSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    if (response.success) {
      //set the state of user as the new user recieved in response
      setUser(response.data.user);

      //now change the jwt stored in local storage with the new jwt recieved(new jwt acc. to new user) in response
      setItemInSessionStorage(
        SESSIONSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  //function to add/remove a friend from user.friends array, depending upon
  //whether 'addFriend' passed as argument is true/false
  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        //a 'friend' inside 'friends' array contains from_user: auth.user, to_user: 1 of the friends of auth.user
        friends: [...user.friends, friend],
      });
      return;
    }

    //create a new friends array, excluding the friend to be removed
    const newFriends = user.friends.filter((f) => f._id !== friend._id);

    setUser({
      ...user,
      friends: newFriends,
    });
    return;
  };

  const logout = () => {
    //remove JWT from local storage when user logs out
    removeItemFromSessionStorage(SESSIONSTORAGE_TOKEN_KEY);

    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    updateUser,
    updateUserFriends,
    signup,
  };
};

export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts(10);

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  const addPostToState = (post) => {
    //add the newly created post to the top of the posts list
    const newPosts = [post, ...posts];

    setPosts(newPosts);
  };

  const addComment = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });

    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
  };
};
