import Buttons from './components/Buttons/Buttons';
import CommentInput from './components/CommentInput/CommentInput';
import CommentView from './components/CommentView/CommentView';
import Confirm from './components/Confirm/Confirm';
import Header from './components/Header/Header';
import InformationView from './components/InformationView/InformationView';
import ProfileView from './components/ProfileView/ProfileView';
import './Detail.css';

const Detail = () => {
  return (
    <div className='detail'>
      <div className='detail-left'>
        <div className='detail-header'>
          <Header />
        </div>
        <div className='detail-profile-view'>
          <ProfileView />
        </div>
        <div className='detail-information-view'>
          <InformationView />
        </div>
      </div>
      <Confirm />
      <div className='detail-right'>
        <div className='detail-buttons'>
          <Buttons />
        </div>
        <div className='detail-comment-view'>
          <CommentView />
        </div>
        <div className='detail-comment-input'>
          <CommentInput />
        </div>
      </div>
    </div>
  );
}

export default Detail;