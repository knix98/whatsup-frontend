import { useState } from "react";
import { toast } from "react-hot-toast";

import styles from "../styles/home.module.css";
import { addPost } from "../api";
import { usePosts } from "../hooks";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPostClick = async () => {
    if (post === "") {
      toast.error("Cannot post an empty post...");
      return;
    }

    setAddingPost(true);
    const response = await addPost(post);

    if (response.success) {
      setPost("");
      //call addPostToState function to add the newly created post in the global posts state(postsContext)
      posts.addPostToState(response.data.post);
      toast.success("Post created successfully");
    } else {
      toast.error(response.message);
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea value={post} onChange={(e) => setPost(e.target.value)} />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? "Adding post..." : "Add post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
