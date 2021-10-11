import Header from './components/Header/Header';
import DashBoard from './components/DashBoard/DashBoard';
import Searcher from './components/Searcher/Searcher';
import Adder from './components/Adder/Adder';
import NameList from './components/NameList/NameList';
import DetailView from './components/DetailView/DetailView';
import { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'; 
import axios from 'axios';
import './Main.css';
import { NameListContext, IsModalOpenContext, InputsContext, SelectedStudentContext, modifiedEmailContext, TokenContext, CommentListContext } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopModal from './components/PopModal/PopModal';



const defaultInput = {
  id: 0,
  name: '',
  grade: '',
  profileImg: '',
  email: '',
  phone: '', 
  major: '',
  locked: false
};

const Main = () => {
  const { nameList, setNameList }  = useContext(NameListContext);   /* dummydata 배열 */
  const { isModalOpen, setIsModalOpen } = useContext(IsModalOpenContext); 
  const { selectedStudent, setSelectedStudent } = useContext(SelectedStudentContext);
  const { inputs, setInputs } = useContext(InputsContext); /* detailView */
  const [searchTerm, setSearchTerm] = useState(''); /* 검색어 */
  const { modifiedEmail, setModifiedEmail } = useContext(modifiedEmailContext);
  const { token, setToken } = useContext(TokenContext);
  const { setCommentList } = useContext(CommentListContext);
  const history = useHistory();
  
  useEffect(() => {
    const tempToken = localStorage.getItem("token");
    setToken(tempToken);
    axios.get('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student', {
      headers: {
        Authorization: 'Bearer '+tempToken
      }
    })
    .then((res) => {
      setNameList(res.data);
    })
        
  },[]);

 
 
  /* 리스트 선택 버튼 함수 */
  const handleSelect = (item) => {
    const isSelectedStudent = selectedStudent && selectedStudent.id === item.id;
    axios.get('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+item.id, {
      headers: {
        Authorization: 'Bearer '+token
      }
    })
      .then((res) => {
        const tempStudentDetail = res.data;
        setSelectedStudent(isSelectedStudent? null : tempStudentDetail);
        setModifiedEmail(isSelectedStudent? null : tempStudentDetail);
        setInputs(tempStudentDetail);
        axios.get('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+item.id+'/comment', {
          headers: {
            Authorization: 'Bearer '+token
          }
        })
        .then((res) => {
          setCommentList(res.data);
        })
      })
      .catch((rej) => {
        
      })
      
  }
  /* 리스트 명단 추가 함수 */
  const handleAddStudent = (student) => {

    axios.post('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student', {
      name: student.name,
      grade: Number(student.grade) 
    }, {
      headers: {
        Authorization: 'Bearer '+token
      }
    })
    .then((res) => {
      const id = res.data.id;
      const newStudent = {...student, id, grade: Number(student.grade)}
      axios.get('https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/student/'+id+'/comment', {
        headers: {
          Authorization: 'Bearer '+token
        }
      })
      .then((res) => {
        setCommentList(res.data);
      })
      setNameList([...nameList, newStudent]);
      setSelectedStudent(newStudent);
      setModifiedEmail(newStudent);
      setInputs(newStudent);
      setIsModalOpen(false);
    })
    .catch((rej) => {
      toast(rej.response.data.message);
    })    
  }
  /* 텍스트 변경 함수 */
  const handleChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  /* DetailView 학생 삭제 함수 */
  const handleNameDelete = () => {
    if(!nameList.find((student) => student.id === selectedStudent.id)) return;

    setNameList(
      nameList.filter((student) => student.id !== selectedStudent.id)
    );
    setInputs(defaultInput);
    setSelectedStudent(null);
  }
  /* 모달 관리 함수 */
  const handleModal = (isModalOpen) => {
    setIsModalOpen(isModalOpen);
  };
    return (
      <div className='app'>
        <PopModal />
        <ToastContainer />
        <div className='header'>
            <Header />
        </div>
        <DashBoard />
        <div className='bottom-layout'>
          <div className='bottom-left-layout'>
          <div className='bottom-lefttop-layout'>
              <Searcher setSearchTerm={setSearchTerm}/>
              <Adder 
              handleAddStudent={handleAddStudent}
              handleModal={handleModal}
              />
          </div>
          <div className='bottom-leftbottom-layout'>
              <NameList  
              searchTerm={searchTerm}
              handleSelect={handleSelect}
              />
          </div>
          </div>
          <div className='vertical-line' />
          <div className='bottom-right-layout'>
          <DetailView 
              inputs={inputs}
              isSelected={selectedStudent}
              handleChangeInputs={handleChangeInputs}
              handleNameDelete={handleNameDelete}
          />
          </div>
      </div>
      </div>
     
  );
}

export default Main;