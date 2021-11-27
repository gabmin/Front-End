import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { login } from "../redux/actions/user";
import { history } from "../redux/configureStore";

import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as Symbol } from "../images/symbolBlue.svg";
import {
  blue,
  red,
  mobile,
  tablet,
  gray5,
  grayMultiply,
} from "../shared/style";

const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.userInfo.userId);
  const { loginError } = useSelector(state => state.user);

  const [id, onChangeId] = useState("");
  const [password, onChangePassword] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);
  const [typed, setTyped] = useState(false);

  const idChecker = useCallback(() => {
    if (!id.trim()) {
      setIdCheck(true);
      return false;
    }
    return true;
  }, [id]);

  const pwChecker = useCallback(() => {
    if (!password.trim()) {
      setPwCheck(true);
      return false;
    }
    return true;
  }, [password]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      if (idChecker() && pwChecker()) {
        dispatch(
          login({
            userId: id,
            pw: password,
          }),
        );
      }
      setTyped(false);
    },
    [idChecker, pwChecker, dispatch, id, password],
  );

  const onChangeIdInput = useCallback(e => {
    onChangeId(e.target.value);
    setIdCheck(false);
  }, []);

  const onChangePasswordInput = useCallback(e => {
    onChangePassword(e.target.value);
    setPwCheck(false);
    setTyped(true);
  }, []);

  const onClickSignup = useCallback(() => {
    history.push("/signup");
  }, []);

  return (
    <>
      <Container>
        <Form onSubmit={onSubmit}>
          <StyledSymbol />
          <Logo fill={blue} height="30px" style={{ margin: "10px 0 40px" }} />
          <div>
            <input
              className="idInput"
              type="text"
              value={id}
              onChange={onChangeIdInput}
              placeholder="아이디"
            />
            {idCheck && "아이디를 입력하세요"}
          </div>

          <div>
            <input
              className="pwInput"
              type="password"
              value={password}
              onChange={onChangePasswordInput}
              placeholder="비밀번호"
            />
            <span>
              {pwCheck && "비밀번호를 입력하세요"}
              {!typed &&
                !pwCheck &&
                loginError &&
                "아이디 또는 비밀번호를 잘못 입력했습니다."}
            </span>
          </div>
          <LoginButton type="submit" data-testid="loginButton">
            로그인
          </LoginButton>
        </Form>
        <SignupWrapper>
          <span data-testid="idInput">
            계정이 없으신가요? 지금 바로 가입하세요!
          </span>
          <SignupButton onClick={onClickSignup}>회원가입</SignupButton>
        </SignupWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 620px;
  width: 90%;
  height: 750px;
  margin: auto;

  @media screen and (max-width: ${mobile}) {
    align-items: unset;
    height: 550px;
  }
`;

const Form = styled.form`
  position: relative;
  top: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 416px;
  font-size: 20px;
  padding: 40px 50px 50px;
  border: 2px solid ${blue};
  border-radius: 10px;
  box-sizing: border-box;

  @media screen and (max-width: ${mobile}) {
    top: 20px;
  }

  & div {
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 70px;
    font-size: 12px;
    color: ${red};

    input {
      max-width: 400px;
      width: 100%;
      height: 48px;
      border: 1px solid ${gray5};
      border-radius: 7px;
      background-color: ${grayMultiply};
      padding-left: 20px;
      margin: 0 auto 3px;
      box-sizing: border-box;

      ::placeholder {
        font-size: 14px;
      }
    }

    span {
      margin: 3px 0 0;
    }
  }
`;

const StyledSymbol = styled(Symbol)`
  user-select: none;
  height: 37px;
  fill: ${blue};
`;

const LoginButton = styled.button`
  position: relative;
  top: 35px;
  width: 180px;
  height: 40px;
  margin: 0 0 10px;
  background-color: ${red};
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 220px 0 0;
  font-size: 12px;
  font-weight: 500;

  @media screen and (max-width: ${mobile}) {
    margin: 30px 0;
  }
`;

const SignupButton = styled.button`
  position: relative;
  width: 180px;
  height: 40px;
  margin: 15px 0 0;
  background-color: white;
  color: ${red};
  font-size: 16px;
  border: 1px solid ${red};
  border-radius: 10px;
  cursor: pointer;
`;

export default Login;
