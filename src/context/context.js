import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import mockUser from "./mockData.js/mockUser";
import mockFollowers from "./mockData.js/mockFollowers";
import mockRepos from "./mockData.js/mockRepos";

const GithubContext = createContext();

const BASE_URL = "https://api.github.com";

const localStorage_User = localStorage.getItem("user");
const localStorage_Repos = localStorage.getItem("repos");
const localStorage_Followers = localStorage.getItem("followers");

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(localStorage_User || mockUser);
  const [repos, setRepos] = useState(localStorage_Repos || mockRepos);
  const [followers, setFollowers] = useState(
    localStorage_Followers || mockFollowers
  );
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  useEffect(() => {
    checkRequests();
  }, []);

  const checkRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/rate_limit`);
      const {
        data: {
          rate: { remaining },
        },
      } = response;

      setRequests(remaining);

      if (remaining === 0) {
        toggleError(true, "sorry, you have exceeded your hourly rate limit!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/users/${user}`);
      if (response) {
        setGithubUser(response.data);

        const { followers_url, repos_url } = response.data;

        await Promise.allSettled([
          axios.get(followers_url),
          axios.get(`${repos_url}?per_page=100`),
        ])
          .then((results) => {
            const [followers, repos] = results;

            const fulfilledStatus = "fulfilled";
            if (repos.status === fulfilledStatus) {
              setRepos(repos.value.data);
            }
            if (followers.status === fulfilledStatus) {
              setFollowers(followers.value.data);
            }
          })
          .catch((e) => console.log(e));
      } else {
        toggleError(true, "no such github user exits");
      }
    } catch (error) {
      console.log(error);
      toggleError(true, "no such github user exits");
    }

    checkRequests();
    setIsLoading(false);
  };

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        isLoading,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

const useGlobalGithubContext = () => {
  return useContext(GithubContext);
};

export { GithubContext, GithubProvider, useGlobalGithubContext };
