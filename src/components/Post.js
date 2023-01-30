import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Comment } from "./index";
import styles from "../styles/home.module.css";
import { usePosts } from "../hooks";
import { createComment, toggleLike } from "../api";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [creatingComment, setCreatingComment] = useState(false);
  const [postLikes, setPostLikes] = useState(post.likes.length);
  const posts = usePosts();

  const handleAddComment = async (e) => {
    //its IMP to check whether creatingComment is false or not, so that if user repeatedly presses enter, we do not call addComment api again and again
    //addComment api should be called only once after pressing enter by user
    if (e.key === "Enter" && creatingComment === false) {
      setCreatingComment(true);

      if (comment !== "") {
        const response = await createComment(comment, post._id);

        if (response.success) {
          setComment("");
          posts.addComment(response.data.comment, post._id);
          toast.success("Comment created successfully!");
        } else {
          toast.error(response.message);
        }
      }

      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, "Post");

    if (response.success) {
      if (response.data.deleted) {
        //means like was removed
        setPostLikes((likes) => likes - 1);
      } else {
        //means like was added
        setPostLikes((likes) => likes + 1);
      }
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className={styles.postWrapper}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/3893/3893170.png"
            alt="user-pic"
          />
          <div>
            {/* for seeing the post object, look at the json response coming after getPosts() in the network tab of developer tools */}
            <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>
              {post.user.name}
            </Link>

            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/889/889140.png"
                alt="likes-icon"
              />
            </button>
            <span>{postLikes}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/3114/3114810.png"
              alt="comments-icon"
            />
            <span>2</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => {
            return <Comment comment={comment} key={`comment-${comment._id}`} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
