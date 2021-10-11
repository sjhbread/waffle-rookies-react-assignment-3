import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentListContext } from '../../../../App';
import './CommentList.css';
import CommentListItem from './CommentListItem/CommentListItem';

const CommentList = () => {
  const {commentList, setCommentList } = useContext(CommentListContext);
  return (
    <ul className='comment-list-wrapper'>
      {
        commentList.length === 0? '' 
        :
        commentList.sort((comment1, comment2) => comment1.id-comment2.id).map(comment => (
          <CommentListItem key={comment.id} comment={comment} />
        ))
      }
    </ul>
  );
}

export default CommentList;