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
  console.log("answerrender", render);

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
      reRender();
      history.replace(`/multi/${multiId}`);
    } else {
      window.alert("선택한 투표항목이 없습니다");
      return;
    }
  };

  return (
    <Container>
      <AnswerBtn id="A" color="#777777" onClick={selectAnswer}>
        {DataList.contentA}
      </AnswerBtn>
      <AnswerBtn id="B" color="#777777" onClick={selectAnswer}>
        {DataList.contentB}
      </AnswerBtn>
      {DataList.contentC !== null ? (
        <AnswerBtn id="C" color="#777777" onClick={selectAnswer}>
          {DataList.contentC}
        </AnswerBtn>
      ) : null}
      {DataList.contentD !== null ? (
        <AnswerBtn id="D" color="#777777" onClick={selectAnswer}>
          {DataList.contentD}
        </AnswerBtn>
      ) : null}
      {DataList.contentE !== null ? (
        <AnswerBtn id="E" color="#777777" onClick={selectAnswer}>
          {DataList.contentE}
        </AnswerBtn>
      ) : null}
      <button onClick={selectComplete}>완료하고 결과보기</button>
      <button>render</button>
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
  border: none;
  margin: 5px auto;
  width: 50%;
  height: 50px;
  border-radius: 5px;
  opacity: 0.5;
  background-color: ${props => props.color};
  cursor: pointer;
  &.on {
    opacity: 1;
  }
  &:hover {
    opacity: 1;
  }
`;

export default AnswerList;
