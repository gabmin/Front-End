import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainCard from "../components/MainCard";
import PrevArrow from "../elements/PrevArrow";
import NextArrow from "../elements/NextArrow";

const Wrap = styled.div`
  width: 100%;
  margin: 0;
`;

const ProductSlick = ({ cardList, type }) => {
  const settings = {
    speed: 500,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1700,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //     },
    //   },
    //   {
    //     breakpoint: 1300,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 800,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  return (
    <>
      <Wrap>
        <div style={{ textAlign: "center", marginBottom: "2em" }}>
          <span style={{ fontSize: "1.8em", fontWeight: "normal" }}>
            {type === "either" ? "찬반 랭킹 : Top 10" : "객관식 랭킹 : Top 10"}
          </span>
        </div>
        <Slider {...settings}>
          {cardList?.map((v, i) => (
            <MainCard
              key={i}
              title={v.title}
              content={v.content}
              type={type}
              commentNum={v.commentNum}
              likeNum={v.likeNum}
              username={v.username}
            />
          ))}
        </Slider>
      </Wrap>
    </>
  );
};

export default ProductSlick;
