import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

import styles from "../styles/navbar.module.css";
import { useAuth } from "../hooks";
import { searchUsers } from "../api";

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const auth = useAuth();

  //this API call would be executed each time a user types in the search bar
  //because searchText is passed in the dependency array
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);

      if (response.success) {
        setResults(response.data.users);
      }
    };

    //only make calls when length > 2
    if (searchText.length > 2) {
      fetchUsers();
    } else if (searchText.length === 0) {
      setResults([]);
    }
  }, [searchText]);

  const logOut = () => {
    auth.logout();
    return toast.success("Logged out successfully!");
  };

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      {auth.user && (
        <div className={styles.searchContainer}>
          <img
            className={styles.searchIcon}
            src="https://cdn-icons-png.flaticon.com/128/149/149852.png"
            alt="Search Icon"
          />

          <input
            placeholder="Search Users"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {results.length > 0 && (
            <div className={styles.searchResults}>
              <ul>
                {results.map((user) => {
                  return (
                    <Link
                      to={`/user/${user._id}`}
                      onClick={() => {
                        setResults([]);
                        setSearchText("");
                      }}
                    >
                      <li
                        className={styles.searchResultsRow}
                        key={`user-${user._id}`}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/3893/3893170.png"
                          alt=""
                        />
                        <span>{user.name}</span>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className={styles.rightNav}>
        {/* if auth.user is not null, means user is logged in, then only show the name of user */}
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3893/3893170.png"
                alt=""
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
