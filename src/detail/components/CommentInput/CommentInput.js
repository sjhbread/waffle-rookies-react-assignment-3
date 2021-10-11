import axios from 'axios';
import React from 'react';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommentListContext, SelectedStudentContext, TokenContext } from '../../../App';
import './CommentInput.css';

const CommentInput = () => {
 
  const { commentList, setCommentList } = useContext(CommentListContext);
  const [ commentValue, setCommentValue ] = useState('');
  const { selectedStudent, setSelectedStudent } = useContext(SelectedStudentContext);
  const { token, setToken } = useContext(TokenContext);
  const { DateTime } = require("luxon");
  const param = useParams();
   /* 코멘트 추가 함수 */
  const handleAddComment = () => {
    axios.post('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+param.id+'/comment', {
      content: commentValue
    }, {
      headers: {
        Authorization: 'Bearer '+token
      }
    })
    .then((res) => {
      axios.get('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+param.id+'/comment', {
        headers: {
          Authorization: 'Bearer '+token
        }
      })
      .then((res) => {
        setCommentList(res.data);
      })
      setCommentValue('');
    })
    
  }
  return (
    <div className='comment-input-wrapper'>
      <input className='comment-input' type='text' placeholder='댓글을 작성하세요' value={commentValue} onChange={(e) => setCommentValue(e.target.value)}></input>
      <button className='comment-button' onClick={handleAddComment}>작성</button>

    </div>  
  );
}

export default CommentInput;

