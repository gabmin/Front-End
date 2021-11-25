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
      <BannerTexts>
        <img alt="bannerText" src={bannerText} />
      </BannerTexts>
      <BannerAnt onScreen={onScreen} alt="bannerAnt" src={bannerAnt} />
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
  height: 500px;
  overflow-x: hidden;

  @media screen and (max-width: ${mobile}) {
    display: none;
  }
`;

const BannerTexts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  left: 63px;
`;

const BannerAnt = styled.img`
  position: relative;
  left: ${props => (props.onScreen ? "30px" : "1200px")};
  transition: all 0.5s cubic-bezier(0.19, 0.855, 0.265, 0.985);
`;

const StyledBannerBack = styled.img`
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100%;
`;

export default MainBanner;
