import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import mockUser from "./mockData.js/mockUser";
import mockFollowers from "./mockData.js/mockFollowers";
import mockRepos from "./mockData.js/mockRepos";

const GithubContext = createContext();

const BASE_URL = "https://api.github.com";

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
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
            const [repos, followers] = results;

            const fulfilledStatus = '"fulfilled"';
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

  const getData = async (query) => {
    const urls = [
      `https://api.github.com/users/${query}`,
      `https://api.github.com/users/${query}/repos?per_page=100`,
      `https://api.github.com/users/${query}/followers`,
    ];
    try {
      const responses = await Promise.all(
        urls.map((url) => fetch(url, { mode: "cors" }))
      );
      const githubData = await Promise.all(
        responses.map((response) => response.json())
      );

      setGithubUser(githubData[0]);
      setRepos(githubData[1]);
      setFollowers(githubData[2]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        getData,
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
