import './Buttons.css';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import save from './save.png';
import lock from './lock.png';
import remove from './delete.png';
import unlock from './unlock.png';
import { InputsContext, NameListContext, IsModalOpenContext, SelectedStudentContext, TokenContext, CommentListContext } from '../../../App';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router';

const Buttons = () => {
  const { DateTime } = require("luxon");
  const { commentList, setCommentList } = useContext(CommentListContext);
  const { inputs, setInputs } = useContext(InputsContext);
  const { nameList, setNameList } = useContext(NameListContext);
  const { isModalOpen, setIsModalOpen} = useContext(IsModalOpenContext);
  const { selectedStudent, setSelectedStudent } = useContext(SelectedStudentContext);
  const { token, setToken } = useContext(TokenContext);
  const param = useParams();
  useEffect(() => {
    const tempToken = localStorage.getItem("token");
    setToken(tempToken);
    axios.get('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+param.id, {
      headers: {
        Authorization: 'Bearer '+tempToken
      }
    })
      .then((res) => {
        const tempStudentDetail = res.data;
        setSelectedStudent(tempStudentDetail);
      })
      .catch((rej) => {
        
      })
  })
  /* 잠금 버튼 함수 */
  const handleLockStudent = () => {
    if(selectedStudent.locked)
    {
      axios.post('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+param.id+'/unlock', {}, {
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
        .then((response) => {
          setCommentList(response.data);
        })
        toast("잠금이 해제되었습니다!");
        
      })
      
    }
    else
    {
      axios.post('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+param.id+'/lock', {}, {
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
        .then((response) => {
          setCommentList(response.data);
        })
        toast("잠금되었습니다!");  
      })
      
    }
    
    const targetIndex = nameList.findIndex((student) => student.id === selectedStudent.id);
    const tempSelectedStudent = {...selectedStudent, locked: !selectedStudent.locked};
    setSelectedStudent(tempSelectedStudent);
    setInputs({...inputs, locked: !inputs.locked});
  }
  /*저장 버튼 함수 */
  const handleNameModify = (student) => {
    const targetStudent = { ...selectedStudent, ...student};
    axios.patch('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+selectedStudent.id, {
      profile_img: student.profile_img,
      email: student.email,
      phone: student.phone,
      major: student.major
    }, {
        headers: {
          Authorization: 'Bearer '+token
        }
      })
      .then((res) => {
        if(res.data.success) {
          toast("변경사항이 저장되었습니다!");
          axios.get('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+param.id+'/comment', {
          headers: {
            Authorization: 'Bearer '+token
          }
        })
        .then((response) => {
          setCommentList(response.data);
        })
      }
    })
    
    setNameList(
      nameList.map((student) => student.id === targetStudent.id? targetStudent : student)
    );
    setSelectedStudent(targetStudent);
    setInputs(targetStudent);
  }
  /* 삭제 버튼 함수 */
  const handleConfirmModal = () => {
    setIsModalOpen(true);
  }
  return (
    <div className='button-layout'>
      <div onClick={() => handleLockStudent()}>
        {!inputs.locked ? 
          <button className='button-lock'>
            <img src={lock} className='button-img' />
            <span>잠금</span>
          </button>
        :
          <button className='button-lock'>
            <img src={unlock} className='button-img' />
            <span>해제</span>
          </button>
        }
        <ToastContainer />
      </div>
      <button className='button-delete' onClick={() => handleConfirmModal()}>
        <img src={remove} className='button-img' />
        <span>삭제</span>
      </button>
      <button className='button-save' onClick={() => handleNameModify(inputs)}>
        <img src={save} className='button-img'/>
        <span>저장</span>
      </button>
      <ToastContainer />
    </div>
  );
}

export default Buttons;