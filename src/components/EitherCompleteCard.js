import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import MaterialIcon from "material-icons-react";

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
      setPercent(100);
    } else if (voteCntB === 0) {
      setPercent(0);
    } else {
      let calPercent = (voteCntA / (voteCntA + voteCntB)) * 100;
      setPercent(Math.round(calPercent));
    }
  }, [voteCntA, voteCntB]);

  //삭제하기
  const onClickDelete = () => {
    dispatch(deletePostDB(eitherId));
    setAction(true);
  };
  //좋아요
  const onClickLike = () => {
    if (liked !== null) {
      return;
    } else {
      dispatch(likePostDB(eitherId));
      setLikes(likeCnt + 1);
    }
  };
  //버튼 상태 보여주기
  const SelctButton = (color, title, content) => {
    return (
      <EitherButton style={{ backgroundColor: color }} disabled>
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
          <h2 style={{ color: "gray" }}>종료된 투표입니다</h2>
        </EitherText>
        {!userInfo.nickname ? (
          <div>
            {SelctButton(null, "O", contentA)}
            {SelctButton(null, "X", contentB)}
          </div>
        ) : (
          <div>
            {voteCntA === voteCntB ? (
              <div>
                {SelctButton("orange", "O", contentA)}
                {SelctButton("orange", "X", contentB)}
              </div>
            ) : voteCntA > voteCntB ? (
              <div>
                {SelctButton("orange", "O", contentA)}
                {SelctButton(null, "X", contentB)}
              </div>
            ) : (
              <div>
                {SelctButton(null, "O", contentA)}
                {SelctButton("orange", "X", contentB)}
              </div>
            )}
          </div>
        )}
        <EitherProgress>
          <ProgressBar
            completed={percent}
            height="15px"
            width="90%"
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
`;
const EitherFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ButtonText = styled.h5`
  word-break: break-all;
`;
export default EitherCompleteCard;
