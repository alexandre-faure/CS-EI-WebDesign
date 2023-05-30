import './ButtonOnOff.css';

function ButtonOnOff({ idRadio, radioChecked, handleRadioClick }) {

  return (
    <button className={"checkbox" + (radioChecked == idRadio ? " checked" : "")}
    onClick={() => handleRadioClick(idRadio)}>
      <i className={"icon-" + (radioChecked == idRadio ? "check" : "cross_mark")}></i>
    </button>
  );
}

export default ButtonOnOff;