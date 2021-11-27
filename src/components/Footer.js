import React from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../images/logo.svg";
import { mobile, tablet } from "../shared/style";

const Footer = props => {
  return (
    <Container>
      <Wrapper>
        <Image>
          <Logo height="26px" fill="white" />
        </Image>
        <Contents>
          <button
            onClick={() =>
              window.open(
                "https://crawling-health-e0d.notion.site/Project-3b911ebdb6114fb7be4b54956a9579dd",
              )
            }
          >
            about site
          </button>
          <p>|</p>
          <button
            onClick={() =>
              window.open(
                "https://crawling-health-e0d.notion.site/Project-3b911ebdb6114fb7be4b54956a9579dd",
              )
            }
          >
            팀원소개
          </button>
          <p>|</p>
          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSfXuVt2WdjF7Wz1Vl2lv3Ze4ZmpT9-h05GrnqrL6Mfypj_a5g/viewform",
              )
            }
          >
            설문조사
          </button>
        </Contents>
        <CopyWriter>ⓒ 2021. Antsori all rights reserved</CopyWriter>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: #00397c;
  color: white;
  text-align: center;
  margin-top: 80px;
  @media screen and (max-width: ${mobile}) {
    width: 100%;
    height: 140px;
    box-sizing: border-box;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: auto;
  @media screen and (max-width: ${mobile}) {
    width: 80%;
    height: 80%;
    flex-direction: column;
    transform: translateY(20px);
  }
`;
const Image = styled.div`
  width: 100%;
`;
const Contents = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    background-color: transparent;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    font-family: "Noto-Sans KR", sans-serif;
    @media screen and (max-width: ${mobile}) {
      font-size: 14px;
    }
  }
  @media screen and (max-width: ${mobile}) {
    align-items: center;
    height: 30%;
  }
`;
const CopyWriter = styled.div`
  width: 100%;
  font-weight: bold;
  @media screen and (max-width: ${mobile}) {
    font-size: 14px;
  }
`;
export default Footer;
