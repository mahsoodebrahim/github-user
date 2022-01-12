import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading } =
    useAuth0();

  console.log(user, isAuthenticated, isLoading);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Wrapper>
      {isAuthenticated ? (
        <>
          <img src={user.picture} alt="" />
          <h4>
            Welcome, <strong>{user.name.toUpperCase()}</strong>
          </h4>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            log out
          </button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>log in</button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }

  h4 {
    font-weight: 400;
    margin-bottom: 0;
  }

  button {
    border: transparent;
    background: transparent;
    color: var(--clr-grey-5);
    margin-left: 1rem;
    font-size: 1.2rem;
    border-radius: 10px;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
  }
`;

export default Navbar;
