import './Adder.css';
import Modal from '../Modal/Modal';

const Adder = ({ handleModal, handleAddStudent }) => {
    return (
        <div>
            <button onClick={() => handleModal(true)} className = 'add-button'>추가</button>
            <Modal
                handleModal={handleModal}
                handleAddStudent={handleAddStudent}
            />

        </div>
    );
}

export default Adder;