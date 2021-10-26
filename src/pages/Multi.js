import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MultiCard from "../components/MultiCard";
import NextArrow from "../elements/NextArrow";
import PrevArrow from "../elements/PrevArrow";

const Multi = props => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Container>
      <Btndiv>
        <button>전체</button>
        <button>진행중</button>
        <button>종료됨</button>
      </Btndiv>
      <Sliderdiv>
        <Slider {...settings}>
          <MultiCard />
          <MultiCard />
          <MultiCard />
          <MultiCard />
          <MultiCard />
        </Slider>
      </Sliderdiv>
      <button>나도질문하기</button>
    </Container>
  );
};

const Container = styled.div`
  min-height: 500px;
`;

const Btndiv = styled.div`
  min-height: 100px;
`;

const Sliderdiv = styled.div`
  margin: 20px auto;
`;

export default Multi;
