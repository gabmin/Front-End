import React, { useRef } from "react";
import styled from "styled-components";

import useOnScreen from "../hooks/useOnScreen";
import bannerAnt from "../images/bannerAnt.png";
import bannerBack from "../images/bannerBack.png";
import bannerText from "../images/bannerText.png";
import { blue, red, mobile, tablet } from "../shared/style";

const MainBanner = () => {
  const scrollRef = useRef();

  const onScreen = useOnScreen(scrollRef, 0.1);

  return (
    <BannerWrapper ref={scrollRef}>
      <BannerInner>
        <BannerTexts>
          <span className="innerTextTop">
            곡소리 나는 개미들의 주식 커뮤니티
          </span>
          <img alt="bannerText" src={bannerText} />
          <span className="innerTextBottom1">
            투자에 대한 무거운 고민을 쉽고 가볍게 해결할 수 있는 커뮤니티.
          </span>
          <span className="innerTextBottom2">
            투표를 통해 당신의 생각을 여러 개미들과 자유롭게 나눠보세요!
          </span>
        </BannerTexts>
        <BannerAnt onScreen={onScreen} alt="bannerAnt" src={bannerAnt} />
      </BannerInner>
      <StyledBannerBack alt="mainBanner" src={bannerBack} />
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  width: 100%;
  margin: auto;
  height: 300px;
  overflow-x: hidden;

  @media screen and (max-width: ${mobile}) {
    display: none;
  }
`;

const BannerInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 67%;
  max-width: 1280px;
  position: relative;
`;

const BannerTexts = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;

  .innerTextTop {
    position: relative;
    top: -20px;
    color: white;
    font-weight: bold;
    font-size: 16px;
  }

  img {
    position: relative;
    top: -10px;
  }

  .innerTextBottom1,
  .innerTextBottom2 {
    position: relative;
    top: 40px;
    color: white;
    font-size: 14px;
  }
`;

const BannerAnt = styled.img`
  position: absolute;
  left: ${props => (props.onScreen ? "600px" : "1200px")};
  transition: all 0.5s cubic-bezier(0.19, 0.855, 0.265, 0.985);
  height: 100%;
`;

const StyledBannerBack = styled.img`
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100%;
`;

export default MainBanner;
