import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import { ClosePostDB, DeletePostDB } from "../redux/actions/multiCard";
import { SetParams } from "../redux/reducers/paramsSlice";

const MultiMenu = props => {
  const dispatch = useDispatch();
  const multiId = props.multiId;
  const TotalCnt = props.TotalCnt;
  const completed = props.completed;
  const [deleteAction, setDeleteAction] = useState(null);
  const [closeAction, setCloseAction] = useState(null);
  const { DeletePostDBDone, ClosePostDBDone } = useSelector(
    state => state.multiCard,
  );

  useEffect(() => {
    if (deleteAction && DeletePostDBDone) {
      // window.alert("삭제가 완료되었습니다.");
      history.replace("/multi");
    }
  }, [DeletePostDBDone, deleteAction]);

  useEffect(() => {
    if (closeAction && ClosePostDBDone) {
      // window.alert("삭제가 완료되었습니다.");
      history.replace("/multi");
    }
  }, [ClosePostDBDone, closeAction]);

  const deletePost = () => {
    const deleteConfirm = window.confirm("투표를 삭제하시겠습니까?");
    if (TotalCnt === 0 && deleteConfirm == true) {
      dispatch(SetParams("all"));
      dispatch(DeletePostDB(multiId));
      setDeleteAction(true);
      // window.location.replace("/multi");
    } else if (deleteConfirm == false) {
      return;
    } else {
      window.alert("투표가 진행된 게시물은 삭제할 수 없습니다");
      return;
    }
  };

  const closePost = () => {
    const closeVote = window.confirm("투표를 종료하시겠습니까?");
    if (closeVote == true) {
      dispatch(ClosePostDB(multiId));
      // dispatch(SetParams(multiId));
      // history.push("/multi");
      setCloseAction(true);
    }
    return;
  };

  const editPost = () => {
    if (TotalCnt === 0) {
      history.push(`/multi/${multiId}/edit`);
    } else {
      window.alert("투표가 진행된 게시물은 수정할 수 없습니다");
      return;
    }
  };

  return (
    <>
      <MenuBar>
        <Menu
          menuButton={
            <MenuButton
              data-testid="menuBtn"
              styles={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              <FiMoreHorizontal size={20} color="#575757" />
            </MenuButton>
          }
          menuStyles={{ border: "0px solid" }}
          portal={true}
        >
          {completed !== true ? (
            <MenuItem
              styles={{
                fontSize: "14px",
              }}
              onClick={editPost}
            >
              수정하기
            </MenuItem>
          ) : null}
          <MenuItem
            styles={{
              fontSize: "14px",
            }}
            onClick={deletePost}
          >
            삭제하기
          </MenuItem>
          {completed !== true ? (
            <MenuItem
              styles={{
                fontSize: "14px",
              }}
              onClick={closePost}
            >
              투표 종료하기
            </MenuItem>
          ) : null}
        </Menu>
      </MenuBar>
    </>
  );
};

const MenuBar = styled.div`
  margin: 10px 10px 0 auto;
`;

export default MultiMenu;
