import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MultiCard from "../components/MultiCard";
import NextArrow from "../elements/NextArrow";
import PrevArrow from "../elements/PrevArrow";

const MultiSlick = props => {
  const CardList = props.cardList;
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    adaptiveHeight: true,
    focusOnSelect: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          width: "50px",
          height: "50px",
          right: "-27px",
          top: "120px",
        }}
        onClick={onClick}
      >
        <img
          src={require("../images/arrow.png").default}
          alt="arrowNext"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            right: "30px",
            top: "0px",
            border: "1px solid rgb(197, 197, 197)",
            borderRadius: "50%",
          }}
        />
      </div>
    );
  }
  //이전으로 넘어가기 버튼
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          width: "50px",
          height: "50px",
          right: "-27px",
          top: "120px",
        }}
        onClick={onClick}
      >
        <img
          src={require("../images/arrowL.png").default}
          alt="arrowNext"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "50px",
            top: "0px",
            border: "1px solid rgb(197, 197, 197)",
            borderRadius: "50%",
          }}
        />
      </div>
    );
  }

  return (
    <Container>
      <SliderWarpper>
        <StyledSlider {...settings}>
          {CardList?.map((p, i) => (
            <div>
              <MultiCard
                multiId={p.multiId}
                title={p.title}
                description={p.description}
                user={p.user}
                date={p.date}
                editedDate={p.editedDate}
                completed={p.completed}
                likeCnt={p.likeCnt}
                commentCnt={p.commentCnt}
                nickname={p.nickname}
              />
            </div>
          ))}
        </StyledSlider>
      </SliderWarpper>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const SliderWarpper = styled.div`
  margin: 20px auto;
`;

const StyledSlider = styled(Slider)`
  overflow: hidden;
  .slick-slide.slick-center div {
    transform: scale(1);
  }
  /* .slick-slide.slick-list div {
    transform: scale(0.88);
  } */
`;

export default MultiSlick;
