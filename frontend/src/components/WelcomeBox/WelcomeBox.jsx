import { useContext } from 'react';
import './WelcomeBox.css';
import { HomeContext, HomeDispatchContext } from '../../contexts/HomeContext';

function WelcomeBox() {
  const state = useContext(HomeContext);
  const dispatch = useContext(HomeDispatchContext);

  function handleSearchUpdate(e) {
    dispatch({ type: 'searchUpdate', payload: { searchBar: e.target.value } });
  }

  return (
    <div className="welcome-box-container">
      <div className="welcome-box-title">Bienvenue sur CinéSuggest !</div>
      <input
        type="text"
        className="welcome-box-search"
        placeholder="La La Land, The Dark Knight..."
        name="welcome-box-search"
        onChange={handleSearchUpdate}
      />
    </div>
  );
}

export default WelcomeBox;
