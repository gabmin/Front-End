import React from "react";
import styled from "styled-components";

const AnswerList = props => {
  const DataList = props.dataList;
  const [color, setColor] = React.useState("");
  const selected = e => {
    const checkSelect = t => [...t.parentElement.children].filter(e => e !== t);
    console.log("셀렉티드 이", e);
    checkSelect(e.target).map(x => {
      const newClass = String(x.classList[0] + " " + x.classList[1]);
      console.log("체크셀렉트엑스", x.classList[0], x.classList[1]);
      console.log("뉴클래스", newClass);
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
  };

  return (
    <Answerdiv>
      <AnswerBtn color="#777777" onClick={selectAnswer}>
        {DataList.contentA}
      </AnswerBtn>
      <AnswerBtn color="#777777" onClick={selectAnswer}>
        {DataList.contentB}
      </AnswerBtn>
      <AnswerBtn color="#777777" onClick={selectAnswer}>
        {DataList.contentC}
      </AnswerBtn>
      <AnswerBtn color="#777777" onClick={selectAnswer}>
        {DataList.contentD}
      </AnswerBtn>
      <AnswerBtn color="#777777" onClick={selectAnswer}>
        {DataList.contentE}
      </AnswerBtn>
    </Answerdiv>
  );
};

const Answerdiv = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
`;

const AnswerBtn = styled.button`
  border: none;
  margin: 5px auto;
  width: 50%;
  height: 50px;
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
