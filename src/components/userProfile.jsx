import React from 'react';

function UserProfile() {
  return (
    <div className="user">
      <section className="user-profile">
        <div className="user-profile-info">
          <label className="user-photo-cover" htmlFor="user-photo">
            <i className="fas fa-user photo"></i>
            <i className="fas fa-camera camera"></i>
          </label>
          <input
            type="file"
            accept="image/*"
            id="user-photo"
            className="hidden"
          />
          <div className="user-profile-cover">
            <h1 className="name">노재희</h1>
            <span className="location">쌍령동</span>
            <span className="email">godorgo</span>
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
      <section className="user-profile-btn">
        <button className="user-profile-login">로그인</button>

        <button className="user-profile-sign-up">회원가입</button>

        <button className="user-profile-logout">로그아웃</button>
      </section>
    </div>
  );
}

export default UserProfile;
