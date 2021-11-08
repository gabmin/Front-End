import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FiThumbsUp } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";

import colors from "../shared/colors";
import AnswerList from "./AnswerList";
import { AddLikeDB } from "../redux/actions/multiLike";

const MultiUnvoted = props => {
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  const multiList = dataList.multi;
  const multiId = props.multiId;
  const [likes, setLikes] = useState(multiList.likeCnt);

  const addLike = () => {
    if (multiList.liked === null) {
      dispatch(AddLikeDB(multiId));
      setLikes(multiList.likeCnt + 1);
    } else {
      return;
    }
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>{multiList.title}</Title>
      </TitleWrapper>
      <Date>{multiList.date}</Date>
      <Hr />
      <div>
        <AnswerList dataList={multiList} />
      </div>
      <DesWrapper>
        <Description>{multiList.description}</Description>
      </DesWrapper>
      <InfoWarpper>
        <Nickname>{multiList.nickname}</Nickname>
        <RightWarpper>
          <CommentWarpper>
            <FiMessageSquare />{" "}
            <TotalComment>
              {dataList.comment.length + dataList.childComment.length}
            </TotalComment>
          </CommentWarpper>
          <LikeWarpper>
            <LikeBtn onClick={addLike}>
              <FiThumbsUp />
            </LikeBtn>{" "}
            <TotalLike>{likes}</TotalLike>
          </LikeWarpper>
        </RightWarpper>
      </InfoWarpper>
      <CommentHr />
    </Container>
  );
};

const Container = styled.div`
  width: 620px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  width: 612px;
  margin: auto;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const Title = styled.p`
  font-size: 24px;
`;

const Date = styled.p`
  margin: auto;
  color: ${colors.gray5};
  font-size: 14px;
`;

const Hr = styled.hr`
  width: 103px;
`;

const DesWrapper = styled.div`
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${colors.gray5};
`;

const InfoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled.p`
  font-size: 14px;
  color: ${colors.darkGray};
`;

const RightWarpper = styled.div`
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const LikeBtn = styled.button`
  font-size: 16px;
  color: ${colors.red};
  /* width: 24px;
  height: 24px; */
  border: none;
  background-color: ${colors.white};
`;

const TotalLike = styled.p`
  font-size: 12px;
`;

const CommentHr = styled.hr`
  width: 620px;
`;

export default MultiUnvoted;
