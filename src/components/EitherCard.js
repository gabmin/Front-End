import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { FiThumbsUp, FiMoreHorizontal } from "react-icons/fi";
import { HiThumbUp } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

import { mobile, tablet } from "../shared/style";
import Nickname from "./Nickname";
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
    user,
    goToNext,
  } = props;

  const [percent, setPercent] = useState("");
  const [likes, setLikes] = useState(likeCnt);
  const [choice, setChoice] = useState(voted);
  const [likeState, setLikeState] = useState(liked === null ? false : true);
  const [action, setAction] = useState(null);
  const [showGraph, setShowGraph] = useState(voted === null ? false : true);

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
    if (liked !== null) {
      return;
    } else if (userInfo.nickname === "GUEST") {
      alert("로그인 후 사용 가능합니다.");
      return;
    } else {
      dispatch(likePostDB(eitherId));
      setLikes(likeCnt + 1);
      setLikeState(true);
    }
  };
  //content 투표
  const onClickContent = e => {
    if (userInfo.nickname === "GUEST") {
      alert("로그인 후 사용 가능합니다.");
    } else {
      dispatch(votePostDB({ eitherId, data: { vote: e } }));
      setChoice(e);
      goToNext();
    }
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
          setShowGraph(userInfo.nickname === "GUEST" ? false : true);
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
          setShowGraph(userInfo.nickname === "GUEST" ? false : true);
        }}
      >
        <ButtonText>{content}</ButtonText>
      </EitherButtonB>
    );
  };
  return (
    <>
      <Container>
        <ManuButtonGrid>
          <div>
            {nickname === userInfo.nickname ? (
              <div>
                <Menu
                  menuButton={
                    <MenuButton
                      styles={{
                        border: "none",
                        backgroundColor: "transparent",
                        curser: "pointer",
                      }}
                    >
                      <FiMoreHorizontal size={20} />
                    </MenuButton>
                  }
                  menuStyles={{ border: "0px solid" }}
                  portal={true}
                >
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={onClickModify}
                  >
                    수정하기
                  </MenuItem>
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={onClickComplete}
                  >
                    투표 종료하기
                  </MenuItem>
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={onClickDelete}
                  >
                    삭제하기
                  </MenuItem>
                </Menu>
              </div>
            ) : null}
          </div>
        </ManuButtonGrid>
        <TitleDiv> {title} </TitleDiv>
        <DateDiv>{date.substring(0, 16)}</DateDiv>
        <TotalCntGrid>
          <FaRegUser
            style={{
              width: "14",
              height: "14",
              color: "#00397c",
            }}
          />
          <TotalCntDiv>{voteCntA + voteCntB}</TotalCntDiv>
        </TotalCntGrid>
        {/* 선택 결과에 따라 보여주기 */}
        {userInfo.nickname === "GUEST" ? (
          <ButtonGrid>
            {SelctButtonA(null, "#101214", false, null, contentA)}
            {SelctButtonB(null, "#101214", false, null, contentB)}
          </ButtonGrid>
        ) : userInfo.nickname && choice === "A" ? (
          <ButtonGrid>
            {completed === 1
              ? SelctButtonA("#00397c", "#FFFFFF", true, null, contentA)
              : SelctButtonA("#00397c", "#FFFFFF", false, "A", contentA)}
            {completed === 1
              ? SelctButtonB(null, "#101214", true, null, contentB)
              : SelctButtonB(null, "#101214", false, "B", contentB)}
          </ButtonGrid>
        ) : userInfo.nickname && choice === "B" ? (
          <ButtonGrid>
            {completed === 1
              ? SelctButtonA(null, "#101214", true, null, contentA)
              : SelctButtonA(null, "#101214", false, "A", contentA)}
            {completed === 1
              ? SelctButtonB("#E25B45", "#101214", true, null, contentB)
              : SelctButtonB("#E25B45", "#101214", false, "B", contentB)}
          </ButtonGrid>
        ) : (
          <ButtonGrid>
            {completed === 1
              ? SelctButtonA(null, "#101214", true, null, contentA)
              : SelctButtonA(null, "#101214", false, "A", contentA)}
            {completed === 1
              ? SelctButtonB(null, "#101214", true, null, contentB)
              : SelctButtonB(null, "#101214", false, "B", contentB)}
          </ButtonGrid>
        )}
        {showGraph ? (
          <ProgressGrid>
            <EitherProgress>
              <ProgressLabel>
                <div className="LabelLeft">{percent + "%"}</div>
                <div className="LabelRight">{100 - percent + "%"}</div>
              </ProgressLabel>
              <HightLight width={percent + "%"} />
            </EitherProgress>
          </ProgressGrid>
        ) : null}
        <EitherFooter>
          <div className="Position">
            <div>
              <Nickname
                nickname={nickname}
                userId={user}
                width={"32px"}
                height={"32px"}
                fontSize={"14px"}
              />
            </div>
            <div className="Grid">
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
              <div className="Likes">{likes}</div>
            </div>
          </div>
        </EitherFooter>
      </Container>
    </>
  );
};

const Container = styled.div`
  text-align: center;
  width: 380px;
  height: 490px;
  box-sizing: border-box;
  margin: 70px auto;
  border: 2px solid #00397c;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 46px 32px;
  position: relative;
  @media screen and (max-width: ${mobile}) {
    margin: 30px auto;
  }
`;
const ManuButtonGrid = styled.div`
  .div {
    position: relative;
  }
  position: absolute;
  top: 110px;
  right: 40px;
`;
const TitleDiv = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  word-break: break-all;
`;
const DateDiv = styled.div`
  margin: 8px auto;
  font-size: 11px;
  color: #868e96;
`;
const TotalCntGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;
const TotalCntDiv = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #868e96;
  margin-left: 8px;
`;
const ProgressGrid = styled.div`
  width: 100%;
  margin: auto;
`;
const EitherProgress = styled.div`
  margin: 24px auto 0px auto;
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
  width: 316px;
  position: absolute;
  color: #00397c;
  margin-top: 6px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  .LabelLeft {
    margin: 8px 0px 0px 10px;
  }
  .LabelRight {
    margin: 8px 10px 0px 0px;
  }
`;
const ButtonGrid = styled.div`
  width: 312px;
  height: 160px;
  box-sizing: border-box;
  margin: 24px auto 0px auto;
  justify-content: center;
`;
const EitherButtonA = styled.button`
  width: 156px;
  height: 160px;
  border: 2px solid #00397c;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 16px;
  line-height: 23px;

  cursor: pointer;
  &:hover {
    background-color: #dfdfdf;
  }
`;
const EitherButtonB = styled.button`
  width: 156px;
  height: 160px;
  border: 2px solid #00397c;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 16px;
  line-height: 23px;

  cursor: pointer;
  &:hover {
    background-color: #dfdfdf;
  }
`;
const EitherFooter = styled.div`
  align-items: center;

  .Position {
    width: 313px;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 430px;
  }
  .Grid {
    color: #e25b45;
    display: flex;
    align-items: center;
  }
  .Likes {
    font-size: 14px;
    margin-left: 14px;
  }
`;
const ButtonText = styled.div`
  word-break: break-all;
  display: inline-block;
  vertical-align: middle;
  font-size: 13px;
  font-weight: bold;
  padding: 5px 3px;
`;
export default EitherCard;
