import logo from './logo.png';
import './Header.css';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { IsLoginedContext } from '../../../App';

const Header = () => {
    const { setIsLogined } = useContext(IsLoginedContext);
    const history = useHistory();
    const handleLogOut = () => {
        localStorage.clear();
        setIsLogined(false);
        history.push('/login');
    }
    return (
    <div className = 'header-wrapper'>
        <div className='header-layout'>
            <a href = "https://wafflestudio.com/" target="_blank"><img src={logo} className = 'waffle-logo' alt = 'logo'></img></a>
            <h3 className='web-title'>와플고등학교 명단 관리 프로그램</h3>
        </div>
        <button className='logout-button' onClick={handleLogOut}>로그아웃</button>
    </div>
    
    );
}

export default Header;