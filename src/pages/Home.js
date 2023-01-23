import styles from "../styles/home.module.css";
import { Comment } from "../components";

const Home = ({ posts }) => {
  //destructured the props initially only
  return (
    <div className={styles.postsList}>
      {posts.map((post) => {
        return (
          // 'key' prop is added below in div to solve the warning we were getting that every item in list should contain a key prop
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3893/3893170.png"
                  alt="user-pic"
                />
                <div>
                  {/* for seeing the post object, look at the json response coming after getPosts() in the network tab of developer tools */}
                  <span className={styles.postAuthor}>{post.user.name}</span>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}>{post.content}</div>
              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/889/889140.png"
                    alt="likes-icon"
                  />
                  <span>5</span>
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
                <input placeholder="Start typing a comment" />
              </div>
              <div className={styles.postCommentsList}>
                {post.comments.map((comment) => {
                  return (
                    <Comment comment={comment} key={`comment-${comment._id}`} />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
