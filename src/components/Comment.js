import { useState } from "react";
import { toast } from "react-hot-toast";
import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { toggleLike, deleteComment } from "../api";
import { usePosts, useAuth } from "../hooks";

import styles from "../styles/home.module.css";

const Comment = ({ comment }) => {
  const [commentLikes, setCommentLikes] = useState(comment.likes.length);
  const [deletingComment, setDeletingComment] = useState(false);
  const posts = usePosts();
  const auth = useAuth();

  const formatter = buildFormatter(englishStrings);

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

  const handleDeleteComment = async () => {
    setDeletingComment(true);

    const response = await deleteComment(comment._id);

    if (response.success) {
      posts.deleteComment(comment.post, comment._id);
      toast.success("Comment deleted successfully!");
    } else {
      toast.error(response.message);
    }

    setDeletingComment(false);
  };

  return (
    <div className={styles.postCommentItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>
          <TimeAgo date={comment.createdAt} formatter={formatter} />
        </span>
      </div>

      <div className={styles.postCommentContent}>
        {comment.content}
        <br />
        <button onClick={handleCommentLikeClick}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/889/889140.png"
            alt="likes-icon"
          />
        </button>
        <span className={styles.postCommentLikes}>{commentLikes}</span>
      </div>
      {comment.user._id === auth.user._id && (
        <button onClick={handleDeleteComment} disabled={deletingComment}>
          {deletingComment ? "Deleting..." : "Delete Comment"}
        </button>
      )}
    </div>
  );
};

export default Comment;
