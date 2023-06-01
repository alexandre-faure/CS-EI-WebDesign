import './InputProfile.css';

function InputProfile({ label, inputName, formValues, setFormValues, disabledInput, changeDisabledInput, type }) {

  return (
    <tr className={label.toLowerCase().replace(" ", "-") + " field-container"}>
      <td className='label-container'>
        <label>{label} : </label>
      </td>
      <td className={"input-container " + (disabledInput[inputName] ? "readonly" : "edit")}>
        <input id={label.toLowerCase().replace(" ", "-") + "-input"}
        type={type}
        placeholder={'Your ' + label.toLowerCase()}
        value={formValues[inputName]}
        disabled={disabledInput[inputName]}
        onChange={event => {
          setFormValues({...formValues, [inputName]:event.target.value})}
          }/>
          <button onClick={event => {changeDisabledInput(inputName)}}><i className={disabledInput[inputName] ? "icon-pen" : "icon-check"}></i></button>
      </td>
    </tr>
  );
}

export default InputProfile;