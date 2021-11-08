import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import CommentList from "./CommentList";
import CommentInput from "../elements/CommentInput";

const MultiComment = props => {
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  const multiId = props.multiId;
  const render = props.render;
  const renderState = props.state;
  console.log("renderState", renderState);
  console.log("commentdataList", dataList.comment);
  const [action, setAction] = useState(false);

  // const { AddCommentDBLoading, AddCommentDBDone } = useSelector(
  //   state => state.comment,
  // );

  // useEffect(() => {
  //   dispatch()
  // }, []);

  return (
    <Contaier>
      <TempWarpper>
        <TextAreaWarpper>
          <CommentInput multiId={multiId} />
        </TextAreaWarpper>

        <div>
          <CommentList
            multiId={multiId}
            dataList={dataList}
            // render={render}
            // renderState={renderState}
          />
        </div>
      </TempWarpper>
    </Contaier>
  );
};

const Contaier = styled.div`
  width: 620px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const TempWarpper = styled.div`
  max-width: 100%;
  margin: auto;
`;

const TextAreaWarpper = styled.div`
  max-width: 100%;
  margin: 0 auto 20px;
`;

export default MultiComment;
