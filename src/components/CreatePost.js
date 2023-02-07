import { useState } from "react";
import { toast } from "react-hot-toast";

import styles from "../styles/home.module.css";
import { usePosts } from "../hooks";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);
  const [uploadImg, setUploadImg] = useState(false);
  const [file, setFile] = useState(null);
  const posts = usePosts();

  const handleAddPost = async (e) => {
    e.preventDefault();

    if (post === "") {
      toast.error("Cannot post an empty post...");
      setFile(null);
      setUploadImg(false);
      return;
    }

    setAddingPost(true);
    const formData = new FormData();
    formData.append("content", post);

    if (file) {
      formData.append("post_img", file);
    }

    const response = await posts.addPostToState(formData);

    if (response.success) {
      toast.success("Post created successfully");
    } else {
      toast.error(response.message);
    }

    setPost("");
    setFile(null);
    setUploadImg(false);
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <form onSubmit={handleAddPost}>
        <textarea
          name="content"
          value={post}
          placeholder="Write a post and upload an image for the post if you want..."
          onChange={(e) => setPost(e.target.value)}
        />

        <div>
          {uploadImg ? (
            <input
              type="file"
              name="post_img"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          ) : (
            <button
              className={styles.addPostBtn}
              onClick={() => setUploadImg(true)}
            >
              Add Image
            </button>
          )}

          <button
            type="submit"
            className={styles.addPostBtn}
            disabled={addingPost}
          >
            {addingPost ? "Adding post..." : "Add post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
