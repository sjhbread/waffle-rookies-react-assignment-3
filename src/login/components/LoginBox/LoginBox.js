import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { IsLoginedContext, TokenContext } from '../../../App';
import './LoginBox.css';
import axios from 'axios';

const LoginBox = () => {
  const { isLogined, setIsLogined } = useContext(IsLoginedContext);
  const { token, setToken } = useContext(TokenContext);
  const [ id, setId ] = useState('');
  const [ pwd, setPwd ] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    axios.post('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/auth/login', {
      'username': id,
      'password': pwd
    })
    .then((res) => {
      const temp = res.data.access_token;
      setToken(temp);
      localStorage.setItem("id", id);
      localStorage.setItem("token", temp);
      setIsLogined(true);
      history.push('./students');
    })
    .catch(() => {
      window.alert("아이디나 비밀번호를 다시 입력해주세요.");
    })
    
  }
  return (
    <div>
      <div className='loginbox-layout'>
        <div className='loginbox-wrapper'>
          <div>Username or email address</div>
          <input className='username-input' value={id} onChange={(e) => setId(e.target.value)}></input>
          <div className='password-txt'>
            <div>Password</div>
            <div>Forgot password?</div>
          </div>
          <input className='password-input' value={pwd} onChange={(e) => setPwd(e.target.value)}></input>
          <button className='login-btn' onClick={()=>handleLogin()}>Sign In</button>
        </div>
      </div>
      <div className='loginbox-footer'>
        <div>New to</div>
        <div>Create an acount.</div>
      </div>
    </div>
  );
}

export default LoginBox;