import { useContext } from 'react';
import close from './close.png';
import warning from './warning.png';
import remove from './delete.png';
import './Confirm.css';
import { useHistory } from 'react-router-dom';
import { IsModalOpenContext, NameListContext, SelectedStudentContext, InputsContext, TokenContext } from '../../../App';
import axios from 'axios';
const defaultInput = {
  name: '',
  grade: '',
  profileImg: '',
  email: '',
  phone: '',
  major: '',
  locked: false
};
const Confirm = () => {
  const { token, setToken } = useContext(TokenContext);
  const { isModalOpen, setIsModalOpen } = useContext(IsModalOpenContext);
  const { nameList, setNameList } = useContext(NameListContext);
  const { selectedStudent, setSelectedStudent } = useContext(SelectedStudentContext);
  const { inputs, setInputs } = useContext(InputsContext);
  const history = useHistory();
  /* 닫기 버튼 함수 */
  const handleCloseConfirm = () => {
    setIsModalOpen(false);
  }
  /* 삭제 버튼 함수 */
  const handleNameDelete = () => {
    if(!nameList.find((student) => student.id === selectedStudent.id)) return;
    axios.delete('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+selectedStudent.id, {
        headers: {
          Authorization: 'Bearer '+token
        }
      })
      .then((res) => {
        console.log(res.data.success);  
        
        setInputs(defaultInput);
        setSelectedStudent(null);
        setNameList(
          nameList.filter((student) => student.id !== selectedStudent.id)
        );
        setIsModalOpen(false);
        history.goBack();
      })
      
  }
  return (
    <div className={`confirm-wrapper ${isModalOpen? 'show' : 'hide'}`}>
      <div className={'confirm-centered'}>
        <div className={'confirm-content'}>
          <div className='confirm-header'>
            <img src={warning} className='warning-img'/>
            <div className='warning-txt'>학생을 삭제합니다.</div>
          </div>
          <div className='confirm-body'>이 작업은 되돌릴 수 없습니다.</div>
          <div className='confirm-footer'>
            <button className='confirm-closer' onClick={() => handleCloseConfirm()}>
              <img src={close} className='button-img' />
              <span>닫기</span>
            </button>
            <button type='button' className='confirm-deleter' onClick={() => handleNameDelete()}>
              <img src={remove} className='button-img' />
              <span>삭제</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;