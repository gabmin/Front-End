import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import EiterSlick from "../components/EitherSlick";

import EitherSlick from "../components/EitherSlick";
import { PostDB, PostingDB, PostCompleteDB } from "../redux/actions/eitherCard";

const Either = props => {
  const dispatch = useDispatch();

  const { eitherPost, eitherPosting, eitherPostComplete } = useSelector(
    state => state.eitherCard,
  );
  const PostList = eitherPost.either;
  const PostingList = eitherPosting.either;
  const PostCompleteList = eitherPostComplete.either;

  const [status, setStatus] = useState("Post");

  useEffect(() => {
    dispatch(PostDB());
    setStatus("Post");
  }, []);

  const onClickPost = () => {
    dispatch(PostDB());
    setStatus("Post");
  };
  const onClickPosting = () => {
    dispatch(PostingDB());
    setStatus("Posting");
  };
  const onClickCompletePost = () => {
    dispatch(PostCompleteDB());
    setStatus("CompletePost");
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
          {status === "Post" ? <EitherSlick PostList={PostList} /> : null}
          {status === "Posting" ? (
            <EitherSlick PostingList={PostingList} />
          ) : null}
          {status === "CompletePost" ? (
            <EitherSlick PostCompleteList={PostCompleteList} />
          ) : null}
          {/* 
          if ( status === "Post") {<EitherSlick cardList={PostList} />}else if
          (status === "Posting"){<EitherSlick cardList={PostingList} />}else if
          (status === "CompletePost")
          {<EitherSlick cardList={PostCompleteList} />} */}
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
