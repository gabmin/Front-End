import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { ReactComponent as Logo } from "../images/logo.svg";
import { mobile, tablet } from "../shared/style";

const Footer = props => {
  const onClickTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Container>
      <Top onClick={onClickTop}>TOP</Top>
      <Wrapper>
        <Grid>
          <Contents>
            <button
              onClick={() => {
                history.push("/about");
                window.scroll(0, 0);
              }}
            >
              About
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
          <CopyWriter>ⓒ 2021. Antsori All Rights Reserved</CopyWriter>
        </Grid>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0px;
`;
const Top = styled.div`
  position: relative;
  display: block;
  width: 35px;
  transform: translate3d(80vw, -60px, 0px);
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  border: none;
  background-color: transparent;
  color: #00397c;
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
  @media screen and (max-width: ${mobile}) {
    transform: translate3d(80vw, -110px, 0px);
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  background-color: #00397c;
  margin-top: 80px;
  color: white;
  bottom: 0px;
  align-items: center;
  @media screen and (max-width: ${mobile}) {
    height: 60px;
  }
`;
const Grid = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 50px;
  align-items: center;
  text-align: center;
  display: flex;
  box-sizing: border-box;
  margin: auto;
  @media screen and (max-width: ${mobile}) {
    width: 80%;
    flex-direction: column;
  }
`;
const Image = styled.div`
  width: 100%;
`;
const Contents = styled.div`
  max-width: 300px;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  button {
    border: none;
    background-color: transparent;
    color: white;
    font-size: 12px;
    cursor: pointer;
    font-family: "Noto-Sans KR", sans-serif;
    @media screen and (max-width: ${mobile}) {
      font-size: 12px;
    }
  }
  @media screen and (max-width: ${mobile}) {
    align-items: center;
    display: flex;
    width: 90%;
    height: 30%;
    margin: 10px auto;
  }
`;
const CopyWriter = styled.div`
  width: 40%;
  font-size: 12px;
  @media screen and (max-width: ${mobile}) {
    width: 100%;
    text-align: center;
  }
`;

export default Footer;
