import React from "react";
import { Navbar, Search, User, Info, Repos } from "../components";

const Dashboard = () => {
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
