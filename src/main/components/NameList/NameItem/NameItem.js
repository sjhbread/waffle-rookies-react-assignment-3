import './NameItem.css';


const NameItem = ({ item, handleSelect, isSelected}) => {
    return (
        <li className={`student-info ${isSelected? 'show' : ''}`}>
            <div className='student-info-layout'>
                <div className='name-and-grade'>
                    <div className='list-content'>
                        {item.name}
                    </div>
                    <div className='list-content'>
                        {item.grade}
                    </div>
                </div>
                <div className='button'>
                    <button className={`button-select ${isSelected? 'fixed' : 'unfixed'}`} onClick={handleSelect} tabIndex='-1'>
                        <svg className='arrow-svg' focusable='false' viewBox='0 0 24 24' aria-hidden='true'>
                            <path d='M 12 4 l -1.41 1.41 L 16.17 11 H 4 v 2 h 12.17 l -5.58 5.59 L 12 20 l 8 -8 Z'></path>
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    );
}

export default NameItem;