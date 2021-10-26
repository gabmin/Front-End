import React from "react";
import EitherCard from "./EitherCard";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        zIndex: "999",
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

const EiterSlick = ({ cardList }) => {
  return (
    <>
      <Wrap>
        <div>
          <StyledSlider {...settings}>
            {cardList?.map((v, i) => (
              <div>
                <EitherCard
                  eitherId={i}
                  user={v.user}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                />
              </div>
            ))}
          </StyledSlider>
        </div>
      </Wrap>
    </>
  );
};

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 500,
  centerPadding: "-10px",
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const Wrap = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const StyledSlider = styled(Slider)`
  overflow: hidden;
  .slick-slide.slick-center div {
    transform: scale(1.1);
    opacity: 1;
  }
`;
export default EiterSlick;
