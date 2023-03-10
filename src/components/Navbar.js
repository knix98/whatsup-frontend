import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import styles from "../styles/navbar.module.css";
import { useAuth } from "../hooks";
import SearchContainer from "./SearchContainer";
import { API_ROOT } from "../utils";

const Navbar = () => {
  const auth = useAuth();

  const logOut = () => {
    auth.logout();
    return toast.success("Logged out successfully!");
  };

  return (
    <div className={styles.nav}>
      <Link to="/">
        <div className={styles.logo}>WhatsUp</div>
        <img
          className={styles.logoIcons}
          src="https://cdn-icons-png.flaticon.com/128/99/99699.png"
        />
      </Link>

      {auth.user && <SearchContainer />}

      <div className={styles.rightNav}>
        {/* if auth.user is not null, means user is logged in, then only show the name of user */}
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src={
                  auth.user.image
                    ? `${API_ROOT}${auth.user.image}`
                    : "https://cdn-icons-png.flaticon.com/128/3893/3893170.png"
                }
                alt="User image"
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={logOut}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
