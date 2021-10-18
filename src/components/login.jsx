import React from 'react';
import { useHistory, Link } from 'react-router-dom';

function Login(props) {
  let history = useHistory();
  return (
    <section className="login">
      <h1>로그인</h1>
      <form onSubmit={props.onSubmitLogin}>
        <input
          name="email"
          type="email"
          placeholder="이메일@email.com"
          className="user-email"
          required
          onChange={props.onChange}
          value={props.email}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호 (4자리 이상)"
          className="user-password"
          required
          onChange={props.onChange}
          value={props.password}
        />
        <div className="line"></div>
        <button type="submit" className="login-btn">
          로그인하기
        </button>
      </form>
      <div className="join-link">
        <span>회원이아니신가요?</span>
        <Link to="/join">
          <button>회원가입하기</button>
        </Link>
      </div>
    </section>
  );
}

export default Login;
