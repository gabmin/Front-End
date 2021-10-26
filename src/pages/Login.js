import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Login = () => {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.user.signinDone);

  const [id, onChangeId] = useState("");
  const [password, onChangePassword] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);

  const idChecker = useCallback(() => {
    if (!id.trim()) {
      setIdCheck(true);
    }
  }, [id]);

  const pwChecker = useCallback(() => {
    if (!password.trim()) {
      setPwCheck(true);
    }
  }, [password]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      idChecker();
      pwChecker();
      // dispatch(
      //   signin({
      //     id,
      //     password,
      //   })
      // );
    },
    [idChecker, pwChecker],
  );

  const onChangeIdInput = useCallback(e => {
    onChangeId(e.target.value);
    setIdCheck(false);
  }, []);

  const onChangePasswordInput = useCallback(e => {
    onChangePassword(e.target.value);
    setPwCheck(false);
  }, []);

  const onClickSignup = useCallback(() => {
    history.push("/signup");
  }, []);

  return (
    <>
      <Container>
        <Form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              value={id}
              onChange={onChangeIdInput}
              placeholder="아이디"
            />
            {idCheck && "아이디를 입력하세요"}
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={onChangePasswordInput}
              placeholder="비밀번호"
            />
            {pwCheck && "비밀번호를 입력하세요"}
          </div>
          <Buttons>
            <button type="submit">로그인</button>
            <button onClick={onClickSignup}>회원가입</button>
          </Buttons>
        </Form>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 300px;
  margin: 100px auto 300px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100%;
  font-size: 20px;
  margin: 30px auto 0;
  padding: 50px 50px 50px;
  border: 1px solid gray;

  & div {
    display: flex;
    flex-direction: column;
    height: 80px;
    font-size: 0.8em;
    color: red;

    input {
      width: 100%;
      height: 50px;
      float: right;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;

  button {
    width: 100%;
    height: 50px;
    margin: 0 0 10px;
  }
`;

export default Login;
