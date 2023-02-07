import { useEffect, useState } from "react";

import { Post, Loader, FriendsList, CreatePost } from "../components/index";
import styles from "../styles/home.module.css";
import { useAuth, usePosts } from "../hooks";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const posts = usePosts();

  useEffect(() => {
    const getPosts = async function () {
      await posts.fetchPosts();
      setLoading(false);
    };

    getPosts();
  }, []);

  //since the fetch call in useEffect (inside useProvidePosts hook) wud be running asynchronously in the background after first render,
  //we will show loader, and after fetch call completed, setLoading will set loading to false
  //and then after setLoading, Home page will be re-rendered
  if (loading) {
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

      {auth.user && (
        <div className={styles.friendsList}>
          <div className={styles.header}>Friends</div>

          {auth.user.friends.length === 0 ? (
            <div className={styles.noFriends}>No friends yet...</div>
          ) : (
            auth.user.friends.map((friend) => (
              <FriendsList friend={friend} key={`friend-${friend._id}`} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
