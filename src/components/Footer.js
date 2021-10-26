import React from "react";
import styled from "styled-components";

const Footer = props => {
  return <Container>Footer</Container>;
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 200px;
  margin: 100px 0 0;
  border-bottom: 3px solid lightgray;
  background-color: lightgray;
`;

export default Footer;
