import React, { useEffect, useState } from 'react'
import styles from '../../styles/ProfilePage.module.css'
import Asset from '../../components/Asset'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

const ProfilePage = () => {
    const { id } = useParams()
    const currentUser = useCurrentUser()
    const [profile, setProfile] = useState({})
    const [hasLoaded, setHasLoaded] = useState(false)

    console.log(profile)

    useEffect(()=>{
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(`/profiles/${id}`)
                setProfile(data);
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        handleMount()
    },[id])

  return (
    <>
    {hasLoaded ? (
        <div className={styles.Container}>
            <div className={styles.Header}>
                <div className={styles.Avatar}>
                    <img src={profile.image} alt={`${profile.owner} profile picture`} />
                </div>
                <h1 className={styles.Username}>{profile.owner}{profile.name !== "" && <><br/><span>{profile.name}</span></>}</h1>
                <p className={styles.Description}>{profile.description}</p>
                <p className={styles.Data}>{profile.following_count}<br/>{profile.following_count !== 1 ? "Following" : ""}</p>
                <p className={styles.Data}>{profile.followers_count}<br/>{profile.followers_count !== 1 ? "Followers" : "Follower"}</p>
                <p className={styles.Data}>{profile.seen_count}<br/>{profile.seen_count !== 1 ? "Seen Movies" : "Seen Movie"}</p>
                <p className={styles.Data}>{profile.watchlist_count}<br/>{profile.watchlist_count !== 1 ? "Movies in Watchlist" : "Movie in Watchlist"}</p>
                <p className={styles.Data}>{profile.movie_count}<br/>{profile.movie_count !== 1 ? "Created movies" : "Created movie"}</p>
                <p className={styles.Data}>{profile.rating_count}<br/>{profile.rating_count !== 1 ? "Rated movies" : "Rated movie"}</p>
                <p className={styles.Data}>{profile.list_count}<br/>{profile.list_count !== 1 ? "Lists": "List"}</p>
            </div>
        </div>
    ):(
        <Container>
            <Asset spinner />
        </Container>
    )}
    </>
  )
}

export default ProfilePage