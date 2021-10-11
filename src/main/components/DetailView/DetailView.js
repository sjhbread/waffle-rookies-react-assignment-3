import { Link } from 'react-router-dom';
import './DetailView.css';
import img from './extend.PNG';

const DetailView = ({inputs, isSelected, handleChangeInputs }) => {  
    
    return (
        <div className='detail-view'>
            <p className={`detail-view-txt ${isSelected? 'hide' : ''}`}>왼쪽 표에서</p> 
            <p className={`detail-view-txt ${isSelected? 'hide' : ''}`}>학생을 선택해 주세요.</p>
            <div className={`detail-view-header ${isSelected? 'show' : 'hide'}`}>
                <Link to={"/students/" + inputs.id} className='detail-view-extender'>                 
                    <img className='img-extend' src={img} alt='blank'></img>
                </Link>
            </div>
            <div className={`detail-view-img ${isSelected? 'show' : 'hide'}`}>
                <img className='profile' src={inputs.profileImg} alt='blank'/>
            </div>
            <div className={`detail-view-footer ${isSelected? 'show' : 'hide'}`}>
                <div className='detail-view-name'>
                    <div className='txt'>이름</div><input className='name-input' value={inputs.name} name='name' onChange={handleChangeInputs} disabled/>
                </div>
                <div className='detail-view-grade'>
                    <div className='txt'>학년</div><input className='grade-input' value={inputs.grade} name='grade' onChange={handleChangeInputs} disabled/>
                </div>             
            </div>
        </div>
        
    );
}

export default DetailView;


