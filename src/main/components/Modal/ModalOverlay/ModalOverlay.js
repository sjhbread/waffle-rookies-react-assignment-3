import { useState, React } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ModalOverlay.css';

const ModalOverlay = ({handleModal, handleAddStudent }) => {
    const defaultInput = {
        name: '',
        grade: '',
        profileImg: '',
        email: '',
        phone: '',
        major: '',
        locked: false
      };
    const [inputs, setInputs] = useState(defaultInput);

    const handleChangeInputs = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
      };

    const handleCloseModal = (e) => {
        e.preventDefault();
        handleModal(false);
        setInputs(defaultInput);
    };

    return (
        <div className={'modal-dialog-centered'}>
            <div className={'modal-content'}>
                <div className='modal-body'>
                    <div className='modal-name'>
                        <div className={'txt'}>이름</div><input className='name-input' value = {inputs.name} name='name' onChange={handleChangeInputs}/>
                    </div>
                    <div className={'modal-grade'}>
                        <div className={'txt'}>학년</div><input className='grade-input' value = {inputs.grade} name='grade' onChange={handleChangeInputs}/>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='modal-closer' onClick={handleCloseModal}>닫기</button>
                    <button type='button' className='modal-adder' onClick={() => handleAddStudent(inputs)}>추가</button>
                    
                </div>
            </div>
        </div>
    
    );
}

export default ModalOverlay;