import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import MaterialIcon from "material-icons-react";

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
  //버튼 상태 보여주기
  const SelctButton = (color, disabled, vote, title, content) => {
    return (
      <EitherButton
        style={{ backgroundColor: color }}
        disabled={disabled}
        onClick={() => {
          onClickContent(vote);
        }}
      >
        <h1>{title}</h1>
        <ButtonText>{content}</ButtonText>
      </EitherButton>
    );
  };
  return (
    <>
      <Container>
        <EitherText>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 40px",
            }}
          >
            <b>OX</b>
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
          <h2>{title}</h2>
          {/* 투표 완료에 따른 종료 안내글 표시 */}
          {completed === 1 ? (
            <h2 style={{ color: "gray" }}>종료된 투표입니다</h2>
          ) : null}
        </EitherText>
        {/* 선택 결과에 따라 보여주기 */}
        {!userInfo.nickname ? (
          <div>
            {SelctButton(null, true, null, "O", contentA)}
            {SelctButton(null, true, null, "X", contentB)}
          </div>
        ) : userInfo.nickname && choice === "A" ? (
          <div>
            {completed === 1
              ? SelctButton("orange", true, null, "O", contentA)
              : SelctButton("orange", false, "A", "O", contentA)}
            {completed === 1
              ? SelctButton(null, true, null, "X", contentB)
              : SelctButton(null, false, "B", "X", contentB)}
          </div>
        ) : userInfo.nickname && choice === "B" ? (
          <div>
            {completed === 1
              ? SelctButton(null, true, null, "O", contentA)
              : SelctButton(null, false, "A", "O", contentA)}
            {completed === 1
              ? SelctButton("orange", true, null, "X", contentB)
              : SelctButton("orange", false, "B", "X", contentB)}
          </div>
        ) : (
          <div>
            {completed === 1
              ? SelctButton(null, true, null, "O", contentA)
              : SelctButton(null, false, "A", "O", contentA)}
            {completed === 1
              ? SelctButton(null, true, null, "X", contentB)
              : SelctButton(null, false, "B", "X", contentB)}
          </div>
        )}
        <EitherProgress>
          <ProgressBar
            completed={percent}
            labelAlignment="center"
            height="15px"
            width="80%"
            labelSize="10px"
            margin="auto"
          />
        </EitherProgress>
        <EitherFooter>
          <div style={{ fontSize: "10px", padding: "0px 2em" }}>
            {nickname} {"|"} {date}
          </div>
          <div style={{ fontSize: "10px", padding: "0px 2em" }}>
            <button onClick={onClickLike}>좋아요</button> {likes}
          </div>
        </EitherFooter>
      </Container>
    </>
  );
};

const Container = styled.div`
  text-align: center;
  width: 80%;
  height: auto;
  margin: 100px auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1em;
  opacity: 0.3;
  background-color: white;
`;

const EitherText = styled.div`
  width: 100%;
`;

const EitherProgress = styled.div`
  margin: 30px;
`;
const EitherButton = styled.button`
  width: 40%;
  height: 40%;
  z-index: inherit;
`;
const EitherFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ButtonText = styled.h5`
  word-break: break-all;
`;
export default EitherCard;
