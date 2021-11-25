import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import MaterialIcon from "material-icons-react";
import { FiThumbsUp, FiMoreHorizontal } from "react-icons/fi";
import { HiThumbUp } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

import { mobile, tablet } from "../shared/style";
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
    user,
  } = props;

  //유저정보(닉네임)
  const userNickname = localStorage.getItem("nickname");

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

  //Props likeCnt 변화시 재렌더링
  useEffect(() => {
    setLikes(likeCnt);
  }, [likeCnt]);

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
    if (liked !== null) {
      return;
    } else if (!userNickname) {
      alert("로그인 후 사용 가능합니다.");
      return;
    } else {
      dispatch(likePostDB(eitherId));
      setLikes(likeCnt + 1);
      setLikeState(true);
    }
  };

  //삭제하기
  const onClickDelete = () => {
    const deleteConfirm = window.confirm("투표를 삭제하시겠습니까?");
    if (deleteConfirm === true) {
      dispatch(deletePostDB(eitherId));
      setAction(true);
    } else if (deleteConfirm === false) {
      return;
    }
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
        <ManuButtonGrid>
          <div>
            {nickname === userNickname ? ( // 메뉴버튼
              <div>
                <Menu
                  menuButton={
                    <MenuButton
                      styles={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                    >
                      <FiMoreHorizontal
                        size={20}
                        data-testid="compeleteMenuImage"
                      />
                    </MenuButton>
                  }
                  menuStyles={{ border: "0px solid" }}
                  portal={true}
                >
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={onClickDelete}
                    data-testid="menuDelete"
                  >
                    삭제하기
                  </MenuItem>
                </Menu>
              </div>
            ) : null}
          </div>
        </ManuButtonGrid>
        {/* 제목 */}
        <TitleDiv> {title} </TitleDiv>
        {/* 날짜 */}
        <DateDiv>{date.substring(0, 16)}</DateDiv>
        {/* 투표한 인원 수 */}
        <TotalCntGrid>
          <FaRegUser style={{ width: "16", height: "16", color: "#00397c" }} />
          <TotalCntDiv>{voteCntA + voteCntB}</TotalCntDiv>
        </TotalCntGrid>
        {/* 투표 상태에 따른 버튼 형식 변경 */}
        {!userNickname ? (
          <ButtonGrid>
            {SelctButtonA(null, contentA)}
            {SelctButtonB(null, contentB)}
          </ButtonGrid>
        ) : (
          <ButtonGrid>
            {voteCntA === voteCntB ? (
              <ButtonGrid>
                {SelctButtonA("#ADB5BD", contentA)}
                {SelctButtonB("#ADB5BD", contentB)}
              </ButtonGrid>
            ) : voteCntA > voteCntB ? (
              <ButtonGrid>
                {SelctButtonA("#ADB5BD", contentA)}
                {SelctButtonB(null, contentB)}
              </ButtonGrid>
            ) : (
              <ButtonGrid>
                {SelctButtonA(null, contentA)}
                {SelctButtonB("#ADB5BD", contentB)}
              </ButtonGrid>
            )}
          </ButtonGrid>
        )}
        {/* 투표율 그래프 */}
        <ProgressGrid>
          <EitherProgress>
            <ProgressLabel>
              <div className="LabelLeft">{percent + "%"}</div>
              <div className="LabelRight">{100 - percent + "%"}</div>
            </ProgressLabel>
            <HightLight width={percent + "%"} />
          </EitherProgress>
        </ProgressGrid>
        <EitherFooter>
          <div className="Position">
            <div>
              {/* 프로필 */}
              <Nickname
                nickname={nickname}
                userId={user}
                width={"32px"}
                height={"32px"}
                fontSize={"14px"}
              />
            </div>
            <div className="Grid">
              {!likeState ? ( //좋아요 이미지
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
  background: linear-gradient(
    180deg,
    rgba(134, 142, 150, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 46px 32px;
  position: relative;
  @media screen and (max-width: ${mobile}) {
    margin: 30px auto;
    width: 80%;
  }
`;
const ManuButtonGrid = styled.div`
  .div {
    position: relative;
  }
  position: absolute;
  top: 15px;
  right: 20px;
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
const ButtonGrid = styled.div`
  width: 312px;
  height: 160px;
  box-sizing: border-box;
  margin: 24px auto 0px auto;
  justify-content: center;
  @media screen and (max-width: ${mobile}) {
    width: 100%;
  }
`;
const EitherButtonA = styled.button`
  width: 156px;
  height: 160px;
  border: 2px solid #00397c;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 16px;
  font-family: "Noto-Sans KR", sans-serif;
  cursor: pointer;
  margin-right: -1px;
  &:hover {
    background-color: #dfdfdf;
  }
  @media screen and (max-width: ${mobile}) {
    width: 50%;
  }
`;
const EitherButtonB = styled.button`
  width: 156px;
  height: 160px;
  border: 2px solid #00397c;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 16px;
  font-family: "Noto-Sans KR", sans-serif;
  cursor: pointer;
  margin-left: -1px;
  &:hover {
    background-color: #dfdfdf;
  }
  @media screen and (max-width: ${mobile}) {
    width: 50%;
  }
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
  background-color: transparent;
  border: 2px solid #00397c;
`;
const HightLight = styled.div`
  background-color: #adb5bd;
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
  display: inline-flex;
  justify-content: space-between;
  transform: translateX(-50%);
  .LabelLeft {
    margin: 8px 0px 0px 10px;
  }
  .LabelRight {
    margin: 8px 10px 0px 0px;
  }
  @media screen and (max-width: ${mobile}) {
    width: 100%;
    .LabelLeft {
      margin: 8px 0px 0px 40px;
    }
    .LabelRight {
      margin: 8px 40px 0px 0px;
    }
  }
`;
const EitherFooter = styled.div`
  width: 100%;
  margin: auto;
  align-items: center;

  .Position {
    width: 82%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 430px;
    left: 50%;
    transform: translate(-50%, 0);
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
export default EitherCompleteCard;
