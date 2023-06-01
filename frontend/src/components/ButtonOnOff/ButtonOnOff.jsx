import './ButtonOnOff.css';

function ButtonOnOff({ idRadio, radioChecked, handleRadioClick }) {

  return (
    <button className={"checkbox" + (radioChecked === false | radioChecked == idRadio ? " checked" : "")}
    onClick={event => handleRadioClick(idRadio)}>
      <i className={"icon-" + (radioChecked === false | radioChecked == idRadio ? "check" : "cross_mark")}></i>
    </button>
  );
}

export default ButtonOnOff;