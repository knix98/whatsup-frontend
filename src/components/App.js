import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useAuth } from "../hooks";
import { Home, Login, Signup, Settings } from "../pages/index";
import { Loader, Navbar } from "./index";

//this component will be rendered when the user visits an unknown path
const Page404 = () => {
  return <h1>404...PAGE NOT FOUND!</h1>;
};

function App() {
  const auth = useAuth();

  //auth.loading will be governed by the useEffect hook inside 'useProvideAuth' hook in '../hooks'
  //when the state of 'loading' inside 'useProvideAuth' hook changes, since the <App /> in inside <AuthProvider> component,
  //the whole App will be re rendered and hence the correct component (<app> or <Loader/>) will be rendered acc. to the value of auth.loading
  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        {/* Navbar component is not inside Routes, so Navbar won't be remounted again when a link tag is clicked */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
