import React from 'react'
import styles from '../../styles/ProfilePreviewCard.module.css'
import BtnStyles from '../../styles/Button.module.css'
import Avatar from '../../components/Avatar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosRes } from '../../api/axiosDefaults'


/**
 * display profile in a card format
*/
const ProfilePreviewCard = (props) => {
  //destructure profile information and function to update profiles list
  const currentUser = useCurrentUser()
  const currentUserId = currentUser?.profile_id;
  const {
    followers_count, following_count, following_id, id, name, owner, image,
    is_owner, list_count, movie_count, seen_count, watchlist_count, rating_count,
    setProfiles
  } = props


  // allow a user to follow another
  const handleFollow = async () => {
    try {
      //push the data to the api
      const { data } = await axiosRes.post(`/followers/`, {
        followed: id
      })
      setProfiles((prevProfiles) => ({
        //spread the profiles
        ...prevProfiles,
        results: prevProfiles.results.map((profile) => {
          return profile.id === id
            //update the target profile adding 1 to the followers count + following id
            ? (
              { ...profile, followers_count: profile.followers_count + 1, following_id: data.id }
              ) : profile.id === currentUserId
              ? (
                //update the currentUser profile´s following count
                { ...profile, following_count: profile.following_count + 1 }
              ) : profile
        })
      }))
    } catch (err) {
      console.log(err)
    }
  }

   // allow a user to unfollow another
  const handleUnFollow = async () => {
    try {
      //delete data from the api
      await axiosRes.delete(`/followers/${following_id}`)
      setProfiles((prevProfiles) => ({
        //spread the profiles
        ...prevProfiles,
        results: prevProfiles.results.map((profile) => {
          return profile.id === id
            ? (
             //update the target profile removing one to the followers count + deleting the following id
              { ...profile, followers_count: profile.followers_count - 1, following_id: null }
            ) : profile.id === currentUserId
              ? (
                //update the currentUser profile´s removing 1 from the following count
                { ...profile, following_count: profile.following_count - 1 }
              ) : profile
        })
      }))
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className={styles.Container}>
      <div className={styles.CardHead}>
        <div className={styles.Avatar}>
          <Avatar
            src={image}
            height={110}
            id={id}
            username={null}
          />
        </div>
        <Link
          to={`/profiles/${id}`}
          className={styles.User}
        >
          <span>{owner}</span>
          {name !== "" && <><br /><span>({name})</span></>}
        </Link>
        {/* render conditionally the correct button */}
        {currentUser && !is_owner && (
          following_id ? (
            /*
            if the current user is not the profile owner and follows the profile
            render a button to unfollow the profile
            */
            <button
              className={`${BtnStyles.Button} ${BtnStyles.White} ${styles.Button}`}
              onClick={handleUnFollow}
            >
              Unfollow
            </button>
          ) : (
            /*
            if the current user is not the profile owner and does not follow the profile
            yet render a button to follow the profile
            */
            <button
              className={`${BtnStyles.Button} ${BtnStyles.HoverWhite} ${styles.Button}`}
              onClick={handleFollow}
            >
              Follow
            </button>
          )
        )}
        <p className={styles.Follow}>
          <span>Following</span><br />{following_count}
        </p>
        <p className={styles.Follow}>
          <span>Followers</span><br />{followers_count}
        </p>
      </div>
      <div className={styles.CardBody}>
        <div className={styles.Info}>
          <span>Seen Movies:</span>
          <span>{seen_count}</span>
        </div>
        <div className={styles.Info}>
          <span>Movies in Watchlist:</span>
          <span>{watchlist_count}</span>
        </div>
        <div className={styles.Info}>
          <span>Movies added:</span>
          <span>{movie_count}</span>
        </div>
        <div className={styles.Info}>
          <span>Reviews Written:</span>
          <span>{rating_count}</span>
        </div>
        <div className={styles.Info}>
          <span>Lists Created:</span>
          <span>{list_count}</span>
        </div>
      </div>
    </div>
  )
}

export default ProfilePreviewCard