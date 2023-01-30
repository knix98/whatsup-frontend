import { useState } from "react";
import { toast } from "react-hot-toast";

import { toggleLike } from "../api";

import styles from "../styles/home.module.css";

const Comment = ({ comment }) => {
  const [commentLikes, setCommentLikes] = useState(comment.likes.length);

  const handleCommentLikeClick = async () => {
    const response = await toggleLike(comment._id, "Comment");

    if (response.success) {
      if (response.data.deleted) {
        //means like was removed
        setCommentLikes((likes) => likes - 1);
      } else {
        //means like was added
        setCommentLikes((likes) => likes + 1);
      }
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
      </div>

      <div className={styles.postCommentContent}>
        {comment.content}
        <button style={{ marginLeft: "5%" }} onClick={handleCommentLikeClick}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/889/889140.png"
            alt="likes-icon"
            height="10"
          />
        </button>
        <span className={styles.postCommentLikes}>{commentLikes}</span>
      </div>
    </div>
  );
};

export default Comment;
