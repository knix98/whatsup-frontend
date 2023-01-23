import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { getPosts } from "../api/index";
import { Home, Login } from "../pages/index";
import Loader from "./Loader";
import Navbar from "./Navbar";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //making a function and then calling it, because the callback function passed to useEffect has to be synchronous(so can't be async one)
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log("response", response);
      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false); //even if response.success is false, we stop loading when fetch call completed
    };

    fetchPosts();
  }, []);

  //since the fetch call in useEffect wud be running asynchronously in the background after first render,
  //we will show loader, and after fetch call completed, setLoading will set loading to false
  //and then after setLoading, App component will be re-rendered and this time the App component will be rendered
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        {/* Navbar component is not inside Routes, so Navbar won't be remounted again when a link tag is clicked */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
