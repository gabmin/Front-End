import React from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../images/logo.svg";
import { mobile, tablet } from "../shared/style";

const Footer = props => {
  const onClickTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Container>
      <Wrapper>
        <Image>
          <Logo height="26px" fill="white" />
        </Image>
        <Contents>
          <button
            onClick={() =>
              window.open("https://github.com/Ant-DDun-DDun-Project")
            }
          >
            about site
          </button>
          <p>|</p>
          <button
            onClick={() =>
              window.open(
                "https://crawling-health-e0d.notion.site/be6df84bde484ca883f54739be96eb8f",
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
        <Top onClick={onClickTop}>TOP</Top>
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
const Top = styled.div`
  position: absolute;
  right: 2%;
  display: block;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  border: none;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
  @media screen and (max-width: ${mobile}) {
    right: 0px;
  }
`;
export default Footer;
