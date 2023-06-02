import { useContext } from 'react';
import MovieSlider from '../../components/MovieSlider/MovieSlider';
import './Meslistes.css';
import { HomeContext } from '../../contexts/HomeContext';

function Meslistes() {
  const state = useContext(HomeContext);

  return (
    <div className="mes-listes-container">
      <div className="mes-listes-h1">Mes listes</div>
      <MovieSlider
        slider_id={'to-see'}
        title={'A voir'}
        movieList={state.homeSliders[0].movies}
      />
    </div>
  );
}

export default Meslistes;
