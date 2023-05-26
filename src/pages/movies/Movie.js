import React from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Avatar from '../../components/Avatar'

import { useCurrentUser } from '../../contexts/CurrentUserContext';

import styles from '../../styles/Movie.module.css'
import appStyles from '../../App.module.css'
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';
import DisplayRating from '../../components/DisplayRating';
import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'
import ReportMovie from '../reports/ReportMovie';
import { useProfileData } from '../../contexts/ProfileDataContext';

const Movie = (props) => {
    const {
        id, owner, profile_id, profile_image, list_count,
        seen_count, seen_id, watchlist_count, watchlist_id,
        title, synopsis, directors, main_cast, movie_genre,
        poster, release_year, setMovies, rating_count, rating_id,
        avg_rating, report_id, report_count
    } = props;

    const { fullScreen, handleFullScreen, imageData } = useFullScreen();



    const currentUser = useCurrentUser();
    const profileData = useProfileData();
    const isAdmin = profileData?.is_admin;

    const history = useHistory();

    const handleEdit = () => {
        history.push(`/movies/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/movies/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSeen = async () => {
        try {
            const { data } = await axiosRes.post('/seen/', { movie: id });
            setMovies((prevMovies) => ({
                ...prevMovies,
                results: prevMovies.results.map((movie) => {
                    return movie.id === id
                        ? (
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

    const handleUnSeen = async () => {
        try {
            await axiosRes.delete(`/seen/${seen_id}`);
            setMovies((prevMovies) => ({
                ...prevMovies,
                results: prevMovies.results.map((movie) => {
                    return movie.id === id
                        ? { ...movie, seen_count: movie.seen_count - 1, seen_id: null }
                        : movie;
                })
            }))

        } catch (err) {
            console.log(err)
        }
    }

    const handleWatchlist = async () => {
        try {
            const { data } = await axiosRes.post('/watchlist/', { movie: id });
            setMovies((prevMovies) => ({
                ...prevMovies,
                results: prevMovies.results.map((movie) => {
                    return movie.id === id
                        ? (
                            (movie.seen_id !== null)
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

    const handleUnWatchlist = async () => {
        try {
            await axiosRes.delete(`/watchlist/${watchlist_id}`);
            setMovies((prevMovies) => ({
                ...prevMovies,
                results: prevMovies.results.map((movie) => {
                    return movie.id === id
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
            <div className={`${styles.Header} d-flex`}>
                <div className={`${styles.PosterContainer} d-flex align-items-center justify-content-center`}>
                    <img
                        src={poster}
                        alt={`${title} movie poster`}
                        onClick={e => handleFullScreen(e)}
                    />
                </div>
                <div className={styles.InfoContainer}>
                    <h1>{title} <span>({release_year})</span></h1>
                    <p>Directed by: <span>{directors}</span></p>
                    <p>Genre: <span>{movie_genre}</span></p>
                    <p>Main cast: <span>{main_cast}</span></p>
                    <div className={styles.AvgRating}>
                        <DisplayRating title={title} rating={avg_rating} type={"average"} />
                    </div>
                    <div className={styles.IconsWrapper}>
                        <div className={styles.Icon}>
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
                                // not logged
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Log in to mark as a seen movie</Tooltip>}
                                >
                                    <i className="fa-regular fa-eye"></i>
                                </OverlayTrigger>
                            )}
                            <p>Seen by {seen_count} {seen_count !== 1 ? "users" : "user"}</p>
                        </div>
                        <div className={styles.Icon}>
                            {watchlist_id ? (
                                // in the watchlist
                                <span
                                    onClick={handleUnWatchlist}
                                    className={appStyles.Green}
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
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Log in to add this movie to your watchlist</Tooltip>}
                                >
                                    <i className="fa-regular fa-bookmark"></i>
                                </OverlayTrigger>
                            )}
                            <p>Added to {watchlist_count} future watchlists</p>
                        </div>
                        <div className={styles.Icon}>
                            <i className="fa-solid fa-list-ul"></i>
                            <p>Appears in {list_count} lists</p>
                        </div>
                        <div className={styles.Icon}>
                            {rating_id ? (
                                // rated
                                <i className={`${appStyles.Green} fa-solid fa-star`}></i>
                            ) : currentUser ? (
                                // logged but hasn´t rated yet
                                <i className="fa-regular fa-star"></i>
                            ) : (
                                // not logged
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Log in to review this movie</Tooltip>}
                                >
                                    <i className="fa-regular fa-star"></i>
                                </OverlayTrigger>
                            )}
                            <p>Movie reviewed {rating_count} {rating_count === 1 ? "time" : "times"}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.DropdownContainer}>
                    {isAdmin && (
                        <MoreDropdown color={"white"} handleEdit={handleEdit} handleDelete={handleDelete} />
                    )}
                </div>
            </div>
            <div className={styles.Body}>
                <p>{synopsis}</p>
                <div className={styles.Credits}>
                    <p>Movie information provided by <Link to={`/profiles/${profile_id}`}>{owner}</Link></p>
                    <Avatar
                        src={profile_image}
                        height={35}
                        id={profile_id}
                        username={null}
                    />
                </div>
                {currentUser && (
                    profileData?.is_admin ? (
                        <span className={styles.Reported}>
                            This movie has {report_count} <Link to={`/admin`}>{report_count === 1 ? "report" : "reports"}</Link> open
                        </span>
                    ) : (
                        <>
                            {report_id ? (
                                <span className={styles.Reported}>
                                    You already reported this movie. The administrator will handle this shortly.
                                </span>
                            ) : (
                                <div className={styles.Report}>
                                    <ReportMovie id={id} setMovies={setMovies} />
                                </div>
                            )}
                        </>
                    )

                )}
            </div>
        </>
    )
}

export default Movie