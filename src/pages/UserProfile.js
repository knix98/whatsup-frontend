import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { Loader } from "../components";
import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { fetchUserProfile } from "../api";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams(); //getting the userId from the params of url of this page(/user/:userId)
  const navigate = useNavigate();
  const auth = useAuth();

  //this useEffect hook will be executed whenever the userId changes
  //navigate is also passed in dependency array just to remove the warning
  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.message);
        return navigate("/");
      }

      setLoading(false);
    };

    getUser();
  }, [userId, navigate]);

  //function to check whether the user whose profile page we have visited, is a friend of logged in user or not
  const checkIfUserIsAFriend = () => {
    //friends is array of friends of auth.user
    const friends = auth.user.friends;

    //means there are no friends of auth.user, so return false
    if (friends.length == 0) return false;

    //getting all the friend's(friends of auth.user) ids
    const friendIds = friends.map((friend) => friend._id);
    //checking whether the userId(id of user whose profile page we are on) is a friend of logged in user or not
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/3893/3893170.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`}>Remove friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}>Add friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
