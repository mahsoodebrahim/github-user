import React, { useState, createContext, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockFollowers from "./mockData.js/mockFollowers";
import mockRepos from "./mockData.js/mockRepos";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers }}>
      {children}
    </GithubContext.Provider>
  );
};

const useGlobalGithubContext = () => {
  return useContext(GithubContext);
};

export { GithubContext, GithubProvider, useGlobalGithubContext };
