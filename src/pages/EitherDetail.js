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
  PostDB,
  PostingDB,
  completePostDB,
} from "../redux/actions/eitherCard";

const EitherDetail = props => {
  const dispatch = useDispatch();

  //해당 eitherId
  const eitherId = props.match.params.either_id;
  //유저정보(닉네임)
  const userInfo = useSelector(state => state.user.userInfo);
  //전체 게시글 정보
  const PostList = useSelector(state => state.eitherCard.eitherPost);
  const PostLists = PostList && PostList.either;
  //전체 게시글 중 해당 게시글 찾기
  const targetPost = PostLists?.find(p => p.eitherId == eitherId);

  const [percent, setPercent] = useState("");
  const [likes, setLikes] = useState(targetPost && targetPost.likeCnt);
  const [choice, setChoice] = useState(targetPost && targetPost.voted);
  const [action, setAction] = useState(null);

  //불러온 데이터가 없거나 새로고침 시 페이지 이동
  useEffect(() => {
    if (!userInfo.nickname) {
      alert("로그인 후 이용해주세요.");
      history.push("/");
    }
  }, []);

  useEffect(() => {
    //데이터 가져오기
    dispatch(PostDB());
    dispatch(PostingDB());
    setChoice(targetPost?.voted);
  }, [dispatch, targetPost?.voted]);

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
        window.location.replace(`/either/${targetPost.eitherId}`);
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
    if (targetPost?.voteCntA === 0 && targetPost?.voteCntB === 0) {
      setPercent(50);
    } else if (targetPost?.voteCntA === 0) {
      setPercent(100);
    } else if (targetPost?.voteCntB === 0) {
      setPercent(0);
    } else {
      let calPercent =
        (targetPost?.voteCntA / (targetPost?.voteCntA + targetPost?.voteCntB)) *
        100;
      setPercent(Math.round(calPercent));
    }
  }, [targetPost]);
  //좋아요
  useEffect(() => {
    setLikes(targetPost?.likeCnt);
  }, [targetPost]);
  //수정하기
  const onClickModify = () => {
    if (
      targetPost.completed === 1 ||
      targetPost.voteCntA + targetPost.voteCntB > 0
    ) {
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
    if (targetPost?.liked !== null || !userInfo.nickname) {
      return;
    } else {
      dispatch(likePostDB(eitherId));
      setLikes(targetPost.likeCnt + 1);
    }
  };
  //content 투표
  const onClickContent = e => {
    dispatch(votePostDB({ eitherId, data: { vote: e } }));
    setChoice(e);
  };
  //투표 종료하기
  const onClickComplete = () => {
    if (targetPost.completed === 1) {
      alert("이미 투표가 종료되었습니다.");
      return;
    } else {
      dispatch(completePostDB(eitherId));
      setAction(true);
    }
  };
  //돌아가기
  const onClickGoBack = () => {
    history.goBack();
  };
  //목록으로 돌아가기
  const onClickIndex = () => {
    history.push("/");
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
      <Wrap>
        <EitherButtonGrid>
          <ManuButton onClick={onClickGoBack}>돌아가기</ManuButton>
          <ManuButton onClick={onClickIndex}>목록</ManuButton>
        </EitherButtonGrid>
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
              {targetPost?.nickname === userInfo.nickname ? (
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
            <h2>{targetPost?.title}</h2>
            {/* 종료된 투표일 경우 표시 */}
            {targetPost?.completed === 1 ? (
              <h2 style={{ color: "gray" }}>종료된 투표입니다</h2>
            ) : null}
          </EitherText>
          {!userInfo.nickname ? (
            <div>
              {SelctButton(null, true, null, "O", targetPost?.contentA)}
              {SelctButton(null, true, null, "X", targetPost?.contentB)}
            </div>
          ) : userInfo.nickname && choice === "A" ? (
            <div>
              {targetPost?.completed === 1
                ? SelctButton("orange", true, null, "O", targetPost?.contentA)
                : SelctButton("orange", false, "A", "O", targetPost?.contentA)}
              {targetPost?.completed === 1
                ? SelctButton(null, true, null, "X", targetPost?.contentB)
                : SelctButton(null, false, "B", "X", targetPost?.contentB)}
            </div>
          ) : userInfo.nickname && choice === "B" ? (
            <div>
              {targetPost?.completed === 1
                ? SelctButton(null, true, null, "O", targetPost?.contentA)
                : SelctButton(null, false, "A", "O", targetPost?.contentA)}
              {targetPost?.completed === 1
                ? SelctButton("orange", true, null, "X", targetPost?.contentB)
                : SelctButton("orange", false, "B", "X", targetPost?.contentB)}
            </div>
          ) : (
            <div>
              {targetPost?.completed === 1
                ? SelctButton(null, true, null, "O", targetPost?.contentA)
                : SelctButton(null, false, "A", "O", targetPost?.contentA)}
              {targetPost?.completed === 1
                ? SelctButton(null, true, null, "X", targetPost?.contentB)
                : SelctButton(null, false, "B", "X", targetPost?.contentB)}
            </div>
          )}
          <EitherProgress>
            <ProgressBar
              completed={percent}
              labelAlignment="center"
              height="15px"
              width="90%"
              labelSize="10px"
              margin="auto"
            />
          </EitherProgress>
          <EitherFooter>
            <div style={{ fontSize: "15px", padding: "0px 2em" }}>
              {targetPost?.nickname} {"|"} {targetPost?.date}
            </div>
            <div style={{ fontSize: "15px", padding: "0px 2em" }}>
              <button onClick={onClickLike}>좋아요</button> {likes}
            </div>
          </EitherFooter>
        </Container>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const EitherButtonGrid = styled.div`
  margin: 50px 0px;
  width: 100%;
  text-align: center;
`;
const ManuButton = styled.button`
  border: none;
  background-color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: green;
  }
`;
const Container = styled.div`
  text-align: center;
  width: 50%;
  height: auto;
  margin: 100px auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1em;
  background-color: white;
`;
const EitherText = styled.div`
  width: 100%;
`;
const EitherButton = styled.button`
  width: 40%;
  height: 40%;
  &:active {
    background-color: black;
  }
`;
const ButtonText = styled.h5`
  word-break: break-all;
`;
const EitherProgress = styled.div`
  margin: 30px;
`;
const EitherFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default EitherDetail;
