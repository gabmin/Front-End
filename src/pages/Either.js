import React from "react";
import styled from "styled-components";
import EitherSlick from "../components/EitherSlick";

const Wrap = styled.div`
  max-width: 100%;
`;

const EitherButtonGrid = styled.div`
  margin: 50px 0px;
  width: 100%;
  text-align: center;
`;

const EitherButton = styled.button`
  border: none;
  background-color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: green;
  }
`;
const SlickLayout = styled.div`
  margin: 100px auto;
`;

const Either = props => {
  return (
    <>
      <Wrap>
        <EitherButtonGrid>
          <EitherButton>전체</EitherButton>
          <EitherButton>진행중</EitherButton>
          <EitherButton>종료됨</EitherButton>
        </EitherButtonGrid>
        <SlickLayout>
          <EitherSlick />
        </SlickLayout>
      </Wrap>
    </>
  );
};

export default Either;
