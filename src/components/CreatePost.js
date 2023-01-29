import { useState } from "react";
import { toast } from "react-hot-toast";

import styles from "../styles/home.module.css";
import { addPost } from "../api";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);

  const handleAddPostClick = async () => {
    if (post === "") {
      toast.error("Cannot post an empty post...");
      return;
    }

    setAddingPost(true);
    const response = await addPost(post);

    if (response.success) {
      setPost("");
      toast.success("Post created successfully");
    } else {
      toast.error(response.message);
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

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
