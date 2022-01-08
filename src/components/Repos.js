import React from "react";
import styled from "styled-components";
import { useGlobalGithubContext } from "../context/context";
import { Bar3D, Column3D, Doughnut2D, ExampleChart, Pie3D } from "./Charts";

const Repos = () => {
  const { repos } = useGlobalGithubContext();

  let languages = repos.reduce((languagesCount, repo) => {
    let { language } = repo;
    if (!language) return languagesCount;

    if (language in languagesCount) {
      languagesCount[language] = {
        ...languagesCount[language],
        value: languagesCount[language].value + 1,
      };
    } else {
      languagesCount[language] = {
        label: language,
        value: 1,
      };
    }

    return languagesCount;
  }, {});

  languages = Object.values(languages);
  languages = languages.sort((a, b) => b.value - a.value).slice(0, 5);

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
        {/* <div>
          <ExampleChart data={chartData} />
        </div> */}
        <Pie3D data={languages} />
        <div></div>
        <Pie3D data={languages} />
        <div></div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem 3rem;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }

  .fusioncharts-container {
    width: 100% !important;
  }

  svg {
    width: 100% !important;
  }
`;

export default Repos;
