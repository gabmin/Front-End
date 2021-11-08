import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import MaterialIcon from "material-icons-react";
import { FiThumbsUp } from "react-icons/fi";

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
      setPercent(100);
    } else if (voteCntB === 0) {
      setPercent(0);
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
    if (liked !== null || !userInfo.nickname) {
      return;
    } else {
      dispatch(likePostDB(eitherId));
      setLikes(likeCnt + 1);
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
        <EitherText>
          <div
            style={{
              position: "fixed",
              right: "20px",
              top: "-15px",
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
                        backgroundColor: "white",
                      }}
                    >
                      <MaterialIcon icon="more_vert" size="small" />
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
          {/* 투표 완료에 따른 종료 안내글 표시 */}
          {completed === 1 ? (
            <h2 style={{ color: "gray" }}>종료된 투표입니다</h2>
          ) : null}
        </EitherText>
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
              ? SelctButtonB("#00397c", "#FFFFFF", true, null, contentB)
              : SelctButtonB("#00397c", "#FFFFFF", false, "B", contentB)}
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
              <div style={{ margin: "2px 0px 0px 10px" }}>{percent + "%"}</div>
              <div style={{ margin: "2px 10px 0px 0px" }}>
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
            <FiThumbsUp
              onClick={onClickLike}
              style={{ width: "24", height: "24" }}
            />
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
  background-color: white;
`;
const TitleDiv = styled.div`
  width: 482px;
  height: 60px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 56px auto 0px auto;
`;
const DateDiv = styled.div`
  margin: 14px auto;
  color: #868e96;
`;
const EitherText = styled.div`
  width: 100%;
`;

const EitherProgress = styled.div`
  margin: 6px auto;
  border: 2px solid #00397c;
  border-radius: 6px;
  width: 100%;
  height: 19px;
`;
const HightLight = styled.div`
  background-color: #dfdfdf;
  transition: 1s;
  width: ${props => props.width};
  height: 19px;
  border-radius: 5px;
`;
const ProgressLabel = styled.div`
  width: 480px;
  position: absolute;
  color: #00397c;
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
  margin: 72px auto 8px auto;
`;
const EitherButtonB = styled.button`
  width: 240px;
  height: 210px;
  border: 2px solid #00397c;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 16px;
  line-height: 23px;
  margin: 72px auto 8px auto;
`;
const EitherFooter = styled.div`
  margin: 69px 77px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonText = styled.h5`
  word-break: break-all;
`;
export default EitherCard;
