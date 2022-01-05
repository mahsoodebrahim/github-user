import React from "react";
import styled from "styled-components";
import Card from "./Card";
import Followers from "./Followers";

const User = () => {
  return (
    <Wrapper>
      <Card />
      <Followers />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default User;
