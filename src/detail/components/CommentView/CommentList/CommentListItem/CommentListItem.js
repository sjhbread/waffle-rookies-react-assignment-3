import './CommentListItem.css';

const CommentListItem = ({comment}) => {
  const DateTime = require('luxon').DateTime;
  const dt = DateTime.fromISO(comment.datetime).toFormat('MM월 dd일 HH시 mm분');
  return (
    <li className='comment-list-item'>
      <div className='comment-list-item-layout'>
        <p className='comment-list-item-text'>{comment.content}</p>
        <div className='comment-list-item-time'>{dt}</div>
      </div>
    </li>
  );
}

export default CommentListItem;