import React, { useState } from 'react'
import styles from '../../styles/MoviePreviewCard.module.css'
import appStyles from '../../App.module.css'

import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import { OverlayTrigger, Tooltip} from "react-bootstrap";

import { useCurrentUser } from '../../contexts/CurrentUserContext';

import { axiosRes } from '../../api/axiosDefaults';



const MoviePreviewCard = (props) => {
    const { 
        id, rating_count, seen_count, seen_id, watchlist_count, watchlist_id,
        title, poster, release_year, setMovies,
        // owner, profile_id, profile_image,  list_count,
        // created_at, updated_at,  synopsis, directors, main_cast,  movie_genre,
        // release_decade
    } = props;

    const [fullScreen, setFullScreen] = useState(false);
    const handleFullScreen = ()=> setFullScreen(!fullScreen)

    const currentUser = useCurrentUser();

    const handleSeen = async ()=>{
        try {
            const {data} = await axiosRes.post('/seen/', {movie:id});
            setMovies((prevMovies)=>({
                ...prevMovies,
                results: prevMovies.results.map((movie)=>{
                    return movie.id === id
                    ? (
                        (movie.watchlist_id !== null)
                          ? {...movie, seen_count: movie.seen_count + 1, seen_id: data.id, watchlist_count: movie.watchlist_count - 1, watchlist_id:null}
                          : {...movie, seen_count: movie.seen_count + 1, seen_id: data.id}
                      )
                    : movie;

                    
                })
            }))
            
        } catch (err) {
            console.log(err)
        }
    }

    const handleUnSeen = async ()=>{
        try {
            await axiosRes.delete(`/seen/${seen_id}`);
            setMovies((prevMovies)=>({
                ...prevMovies,
                results: prevMovies.results.map((movie)=>{
                    return movie.id === id
                    ? {...movie, seen_count: movie.seen_count - 1, seen_id: null}
                    : movie;
                })
            }))
            
        } catch (err) {
            console.log(err)
        }
    }

    const handleWatchlist = async ()=>{
        try {
            const {data} = await axiosRes.post('/watchlist/', {movie:id});
            setMovies((prevMovies)=>({
                ...prevMovies,
                results: prevMovies.results.map((movie)=>{
                    return movie.id === id
                    ? (
                        (movie.seen_id !== null)
                          ? {...movie, watchlist_count: movie.watchlist_count + 1, watchlist_id: data.id, seen_count: movie.seen_count - 1, seen_id:null}
                          : {...movie, watchlist_count: movie.watchlist_count + 1, watchlist_id: data.id}
                      )
                    : movie;
                })
            }))
            
        } catch (err) {
            console.log(err)
        }
    }

    const handleUnWatchlist = async ()=>{
        try {
            await axiosRes.delete(`/watchlist/${watchlist_id}`);
            setMovies((prevMovies)=>({
                ...prevMovies,
                results: prevMovies.results.map((movie)=>{
                    return movie.id === id
                    ? {...movie, watchlist_count: movie.watchlist_count - 1, watchlist_id: null}
                    : movie;
                })
            }))
            
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className={styles.Card}>
        <div className={fullScreen ? styles.FullScreen : styles.Ratio}>
          <img 
            onClick={handleFullScreen}
            src={poster} 
            alt={`${title} movie poster`} 
          />
          {fullScreen && (
              <img 
              src={poster} 
              alt={`${title} movie poster overlay`} 
              className={styles.PosterOverlay}
              onClick={handleFullScreen}
              />
          )}
        </div>
        <div className={styles.Content}>
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
              {seen_id ? (
                // already seen
                <span 
                onClick={handleUnSeen}
                    className={appStyles.Green}
                >
                    <i className="fa-solid fa-eye"></i>
                </span>
              ): currentUser ? (
                // logged not seen
                <span onClick={handleSeen}>
                    <i className="fa-regular fa-eye"></i>
                </span>
              ): (
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
              ): currentUser ? (
                // logged but not in watchlist
                <span
                    onClick={handleWatchlist}
                >
                    <i className="fa-regular fa-bookmark"></i>
                </span>
              ): (
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
  )
}

export default MoviePreviewCard