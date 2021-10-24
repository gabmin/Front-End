import React from "react";

const Profile = props => {
  const userId = props.match.params.user_id;
  return <div>프로필 페이지 유저 아이디 : {userId}</div>;
};

export default Profile;
