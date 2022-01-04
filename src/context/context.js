import React, { createContext, useContext } from "react";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  return (
    <GithubContext.Provider value="hello">{children}</GithubContext.Provider>
  );
};

const useGlobalGithubContext = () => {
  return useContext(GithubContext);
};

export { GithubContext, GithubProvider, useGlobalGithubContext };
