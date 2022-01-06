import React from "react";
import styled from "styled-components";
import { useGlobalGithubContext } from "../context/context";
import { Bar3D, Column3D, Doughnut2D, ExampleChart, Pie3D } from "./Charts";

const Repos = () => {
  const { repos } = useGlobalGithubContext();
  console.log(repos);

  const chartData = [
    {
      label: "HTML",
      value: "13",
    },
    {
      label: "CSS",
      value: "23",
    },
    {
      label: "JavaScript",
      value: "80",
    },
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        <div>
          <ExampleChart data={chartData} />
        </div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div``;

export default Repos;
