import React, { useEffect, useState } from 'react'
import styles from '../../styles/ProfilePage.module.css'
import BtnStyles from '../../styles/Button.module.css'
import Asset from '../../components/Asset'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import ProfileMovies from '../movies/ProfileMovies'
import ProfileRatings from '../ratings/ProfileRatings'

const ProfilePage = () => {
    const { id } = useParams()
    const currentUser = useCurrentUser()
    const [profile, setProfile] = useState({})
    const [movies, setMovies] = useState({})
    const [ratings, setRatings] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false)

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: profile }, { data: movies }, { data: ratings }] = await Promise.all([
                    axiosReq.get(`/profiles/${id}`),
                    axiosReq.get(`/movies/?owner_id=${id}`),
                    axiosReq.get(`/ratings/?owner_id=${id}`)
                ])
                setProfile(profile);
                setMovies(movies);
                setRatings(ratings);
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        handleMount()
    }, [id])

    return (
        <>
            {hasLoaded ? (
                <div className={styles.Container}>
                    <div className={styles.Header}>
                        <div className={styles.Avatar}>
                            <img src={profile.image} alt={`${profile.owner} avatar`} />
                        </div>
                        <h1 className={styles.Username}>{profile.owner}{profile.name !== "" && <><br /><span>{profile.name}</span></>}</h1>
                        <p className={styles.Description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at mi sed ipsum cursus elementum at nec arcu. Aenean molestie id dui eget mollis. Morbi efficitur pretium felis vestibulum tincidunt. Fusce quam mi, cursus nec elit sit amet, rhoncus condimentum ligula. Aenean risus dolor, egestas vel justo consequat, finibus aliquam quam. Vestibulum porttitor urna eget enim placerat, ut laoreet ipsum condimentum. Donec sed tellus posuere, malesuada diam nec, ultrices erat. Morbi nibh elit, fringilla vel tincidunt eget, pellentesque at tortor. Praesent tempor metus eget sodales vulputate. M</p>
                        <p className={styles.Data}>{profile.following_count}<br />Following</p>
                        <p className={styles.Data}>{profile.followers_count}<br />{profile.followers_count !== 1 ? "Followers" : "Follower"}</p>
                        <p className={styles.Data}>{profile.seen_count}<br />Seen<br />{profile.seen_count !== 1 ? " Movies" : "Movie"}</p>
                        <p className={styles.Data}>{profile.watchlist_count}<br />{profile.watchlist_count !== 1 ? "Movies in" : "Movie in"}<br />Watchlist</p>
                        <p className={styles.Data}>{profile.movie_count}<br />Created<br />{profile.movie_count !== 1 ? "movies" : "movie"}</p>
                        <p className={styles.Data}>{profile.rating_count}<br />Rated<br />{profile.rating_count !== 1 ? "movies" : "movie"}</p>
                        <p className={styles.Data}>{profile.list_count}<br />{profile.list_count !== 1 ? "Lists" : "List"}<br />created</p>
                        <div className={styles.BtnContainer}>
                            {currentUser && !profile.is_owner && (
                                profile.following_id ? (
                                    <button className={`${BtnStyles.Button} ${BtnStyles.Black} ${BtnStyles.HoverWhite}`}>Unfollow</button>
                                ) : (
                                    <button className={`${BtnStyles.Button} ${BtnStyles.White} ${BtnStyles.HoverBlack}`}>Follow</button>
                                )
                            )}
                        </div>
                    </div>
                    {profile.movie_count > 0 && (
                        <div className={styles.DisplayContrib}>
                            <h2>Movies added by {profile.owner}</h2>
                            <ProfileMovies movies={movies} setMovies={setMovies} />
                        </div>
                    )}
                    {profile.rating_count > 0 && (
                        <div className={styles.DisplayContrib}>
                            <h2>Reviews written by {profile.owner}</h2>
                            <ProfileRatings ratings={ratings} setRatings={setRatings} />
                        </div>
                    )}
                </div>
            ) : (
                <Container>
                    <Asset spinner />
                </Container>
            )}
        </>
    )
}

export default ProfilePage