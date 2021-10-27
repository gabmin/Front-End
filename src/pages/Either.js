import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import EitherSlick from "../components/EitherSlick";
import { PostDB, PostingDB, PostCompleteDB } from "../redux/actions/eitherCard";

const Either = props => {
  const dispatch = useDispatch();
  const { eitherPost, eitherPosting, eitherPostComplete } = useSelector(
    state => state.eitherCard,
  );

  const cardList = eitherPost.either;
  console.log(eitherPost.either);

  console.log(eitherPost);
  useEffect(() => {
    dispatch(PostDB());
    return null;
  }, []);

  const onClickPost = () => {
    dispatch(PostDB());
  };
  const onClickPosting = () => {
    dispatch(PostingDB());
  };
  const onClickCompletePost = () => {
    dispatch(PostCompleteDB());
  };

  return (
    <>
      <Wrap>
        <EitherButtonGrid>
          <EitherButton onClick={onClickPost}>전체</EitherButton>
          <EitherButton onClick={onClickPosting}>진행중</EitherButton>
          <EitherButton onClick={onClickCompletePost}>종료됨</EitherButton>
        </EitherButtonGrid>
        <SlickLayout>
          <EitherSlick cardList={cardList} />
        </SlickLayout>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  max-width: 100%;
`;

const EitherButtonGrid = styled.div`
  margin: 50px 0px;
  width: 100%;
  text-align: center;
`;

const EitherButton = styled.button`
  border: none;
  background-color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: green;
  }
`;
const SlickLayout = styled.div`
  margin: 100px auto;
  width: 100%;
  height: 100%;
`;

export default Either;
