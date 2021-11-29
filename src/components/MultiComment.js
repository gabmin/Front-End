import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import CommentList from "./CommentList";
import CommentInput from "../elements/CommentInput";
import colors from "../shared/colors";

const MultiComment = props => {
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  const multiId = props.multiId;
  const render = props.render;
  const renderState = props.state;

  // const { AddCommentDBLoading, AddCommentDBDone } = useSelector(
  //   state => state.comment,
  // );

  // useEffect(() => {
  //   dispatch()
  // }, []);

  return (
    <Contaier>
      <Warpper>
        <TextAreaWarpper>
          <CommentInput multiId={multiId} />
        </TextAreaWarpper>
        {dataList.comment[0] ? (
          <div>
            <CommentList
              multiId={multiId}
              items={dataList.comment}
              // render={render}
              // renderState={renderState}
            />
          </div>
        ) : (
          <EmptyComment> 첫번째 댓글을 남겨주세요!</EmptyComment>
        )}
      </Warpper>
    </Contaier>
  );
};

const Contaier = styled.div`
  max-width: 620px;
  margin: 10px auto 20px auto;
  display: flex;
  flex-direction: column;
`;

const Warpper = styled.div`
  width: 90%;
  margin: auto;
`;

const TextAreaWarpper = styled.div`
  min-width: 100%;
  max-width: 620px;
  margin: 0 auto 20px;
`;

const EmptyComment = styled.p`
  text-align: center;
  color: ${colors.darkGray};
  font-size: 12px;
`;

export default MultiComment;
