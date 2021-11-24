import React, { useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EitherCard from "./EitherCard";
import EitherCompleteCard from "./EitherCompleteCard";
import { ReactComponent as PrevArrow } from "../images/arrowLRed.svg";
import { ReactComponent as NextArrow } from "../images/arrowRed.svg";
import { mobile, tablet } from "../shared/style";
import { useSelector } from "react-redux";

const EiterSlick = ({ PostList, PostingList, PostCompleteList }) => {
  const { PostDBDone } = useSelector(state => state.eitherCard);

  const sliderRef = useRef();
  const goToNext = () => {
    sliderRef.current.slickNext();
  };
  return (
    <>
      <Wrap>
        <div>
          {PostDBDone === true && (
            <StyledSlider {...settings} ref={sliderRef}>
              {PostList &&
                PostList?.map(v =>
                  v.completed === 0 ? (
                    <EitherCard
                      key={v.toString()}
                      eitherId={v.eitherId}
                      nickname={v.nickname}
                      title={v.title}
                      contentA={v.contentA}
                      contentB={v.contentB}
                      date={v.date}
                      likeCnt={v.likeCnt}
                      voteCntA={v.voteCntA}
                      voteCntB={v.voteCntB}
                      liked={v.liked}
                      voted={v.voted}
                      completed={v.completed}
                      user={v.user}
                      goToNext={goToNext}
                    />
                  ) : (
                    <EitherCompleteCard
                      key={v.toString()}
                      eitherId={v.eitherId}
                      nickname={v.nickname}
                      title={v.title}
                      contentA={v.contentA}
                      contentB={v.contentB}
                      date={v.date}
                      likeCnt={v.likeCnt}
                      voteCntA={v.voteCntA}
                      voteCntB={v.voteCntB}
                      liked={v.liked}
                      voted={v.voted}
                      completed={v.completed}
                      user={v.user}
                    />
                  ),
                )}
              {PostingList &&
                PostingList?.map(v => (
                  <EitherCard
                    key={v.toString()}
                    eitherId={v.eitherId}
                    nickname={v.nickname}
                    title={v.title}
                    contentA={v.contentA}
                    contentB={v.contentB}
                    date={v.date}
                    likeCnt={v.likeCnt}
                    voteCntA={v.voteCntA}
                    voteCntB={v.voteCntB}
                    liked={v.liked}
                    voted={v.voted}
                    completed={v.completed}
                    user={v.user}
                    goToNext={goToNext}
                  />
                ))}
              {PostCompleteList &&
                PostCompleteList?.map(v => (
                  <EitherCompleteCard
                    key={v.toString()}
                    eitherId={v.eitherId}
                    nickname={v.nickname}
                    title={v.title}
                    contentA={v.contentA}
                    contentB={v.contentB}
                    date={v.date}
                    likeCnt={v.likeCnt}
                    voteCntA={v.voteCntA}
                    voteCntB={v.voteCntB}
                    liked={v.liked}
                    voted={v.voted}
                    completed={v.completed}
                    user={v.user}
                  />
                ))}
            </StyledSlider>
          )}
        </div>
      </Wrap>
    </>
  );
};

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  adaptiveHeight: true,
  focusOnSelect: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  swipeToSlide: true,
  lazyLoad: "progress",
  speed: 500,
  nextArrow: <NextArrow data-testId="nextArrow" />,
  prevArrow: <PrevArrow data-testId="prevArrow" />,
  centerPadding: "0px",

  responsive: [
    { breakpoint: 1920, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    { breakpoint: 1300, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .slick-slide.slick-center {
    transform: scale(1.1);
    transition: 0.5s;
    z-index: 2;
    pointer-events: all;
    button {
      pointer-events: all;
    }
    .Position {
      pointer-events: all;
    }
  }
  .slick-slider {
    padding: 30px 0px;
    margin: auto;
    width: 100%;
    button {
      pointer-events: none;
    }
    .Position {
      pointer-events: none;
    }

    @media screen and (min-width: ${mobile}) and (max-width: 1300px) {
      width: 55%;
    }
    @media screen and (max-width: ${mobile}) {
      padding: 0px;
    }
  }
  .slick-list {
    width: 100%;
    @media screen and (max-width: ${mobile}) {
      transform: scale(0.8);
    }
  }
`;

const StyledSlider = styled(Slider)`
  margin: auto;
  .slick-prev,
  .slick-next {
    width: 12px;
    height: 28px;
    pointer-events: all;
  }
  @media screen and (max-width: ${mobile}) {
    .slick-prev,
    .slick-next {
      margin: 0px 40px;
    }
  }
`;

export default EiterSlick;
