import React from "react";
import Card from "../components/Card";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrap = styled.div`
  width: 100%;
  margin: -10px;
`;

const settings = {
  className: "center",
  centerMode: true,
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 500,
  centerPadding: "60px",
};

const StyledSlider = styled(Slider)`
  .slick-slide {
    display: inline-block;
  }
  .slick-list {
    width: 100%;
    margin: 0 auto;
  }
  .slick-track {
    overflow-x: hidden;
  }
`;

const EiterSlick = props => {
  return (
    <>
      <Wrap>
        <div>
          <StyledSlider {...settings}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </StyledSlider>
        </div>
      </Wrap>
    </>
  );
};

export default EiterSlick;
