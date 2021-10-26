import React, { useCallback } from "react";
import styled from "styled-components";
import EitherWrite from "../components/EitherWrite";
import MultiWrite from "../components/MultiWrite";

import { history } from "../redux/configureStore";

const CardWrite = () => {
  const onClickBack = useCallback(() => {
    history.push("/either");
  });
  const onClickIndex = useCallback(() => {
    history.push("/");
  });

  return (
    <>
      <Wrap>
        <ButtonGrid>
          <button onClick={onClickBack}>{"<"} 뒤로가기</button>
          <button onClick={onClickIndex}>목록</button>
        </ButtonGrid>
        {/* <EitherWrite /> */}
        <MultiWrite />
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
