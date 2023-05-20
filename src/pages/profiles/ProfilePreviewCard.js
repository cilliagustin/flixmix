import React from 'react'
import styles from '../../styles/ProfilePreviewCard.module.css'
import BtnStyles from '../../styles/Button.module.css'
import Avatar from '../../components/Avatar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const ProfilePreviewCard = (props) => {
  console.log(props)
  const {
    followers_count, following_count, following_id, id, name, owner, image,
    is_owner, list_count, movie_count, seen_count, watchlist_count, rating_count,
    setProfiles
  } = props
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
        {!is_owner && (
          <button className={`${BtnStyles.Button} ${styles.Button}`}>Follow</button>
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