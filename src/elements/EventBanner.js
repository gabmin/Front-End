import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { mobile } from "../shared/style";
import eventBanner from "../images/eventBanner.png";
import { SetEventBanner } from "../redux/reducers/eventBannerSlice";
import colors from "../shared/colors";

const EventBanner = props => {
  const dispatch = useDispatch();
  const onBanner = useSelector(state => state.eventBanner.bannerStatus);
  console.log("onBanner", onBanner);
  const goToBanner = () => {
    window.open("https://forms.gle/wUbNuv1Hoofx2kje8");
  };
  const closeBanner = () => {
    dispatch(SetEventBanner(false));
  };
  useEffect(() => {});
  return (
    <Container>
      {onBanner === true ? (
        <div>
          <BannerImage>
            <Img src={eventBanner} alt="" onClick={goToBanner} />
          </BannerImage>
          <CloseBtnWarpper onClick={closeBanner}>
            <CloseBtn>+</CloseBtn>
          </CloseBtnWarpper>{" "}
        </div>
      ) : null}
    </Container>
  );
};
const Container = styled.div`
  width: 130px;
  height: 130px;
  position: fixed;
  z-index: 10;
  bottom: 10%;
  right: 10%;
  cursor: pointer;
  /* border-radius: 100px;
  box-shadow: 2px 2px 2px 2px ${colors.gray4}; */

  @media screen and (max-width: ${mobile}) {
    width: 80px;
    height: 80px;
    right: 6%;
  }
`;

const BannerImage = styled.div`
  /* border: 1px red solid; */
  margin: auto;
  padding: 0 0;
  border-radius: 100px;
  min-width: 100%;
  max-width: 130px;
  min-height: 100%;
  max-height: 130px;
  box-shadow: 2px 2px 2px 2px ${colors.gray4};
  @media screen and (max-width: ${mobile}) {
    width: 80px;
    height: 80px;
    box-shadow: 1px 1px 1px 1px ${colors.gray4};
  }
`;
const Img = styled.img`
  width: 100%;
  &:hover {
    opacity: 0.8;
  }
`;

const CloseBtnWarpper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const CloseBtn = styled.div`
  position: absolute;
  transform: rotate(45deg);
  top: 0;
  right: 0;
  color: ${colors.gray5};
`;
export default EventBanner;
