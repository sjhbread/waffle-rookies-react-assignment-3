import './Header.css';
import github from './github.png';
const Header = () => {
  return (
    <div className='login-header-layout'>
      <img className='login-header-img' src={github} alt='github'></img>
      <div className='login-header-txt'>Sign in to</div>
    </div>
  );
}

export default Header;