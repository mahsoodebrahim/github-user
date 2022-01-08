import React from "react";
import styled from "styled-components";
import { useGlobalGithubContext } from "../context/context";
import { Bar3D, Column3D, Doughnut2D, ExampleChart, Pie3D } from "./Charts";

const Repos = () => {
  const { repos } = useGlobalGithubContext();

  const languageProperties = repos.reduce((languagePropertiesCount, repo) => {
    let { language, stargazers_count } = repo;
    if (!language) return languagePropertiesCount;

    if (language in languagePropertiesCount) {
      languagePropertiesCount[language] = {
        ...languagePropertiesCount[language],
        value: languagePropertiesCount[language].value + 1,
        stars: languagePropertiesCount[language].stars + stargazers_count,
      };
    } else {
      languagePropertiesCount[language] = {
        label: language,
        value: 1,
        stars: stargazers_count,
      };
    }

    return languagePropertiesCount;
  }, {});

  const mostUsedLanguages = Object.values(languageProperties)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const starsPerLanguage = Object.values(languageProperties)
    .sort((a, b) => b.stars - a.stars)
    .map((languageProperty) => {
      const { label, stars } = languageProperty;
      return { label, value: stars };
    })
    .slice(0, 5);

  const chartData = [
    {
      label: "HTML",
      value: "13",
      star: 5,
    },
    {
      label: "CSS",
      value: "23",
      star: 5,
    },
    {
      label: "JavaScript",
      value: "80",
      star: 5,
    },
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <div>
          <ExampleChart data={chartData} />
        </div> */}
        <Pie3D data={mostUsedLanguages} />
        <div></div>
        <Doughnut2D data={starsPerLanguage} />
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
