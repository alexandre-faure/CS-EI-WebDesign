import './InputProfile.css';

function InputProfile({ label, inputName, formValues, setFormValues, disabledInput, setDisabledInput, type }) {

 const changeDisabledInput = () => {
  setDisabledInput(!disabledInput)
 };

  return (
    <tr className={label.toLowerCase().replace(" ", "-") + " field-container"}>
      <td className='label-container'>
        <label>{label} : </label>
      </td>
      <td className={"input-container " + (disabledInput ? "readonly" : "edit")}>
        <input id={label.toLowerCase().replace(" ", "-") + "-input"}
        type={type}
        placeholder={'Your ' + label.toLowerCase()}
        value={formValues[inputName]}
        disabled={disabledInput}
        onChange={event => {
          setFormValues({...formValues, inputName:event.target.value})}
          }/>
          <button onClick={changeDisabledInput}><i className={disabledInput ? "icon-pen" : "icon-check"}></i></button>
      </td>
    </tr>
  );
}

export default InputProfile;