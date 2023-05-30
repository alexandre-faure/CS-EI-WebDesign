import './InputProfile.css';

function InputProfile({ label, input, setInput, disabledInput, setDisabledInput }) {

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
        placeholder={'Your ' + label.toLowerCase()}
        value={input}
        disabled={disabledInput}
        onChange={e => {
          setInput(e.target.value)}
          }></input>
          <button onClick={changeDisabledInput}><i className={disabledInput ? "icon-pen" : "icon-check"}></i></button>
      </td>
    </tr>
  );
}

export default InputProfile;