import './ButtonChoice.css';

function ButtonChoice({ idGenre, label, checkedGenres, handleButtonClick }) {

  return (
    <button className={"button-choice " + (checkedGenres.includes(idGenre) ? "checked" : "not-checked")} onClick={() => handleButtonClick(idGenre)}>{label}</button>
  );
}

export default ButtonChoice;