import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import { useAuth } from "../hooks";
import { Home, Login, Signup, Settings, UserProfile } from "../pages/index";
import { Loader, Navbar } from "./index";

// made a custom PrivateRoute component that will render the appropriate page acc. to whether user is logged in or not
const PrivateRoute = () => {
  const auth = useAuth(); // determine if authorized, from context

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth.user ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

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
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          <Route path="/settings" element={<PrivateRoute />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/user/:userId" element={<PrivateRoute />}>
            <Route path="/user/:userId" element={<UserProfile />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
