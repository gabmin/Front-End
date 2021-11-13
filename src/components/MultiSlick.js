import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MultiCard from "../components/MultiCard";

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
          right: "-25px",
          top: "260px",
          zIndex: "1000",
        }}
        onClick={onClick}
      >
        <img
          src={require("../images/arrowRed.svg").default}
          alt="arrowNext"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            border: "50%",
            right: "-25px",
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
        style={{
          width: "50px",
          height: "700px",
          position: "absolute",
          backgroundColor: "white",
        }}
      >
        <div
          className={className}
          style={{
            ...style,
            width: "50px",
            height: "50px",
            right: "-50px",
            top: "260px",
            zIndex: "1000",
          }}
          onClick={onClick}
        >
          <img
            src={require("../images/arrowLRed.svg").default}
            alt="arrowNext"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: "-25px",
              top: "0px",
              border: null,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <Container>
      <SliderWarpper>
        <StyledSlider {...settings}>
          {CardList?.map((p, i) => (
            <CardWarpper>
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
            </CardWarpper>
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
  /* margin: 0 auto; */
  height: 100%;
`;

const StyledSlider = styled(Slider)`
  /* overflow: hidden; */
  margin: auto;
  width: 1300px;
  .slick-slider .slick-list {
  }

  .slick-slide.slick-center {
    transform: scale(1.1);
    transition: 0.5s;
    /* z-index: 999 !important; */
  }

  .slick-slide.slick-cloned {
    /* transform: translateX(-100px); */
  }

  .slick-slide {
    border-radius: 10px;
    padding: 30px 0 30px 0;
    /* transform: translate3d(-10px, 0, -100px); */
    /* z-index: 10 !important; */
  }
`;

const CardWarpper = styled.div`
  /* transform: translate(-100px, 0); */
  height: 100%;
`;

export default MultiSlick;
