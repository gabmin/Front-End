import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useInput from "../hooks/useInput";
import { isError } from "lodash";
import { signup, checkIdDup, checkNickDup } from "../redux/actions/user";
import Spinner from "../elements/Spinner";

const Signup = () => {
  // const isLoggedIn = useSelector((state) => state.user.signinDone);

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
    const filter = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;
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
      console.log(id, nickname, password, passwordCheck, age);

      if (!idChecker()) return;
      if (!nickChecker()) return;
      if (!pwChecker()) return;
      if (!pwEqualChecker()) return;
      if (!ageChecker()) return;
      if (!idDupCheck) return alert("아이디 중복체크를 해주세요");
      if (!nickDupCheck) return alert("닉네임 중복체크를 해주세요");
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

  return (
    <>
      <Container>
        <Form onSubmit={onSubmit}>
          <Content>
            <InputWrapper>
              <input
                type="id"
                value={id}
                onChange={onChangeId}
                placeholder="아이디"
              />
              <button onClick={onClickIdDup}>중복확인</button>
            </InputWrapper>

            {idError && !checkIdDupLoading && idNotice && (
              <span>
                5~20자의 영문 소문자, 숫자와 특수기호(),(-)만 사용 가능합니다
              </span>
            )}
            {checkIdDupResult && !idError && !checkIdDupLoading && idNotice && (
              <span>사용가능한 아이디 입니다</span>
            )}
            {checkIdDupResult === false && !checkIdDupLoading && idNotice && (
              <span>이미 사용중인 아이디 입니다</span>
            )}
          </Content>
          <Content>
            <InputWrapper>
              <input
                type="text"
                value={nickname}
                onChange={onChangeNickname}
                placeholder="닉네임"
              />
              <button onClick={onClickNickDup}>중복확인</button>
            </InputWrapper>
            {nickError && !checkNickDupLoading && nickNotice && (
              <span>닉네임을 입력하세요</span>
            )}
            {checkNickDupResult &&
              !nickError &&
              !checkNickDupLoading &&
              nickNotice && <span>사용가능한 닉네임 입니다</span>}
            {checkNickDupResult === false &&
              !checkNickDupLoading &&
              nickNotice && <span>이미 사용중인 닉네임 입니다</span>}
          </Content>
          <Content>
            <InputWrapper>
              <input
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="비밀번호"
                style={{ width: "100%" }}
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
                style={{ width: "100%" }}
              />
            </InputWrapper>
            {passwordEqual && <span>같은 비밀번호를 입력해 주세요</span>}
          </Content>
          <Content>
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
            <button type="submit">회원가입</button>
          </ButtonWrapper>
        </Form>
      </Container>
    </>
  );
};

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
  width: 500px;
  margin: 30px auto;
  font-size: 20px;
  border: 1px solid gray;
  padding: 2em;

  select {
    width: 100%;
    height: 3em;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 80px;
  font-size: 0.6em;
  color: red;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60%;

  input {
    height: 100%;
    width: 70%;
    box-sizing: border-box;
  }

  button {
    height: 100%;
    width: 30%;
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

export default Signup;
