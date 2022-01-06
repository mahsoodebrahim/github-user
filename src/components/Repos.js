import React from "react";
import { useGlobalGithubContext } from "../context/context";
import { Bar3D, Column3D, Doughnut2D, ExampleChart, Pie3D } from "./Charts";

const Repos = () => {
  const { repos } = useGlobalGithubContext();
  console.log(repos);

  return (
    <div>
      <h2>repos</h2>
      <ExampleChart />
    </div>
  );
};

export default Repos;
