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
          <h1>{title}</h1>
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
  width: 70%;
  height: 100%;
  padding: 20px;
  margin: 100px auto;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3);
  opacity: 0.3;
`;

const Card = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 20px 20px;
  margin: auto;
  box-sizing: border-box;
`;

const TitleWrapper = styled.div`
  margin: 0 0 0 10px;
  min-height: 20%;
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
