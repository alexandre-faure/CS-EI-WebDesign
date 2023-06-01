import './RadioOnOff.css';
import ButtonOnOff from '../ButtonOnOff/ButtonOnOff';

function RadioOnOff({ choices, values, radioChecked, handleRadioClick }) {

  return (
    <table>
      <tbody>
        {choices.map((choice, key) => (
          <tr key={key}>
            <td>
              <label>{choice} : </label>
            </td>
            <td>
              <ButtonOnOff idRadio={values[key]} radioChecked={radioChecked} handleRadioClick={handleRadioClick}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RadioOnOff;