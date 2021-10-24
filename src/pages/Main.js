import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginDB } from "../redux/actions/user";

const Main = props => {
  const dispatch = useDispatch();
  const id = "gom";
  const pw = "1234";
  const data = {
    id,
    pw,
  };

  useEffect(() => {
    dispatch(loginDB(data));
  }, []);

  console.log(useSelector(state => state.user));
  return <div>메인</div>;
};

export default Main;
