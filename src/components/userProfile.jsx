import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

function UserProfile(props) {
  let history = useHistory();
  let name = props.user.name;
  let email = props.user.email;
  let isUser = props.isUser;

  const NO_NAME = <Link to="/login">로그인하기</Link>;
  const NO_EMAIL = '로그인이 필요합니다';
  const ISUSER_TEXT = isUser === true ? '로그아웃' : '로그인';
  const ISUSER_PATH = isUser === true ? '/logout' : '/login';
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="user">
      <section className="user-profile">
        <div className="user-profile-info">
          <label className="user-photo-cover" htmlFor="user-photo">
            <div className="user-photo"></div>
            <i className="icon-user photo"></i>
            <i className="fas fa-camera camera"></i>
          </label>
          <input
            type="file"
            accept="image/*"
            id="user-photo"
            className="hidden"
          />
          <div className="user-profile-cover">
            <h1 className="name">{isUser === true ? name : NO_NAME}</h1>
            <span className="location"></span>
            <span className="email">{isUser === true ? email : NO_EMAIL}</span>
          </div>
        </div>
        <div className="user-profile-item">
          <button className="user-goods-total">
            <i className="icon-tasks"></i>
          </button>
          <button className="like-total">
            <i className="icon-heart"></i>
          </button>
          <button className="setting">
            <i className="icon-setting"></i>
          </button>
        </div>
        <section className="user-profile-btn">
          {isUser === false ? (
            <Link to="/join">
              <button className="user-profile-join">회원가입</button>
            </Link>
          ) : null}
          <Link to={ISUSER_PATH}>
            <button
              className="user-profile-login"
              onClick={isUser && props.onClickLogout}
            >
              {ISUSER_TEXT}
            </button>
          </Link>
        </section>
        <div className="line"></div>
        <div className="user-profile-service">
          <button className="notice">
            <i className="fas fa-bell"></i>
            <span> 공지사항</span>
          </button>
          <button className="service-center">
            <i className="fas fa-headset"></i>
            <span> 고객센터</span>
          </button>
          <button className="questions">
            <i className="far fa-question-circle"></i>
            <span>자주하는 질문</span>
          </button>
          <button className="madein">
            <i className="fas fa-users"></i>
            <span> 만든사람</span>
          </button>
        </div>
      </section>
      <div className="line"></div>
    </div>
  );
}

export default UserProfile;
