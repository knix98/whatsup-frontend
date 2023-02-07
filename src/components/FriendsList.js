import { Link } from "react-router-dom";

import styles from "../styles/home.module.css";

const FriendsList = ({ friend }) => {
  return (
    <div>
      <Link
        className={styles.friendsItem}
        //an already added friend wud have it's id in ._id, but a newly added friend without page refresh, wud have its id in .to_user._id
        //so we use either of them below whichever suits. After page refresh however, every friend wud have it's id in ._id
        //   to={`/user/${friend._id || friend.to_user._id}`}
        to={`/user/${friend._id}`}
      >
        <div className={styles.friendsImg}>
          <img
            src={
              friend.image
                ? friend.image
                : "https://cdn-icons-png.flaticon.com/128/3893/3893170.png"
            }
            alt="Friend pic"
          />
        </div>
        <div className={styles.friendsName}>{friend.email}</div>
      </Link>
    </div>
  );
};

export default FriendsList;
