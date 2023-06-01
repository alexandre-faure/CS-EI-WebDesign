import './Profil.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import moment from 'moment';
import InputProfile from '../../components/InputProfile/InputProfile';
import RadioOnOff from '../../components/RadioOnOff/RadioOnOff';
import ButtonOnOff from '../../components/ButtonOnOff/ButtonOnOff';
import ButtonChoice from '../../components/ButtonChoice/ButtonChoice'

const DEFAULT_FORM_VALUES = {
  user_email: '',
  user_pseudo: '',
  user_firstname: '',
  user_lastname: '',
  user_date_of_birth: '',
  user_pref_tri: '',
  user_pref_categories: [],
  user_pref_date_dbt: '',
  user_pref_date_fin: ''
};

const DEFAULT_INPUT_DISABLED = {
  user_pseudo: true,
  user_firstname: true,
  user_lastname: true,
  user_date_of_birth: true,
  pref_date: true,
};

function Profil() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const [genres, setGenres] = useState([]);
  const [disabledInput, setDisabledInput] = useState(DEFAULT_INPUT_DISABLED);

  const loadDataFromProfile = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/8`)
      .then((response) => {
        const infos_user = response.data.user[0]
        setFormValues({
          user_email: infos_user.user_email,
          user_pseudo: infos_user.user_pseudo,
          user_firstname: infos_user.user_firstname,
          user_lastname: infos_user.user_lastname,
          user_date_of_birth: moment(infos_user.user_date_of_birth).format('YYYY-MM-DD'),
          user_pref_tri: infos_user.user_pref_tri,
          user_pref_categories: infos_user.user_pref_categories.split(',').filter(e => e!=""),
          user_pref_date_dbt: moment(infos_user.user_pref_date_dbt).format('YYYY-MM-DD'),
          user_pref_date_fin: moment(infos_user.user_pref_date_fin).format('YYYY-MM-DD')
        });
        setDisabledInput({...disabledInput,
          pref_date: infos_user.user_pref_date_dbt == null })

        console.log("User récupéré avec succès.")
      })
      .catch((error) => {
        console.log("Une erreur est survenue lors de la récupération du user.")
        console.error(error);
      });
  };

  useEffect(loadDataFromProfile, [])

  const updateProfile = () => {
    const update_body = {...formValues, user_pref_categories: formValues.user_pref_categories.join(',')};
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/users/8`, update_body)
      .then(() => {
        console.log("Update effectuée avec succès.")
      })
      .catch((error) => {
        console.log("Une erreur est survenue lors de l'update.")
        console.error(error);
      });
  }

  useEffect(updateProfile, [formValues]);



  // Paramétrer les préférences de tri
  const handleTriClick = (idRadio) => {
    if (formValues.user_pref_tri == idRadio) {
      setFormValues({...formValues, user_pref_tri: 0})
      .then(updateProfile)
    } else {
      setFormValues({...formValues, user_pref_tri: idRadio})
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
    if (formValues.user_pref_categories.includes(buttonId)) {
      setFormValues({...formValues,
        user_pref_categories: formValues.user_pref_categories.filter((id) => id !== buttonId)})
    } else {
      setFormValues({...formValues,
        user_pref_categories: [...formValues.user_pref_categories, buttonId]})
    }
  };

  // Choisir la date comme critère de filtre ou non
  const changeInputDisabled = (input) => {
    setDisabledInput({...disabledInput, [input]:!(disabledInput[input])})
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
            disabledInput={disabledInput}  changeDisabledInput={changeInputDisabled}/>
            
            <InputProfile label={"Prénom"} inputName={"user_firstname"} type={"text"}
            formValues={formValues} setFormValues={setFormValues}
            disabledInput={disabledInput}  changeDisabledInput={changeInputDisabled} />

            <InputProfile label={"Nom de famille"} inputName={"user_lastname"} type={"text"}
            formValues={formValues} setFormValues={setFormValues}
            disabledInput={disabledInput}  changeDisabledInput={changeInputDisabled} />

            <InputProfile label={"Date de naissance"} inputName={"user_date_of_birth"} type={"date"}
            formValues={formValues} setFormValues={setFormValues}
            disabledInput={disabledInput}  changeDisabledInput={changeInputDisabled} />

          </tbody>
        </table>
      </div>

      <div id="preferences-container">
        <h2>Mes préférences</h2>
        
        <h3>Préférence de tri</h3>
          <RadioOnOff choices={["Par affinité", "Par note", "Par popularité", "Par récence"]}
          values={[1,2,3,4]} radioChecked={formValues.user_pref_tri} handleRadioClick={handleTriClick} />
        
        <h3>Préférences de genre cinématographique</h3>
        {formValues.user_pref_categories.length == 0
        ? <p>Toutes les catégories seront affichées.</p>
        : <p>Seuls les films appartenant aux catégories séléctionnées seront affichés.</p>}
        <div id="profile-genres-container">
          {genres.map((genre) => {
            return <ButtonChoice key={genre.category_id} idGenre={genre.category_id} label={genre.category_title}
            checkedGenres={formValues.user_pref_categories} handleButtonClick={handleButtonClick} />
          })}
        </div>

        <h3>Préférences de dates</h3>
        <table>
          <tbody>
            <tr>
              <td>
                <ButtonOnOff idRadio={"pref_date"} radioChecked={disabledInput.pref_date} handleRadioClick={changeInputDisabled} />
              </td>
              <td>
              du&nbsp;
              <input type="date" value={formValues.user_pref_date_dbt}
              disabled={disabledInput.pref_date}
              onChange={e => {
                setFormValues({...formValues, user_pref_date_dbt: e.target.value})}
              }/>
              &nbsp;au&nbsp;
              <input type="date" value={formValues.user_pref_date_fin}
              disabled={disabledInput.pref_date}
              onChange={e => {
                setFormValues({...formValues, user_pref_date_fin: e.target.value})}
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
