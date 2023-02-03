import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import styles from "../styles/login.module.css";
import { useAuth } from "../hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false); //wud be set to true while request is sent for logging in
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please enter both email and password!");
    }

    setLoggingIn(true);
    const response = await auth.login(email, password);
    setLoggingIn(false);
    setPassword(""); //erase the password from the <input> when the logging in api call completed

    if (response.success) {
      navigate("/"); //this code will make the '/' page mount and 'login' page unmount
      return toast.success("Logged in successfully!");
    } else {
      return toast.error(response.message);
    }
  };

  if (auth.user) {
    //if the user is already logged in redirect the page to home page
    toast.error("You are already logged in");
    return <Navigate to="/" replace={true} />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          autoComplete="on"
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>

      <div className={styles.field}>
        {/* disable the button while request is executing for logging in the user */}
        <button disabled={loggingIn}>
          {loggingIn ? "Logging in..." : "Log In"}
        </button>
      </div>

      <Link to="/register" className={styles.registerLink}>
        New user? Register now!
      </Link>
    </form>
  );
};

export default Login;
