import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import MaterialIcon from "material-icons-react";
import { FiThumbsUp } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

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
  //버튼A 상태 보여주기
  const SelctButtonA = (BGcolor, color, content) => {
    return (
      <EitherButtonA
        style={{ backgroundColor: BGcolor, color: color }}
        disabled
      >
        <ButtonText>{content}</ButtonText>
      </EitherButtonA>
    );
  };
  //버튼B 상태 보여주기
  const SelctButtonB = (BGcolor, color, content) => {
    return (
      <EitherButtonB
        style={{ backgroundColor: BGcolor, color: color }}
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
            margin: "21px 31px 0px 557px",
          }}
        >
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
                    <MaterialIcon icon="more_horiz" size="small" />
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
            {SelctButtonA(null, "#101214", contentA)}
            {SelctButtonB(null, "#101214", contentB)}
          </div>
        ) : (
          <div>
            {voteCntA === voteCntB ? (
              <div>
                {SelctButtonA("#00397c", "#FFFFFF", contentA)}
                {SelctButtonB("#00397c", "#FFFFFF", contentB)}
              </div>
            ) : voteCntA > voteCntB ? (
              <div>
                {SelctButtonA("#00397c", "#FFFFFF", contentA)}
                {SelctButtonB(null, "#101214", contentB)}
              </div>
            ) : (
              <div>
                {SelctButtonA(null, "#101214", contentA)}
                {SelctButtonB("#00397c", "#FFFFFF", contentB)}
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
`;
const TitleDiv = styled.div`
  width: 482px;
  height: 30px;
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
  border: 2px solid #00397c;
  border-radius: 6px;
  width: 100%;
  height: 32px;
`;
const HightLight = styled.div`
  background-color: #dfdfdf;
  transition: 1s;
  width: ${props => props.width};
  height: 32px;
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
  margin: 78px 77px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonText = styled.h5`
  word-break: break-all;
`;
export default EitherCompleteCard;
