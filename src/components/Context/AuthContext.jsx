import React from "react";
export const AuthContext = React.createContext({
  auth: {
    isAuthenticated: false,
    user: {
      email: "",
      name: "",
    },
  },
  setAuth: () => {},
});

export const AuthWrapper = (props) => {
  const [auth, setAuth] = React.useState({
    isAuthenticated: false,
    user: {
      email: "",
      name: "",
    },
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
