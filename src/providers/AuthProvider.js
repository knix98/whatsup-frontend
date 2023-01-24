import { createContext } from "react";

import { useProvideAuth } from "../hooks";

export const AuthContext = createContext();

//{children} is basically all the child nodes inside <AuthProvider></AuthProvider>
export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  //So now, all the child nodes inside <AuthProvider></AuthProvider> will be wrapped inside the below tags instead
  //and hence now AuthContext will be available to basically any component in our app
  //AuthContext can be accessed anywhere using the useAuth custom hook made inside '../hooks'
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
