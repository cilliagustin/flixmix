import React from 'react'
import styles from '../../styles/MoviePreviewCard.module.css'
import appStyles from '../../App.module.css'

import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DisplayRating from '../../components/DisplayRating';
import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';

/**
 * display movie in a card format
*/
const MoviePreviewCard = (props) => {
  //destructure movie information
  const {
    id, rating_count, seen_count, seen_id, watchlist_count, watchlist_id,
    title, poster, release_year, setMovies, avg_rating
  } = props;

  const currentUser = useCurrentUser();

  const { fullScreen, handleFullScreen, imageData } = useFullScreen();

  //mark a movie as seen
  const handleSeen = async () => {
    try {
      //post the data to the api mark a movie as seen
      const { data } = await axiosRes.post('/seen/', { movie: id });
      setMovies((prevMovies) => ({
        ...prevMovies,
        results: prevMovies.results.map((movie) => {
          return movie.id === id
            ? (
              //update movie data to add seen id and update seen count
              //if the movie was marked in the watchlist remove this
              (movie.watchlist_id !== null)
                ? { ...movie, seen_count: movie.seen_count + 1, seen_id: data.id, watchlist_count: movie.watchlist_count - 1, watchlist_id: null }
                : { ...movie, seen_count: movie.seen_count + 1, seen_id: data.id }
            )
            : movie;
        })
      }))

    } catch (err) {
      console.log(err)
    }
  }

  //delete the seen instance
  const handleUnSeen = async () => {
    try {
      //delete the data from the api
      await axiosRes.delete(`/seen/${seen_id}`);
      setMovies((prevMovies) => ({
        ...prevMovies,
        results: prevMovies.results.map((movie) => {
          return movie.id === id
            //update movie data to remove seen id and update seen count
            ? { ...movie, seen_count: movie.seen_count - 1, seen_id: null }
            : movie;
        })
      }))

    } catch (err) {
      console.log(err)
    }
  }

  //Add a movie to the watchlist
  const handleWatchlist = async () => {
    try {
      //post the data to the api to add a movie to the watchlist
      const { data } = await axiosRes.post('/watchlist/', { movie: id });
      setMovies((prevMovies) => ({
        ...prevMovies,
        results: prevMovies.results.map((movie) => {
          return movie.id === id
            ? (
              (movie.seen_id !== null)
                  //update movie data to add watchlist id and update watchlist count
                  //if the movie was marked as seen remove this
                ? { ...movie, watchlist_count: movie.watchlist_count + 1, watchlist_id: data.id, seen_count: movie.seen_count - 1, seen_id: null }
                : { ...movie, watchlist_count: movie.watchlist_count + 1, watchlist_id: data.id }
            )
            : movie;
        })
      }))

    } catch (err) {
      console.log(err)
    }
  }

  //delete the watchlist instance
  const handleUnWatchlist = async () => {
    try {
      //delete the data from the api
      await axiosRes.delete(`/watchlist/${watchlist_id}`);
      setMovies((prevMovies) => ({
        ...prevMovies,
        results: prevMovies.results.map((movie) => {
          return movie.id === id
            //update movie data to remove watchlist id and update watchlist count
            ? { ...movie, watchlist_count: movie.watchlist_count - 1, watchlist_id: null }
            : movie;
        })
      }))

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {fullScreen && (
        <FullScreenModal src={imageData.src} alt={imageData.alt} handleClick={handleFullScreen} />
      )}
      <div className={styles.Card}>
        <div className={styles.Ratio}>
          <img
            onClick={e => handleFullScreen(e)}
            src={poster}
            alt={`${title} movie poster`}
          />
        </div>
        <div className={styles.Content}>
          <div className={styles.AvgRating}>
            {/* display average movie rating */}
            <DisplayRating title={title} rating={avg_rating} xs={true} type={"average"} />
          </div>
          <Link to={`/movies/${id}`}>
            <h3>{title}</h3>
          </Link>
          <Link to={`/movies/${id}`}>
            <p>({release_year})</p>
          </Link>
          <div className={styles.IconContainer}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>This movie was marked as seen by {seen_count} users</Tooltip>}
            >
              {/*
                here different validations will check if the user is logged and if they
                have the movie on their watchlist or if they marked the movie as seen
                and display different icons with different functions attached 
              */}

              {seen_id ? (
                // already seen
                <span
                  onClick={handleUnSeen}
                  className={appStyles.Green}
                >
                  <i className="fa-solid fa-eye"></i>
                </span>
              ) : currentUser ? (
                // logged not seen
                <span onClick={handleSeen}>
                  <i className="fa-regular fa-eye"></i>
                </span>
              ) : (
                <i className="fa-regular fa-eye"></i>
              )}
            </OverlayTrigger>
            <p>{seen_count}</p>
          </div>
          <div className={styles.IconContainer}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>This movie was marked as a future watch by {watchlist_count} users</Tooltip>}
            >
              {watchlist_id ? (
                // in the watchlist
                <span
                  onClick={handleUnWatchlist}
                >
                  <i className="fa-solid fa-bookmark"></i>
                </span>
              ) : currentUser ? (
                // logged but not in watchlist
                <span
                  onClick={handleWatchlist}
                >
                  <i className="fa-regular fa-bookmark"></i>
                </span>
              ) : (
                // not logged
                <i className="fa-regular fa-bookmark"></i>
              )}
            </OverlayTrigger>
            <p>{watchlist_count}</p>
          </div>
          <div className={styles.IconContainer}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>This movie was reviewed by {rating_count} users</Tooltip>}
            >
              <i className={'fa-regular fa-star'}></i>
            </OverlayTrigger>
            <p>{rating_count}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MoviePreviewCard