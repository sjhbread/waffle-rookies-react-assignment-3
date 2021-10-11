import CommentList from './CommentList/CommentList';
import './CommentView.css';

const CommentView = () => {
  return (
    <div className='comment-view'>
      <div className='comment-title'>코멘트</div>
      <div className='comment-box-wrapper'>
        <CommentList />
      </div>
    </div>
  );
}
export default CommentView;