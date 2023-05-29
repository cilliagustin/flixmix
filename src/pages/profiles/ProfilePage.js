import React, { useEffect, useState } from 'react'
import styles from '../../styles/ProfilePage.module.css'
import BtnStyles from '../../styles/Button.module.css'
import Asset from '../../components/Asset'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq, axiosRes } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import ProfileMovies from '../movies/ProfileMovies'
import ProfileRatings from '../ratings/ProfileRatings'
import { ProfileEditDropdown } from '../../components/MoreDropdown'
import ProfileLists from '../lists/ProfileLists'


/**
 * Display profile Page
*/
const ProfilePage = () => {
    // get id from url
    const { id } = useParams()
    const [hasLoaded, setHasLoaded] = useState(false)
    const currentUser = useCurrentUser()
    // profile data
    const [profile, setProfile] = useState({})
    // movies data
    const [movies, setMovies] = useState({})
    // ratings data
    const [ratings, setRatings] = useState({});
    // lists data
    const [lists, setLists] = useState({});
    

    useEffect(() => {
        const handleMount = async () => {
            try {
                // fetch data for the profile and their movies, reviews and lists
                const [{ data: profile }, { data: movies }, { data: ratings }, { data: lists }] = await Promise.all([
                    axiosReq.get(`/profiles/${id}`),
                    axiosReq.get(`/movies/?owner_id=${id}`),
                    axiosReq.get(`/ratings/?owner_id=${id}`),
                    axiosReq.get(`/lists/?owner_id=${id}`)
                ])
                setProfile(profile);
                setMovies(movies);
                setRatings(ratings);
                setLists(lists)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        handleMount()
    }, [id])


    // allow a user to follow another
    const handleFollow = async () => {
        try {
            //push the data to the api
            const { data } = await axiosRes.post(`/followers/`, {
                followed: profile.id
            })
            setProfile((prevProfile) => ({
                //spread the profile and add them the profile id + follower count
                ...prevProfile,
                following_id: data.id,
                followers_count: profile.followers_count + 1
            }))
        } catch (err) {
            console.log(err)
        }
    }
    
    // allow a user to unfollow another
    const handleUnFollow = async () => {
        try {
            //remove the data to the api
            await axiosRes.delete(`/followers/${profile.following_id}`)
            setProfile((prevProfile) => ({
                //spread the profile and remove the profile id + remove 1 from follower count
                ...prevProfile,
                following_id: null,
                followers_count: profile.followers_count - 1
            }))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {hasLoaded ? (
                // if the data has loaded display all the profile information
                <div className={styles.Container}>
                    <div className={styles.Header}>
                        <div className={styles.Avatar}>
                            <img src={profile.image} alt={`${profile.owner} avatar`} />
                        </div>
                        <h1 className={styles.Username}>{profile.owner}{profile.name !== "" && <><br /><span>{profile.name}</span></>}</h1>
                        <p className={styles.Description}>{profile.description}</p>
                        <p className={styles.Data}>{profile.following_count}<br />Following</p>
                        <p className={styles.Data}>{profile.followers_count}<br />{profile.followers_count !== 1 ? "Followers" : "Follower"}</p>
                        <p className={styles.Data}>{profile.seen_count}<br />Seen<br />{profile.seen_count !== 1 ? " Movies" : "Movie"}</p>
                        <p className={styles.Data}>{profile.watchlist_count}<br />{profile.watchlist_count !== 1 ? "Movies in" : "Movie in"}<br />Watchlist</p>
                        <p className={styles.Data}>{profile.movie_count}<br />Created<br />{profile.movie_count !== 1 ? "movies" : "movie"}</p>
                        <p className={styles.Data}>{profile.rating_count}<br />Rated<br />{profile.rating_count !== 1 ? "movies" : "movie"}</p>
                        <p className={styles.Data}>{profile.list_count}<br />{profile.list_count !== 1 ? "Lists" : "List"}<br />created</p>
                        <div className={styles.BtnContainer}>
                            {currentUser && (
                                //conditionally render a button for logged in users
                                !profile.is_owner ?(
                                    profile.following_id ? (
                                        //if the current user is not the owner of the profile
                                        // and already follows this profile display a button
                                        // to unfollow the profile
                                        <button
                                        className={`${BtnStyles.Button} ${BtnStyles.Black} ${BtnStyles.HoverWhite}`}
                                        onClick={handleUnFollow}
                                        >
                                        Unfollow
                                    </button>
                                ) : (
                                    //if the current user is not the owner of the profile
                                    // and does not follow this profile display a button
                                    // to follow the profile
                                    <button
                                    className={`${BtnStyles.Button} ${BtnStyles.White} ${BtnStyles.HoverBlack}`}
                                    onClick={handleFollow}
                                    >
                                        Follow
                                    </button>
                                )) : (
                                    //if the current user is the owner of the profile display
                                    // the profileEditDropdown to show thelinks to update
                                    // the profile, username or password
                                    <ProfileEditDropdown id={profile?.id} />
                                )
                            )}
                        </div>
                    </div>
                    {profile.movie_count > 0 && (
                        //display list of movies created by the user if they have any
                        <div className={styles.DisplayContrib}>
                            <h2>Movies added by {profile.owner}</h2>
                            <ProfileMovies movies={movies} setMovies={setMovies} />
                        </div>
                    )}
                    {profile.rating_count > 0 && (
                    //display list of reviews created by the user if they have any
                    <div className={styles.DisplayContrib}>
                            <h2>Reviews written by {profile.owner}</h2>
                            <ProfileRatings ratings={ratings} setRatings={setRatings} />
                        </div>
                    )}
                    {profile.list_count > 0 && (
                    //display list of lists created by the user if they have any
                        <div className={styles.DisplayContrib}>
                            <h2>Lists created by {profile.owner}</h2>
                            {/* display all lists owner by the profile */}
                            <ProfileLists lists={lists} setLists={setLists} />
                        </div>
                    )}
                </div>
            ) : (
                // display spinner until data is fetched
                <Container>
                    <Asset spinner />
                </Container>
            )}
        </>
    )
}

export default ProfilePage