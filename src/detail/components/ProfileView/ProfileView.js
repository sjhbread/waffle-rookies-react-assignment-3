import { useContext } from 'react';
import { InputsContext } from '../../../App';
import './ProfileView.css';

const ProfileView = () => {
  const { inputs, setInputs} = useContext(InputsContext)
  return (
    <div className='profile-view'>
      <div className='profile-img'>
        <img className='profile' src={inputs.profileImg} alt='blank'/>
      </div>
      <div className='profile-view-name-and-grade'>
        <div className='name'>
          <div>이름</div>
          <div className='student-name'>{inputs.name}</div>
        </div>
        <div className='grade'>
          <div>학년</div>
          <div className='student-grade'>{inputs.grade}</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;