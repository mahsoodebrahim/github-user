import React from "react";
import { useGlobalGithubContext } from "../context/context";
import { Navbar, Search, User, Info, Repos } from "../components";
import loadingImage from "../images/preloader.gif";

const Dashboard = () => {
  const { isLoading } = useGlobalGithubContext();
  return (
    <main>
      <Navbar />
      <Search />
      {isLoading ? (
        <img src={loadingImage} className="loading-img" alt="loading gif" />
      ) : (
        <>
          <Info />
          <User />
          <Repos />
        </>
      )}
    </main>
  );
};

export default Dashboard;
