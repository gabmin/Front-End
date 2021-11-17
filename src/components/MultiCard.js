import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { FiThumbsUp, FiMessageSquare, FiMoreHorizontal } from "react-icons/fi";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import colors from "../shared/colors";
import { DetailDB } from "../redux/actions/multiDetail";
import { ClosePostDB, DeletePostDB } from "../redux/actions/multiCard";
import Nickname from "./Nickname";

const MultiCard = props => {
  const userInfo = useSelector(state => state.user.userInfo);
  const multiDetail = useSelector(state => state.multiDetail.multiDetail);
  const dataList = multiDetail.multi && multiDetail;

  const dispatch = useDispatch();
  const {
    multiId,
    title,
    description,
    user,
    nickname,
    date,
    editedDate,
    completed,
    likeCnt,
    commentCnt,
  } = props;

  // const TotalCnt =
  //   dataList &&
  //   dataList.multi.voteCntA +
  //     dataList.multi.voteCntB +
  //     dataList.multi.voteCntC +
  //     dataList.multi.voteCntD +
  //     dataList.multi.voteCntE;

  const history = useHistory();
  const goToDetail = () => {
    if (!userInfo.nickname) {
      window.alert("로그인 후 이용가능합니다");
      history.push("/login");
    } else {
      dispatch(DetailDB(multiId));
      history.push(`/multi/${multiId}`);
    }
  };

  // const deletePost = () => {
  //   if (TotalCnt === 0) {
  //     dispatch(DeletePostDB(multiId));
  //   } else {
  //     window.alert("투표가 진행된 게시물은 삭제할 수 없습니다");
  //     return;
  //   }
  // };

  const closePost = () => {
    const closeVote = window.confirm("투표를 종료하시겠습니까?");
    if (closeVote == true) {
      dispatch(ClosePostDB(multiId));
      history.push("/multi");
    }
    return;
  };

  // const editPost = () => {
  //   if (TotalCnt === 0) {
  //     history.push(`/multi/${multiId}/edit`);
  //   } else {
  //     window.alert("투표가 진행된 게시물은 수정할 수 없습니다");
  //     return;
  //   }
  // };

  return (
    <>
      {completed !== 1 ? (
        <Container>
          <Card>
            <MenuWarpper>
              <MenuBar>
                <Menu
                  menuButton={
                    <MenuButton
                      styles={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                    >
                      <FiMoreHorizontal size={20} />
                      {/* <MaterialIcon icon="more_horiz" size={32} /> */}
                    </MenuButton>
                  }
                  menuStyles={{ border: "0px solid" }}
                  portal={true}
                >
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    // onClick={editPost}
                  >
                    수정하기
                  </MenuItem>
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    // onClick={deletePost}
                  >
                    삭제하기
                  </MenuItem>
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={closePost}
                  >
                    투표 종료하기
                  </MenuItem>
                </Menu>
              </MenuBar>
            </MenuWarpper>
            <TitleWrapper>
              <TitleText>{title}</TitleText>
            </TitleWrapper>
            <DateWarpper>
              <DateText>{date.substring(0, 16)}</DateText>
            </DateWarpper>
            {/* <ContentHr /> */}
            <DesWrapper>
              <DesText>{description}</DesText>
            </DesWrapper>
            <VoteBtn onClick={goToDetail}>투표하기</VoteBtn>
            <TempWarpper>
              <FooterWrapper>
                <UserWrapper>
                  <NickText>
                    <Nickname
                      userId={user}
                      nickname={nickname}
                      fontSize={"14px"}
                      width={"32px"}
                      height={"32px"}
                    ></Nickname>
                  </NickText>
                  {/* {isEdited ? <p>{editedDate}</p> : null} */}
                </UserWrapper>
                <InfoWarpper>
                  <CommentWarpper>
                    <FiMessageSquare size={24} />{" "}
                    <TotalComment>{commentCnt}</TotalComment>
                  </CommentWarpper>
                  <LikeWarpper>
                    <FiThumbsUp size={24} />
                    <TotalLike>{likeCnt}</TotalLike>
                  </LikeWarpper>
                </InfoWarpper>
              </FooterWrapper>
            </TempWarpper>
          </Card>
        </Container>
      ) : (
        <ContainerB>
          <Card>
            <TitleWrapper>
              <TitleText>{title}</TitleText>
            </TitleWrapper>
            <DateWarpper>
              <DateText>{date.substring(0, 16)}</DateText>
            </DateWarpper>
            {/* <ContentHr /> */}
            <DesWrapper>
              <DesText>{description}</DesText>
            </DesWrapper>
            <VoteBtnB onClick={goToDetail}>다시보기</VoteBtnB>
            <TempWarpper>
              <FooterWrapper>
                <UserWrapper>
                  <NickText>
                    <Nickname
                      userId={user}
                      nickname={nickname}
                      fontSize={"14px"}
                      width={"32px"}
                      height={"32px"}
                    ></Nickname>
                  </NickText>
                  {/* {isEdited ? <p>{editedDate}</p> : null} */}
                </UserWrapper>
                <InfoWarpper>
                  <CommentWarpper>
                    <FiMessageSquare size={24} />{" "}
                    <TotalComment>{commentCnt}</TotalComment>
                  </CommentWarpper>
                  <LikeWarpper>
                    <FiThumbsUp size={24} />
                    <TotalLike>{likeCnt}</TotalLike>
                  </LikeWarpper>
                </InfoWarpper>
              </FooterWrapper>
            </TempWarpper>
          </Card>
        </ContainerB>
      )}
    </>
  );
};

const Container = styled.div`
  text-align: left;
  width: 380px;
  height: 490px;
  padding: 46px 56px;
  margin: 0 auto;
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
  box-sizing: border-box;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
`;

const ContainerB = styled.div`
  text-align: left;
  width: 380px;
  height: 490px;
  padding: 46px 56px;
  margin: 0 auto;
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
  box-sizing: border-box;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    rgba(134, 142, 150, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const Card = styled.div`
  width: 100%;
  height: 600px;

  margin: auto;
  word-break: break-all;
`;

const MenuWarpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MenuBar = styled.div`
  margin: 10px 10px 0 auto;
`;

const TitleWrapper = styled.div`
  width: 100%;
  /* height: 30px; */
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin: auto;
`;

const TitleText = styled.p`
  font-size: 20px;
  margin: 0 auto;
`;

const DateWarpper = styled.div`
  margin: auto;
`;

const DateText = styled.p`
  font-size: 11px;
  text-align: center;
  margin: 8px auto;
  color: ${colors.gray5};
`;

const ContentHr = styled.hr`
  border: none;
  width: 103px;
  height: 1px;
  margin: 12px auto 11px auto;
  background-color: ${colors.gray5};
`;

const DesWrapper = styled.div`
  margin: 16px auto 0 auto;
  height: 176px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
`;

const DesText = styled.p`
  font-size: 14px;
  color: ${colors.gray5};
`;

const VoteBtn = styled.button`
  display: block;
  width: 150px;
  height: 40px;
  margin: 60px auto 0 auto;
  border: none;
  border-radius: 8px;
  background-color: ${colors.red};
  font-size: 16px;
  color: ${colors.white};
  cursor: pointer;
`;

const VoteBtnB = styled.button`
  display: block;
  width: 150px;
  height: 40px;
  margin: 60px auto 0 auto;
  border: none;
  border-radius: 8px;
  background-color: ${colors.gray5};
  font-size: 16px;
  color: ${colors.white};
  cursor: pointer;
`;

const TempWarpper = styled.div``;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 12px auto 0 auto;
`;

const UserWrapper = styled.div`
  font-size: 6px;
  display: flex;
  flex-direction: row;
`;

const NickText = styled.p`
  font-size: 14px;
  color: ${colors.darkGray};
`;

const InfoWarpper = styled.div`
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CommentWarpper = styled.div`
  /* width: 30px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.blue};
`;

const TotalComment = styled.p`
  margin: 14px auto 14px 14px;
  font-size: 14px;
`;

const LikeWarpper = styled.div`
  /* width: 40px; */
  margin: auto auto auto 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.red};

  .FiThumbsUp {
  }
`;

const TotalLike = styled.p`
  margin: 14px auto 14px 14px;
  font-size: 14px;
`;

export default MultiCard;
