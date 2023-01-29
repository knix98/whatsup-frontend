import { createContext } from "react";

import { useProvidePosts } from "../hooks";

export const PostsContext = createContext();

//{children} is basically all the child nodes inside <PostsProvider></PostsProvider>
export const PostsProvider = ({ children }) => {
  const posts = useProvidePosts();

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};
