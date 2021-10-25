import React from "react";
import Card from "../components/Card";
import styled from "styled-components";
import Slider from "react-slick";

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

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 2,
  slidesToScroll: 1,
  speed: 500,
};

const StyledSlider = styled(Slider)`
  .slick-slide {
    display: inline-block;
  }
  .slick-list {
    width: 1000px;
    margin: 0 auto;
  }
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
        <div>
          <StyledSlider {...settings}>
            <div>
              <Card />
            </div>
            <div>
              <Card />
            </div>
          </StyledSlider>
        </div>
      </Wrap>
    </>
  );
};

export default Either;
