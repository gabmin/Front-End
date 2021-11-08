import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DetailVote } from "../redux/actions/multiDetail";
import { history } from "../redux/configureStore";

const AnswerList = props => {
  const dispatch = useDispatch();
  const DataList = props.dataList;
  const multiId = DataList.multiId;
  const render = props.render;

  const [color, setColor] = useState("");
  const [select, setSelect] = useState("");

  const selected = e => {
    const checkSelect = t => [...t.parentElement.children].filter(e => e !== t);
    checkSelect(e.target).map(x => {
      const newClass = String(x.classList[0] + " " + x.classList[1]);
      if (x.classList[2] === "on") {
        x.setAttribute("class", newClass);
      }
    });
    e.target.classList.add("on");
  };

  const selectAnswer = e => {
    const color = e.target.attributes.color.value;
    setColor(color);
    selected(e);
    setSelect(e.target.id);
    console.log("e", e.target.id);
  };

  console.log("select", select);

  const reRender = () => {
    render(true);
  };

  const selectComplete = () => {
    if (select !== "") {
      dispatch(DetailVote({ multiId, select: { select } }));
      window.location.reload(`/multi/${multiId}`);
      // history.replace(`/multi/${multiId}`);
    } else {
      window.alert("선택한 투표항목이 없습니다");
      return;
    }
  };

  return (
    <Container>
      <AnswerBtn id="A" color="#ffffff" onClick={selectAnswer}>
        {DataList.contentA}
      </AnswerBtn>
      <AnswerBtn id="B" color="#ffffff" onClick={selectAnswer}>
        {DataList.contentB}
      </AnswerBtn>
      {DataList.contentC !== null ? (
        <AnswerBtn id="C" color="#ffffff" onClick={selectAnswer}>
          {DataList.contentC}
        </AnswerBtn>
      ) : null}
      {DataList.contentD !== null ? (
        <AnswerBtn id="D" color="#ffffff" onClick={selectAnswer}>
          {DataList.contentD}
        </AnswerBtn>
      ) : null}
      {DataList.contentE !== null ? (
        <AnswerBtn id="E" color="#ffffff" onClick={selectAnswer}>
          {DataList.contentE}
        </AnswerBtn>
      ) : null}
      <CompleteWrapper>
        <CompleteBtn onClick={selectComplete}>완료하고 결과보기</CompleteBtn>
      </CompleteWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  /* border: 1px solid #000000; */
  display: flex;
  flex-direction: column;
`;

const AnswerBtn = styled.button`
  border: 1px #00397c solid;
  margin: 5px auto;
  width: 620px;
  height: 72px;
  text-align: left;
  word-break: break-all;
  border-radius: 8px;
  color: #00397c;
  background-color: ${props => props.color};
  cursor: pointer;
  &.on {
    opacity: 1;
    background-color: #00397c;
    color: #ffffff;
  }
  &:hover {
    opacity: 1;
  }
`;

const CompleteBtn = styled.button`
  width: 180px;
  height: 40px;
  margin: 14px auto 14px auto;
  color: #ffffff;
  background-color: #e25b45;
  border: none;
  border-radius: 8px;
`;

const CompleteWrapper = styled.div`
  margin: auto;
`;

export default AnswerList;
