import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";

import colors from "../shared/colors";
import Nickname from "./Nickname";
import { DetailDB } from "../redux/actions/multiDetail";
import { mobile } from "../shared/style";

const MultiList = props => {
  const userNickname = localStorage.getItem("nickname");
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

  const history = useHistory();
  const goToDetail = () => {
    if (!userNickname) {
      window.alert("로그인 후 이용가능합니다");
      history.push("/login");
    } else {
      window.scroll(0, 0);
      dispatch(DetailDB(multiId));
      history.push(`/multi/${multiId}`);
    }
  };

  return (
    <>
      {completed !== 1 ? (
        <Container>
          <Card>
            <TitleWrapper>
              <TitleText onClick={goToDetail}>{title}</TitleText>
              <VoteBtn>
                <button className="Detail" onClick={goToDetail}>
                  투표하기
                </button>
              </VoteBtn>
            </TitleWrapper>
            <DateWarpper>
              <DateText>{date.substring(0, 16)}</DateText>
            </DateWarpper>
            <ContentHr />
            <DesWrapper>
              <DesText>{description}</DesText>
            </DesWrapper>

            <FooterWrapper>
              <UserWrapper>
                <NickText>
                  <Nickname
                    userId={user}
                    nickname={nickname}
                    fontSize={"12px"}
                    width={"16px"}
                    height={"16px"}
                  ></Nickname>
                </NickText>
                {/* {isEdited ? <p>{editedDate}</p> : null} */}
              </UserWrapper>
              <InfoWarpper>
                <CommentWarpper>
                  <FiMessageSquare size={16} />{" "}
                  <TotalComment>{commentCnt}</TotalComment>
                </CommentWarpper>
                <LikeWarpper>
                  <FiThumbsUp size={16} />
                  <TotalLike>{likeCnt}</TotalLike>
                </LikeWarpper>
              </InfoWarpper>
            </FooterWrapper>
          </Card>
        </Container>
      ) : (
        <ContainerB>
          <Card>
            <TitleWrapper>
              <TitleText onClick={goToDetail}>{title}</TitleText>
              <VoteBtnB>
                {" "}
                <button className="DetailB" onClick={goToDetail}>
                  다시보기
                </button>
              </VoteBtnB>
            </TitleWrapper>
            <DateWarpper>
              <DateText>{date.substring(0, 16)}</DateText>
            </DateWarpper>
            <ContentHr />
            <DesWrapper>
              <DesText>{description}</DesText>
            </DesWrapper>

            <FooterWrapper>
              <UserWrapper>
                <NickText>
                  <Nickname
                    userId={user}
                    nickname={nickname}
                    fontSize={"12px"}
                    width={"16px"}
                    height={"16px"}
                  ></Nickname>
                </NickText>
                {/* {isEdited ? <p>{editedDate}</p> : null} */}
              </UserWrapper>
              <InfoWarpper>
                <CommentWarpper>
                  <FiMessageSquare size={16} />{" "}
                  <TotalComment>{commentCnt}</TotalComment>
                </CommentWarpper>
                <LikeWarpper>
                  <FiThumbsUp size={16} />
                  <TotalLike>{likeCnt}</TotalLike>
                </LikeWarpper>
              </InfoWarpper>
            </FooterWrapper>
          </Card>
        </ContainerB>
      )}
    </>
  );
};

const Container = styled.div`
  text-align: left;
  width: 840px;
  height: 248px;
  padding: 44px 56px 56px 56px;
  margin: 24px auto;
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
  box-sizing: border-box;
  /* word-break: break-all; */
  /* display: flex;
  flex-direction: column; */
  position: relative;
  background-color: ${colors.white};
  @media screen and (max-width: ${mobile}) {
    margin: 30px auto;
    width: 80%;
    padding: 7% 6%;
  }
`;

