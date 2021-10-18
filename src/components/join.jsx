import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { firebaseAppAuth, firestore } from '../fireBase';

const Join = (props) => {
  let history = useHistory();

  const [errorMessageKo, setErrorMessageKo] = useState({
    already: '이미 가입되어있는 이메일 입니다!',
    badly: '유효한 이메일이 아닙니다',
    password: '비밀번호는 6자리 이상 입력해주세요',
    etc: '다시 입력해주세요',
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    firebaseAppAuth
      .createUserWithEmailAndPassword(props.email, props.password)
      .then((userCredential) => {
        let uid = userCredential.user.uid;
        let userProfile = { name: props.name, email: props.email };

        firestore.collection('user').doc(uid).set(userProfile);

        userCredential.user
          .updateProfile({
            displayName: props.name,
          })
          .then(() => alert(props.name + '님 회원가입이 완료 되었습니다'))
          .then(() => {
            history.push('/login');
          });
      })
      .catch((error) => {
        console.log(error);
        let errorMessage = error.message;
        if (errorMessage.includes('already')) {
          alert(errorMessageKo.already);
        } else if (errorMessage.includes('badly')) {
          alert(errorMessageKo.badly);
        } else if (errorMessage.includes('6')) {
          alert(errorMessageKo.password);
        } else if (error) {
          alert(errorMessageKo.etc);
        }
      });
  };

  return (
    <section className="join">
      <h1>회원가입</h1>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          type="text"
          placeholder="이름"
          className="user-name"
          autoFocus
          required
          onChange={props.onChange}
          value={props.name}
        />
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
        <button type="submit" className="join-btn">
          가입하기
        </button>
      </form>
      <div className="join-link">
        <span>회원이신가요?</span>
        <Link to="/login">
          <button>로그인하기</button>
        </Link>
      </div>
    </section>
  );
};

export default Join;
