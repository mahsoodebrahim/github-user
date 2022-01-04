import React from "react";
import { Navbar, Search, User, Info, Repos } from "../components";
import { useGlobalGithubContext } from "../context/context";

const Dashboard = () => {
  const value = useGlobalGithubContext();
  console.log(value);
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
