import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import MaterialIcon from "material-icons-react";
import { FiThumbsUp } from "react-icons/fi";
import { HiThumbUp } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

import Nickname from "./Nickname";
import { deletePostDB, likePostDB } from "../redux/actions/eitherCard";

const EitherCompleteCard = props => {
  const dispatch = useDispatch();
  let {
    eitherId,
    nickname,
    title,
    contentA,
    contentB,
    date,
    likeCnt,
    voteCntA,
    voteCntB,
    liked,
  } = props;

  //유저정보(닉네임)
  const userInfo = useSelector(state => state.user.userInfo);

  const [percent, setPercent] = useState("");
  const [likes, setLikes] = useState(likeCnt);
  const [likeState, setLikeState] = useState(liked === null ? false : true);
  const [action, setAction] = useState(null);

  const { deletePostDBDone, deletePostDBError } = useSelector(
    state => state.eitherCard,
  );
  useEffect(() => {
    if (action) {
      if (deletePostDBDone) {
        alert("투표가 삭제되었습니다.");
        window.location.replace("/either");
      }
      if (deletePostDBError) {
        alert("투표 삭제에 오류가 발생하였습니다.");
      }
      setAction(null);
    }
  }, [deletePostDBDone, deletePostDBError]);

  //Progress Bar 퍼센트 계산
  useEffect(() => {
    if (voteCntA === 0 && voteCntB === 0) {
      setPercent(50);
    } else if (voteCntA === 0) {
      setPercent(0);
    } else if (voteCntB === 0) {
      setPercent(100);
    } else {
      let calPercent = (voteCntA / (voteCntA + voteCntB)) * 100;
      setPercent(Math.round(calPercent));
    }
  }, [voteCntA, voteCntB]);

  //좋아요
  const onClickLike = () => {
    if (liked !== null || userInfo.nickname === "GUEST") {
      return;
    } else {
      dispatch(likePostDB(eitherId));
      setLikes(likeCnt + 1);
      setLikeState(true);
    }
  };
  //삭제하기
  const onClickDelete = () => {
    dispatch(deletePostDB(eitherId));
    setAction(true);
  };
  //버튼A 상태 보여주기
  const SelctButtonA = (BGcolor, content) => {
    return (
      <EitherButtonA
        style={{ backgroundColor: BGcolor, color: "#101214" }}
        disabled
      >
        <ButtonText>{content}</ButtonText>
      </EitherButtonA>
    );
  };
  //버튼B 상태 보여주기
  const SelctButtonB = (BGcolor, content) => {
    return (
      <EitherButtonB
        style={{ backgroundColor: BGcolor, color: "#101214" }}
        disabled
      >
        <ButtonText>{content}</ButtonText>
      </EitherButtonB>
    );
  };
  return (
    <>
      <Container>
        <div
          style={{
            position: "absolute",
            margin: "21px 32px 0px 557px",
          }}
        >
          {nickname === userInfo.nickname ? (
            <div>
              <Menu
                menuButton={
                  <MenuButton
                    styles={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <MaterialIcon icon="more_horiz" size={32} />
                  </MenuButton>
                }
                menuStyles={{ border: "0px solid" }}
                portal={true}
              >
                <MenuItem
                  styles={{
                    fontSize: "20px",
                  }}
                  onClick={onClickDelete}
                >
                  <MaterialIcon icon="delete" size="small" />
                  삭제하기
                </MenuItem>
              </Menu>
            </div>
          ) : null}
        </div>
        <TitleDiv> {title} </TitleDiv>
        <DateDiv>{date}</DateDiv>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <FaRegUser style={{ width: "16", height: "16", color: "#00397c" }} />
          <TotalCntDiv>{voteCntA + voteCntB}</TotalCntDiv>
        </div>
        {!userInfo.nickname ? (
          <div>
            {SelctButtonA(null, contentA)}
            {SelctButtonB(null, contentB)}
          </div>
        ) : (
          <div>
            {voteCntA === voteCntB ? (
              <div>
                {SelctButtonA("#DFDFDF", contentA)}
                {SelctButtonB("#DFDFDF", contentB)}
              </div>
            ) : voteCntA > voteCntB ? (
              <div>
                {SelctButtonA("#DFDFDF", contentA)}
                {SelctButtonB(null, contentB)}
              </div>
            ) : (
              <div>
                {SelctButtonA(null, contentA)}
                {SelctButtonB("#DFDFDF", contentB)}
              </div>
            )}
          </div>
        )}
        <div style={{ width: "480px", margin: "auto" }}>
          <EitherProgress>
            <ProgressLabel>
              <div style={{ margin: "8px 0px 0px 10px" }}>{percent + "%"}</div>
              <div style={{ margin: "8px 10px 0px 0px" }}>
                {100 - percent + "%"}
              </div>
            </ProgressLabel>
            <HightLight width={percent + "%"} />
          </EitherProgress>
        </div>
        <EitherFooter>
          <div style={{ color: "#101214" }}>
            <Nickname
              nickname={nickname}
              userId={userInfo.userId}
              width={"32px"}
              height={"32px"}
              fontSize={"14px"}
            />
          </div>
          <div
            style={{ color: "#E25B45", display: "flex", alignItems: "center" }}
          >
            {!likeState ? (
              <FiThumbsUp
                onClick={onClickLike}
                style={{ width: "24", height: "24", cursor: "pointer" }}
              />
            ) : (
              <HiThumbUp
                style={{ width: "24", height: "24", cursor: "pointer" }}
              />
            )}
            <div style={{ fontSize: "14px", marginLeft: "14px" }}>{likes}</div>
          </div>
        </EitherFooter>
      </Container>
    </>
  );
};

const Container = styled.div`
  text-align: center;
  width: 620px;
  height: 600px;
  margin: 100px auto;
  border: 2px solid #00397c;
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(0, 57, 124, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;
const TitleDiv = styled.div`
  width: 482px;
  height: 60px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 56px auto 16px auto;
  word-break: break-all;
`;
const DateDiv = styled.div`
  margin: auto;
  color: #868e96;
`;
const TotalCntDiv = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #868e96;
  margin-left: 8px;
`;
const EitherProgress = styled.div`
  margin: 24px auto 0px auto;
  border-radius: 6px;
  width: 100%;
  height: 6px;
`;
const HightLight = styled.div`
  background-color: #dfdfdf;
  transition: 1s;
  width: ${props => props.width};
  height: 6px;
  border-radius: 5px;
`;
const ProgressLabel = styled.div`
  width: 480px;
  position: absolute;
  color: #00397c;
  margin-top: 6px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;

const EitherButtonA = styled.button`
  width: 240px;
  height: 210px;
  border: 2px solid #00397c;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 16px;
  line-height: 23px;
  margin: 24px auto 0px auto;
`;
const EitherButtonB = styled.button`
  width: 240px;
  height: 210px;
  border: 2px solid #00397c;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 16px;
  line-height: 23px;
  margin: 24px auto 0px auto;
`;
const EitherFooter = styled.div`
  margin: 73px 77px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonText = styled.h5`
  word-break: break-all;
`;
export default EitherCompleteCard;
