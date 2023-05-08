import React, { useEffect, useState } from 'react'
import styles from '../../styles/RatingPreviewCard.module.css'
import appStyles from '../../App.module.css'
import Avatar from '../../components/Avatar'
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import EditRatingForm from './EditRatingForm';


const RatingPreviewCard = ({ rating, currentUserRating = false, setMovie, movieData, setRatings, setWasRated, setUserRating }) => {
  const { owner, profile_id, profile_image, id, value, title, content, comments_count } = rating
  const [isEditing, setIsEditing] = useState(false)
  const handleIsEditing = ()=>{
    setIsEditing(!isEditing)
  }


  const handleDelete = async()=>{
    try {
      await axiosRes.delete(`/ratings/${id}/`);
      const sumOfRatings = parseFloat(movieData.avg_rating) * movieData.rating_count;
      const totalNumberOfRatings = movieData.rating_count - 1;
      const newSumOfRatings = sumOfRatings - parseFloat(value);
      const newAvgRating = totalNumberOfRatings > 0 ? newSumOfRatings / totalNumberOfRatings : null;



      setWasRated(false)
      setUserRating({ results: [] })
      setMovie((prevMovie) => ({
        results: [
          {
            ...prevMovie.results[0],
            rating_count: prevMovie.results[0].rating_count - 1,
            rating_id: null,
            avg_rating: newAvgRating,
          },
        ],
      }))
      setRatings((prevRatings)=>({
        ...prevRatings,
        results: prevRatings.results.filter(rating => rating.id !== id),
      }))
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <>
      {!isEditing ? (
        <div className={`${styles.Container} ${currentUserRating && styles.UserRating}`}>
          {currentUserRating && <div className={styles.Dropdown}><MoreDropdown color={"grey"} handleDelete={handleDelete} handleEdit={handleIsEditing} /></div>}
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
          <h4 className={styles.Title}><Link to={`/reviews/${id}`}>{title}</Link></h4>
          <p className={styles.Content}><Link to={`/reviews/${id}`}>{content}</Link></p>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>This review has {comments_count} {comments_count === 1 ? "comment" : "coments"} </Tooltip>}
          >
            <div className={styles.CommentCount}>
              <i className="fa-regular fa-comment"></i>
              <span>{comments_count}</span>
            </div>
          </OverlayTrigger>
        </div>
      ) : (
        <EditRatingForm 
          movieData={movieData}
          setMovie={setMovie}
          rating={rating}
          title={title}
          content={content}
          value={value}
          handleIsEditing={handleIsEditing}
          setUserRating={setUserRating}
        />
      )}
    </>
  )
}

export default RatingPreviewCard