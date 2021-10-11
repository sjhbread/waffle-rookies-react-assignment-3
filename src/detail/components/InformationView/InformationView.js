import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CommentListContext, InputsContext, modifiedEmailContext, SelectedStudentContext, TokenContext } from '../../../App';
import './InformationView.css';
import LockedModal from './LockedModal/LockedModal';
import axios from 'axios';
const InformationView = () => {
  const { inputs, setInputs } = useContext(InputsContext);
  const { token, setToken } = useContext(TokenContext); 
  const { selectedStudent, setSelectedStudent } = useContext(SelectedStudentContext);
  const { modifiedEmail, setModifiedEmail } = useContext(modifiedEmailContext);
  const { commentList, setCommentList } = useContext(CommentListContext);
  const param = useParams();
  
  /* input 정보 변경 함수 */
  const handleChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    let tempModifiedEmail = modifiedEmail.email;
    const tempToken = localStorage.getItem("token");
    setToken(tempToken);
    if(modifiedEmail.email === null)
    {
      modifiedEmail.email = '';
    }
    else 
    {
      if(modifiedEmail.email === undefined) {
        axios.get('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+param.id, {
          headers: {
            Authorization: 'Bearer '+tempToken
          }
        })
          .then((res) => {
            const tempStudentDetail = res.data;
            tempModifiedEmail = tempStudentDetail.email;
            setModifiedEmail(tempStudentDetail);
            setSelectedStudent(tempStudentDetail);
            setInputs(tempStudentDetail);
          })
          axios.get('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+param.id+'/comment', {
            headers: {
              Authorization: 'Bearer '+tempToken
            }
          })
          .then((res) => {
            setCommentList(res.data);
          })
      }
      else
      {
        if(tempModifiedEmail !== '') {
          if(tempModifiedEmail.indexOf('@') !== -1) {
            setModifiedEmail({...modifiedEmail, email: tempModifiedEmail.substring(0, tempModifiedEmail.indexOf('@'))});
          }  
        }
      }
      
    }
    
  });
  /* 이메일 변경 함수 */
  const handleChangeEmail = (e) => {
    if(modifiedEmail.email.indexOf('@') !== -1) {
      setModifiedEmail({...modifiedEmail, [e.target.name]: e.target.value.substring(0, modifiedEmail.email.indexOf('@'))});
    }
    else
    {
      setModifiedEmail({...modifiedEmail, [e.target.name]: e.target.value});
    }
    localStorage.setItem('selectedStudentEmail', (e.target.value + '@waffle.hs.kr'))
    setInputs({ ...inputs, [e.target.name]: (e.target.value + '@waffle.hs.kr')});
  }
  /* 전화번호 formatting 함수 */  
  const handleChangePhone = (e) => {
    if(e.target.value.length >= 0 && e.target.value.length <= 3) {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    else if(e.target.value.length >= 4 && e.target.value.length <= 7) {
      setInputs({...inputs, [e.target.name]: e.target.value.replace(/(\d{3})(\d{1})/, '$1-$2')});  
    }
    else if(e.target.value.length >= 8){
      setInputs({...inputs, [e.target.name]: e.target.value.replace(/(\d{3})-(\d{4})(\d{4})/, '$1-$2-$3')});
    }
  }
  return (
    <div className='information-view'>
      <div className='info-title'>정보</div>
      <div className='info-box-wrapper'>
        { inputs.locked ? 
          <LockedModal /> : ''
        }
        <div className='info-box'>
          <div className='info-box-phone'>
            <div className='info-box-txt-layout'>
              <div className='info-box-txt'>전화번호</div>
            </div>
            <input className='phone-input' value={inputs.phone} name='phone' onChange={handleChangePhone}/>
          </div>
          <div className='info-box-email'>
            <div className='info-box-txt-layout'>
              <div className='info-box-txt'>이메일</div>
            </div>
            <div className='email-input-wrapper'>
              <input className='email-input' value={modifiedEmail.email} name='email' onChange={handleChangeEmail}/>
            </div>
          </div>
          <div className='info-box-major'>
            <div className='info-box-txt-layout'>
              <div className='info-box-txt'>전공</div>
            </div>
            <select className='major-input'>     
              <option>frontend</option>
              <option>backend</option>
              <option>android</option>
              <option>iOS</option>   
              <option>design</option>
            </select>
            
          </div>
          <div className='info-box-profileImg'>
            <div className='info-box-txt-layout'>
              <div className='info-box-txt'>프로필</div>
            </div>  
            <input className='profileImg-input' value={inputs.profileImg} name='profileImg' onChange={handleChangeInputs}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationView;