import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import loaderImg from "../images/preloader.gif";

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        <img src={loaderImg} alt="loader" />
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>;
      </Wrapper>
    );
  }

  return children;
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;

  img {
    width: 15vw;
  }
`;

export default AuthWrapper;
