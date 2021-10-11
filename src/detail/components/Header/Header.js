import { useHistory } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.push('/students'); 
  }
  return (
    <div className='header-layout'>
      <button className='go-back-btn' onClick={handleGoBack}>
        <svg  className='arrow-svg' focusable='false' viewBox='0 0 24 24' aria-hidden='true'>
          <path d='M 12 4 l -1.41 1.41 L 16.17 11 H 4 v 2 h 12.17 l -5.58 5.59 L 12 20 l 8 -8 Z'></path>
        </svg>
      </button>
      <span  onClick={handleGoBack} className='guide-txt'>학생 목록 페이지로</span>
    </div>
  );
}

export default Header;