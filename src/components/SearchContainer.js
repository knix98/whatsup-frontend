import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/navbar.module.css";
import { searchUsers } from "../api";
import { API_ROOT } from "../utils";

const SearchContainer = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  return (
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
            {results.map((user, id) => {
              return (
                <Link
                  to={`/user/${user._id}`}
                  onClick={() => {
                    setResults([]);
                    setSearchText("");
                  }}
                  key={id}
                >
                  <li
                    className={styles.searchResultsRow}
                    key={`user-${user._id}`}
                  >
                    <img
                      src={
                        user.image
                          ? `${API_ROOT}${user.image}`
                          : "https://cdn-icons-png.flaticon.com/128/3893/3893170.png"
                      }
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
  );
};

export default SearchContainer;
