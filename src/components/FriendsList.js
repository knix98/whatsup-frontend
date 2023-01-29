import { Link } from "react-router-dom";

import styles from "../styles/home.module.css";
import { useAuth } from "../hooks";

const FriendsList = () => {
  const auth = useAuth();
  const { friends = [] } = auth.user;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friends && friends.length === 0 && (
        <div className={styles.noFriends}>NO friends found!</div>
      )}

      {friends &&
        friends.map((friend) => (
          <div key={`friend-${friend._id}`}>
            <Link
              className={styles.friendsItem}
              //an already added friend wud have it's id in ._id, but a newly added friend without page refresh, wud have its id in .to_user._id
              //so we use either of them below whichever suits. After page refresh however, every friend wud have it's id in ._id
              //   to={`/user/${friend._id || friend.to_user._id}`}
              to={`/user/${friend._id}`}
            >
              <div className={styles.friendsImg}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3893/3893170.png"
                  alt=""
                />
              </div>
              <div className={styles.friendsName}>{friend.email}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendsList;
