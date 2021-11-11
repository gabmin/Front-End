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

import { history } from "../redux/configureStore";
import {
  deletePostDB,
  likePostDB,
  votePostDB,
  completePostDB,
} from "../redux/actions/eitherCard";

const EitherCard = props => {
  const dispatch = useDispatch();
  const {
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
    voted,
    completed,
  } = props;

  const [percent, setPercent] = useState("");
  const [likes, setLikes] = useState(likeCnt);
  const [choice, setChoice] = useState(voted);
  const [likeState, setLikeState] = useState(liked === null ? false : true);
  const [action, setAction] = useState(null);

  const {
    completePostDBDone,
    completePostDBError,
    deletePostDBDone,
    deletePostDBError,
  } = useSelector(state => state.eitherCard);
  useEffect(() => {
    if (action) {
      if (completePostDBDone) {
        alert("투표가 종료되었습니다.");
        window.location.replace("/either");
      }
      if (completePostDBError) {
        alert("투표 종료에 오류가 발생하였습니다.");
      }
      if (deletePostDBDone) {
        alert("투표가 삭제되었습니다.");
        window.location.replace("/either");
      }
      if (deletePostDBError) {
        alert("투표 삭제에 오류가 발생하였습니다.");
      }
      setAction(null);
    }
  }, [
    completePostDBDone,
    deletePostDBDone,
    completePostDBError,
    deletePostDBError,
  ]);
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

  //유저정보(닉네임)
  const userInfo = useSelector(state => state.user.userInfo);
  //수정하기
  const onClickModify = () => {
    if (completed === 1 || voteCntA + voteCntB > 0) {
      alert("이미 투표가 진행되었거나 투표가 종료된 글은 수정할 수 없습니다.");
      return;
    } else {
      history.push(`/either/${eitherId}/edit`);
    }
  };
  //삭제하기
  const onClickDelete = () => {
    dispatch(deletePostDB(eitherId));
    setAction(true);
  };
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
  //content 투표
  const onClickContent = e => {
    dispatch(votePostDB({ eitherId, data: { vote: e } }));
    setChoice(e);
  };
  //투표 종료하기
  const onClickComplete = () => {
    if (completed === 1) {
      alert("이미 투표가 종료되었습니다.");
      return;
    } else {
      dispatch(completePostDB(eitherId));
      setAction(true);
    }
  };
  //버튼A 상태 보여주기
  const SelctButtonA = (BGcolor, color, disabled, vote, content) => {
    return (
      <EitherButtonA
        style={{ backgroundColor: BGcolor, color: color }}
        disabled={disabled}
        onClick={() => {
          onClickContent(vote);
        }}
      >
        <ButtonText>{content}</ButtonText>
      </EitherButtonA>
    );
  };
  //버튼B 상태 보여주기
  const SelctButtonB = (BGcolor, color, disabled, vote, content) => {
    return (
      <EitherButtonB
        style={{ backgroundColor: BGcolor, color: color }}
        disabled={disabled}
        onClick={() => {
          onClickContent(vote);
        }}
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
            margin: "21px 31px 0px 557px",
          }}
        >
          {/* 자신이 작성한 글에 따른 수정,삭제,종료하기 버튼 보여주기 */}
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
                  onClick={onClickModify}
                >
                  <MaterialIcon icon="mode_edit_outline" size="small" />
                  수정하기
                </MenuItem>
                <MenuItem
                  styles={{
                    fontSize: "20px",
                  }}
                  onClick={onClickComplete}
                >
                  <MaterialIcon icon="done" size="small" />
                  투표 종료하기
                </MenuItem>
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
        {/* 선택 결과에 따라 보여주기 */}
        {!userInfo.nickname ? (
          <div>
            {SelctButtonA(null, "#101214", true, null, contentA)}
            {SelctButtonB(null, "#101214", true, null, contentB)}
          </div>
        ) : userInfo.nickname && choice === "A" ? (
          <div>
            {completed === 1
              ? SelctButtonA("#00397c", "#FFFFFF", true, null, contentA)
              : SelctButtonA("#00397c", "#FFFFFF", false, "A", contentA)}
            {completed === 1
              ? SelctButtonB(null, "#101214", true, null, contentB)
              : SelctButtonB(null, "#101214", false, "B", contentB)}
          </div>
        ) : userInfo.nickname && choice === "B" ? (
          <div>
            {completed === 1
              ? SelctButtonA(null, "#101214", true, null, contentA)
              : SelctButtonA(null, "#101214", false, "A", contentA)}
            {completed === 1
              ? SelctButtonB("#E25B45", "#101214", true, null, contentB)
              : SelctButtonB("#E25B45", "#101214", false, "B", contentB)}
          </div>
        ) : (
          <div>
            {completed === 1
              ? SelctButtonA(null, "#101214", true, null, contentA)
              : SelctButtonA(null, "#101214", false, "A", contentA)}
            {completed === 1
              ? SelctButtonB(null, "#101214", true, null, contentB)
              : SelctButtonB(null, "#101214", false, "B", contentB)}
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
          <div style={{ fontSize: "14px", color: "#101214" }}>{nickname}</div>
          <div
            style={{ color: "#E25B45", display: "flex", alignItems: "center" }}
          >
            {!likeState ? (
              <FiThumbsUp
                onClick={onClickLike}
                style={{
                  width: "24",
                  height: "24",
                  cursor: "pointer",
                }}
              />
            ) : (
              <HiThumbUp
                style={{
                  width: "24",
                  height: "24",
                  cursor: "pointer",
                }}
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
  margin: 100px auto 0px auto;
  border: 2px solid #00397c;
  border-radius: 10px;
  background-color: #ffffff;
`;
const TitleDiv = styled.div`
  width: 482px;
  height: 60px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 56px auto 16px auto;
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
  margin: 24px auto;
  border-radius: 6px;
  width: 100%;
  height: 6px;
  z-index: 0;
  background-color: #e25b45;
`;
const HightLight = styled.div`
  background-color: #00397c;
  transition: 1s;
  width: ${props => props.width};
  height: 6px;
  margin-bottom: 1px;
  border-radius: ${props =>
    props.width === "100%" ? "5px 5px 5px 5px" : "5px 0px 0px 5px"};
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
  &:hover {
    background-color: #dfdfdf;
  }
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
  &:hover {
    background-color: #dfdfdf;
  }
`;
const EitherFooter = styled.div`
  margin: 36px 77px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonText = styled.h5`
  word-break: break-all;
`;
export default EitherCard;
