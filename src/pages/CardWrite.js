import React from "react";
import styled from "styled-components";
import EitherWrite from "../components/EitherWrite";
import MultiWrite from "../components/MultiWrite";

const CardWrite = () => {
  return (
    <>
      <Wrap>
        <ButtonGrid>
          <button>{"<"} 뒤로가기</button>
          <button>목록</button>
        </ButtonGrid>
        <EitherWrite />
        {/* <MultiWrite /> */}
        <div>
          <button>취소</button>
          <button>완료</button>
        </div>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 80%;
  height: 100%;
  margin: 50px auto;
`;
const ButtonGrid = styled.div`
  width: 100%;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

export default CardWrite;
