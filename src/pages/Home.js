import { useEffect } from "react";

import { Post, Loader, FriendsList, CreatePost } from "../components/index";
import styles from "../styles/home.module.css";
import { useAuth, usePosts } from "../hooks";

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  useEffect(() => {
    posts.fetchPosts();
  }, []);

  //since the fetch call in useEffect (inside useProvidePosts hook) wud be running asynchronously in the background after first render,
  //we will show loader, and after fetch call completed, setLoading will set loading to false
  //and then after setLoading, Home page will be re-rendered
  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => {
          return (
            // 'key' prop is added below in <Post /> to solve the warning we were getting that every item in list should contain a key prop
            <Post post={post} key={`post-${post._id}`} />
          );
        })}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

export default Home;
