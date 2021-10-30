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
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Container>
      <Sliderdiv>
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
              />
            </div>
          ))}
        </StyledSlider>
      </Sliderdiv>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const Sliderdiv = styled.div`
  margin: 20px auto;
`;

const StyledSlider = styled(Slider)`
  overflow: hidden;
  .slick-slide.slick-center div {
    transform: scale(1.1);
    opacity: 1;
  }
`;

export default MultiSlick;