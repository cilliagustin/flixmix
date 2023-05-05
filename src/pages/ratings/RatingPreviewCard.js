import React from 'react'
import styles from '../../styles/RatingPreviewCard.module.css'
import appStyles from '../../App.module.css'
import Avatar from '../../components/Avatar'
import { OverlayTrigger, Tooltip} from "react-bootstrap";
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


const RatingPreviewCard = ({rating, userRating = false}) => {
  const {owner, profile_id, profile_image, id, value, title, content, comments_count } = rating
  return (
    <div className={`${styles.Container} ${userRating && styles.UserRating}`}>
      <Avatar src={profile_image}
              height={25}
              id={profile_id}
              username={null}
      />
      <div className={styles.User}>
        <Link to={`/profiles/${profile_id}`}>{owner}</Link>
      </div>
      <div className={styles.Stars}>
        <i className={`${value >= 1 && appStyles.Green} fa-solid fa-star`}></i>
        <i className={`${value >= 2 && appStyles.Green} fa-solid fa-star`}></i>
        <i className={`${value >= 3 && appStyles.Green} fa-solid fa-star`}></i>
        <i className={`${value >= 4 && appStyles.Green} fa-solid fa-star`}></i>
        <i className={`${value >= 5 && appStyles.Green} fa-solid fa-star`}></i>
      </div>
      <h4 className={styles.Title}><Link to={`/ratings/${id}`}>{title}</Link></h4>
      <p className={styles.Content}><Link to={`/ratings/${id}`}>{content}</Link></p>
      <OverlayTrigger
          placement="top"
          overlay={<Tooltip>This review has {comments_count} {comments_count === 1 ? "comment" : "coments"} </Tooltip>}
      >
      <div className={styles.CommentCount}>
                <i class="fa-regular fa-comment"></i>
                <span>{comments_count}</span>
      </div>
      </OverlayTrigger>
    </div>
  )
}

export default RatingPreviewCard