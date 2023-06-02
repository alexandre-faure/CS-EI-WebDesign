import './DateCheckbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { HomeContext, HomeDispatchContext } from '../../contexts/HomeContext';

function DateCheckbox(data) {
  var boxIcon;
  const state = useContext(HomeContext);
  const dispatch = useContext(HomeDispatchContext);

  function handleCheckboxClick() {
    dispatch({
      type: 'toggleDate',
      payload: { dateId: data.date.id },
    });
  }

  boxIcon = data.date.id in state.dates ? faSquareCheck : faSquare;

  return (
    <div className="filterside-date" onClick={handleCheckboxClick}>
      <label>
        <FontAwesomeIcon
          icon={boxIcon}
          id={data.date.id}
          className="filterside-date-checkbox"
        />
        <div className="filterside-date-title">{data.date.title}</div>
      </label>
    </div>
  );
}

export default DateCheckbox;
