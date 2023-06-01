import './MovieDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCirclePlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { faCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { HomeContext, HomeDispatchContext } from '../../contexts/HomeContext';
import VoteBar from '../VoteBar/VoteBar';

function MovieDetails(data) {
  const state = useContext(HomeContext);
  const dispatch = useContext(HomeDispatchContext);
  function handleClickOnDetailsCross() {
    dispatch({ type: 'closeDetails' });
  }
  function handleSliderUpdate() {}

  function handleClickOnToSee() {
    dispatch({ type: 'toggleToSee' });
  }

  function handleClickOnSeen() {
    dispatch({ type: 'toggleSeen' });
  }

  const newVote = String(state.movieDetails.vote_average / 2).substring(0, 3);
  const filmIsSeen = state.movieCustomDetails.seen;
  const filmIsToSee = state.movieCustomDetails.toSee;

  function handleClickOnToSee() {
    dispatch({ type: 'toggleToSee' });
  }

  function handleClickOnSeen() {
    dispatch({ type: 'toggleSeen' });
  }

  const newVote = String(state.movieDetails.vote_average / 2).substring(0, 3);
  const filmIsSeen = state.movieCustomDetails.seen;
  const filmIsToSee = state.movieCustomDetails.toSee;

  function handleClickOnToSee() {
    dispatch({ type: 'toggleToSee' });
  }

  function handleClickOnSeen() {
    dispatch({ type: 'toggleSeen' });
  }

  const newVote = String(state.movieDetails.vote_average / 2).substring(0, 3);
  const filmIsSeen = state.movieCustomDetails.seen;
  const filmIsToSee = state.movieCustomDetails.toSee;

  function handleClickOnToSee() {
    dispatch({ type: 'toggleToSee' });
  }

  function handleClickOnSeen() {
    dispatch({ type: 'toggleSeen' });
  }

  const newVote = String(state.movieDetails.vote_average / 2).substring(0, 3);
  const filmIsSeen = state.movieCustomDetails.seen;
  const filmIsToSee = state.movieCustomDetails.toSee;

  return (
    <div
      className="movie-details-container"
      style={{ display: state.movieDetailsIsOpen ? 'flex' : 'none' }}
      onClick={handleClickOnDetailsCross}
    >
      <div
        className="movie-details-card"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <FontAwesomeIcon
          icon={faXmark}
          id="movie-details-cross"
          className="movie-details-cross"
          size="xl"
          onClick={handleClickOnDetailsCross}
        />
        <div className="movie-details-left">
          <img
            src={
              'https://image.tmdb.org/t/p/w500' + state.movieDetails.poster_path
            }
            alt="alt"
            className="movie-details-image"
          />
        </div>
        <div className="movie-details-right">
          <div className="movie-details-row">
            <div className="movie-details-title">
              {state.movieDetails.title}
            </div>
            <div className="movie-details-year">
              {state.movieDetails.release_date.substring(0, 4)}
            </div>
          </div>
          <div className="movie-details-description">
            {state.movieDetails.overview}
          </div>
          <div className="movie-details-row">
            <div className="movie-details-tmdb-rate">
              <FontAwesomeIcon icon={faStar} />
              <div className="movie-details-tmdb-rate-text">
                {newVote} / 5{' '}
                <span className="movie-details-vote-count">
                  {' '}
                  ({state.movieDetails.vote_count})
                </span>
              </div>
            </div>
            <div className="movie-details-rate-slider-container">
              <VoteBar />
              <div className="movie-details-rate-slider-text">
                ( {state.movieCustomDetails.personalVote} / 5 )
              </div>
            </div>
          </div>
          <div className="movie-details-button-row">
            <div className="movie-details-button" onClick={handleClickOnToSee}>
              <FontAwesomeIcon
                icon={filmIsToSee ? faCircleCheck : faCirclePlus}
                color={filmIsToSee ? '#fff' : 'rgb(20, 78, 97)'}
                size="lg"
              />
              <div className="movie-details-button-label">
                Ajouter à ma liste
              </div>
            </div>
            <div className="movie-details-button" onClick={handleClickOnSeen}>
              <FontAwesomeIcon
                icon={filmIsSeen ? faCircleCheck : faCircle}
                size="lg"
                color={filmIsSeen ? '#fff' : 'rgb(20, 78, 97)'}
              />
              <div className="movie-details-button-label">Déjà vu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
