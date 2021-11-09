import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
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
    <Container onClick={goToDetail}>
      <Card>
        <TitleWrapper>
          <TitleText>{title}</TitleText>
        </TitleWrapper>
        <DesWrapper>
          <p>{description}</p>
        </DesWrapper>
        <hr></hr>
        <FooterWrapper>
          <UserWrapper>
            <p>{nickname}</p>
            <p>{date}</p>
            {/* {isEdited ? <p>{editedDate}</p> : null} */}
          </UserWrapper>
          <p>{likeCnt}</p>
          <p>{commentCnt}</p>
        </FooterWrapper>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  width: 620px;
  height: 600px;
  padding: 20px;
  margin: 100px auto;
  background-color: #ffffff;
  border: 2px #00397c solid;
  border-radius: 10px;
  box-sizing: border-box;
  word-break: break-all;
`;

const Card = styled.div`
  width: 620px;
  height: 600px;
  padding: 20px 20px;
  margin: auto;
  word-break: break-all;
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin: 0 0 0 10px;
  min-height: 20%;
  word-break: break-all;
`;

const TitleText = styled.p`
  font-size: 24px;
`;

const DesWrapper = styled.div`
  min-height: 70%;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserWrapper = styled.div`
  font-size: 6px;
  display: flex;
  flex-direction: row;
`;

export default MultiCard;