const ContainerB = styled.div`
  text-align: left;
  width: 840px;
  height: 248px;
  padding: 44px 56px 56px 56px;
  margin: 24px auto;
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;
  /* word-break: break-all; */
  /* display: flex;
  flex-direction: column; */
  background: linear-gradient(
    180deg,
    rgba(134, 142, 150, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  @media screen and (max-width: ${mobile}) {
    margin: 30px auto;
    width: 80%;
    padding: 7% 6%;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin: auto;
  word-break: break-all;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 26px;
  text-align: left;
  font-size: 20px;
  font-weight: 700;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: ${mobile}) {
    /* flex-direction: column; */
  }
`;

const TitleText = styled.p`
  font-size: 18px;
  /* margin: 0 auto; */
  cursor: pointer;
  /* line-height: 26px; */
  @media screen and (max-width: ${mobile}) {
    font-size: 18px;
    margin-right: 5px;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const DateWarpper = styled.div`
  margin: auto;
  height: 20px;
`;

const DateText = styled.p`
  font-size: 14px;
  text-align: left;
  line-height: 20px;
  margin: 10px auto 12px auto;
  color: ${colors.gray5};
  @media screen and (max-width: ${mobile}) {
    font-size: 12px;
  }
`;

const ContentHr = styled.hr`
  border: none;
  background-color: ${colors.gray5};
  width: 48px;
  height: 1px;
  margin: 8px auto 0 0;
`;

const DesWrapper = styled.div`
  /* margin: 16px auto 0 auto; */
  /* height: 176px; */
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media screen and (max-width: ${mobile}) {
    font-size: 12px;
    -webkit-line-clamp: 3;
  }
`;

const DesText = styled.p`
  font-size: 16px;
  /* line-height: 22px; */
  color: ${colors.gray5};
  /* margin: 0 auto 0 0; */
  @media screen and (max-width: ${mobile}) {
    font-size: 14px;
  }
`;

const VoteBtn = styled.div`
  width: 150px;
  min-width: 110px;

  .Detail {
    display: block;
    width: 150px;
    height: 40px;
    margin: 0 0 0 auto;

    border: none;
    border-radius: 8px;
    background-color: ${colors.red};
    font-size: 16px;
    font-family: "Noto-Sans KR", sans-serif;
    color: ${colors.white};
    cursor: pointer;
    &:hover {
      background-color: ${colors.white};
      color: ${colors.red};
      border: 1px ${colors.red} solid;
    }
    @media screen and (max-width: ${mobile}) {
      font-size: 14px;
      width: 110px;
      height: 36px;
    }
  }
  @media screen and (max-width: ${mobile}) {
    width: 120px;
  }
`;

const VoteBtnB = styled.div`
  width: 150px;
  min-width: 110px;

  .DetailB {
    display: block;
    width: 150px;
    height: 40px;
    margin: 0 0 0 auto;

    border: none;
    border-radius: 8px;
    background-color: ${colors.gray5};
    font-size: 16px;
    font-family: "Noto Sans KR", sans-serif;
    color: ${colors.white};
    cursor: pointer;
    &:hover {
      background-color: ${colors.white};
      color: ${colors.gray5};
      border: 1px ${colors.gray5} solid;
    }
    @media screen and (max-width: ${mobile}) {
      font-size: 14px;
      width: 110px;
      height: 36px;
    }
  }
  @media screen and (max-width: ${mobile}) {
    width: 120px;
  }
`;

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto -12px auto;
`;

const UserWrapper = styled.div`
  font-size: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NickText = styled.p`
  height: 17px;
  color: ${colors.darkGray};
  /* &:hover {
    transform: translateY(-3px);
    transition: transform 200ms;
  } */
`;

const InfoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CommentWarpper = styled.div`
  margin: auto auto auto 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.blue};
  height: 20px;
`;

const TotalComment = styled.p`
  margin: 0 auto 0 14px;
  font-size: 14px;
`;

const LikeWarpper = styled.div`
  margin: auto auto auto 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.red};
  height: 20px;
`;

const TotalLike = styled.p`
  margin: 0 auto 0 14px;
  font-size: 14px;
`;

export default MultiList;
