import './Modal.css';
import { useContext } from 'react';
import ModalOverlay from './ModalOverlay/ModalOverlay';
import { IsModalOpenContext } from '../../../App';

const Modal = ({handleModal, handleAddStudent }) => {
    const {isModalOpen, setIsModalOpen} = useContext(IsModalOpenContext);
    return (
        <div id='modalWrapper' className={`modal-wrapper ${isModalOpen? 'show' : 'hide'}`}>
            <ModalOverlay 
                handleModal={handleModal}
                handleAddStudent={handleAddStudent}
            />
        </div>
    );
}

export default Modal;