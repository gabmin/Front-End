import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useInput from "../hooks/useInput";
import { signup, checkIdDup, checkNickDup } from "../redux/actions/user";
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
  darkGray,
} from "../shared/style";

const Signup = () => {
  const isLoggedIn = useSelector(state => state.user.userInfo.userId);

  const dispatch = useDispatch();

  const {
    checkIdDupResult,
    checkIdDupLoading,
    checkNickDupLoading,
    checkNickDupResult,
  } = useSelector(state => state.user);

  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, setPassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useInput("");
  const [age, setAge] = useInput("");
  const [idError, setIdError] = useState(false);
  const [idNotice, setIdNotice] = useState(false);
  const [idDupCheck, setIdDupCheck] = useState(false);
  const [nickNotice, setNickNotice] = useState(false);
  const [nickDupCheck, setNickDupCheck] = useState(false);
  const [nickError, setNickError] = useState(false);
  const [nickLength, setNickLength] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordEqual, setPasswordEqual] = useState(false);
  const [ageError, setAgeError] = useState(false);

  useEffect(() => {
    setIdNotice(false);
    setIdDupCheck(false);
  }, [id]);

  useEffect(() => {
    setNickNotice(false);
    setNickDupCheck(false);
  }, [nickname]);

  useEffect(() => {
    if (isLoggedIn) {
      alert("로그인 상태에서 접속할 수 없습니다");
      history.push("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setIdDupCheck(checkIdDupResult);
  }, [checkIdDupResult]);

  useEffect(() => {
    setNickDupCheck(checkNickDupResult);
  }, [checkNickDupResult]);

  const idFilter = useCallback(id => {
    const filter = /^[a-z0-9_-]{5,20}$/;
    return filter.test(id);
  }, []);

  const pwFilter = useCallback(password => {
    const filter =
      /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-z0-9!@#$%^&*?-]{8,16}$/;
    return filter.test(password);
  }, []);

  const idChecker = useCallback(() => {
    if (!id.trim()) {
      setIdError(true);
      setIdNotice(true);
      return false;
    }
    if (!idFilter(id)) {
      setIdError(true);
      setIdNotice(true);
      return false;
    }
    setIdError(false);
    return true;
  }, [idFilter, id]);

  const nickChecker = useCallback(() => {
    if (nickname.length < 2 || nickname.length > 7) {
      setNickLength(true);
      return;
    }
    setNickLength(false);
    if (!nickname.trim()) {
      setNickError(true);
      setNickNotice(true);
      return false;
    }
    setNickError(false);
    return true;
  }, [nickname]);

  const pwChecker = useCallback(() => {
    if (!password.trim()) {
      setPasswordError(true);
      return false;
    }
    if (!pwFilter(password)) {
      setPasswordError(true);
      return false;
    }
    setPasswordError(false);
    return true;
  }, [password, pwFilter]);

  const pwEqualChecker = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordEqual(true);
      return false;
    }
    setPasswordEqual(false);
    return true;
  }, [password, passwordCheck]);

  const ageChecker = useCallback(() => {
    if (!age.trim()) {
      setAgeError(true);
      return false;
    }
    setAgeError(false);
    return true;
  }, [age]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      if (!idChecker()) return;
      if (!nickChecker()) return;
      if (!pwChecker()) return;
      if (!pwEqualChecker()) return;
      if (!ageChecker()) return;
      if (!idDupCheck) return;
      if (!nickDupCheck) return;
      dispatch(
        signup({
          userId: id,
          nickname: nickname,
          pw: password,
          confirmPw: passwordCheck,
          ageGroup: age,
        }),
      );
      return;
    },
    [
      idChecker,
      idDupCheck,
      pwChecker,
      nickChecker,
      nickDupCheck,
      pwEqualChecker,
      ageChecker,
      id,
      nickname,
      password,
      passwordCheck,
      age,
      dispatch,
    ],
  );

  const onClickIdDup = useCallback(
    e => {
      e.preventDefault();
      idChecker();
      dispatch(
        checkIdDup({
          userId: id,
        }),
      );
      setIdNotice(true);
      setIdDupCheck(true);
    },
    [dispatch, id, idChecker],
  );

  const onClickNickDup = useCallback(
    e => {
      e.preventDefault();
      nickChecker();
      dispatch(
        checkNickDup({
          nickname,
        }),
      );
      setNickNotice(true);
      setNickDupCheck(true);
    },
    [dispatch, nickname, nickChecker],
  );

  const onClickLogin = useCallback(() => {
    history.push("/login");
  }, []);

  return (
    <>
      <Container>
        <Form onSubmit={onSubmit}>
          <StyledSymbol />
          <Logo fill={blue} height="30px" style={{ margin: "10px 0 35" }} />
          <SelectSubject>
            <span className="selectAgeInfo">가입 하기</span>
          </SelectSubject>
          <IdPwWrapper>
            <InputContent>
              <InputWrapper>
                <input
                  type="id"
                  value={id}
                  onChange={onChangeId}
                  placeholder="아이디"
                  onBlur={onClickIdDup}
                />
              </InputWrapper>

              {idError && !checkIdDupLoading && idNotice && (
                <span>
                  5~20자의 영문 소문자, 숫자와 특수기호(),(-)만 가능합니다.
                </span>
              )}
              {checkIdDupResult &&
                !idError &&
                !checkIdDupLoading &&
                idNotice && (
                  <span style={{ color: blue }}>사용가능한 아이디 입니다</span>
                )}
              {checkIdDupResult === false && !checkIdDupLoading && idNotice && (
                <span>이미 사용중인 아이디 입니다</span>
              )}
            </InputContent>
            <Content>
              <InputWrapper>
                <input
                  type="text"
                  value={nickname}
                  onChange={onChangeNickname}
                  placeholder="닉네임"
                  onBlur={onClickNickDup}
                />
              </InputWrapper>
              {/* {nickError && !checkNickDupLoading && nickNotice && (
                <span>닉네임을 입력하세요</span>
              )} */}
              {checkNickDupResult &&
                !nickError &&
                !checkNickDupLoading &&
                !nickLength &&
                nickNotice && (
                  <span style={{ color: blue }}>사용가능한 닉네임 입니다</span>
                )}
              {nickLength && !checkNickDupLoading && nickNotice && (
                <span>2~7자로 입력해 주세요</span>
              )}
              {checkNickDupResult === false &&
                !checkNickDupLoading &&
                nickNotice && <span>이미 사용중인 닉네임 입니다</span>}
            </Content>
          </IdPwWrapper>
          <Content>
            <InputWrapper>
              <input
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="비밀번호"
                autocomplete="new-password"
              />
            </InputWrapper>
            {passwordError && (
              <span>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요</span>
            )}
          </Content>
          <Content>
            <InputWrapper>
              <input
                type="password"
                value={passwordCheck}
                onChange={setPasswordCheck}
                placeholder="비밀번호확인"
              />
            </InputWrapper>
            {passwordEqual && <span>같은 비밀번호를 입력해 주세요</span>}
          </Content>
          <Content>
            <SelectSubject>
              <span className="selectAgeInfo">연령 정보</span>
              <span className="selectAgeExp">
                아래의 정보는 이용자 통계에만 이용되며, 공개적으로 표시되지
                않습니다.
              </span>
            </SelectSubject>
            <InputWrapper>
              <select onChange={setAge}>
                <option value="">연령대를 선택해 주세요</option>
                <option value={10}>10대</option>
                <option value={20}>20대</option>
                <option value={30}>30대</option>
                <option value={40}>40대</option>
                <option value={50}>50대 이상</option>
              </select>
            </InputWrapper>
            {ageError && <span>연령대를 선택해 주세요</span>}
          </Content>
          <ButtonWrapper>
            <SignupButton type="submit">회원가입</SignupButton>
          </ButtonWrapper>
        </Form>
        <LoginWrapper>
          <span>계정이 이미 있으신가요?</span>
          <span className="goLogin" onClick={onClickLogin}>
            로그인
          </span>
        </LoginWrapper>
      </Container>
    </>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  user-select: none;

  .goLogin {
    color: ${red};
    margin: 0 24px;
    cursor: pointer;
  }

  @media screen and (max-width: ${mobile}) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 100px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 840px;
  height: 656px;
  box-sizing: border-box;
  margin: 30px auto;
  font-size: 20px;
  border: 2px solid ${blue};
  border-radius: 10px;
  padding: 2em;

  select {
    border-radius: 10px;
    border: 1px solid ${darkGray};
    padding-left: 20px;
    width: 100%;
    height: 48px;
    /* appearance: none; */
    /* background-image: url('../images/chevronDown.png'); */
  }

  input {
    border-radius: 10px;
    border: 1px solid ${gray5};
    background-color: ${grayMultiply};
    padding-left: 20px;

    ::placeholder {
      font-size: 14px;
    }
  }
`;

const StyledSymbol = styled(Symbol)`
  user-select: none;
  height: 37px;
  fill: ${blue};
`;

const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 620px;
  height: 80px;
  font-size: 0.6em;
  color: ${red};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 620px;
  height: 80px;
  font-size: 0.6em;
  color: ${red};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60%;

  input {
    width: 100%;
  }
`;

const SelectSubject = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: 90%;
  max-width: 620px;

  .selectAgeInfo {
    font-size: 18px;
    font-weight: bold;
  }

  .selectAgeExp {
    font-size: 12px;
    color: #495057;
    margin: 5px 0;
  }
`;

const IdPwWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  max-width: 620px;
  justify-content: space-between;

  input {
    width: 290px;
    box-sizing: border-box;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;

  button {
    width: 100%;
    height: 3em;
  }
`;

const SignupButton = styled.button`
  position: relative;
  top: 60px;
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

export default Signup;
