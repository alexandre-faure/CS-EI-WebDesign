import './RadioOnOff.css';
import ButtonOnOff from '../ButtonOnOff/ButtonOnOff';

function RadioOnOff({ choices, radioChecked, handleRadioClick }) {

  return (
    <table>
      <tbody>
        {choices.map((choice, key) => (
          <tr key={key}>
            <td>
              <label>{choice} : </label>
            </td>
            <td>
              <ButtonOnOff idRadio={key} radioChecked={radioChecked} handleRadioClick={handleRadioClick}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RadioOnOff;