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
          zIndex: "1000",
        }}
        onClick={onClick}
      >
        <img
          src={require("../images/arrowRed.svg").default}
          alt="arrowNext"
          style={{
            position: "absolute",
            width: "12.25px",
            height: "28px",
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
        className={className}
        style={{
          ...style,
          width: "50px",
          height: "50px",
          right: "0px",
          zIndex: "1000",
        }}
        onClick={onClick}
      >
        <img
          src={require("../images/arrowLRed.svg").default}
          alt="arrowNext"
          style={{
            position: "absolute",
            width: "12.25px",
            height: "28px",
            left: "-25px",
            top: "0px",
            border: null,
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
  height: 100%;
`;

const StyledSlider = styled(Slider)`
  margin: auto;
  width: 1300px;
  .slick-slider .slick-list {
  }

  .slick-slide.slick-center {
    transform: scale(1.1);
    transition: 0.5s;
  }

  .slick-slide {
    padding: 30px 0 30px 0;
  }
`;

const CardWarpper = styled.div`
  height: 100%;
`;

export default MultiSlick;
