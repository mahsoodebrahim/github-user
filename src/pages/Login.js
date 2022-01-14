import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import loginImg from "../images/login-img.svg";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="github user" />
        <h1>github user</h1>
        <button className="btn" onClick={() => loginWithRedirect()}>
          login
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90wv;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
  .btn {
    font-size: 1.25rem;
  }
`;

export default Login;
