import { useHistory } from "react-router-dom";
import img from './extend.PNG';

const ExtendButton = ({inputs}) => {
  const history = useHistory;
  const button = (param) => (
    <button onClick={() => history.push('/students/:{param}')}>
      <img className='img-extend' src={img} alt='extend'></img>
    </button>
  );
  return (
    button(inputs.id)
  );
}

export default ExtendButton;