import './Searcher.css';

const Searcher = ({setSearchTerm}) => {
    return (
        <input 
            type='text' 
            className = 'searcher' 
            placeholder = "검색" 
            onChange = {event => {
                setSearchTerm(event.target.value)
            }}
        />
    );
}

export default Searcher;