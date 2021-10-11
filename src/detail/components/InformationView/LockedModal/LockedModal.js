import './LockedModal.css';
import lock from './lock_modal.png';

const LockedModal = () => {
  return (
    <div className='locked-modal-wrapper' >
      <div className='locked-modal-layout'> 
        <div className='locked-modal-footer'>
          <img className='lock-img' src={lock} />
          <div className='locked-modal-guidetxt'>수정하려면 잠금을 해제하세요.</div>
        </div>
      </div>
    </div>
  );
}

export default LockedModal;