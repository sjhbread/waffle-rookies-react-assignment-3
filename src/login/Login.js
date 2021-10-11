import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoginBox from './components/LoginBox/LoginBox';
import './Login.css';

const Login = () => {
  return (
    <div className='login'>
      <div className='login-wrapper'>
        <div className='login-header'>
          <Header />
        </div>
        <div className='login-loginbox'>
          <LoginBox />
        </div>
        <div className='login-footer'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Login;