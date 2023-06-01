import './Profil.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import InputProfile from '../../components/InputProfile/InputProfile';
import RadioOnOff from '../../components/RadioOnOff/RadioOnOff';
import ButtonOnOff from '../../components/ButtonOnOff/ButtonOnOff';
import ButtonChoice from '../../components/ButtonChoice/ButtonChoice'

const DEFAULT_FORM_VALUES = {
  user_email: 'toto2@gmail.com',
  user_pseudo: 'toto',
  user_firstname: 'Toto',
  user_lastname: 'Dupond',
  user_date_of_birth: '06/03/2003',
  user_id:8
};

function Profil() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const [genres, setGenres] = useState([]);
  const [username, setUsername] = useState("username");
  const [disabledUsername, setDisabledUsername] = useState(true);
  const [firstname, setFirstname] = useState("First Name");
  const [disabledFirstname, setDisabledFirstname] = useState(true);
  const [lastname, setLastname] = useState("Last Name");
  const [disabledLastname, setDisabledLastname] = useState(true);
  const [triChecked, setTriChecked] = useState(null);
  const [checkedGenres, setCheckedGenres] = useState([]);
  const [prefDateMin, setPrefDateMin] = useState("");
  const [prefDateMax, setPrefDateMax] = useState("");
  const [prefDate, setPrefDate] = useState(false)


  const testRecommandations = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/recommandation/8/5`)
      .then((response) => {
        console.log(response)
        console.log("Recommandation effectuée avec succès.")
      })
      .catch((error) => {
        console.log("Une erreur est survenue lors de la recherche de recommandations.")
        console.error(error);
      });
  }

  useEffect(testRecommandations, [])

  const loadDataFromProfile = () => {

  };

  const updateProfil = (event) => {
    event.preventDefault();
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/users/${formValues.user_id}`, formValues)
      .then(() => {
        console.log("Update effectuée avec succès.")
      })
      .catch((error) => {
        console.log("Une erreur est survenue lors de l'update.")
        console.error(error);
      });
  }



  // Paramétrer les préférences de tri
  const handleTriClick = (idRadio) => {
    if (triChecked == idRadio) {
      setTriChecked(null);
    } else {
      setTriChecked(idRadio);
    }
  };

  // Paramétrer le chargement des genres
  const loadGenres = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((response) => {
        // Do something if success
        setGenres(response.data.categories)
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error)
      });
  };
  
  useEffect(loadGenres, []);

  // Changer les genres préférés
  const handleButtonClick = (buttonId) => {
    if (checkedGenres.includes(buttonId)) {
      setCheckedGenres(checkedGenres.filter((id) => id !== buttonId));
    } else {
      setCheckedGenres([...checkedGenres, buttonId]);
    }
  };

  // Choisir la date comme critère de filtre ou non
  const changePrefDate = (idRadio) => {
    setPrefDate(!prefDate)
  };

  return (
    <div className="Users-container">
      <h1><i className="icon-user"></i> Bonjour {formValues.user_pseudo}</h1>
      <div id="profile-container">
        <h2>Mon profil</h2>
        <table id="profile-infos-container">
          <tbody>
          
            <InputProfile label={"Pseudo"} inputName={"user_pseudo"} type={"text"}
            formValues={formValues} setFormValues={setFormValues}
            disabledInput={disabledUsername}  setDisabledInput={setDisabledUsername}/>
            
            <InputProfile label={"Prénom"} inputName={"user_firstname"} type={"text"}
            formValues={formValues} setFormValues={setFormValues}
            disabledInput={disabledFirstname}  setDisabledInput={setDisabledFirstname} />

            <InputProfile label={"Nom de famille"} inputName={"user_lastname"} type={"text"}
            formValues={formValues} setFormValues={setFormValues}
            disabledInput={disabledLastname}  setDisabledInput={setDisabledLastname} />

            <InputProfile label={"Danne de naissance"} inputName={"user_date_of_birth"} type={"date"}
            formValues={formValues} setFormValues={setFormValues}
            disabledInput={disabledLastname}  setDisabledInput={setDisabledLastname} />

          </tbody>
        </table>
      </div>

      <div id="preferences-container">
        <h2>Mes préférences</h2>
        
        <h3>Préférence de tri</h3>
          <RadioOnOff choices={["Par affinité", "Par note", "Par popularité", "Par récence"]}
          radioChecked={triChecked} handleRadioClick={handleTriClick} />
        
        <h3>Préférences de genre cinématographique</h3>
        {checkedGenres.length == 0
        ? <p>Toutes les catégories seront affichées.</p>
        : <p>Seuls les films appartenant aux catégories séléctionnées seront affichés.</p>}
        <div id="profile-genres-container">
          {genres.map((genre) => {
            return <ButtonChoice key={genre.category_id} idGenre={genre.category_id} label={genre.category_title}
            checkedGenres={checkedGenres} handleButtonClick={handleButtonClick} />
          })}
        </div>

        <h3>Préférences de dates</h3>
        <table>
          <tbody>
            <tr>
              <td>
                <ButtonOnOff idRadio={1} radioChecked={prefDate} handleRadioClick={changePrefDate} />
              </td>
              <td>
              du&nbsp;
              <input type="date" value={prefDateMin}
              disabled={!prefDate}
              onChange={e => {
                setPrefDateMin(e.target.value)}
              }/>
              &nbsp;au&nbsp;
              <input type="date" value={prefDateMax}
              disabled={!prefDate}
              onChange={e => {
                setPrefDateMax(e.target.value)}
              }/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profil;
