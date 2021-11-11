import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { FiThumbsUp } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";

import colors from "../shared/colors";
import { DetailDB } from "../redux/actions/multiDetail";

const MultiCard = props => {
  const userInfo = useSelector(state => state.user.userInfo);

  const dispatch = useDispatch();
  const {
    multiId,
    title,
    description,
    nickname,
    date,
    editedDate,
    completed,
    likeCnt,
    commentCnt,
  } = props;
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
  return (
    <Container>
      <Card>
        <TitleWrapper>
          <TitleText>{title}</TitleText>
        </TitleWrapper>
        <DateWarpper>
          <DateText>{date}</DateText>
        </DateWarpper>
        <ContentHr />
        <DesWrapper>
          <DesText>{description}</DesText>
        </DesWrapper>
        <VoteBtn onClick={goToDetail}>투표하러가기</VoteBtn>

        <FooterWrapper>
          <UserWrapper>
            <NickText>{nickname}</NickText>
            {/* {isEdited ? <p>{editedDate}</p> : null} */}
          </UserWrapper>
          <InfoWarpper>
            <CommentWarpper>
              <FiMessageSquare /> <TotalComment>{commentCnt}</TotalComment>
            </CommentWarpper>
            <LikeWarpper>
              <FiThumbsUp />
              <TotalLike>{likeCnt}</TotalLike>
            </LikeWarpper>
          </InfoWarpper>
        </FooterWrapper>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  text-align: left;
  width: 620px;
  height: 600px;
  padding: 56px 72px;
  margin: 0 auto;
  background-color: ${colors.white};
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
  box-sizing: border-box;
  word-break: break-all;
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  width: 100%;
  height: 600px;

  margin: auto;
  word-break: break-all;
`;

const TitleWrapper = styled.div`
  width: 482px;
  height: 70px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin: auto;
`;

const TitleText = styled.p`
  font-size: 24px;
  margin: 0 auto;
`;

const DateWarpper = styled.div`
  margin: auto;
`;

const DateText = styled.p`
  font-size: 14px;
  margin: 0 auto;
  color: ${colors.gray5};
`;

const ContentHr = styled.hr`
  border: none;
  width: 103px;
  height: 1px;
  margin: 24px auto 22px 0;
  background-color: ${colors.gray5};
`;

const DesWrapper = styled.div`
  height: 258px;
`;

const DesText = styled.p`
  font-size: 16px;
  color: ${colors.gray5};
`;

const VoteBtn = styled.button`
  display: block;
  width: 180px;
  height: 40px;
  margin: 26px auto 20px auto;
  border: none;
  border-radius: 8px;
  background-color: ${colors.red};
  font-size: 16px;
  color: ${colors.white};
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  width: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CommentWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.blue};
`;

const TotalComment = styled.p`
  font-size: 12px;
`;

const LikeWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${colors.red};
`;

const TotalLike = styled.p`
  font-size: 12px;
`;

export default MultiCard;
