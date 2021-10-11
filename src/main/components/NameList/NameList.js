import './NameList.css';
import NameItem from './NameItem/NameItem';
import { useContext } from 'react';
import { NameListContext, SelectedStudentContext } from '../../../App';


const NameList = ({searchTerm, handleSelect}) => {
    const { nameList, setNameList} = useContext(NameListContext);
    const { selectedStudent, setSelectedStudent } = useContext(SelectedStudentContext);
    return(
        <ul className='list-name'>
            <li className = 'title-list'>
                <div className='title-content'>이름</div>
                <div className='title-content'>학년</div>
            </li>
            {
                nameList.length === 0? 
                    <div className='empty-list'>학교에 학생이 없어요 :(</div> 
                : 
                nameList.filter(item => {
                    if (item.name.includes(searchTerm)) {
                        return item
                    }
                }).map(item => (
                <NameItem key={item.id} item = {item} handleSelect = {() => handleSelect(item)} isSelected={selectedStudent && item.id === selectedStudent.id}/>
                ))
            } 
        </ul>
    );
}

export default NameList;