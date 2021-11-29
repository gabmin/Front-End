import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineLike, AiFillLike, AiOutlineUser } from "react-icons/ai";

import { mobile, tablet } from "../shared/style";
import Nickname from "./Nickname";
import { history } from "../redux/configureStore";
import {
  deletePostDB,
  likePostDB,
  votePostDB,
  completePostDB,
} from "../redux/actions/eitherCard";

const EitherListCard = props => {
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
      history.replace("/login");
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
        <div>
          <MenuButtonGrid>
            <div>
              {nickname === userNickname ? ( // 메뉴 버튼
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
                      onClick={onClickDelete}
                      data-testid="menuDelete"
                    >
                      삭제하기
                    </MenuItem>
                  </Menu>
                </div>
              ) : null}
            </div>
          </MenuButtonGrid>
          <TitleButtonGrid>
            <EitherFooter>
              <div className="Position">
                <div className="Profile">
                  {/* 프로필 */}
                  <Nickname
                    nickname={nickname}
                    userId={user}
                    width={"26px"}
                    height={"26px"}
                    fontSize={"14px"}
                  />
                </div>
                <div className="Grid">
                  {/* 투표한 인원 수 */}
                  <TotalCntGrid>
                    <AiOutlineUser
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#00397c",
                      }}
                    />
                    <TotalCntDiv>{voteCntA + voteCntB}</TotalCntDiv>
                  </TotalCntGrid>
                  {!likeState ? ( //좋아요 이미지
                    <AiOutlineLike
                      onClick={onClickLike}
                      style={{
                        width: "16px",
                        height: "16px",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <AiFillLike
                      style={{
                        width: "16px",
                        height: "16px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                  <div className="Likes">{likes}</div>
                </div>
              </div>
            </EitherFooter>
            <LeftGrid>
              {/* 제목 */}
              <TitleDiv> {title} </TitleDiv>
              {/* 날짜 */}
              <DateDiv>{date.substring(0, 16)}</DateDiv>
            </LeftGrid>
            <RightGrid>
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
            </RightGrid>
          </TitleButtonGrid>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 840px;
  width: 100%;
  min-height: 248px;
  height: 100%;
  box-sizing: border-box;
  margin: 20px auto;
  border: 2px solid #00397c;
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(134, 142, 150, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 44px 70px 60px 56px;
  position: relative;
  @media screen and (max-width: ${mobile}) {
    margin: 30px auto;
    padding: 10% 6%;
    width: 90%;
  }
`;
const MenuButtonGrid = styled.div`
  .div {
    position: relative;
  }
  position: absolute;
  top: 15px;
  right: 20px;
  @media screen and (max-width: ${mobile}) {
    top: 10px;
    right: 20px;
  }
`;
const TitleButtonGrid = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;
const LeftGrid = styled.div`
  width: 48%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const RightGrid = styled.div`
  width: 52%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TitleDiv = styled.div`
  width: 90%;
  font-size: 18px;
  font-weight: bold;
  word-break: break-all;
`;
const DateDiv = styled.div`
  margin: 10px 0px;
  font-size: 14px;
  color: #868e96;
  position: relative;
  @media screen and (max-width: ${mobile}) {
    font-size: 12px;
  }
`;
const ButtonGrid = styled.div`
  max-width: 365px;
  width: 100%;
  height: 100%;
  margin: 0px;
  display: inline-flex;
`;
const EitherButtonA = styled.button`
  width: 50%;
  min-height: 120px;
  height: 100%;
  border: 2px solid #00397c;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-right: -1px;
  @media screen and (max-width: ${mobile}) {
    width: 50%;
  }
`;
const EitherButtonB = styled.button`
  width: 50%;
  min-height: 120px;
  height: 100%;
  border: 2px solid #00397c;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-left: -1px;
  @media screen and (max-width: ${mobile}) {
    width: 50%;
  }
`;
const ButtonText = styled.div`
  max-width: 65px;
  width: 100%;
  word-break: break-all;
  display: inline-block;
  vertical-align: middle;
  font-size: 13px;
  font-weight: bold;
  font-family: "Noto-Sans KR", sans-serif;
`;
const ProgressGrid = styled.div`
  width: 100%;
  margin: auto;
`;
const EitherProgress = styled.div`
  margin: 24px auto 0px auto;
  position: relative;
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
  width: 100%;
  position: absolute;
  color: #00397c;
  margin-top: 6px;
  font-size: 12px;
  display: inline-flex;
  justify-content: space-between;
  .LabelLeft {
    margin: 8px 0px 0px 10px;
  }
  .LabelRight {
    margin: 8px 10px 0px 0px;
  }
`;
const EitherFooter = styled.div`
  width: 39%;
  position: absolute;
  top: 71.5%;
  left: 56px;
  align-items: center;
  @media screen and (max-width: ${mobile}) {
    top: 67%;
    left: 8%;
  }

  .Position {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: ${mobile}) {
      flex-direction: column;
      justify-content: flex-start;
    }
  }
  .Profile {
    width: 100%;
    @media screen and (max-width: ${mobile}) {
      margin-bottom: 10px;
    }
  }
  .Grid {
    width: 100%;
    color: #e25b45;
    display: flex;
    align-items: center;
  }
  .Likes {
    font-size: 14px;
    margin-left: 14px;
    @media screen and (max-width: ${mobile}) {
      margin-left: 10px;
    }
  }
`;
const TotalCntGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  @media screen and (max-width: ${mobile}) {
    margin-right: 10px;
  }
`;
const TotalCntDiv = styled.div`
  font-size: 14px;
  color: #868e96;
  margin-left: 10px;
`;

export default EitherListCard;
