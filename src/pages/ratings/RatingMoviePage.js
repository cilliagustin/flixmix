import React, { useState } from 'react'
import styles from '../../styles/RatingMoviePage.module.css'
import appStyles from '../../App.module.css'
import Avatar from '../../components/Avatar'
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import EditRatingForm from './EditRatingForm';


/**
 * Display rating inside the movie page
*/
const RatingMoviePage = ({ rating, currentUserRating = false, setMovie, movieData, setRatings, setWasRated, setUserRating }) => {
  // destructure data
  const { owner, profile_id, profile_image, id, value, title, content, comments_count } = rating
  
  //alter between displaying the information and showing the editratingForm
  const [isEditing, setIsEditing] = useState(false)
  const handleIsEditing = ()=>{
    setIsEditing(!isEditing)
  }

  //delete rating from api
  const handleDelete = async()=>{
    try {
      await axiosRes.delete(`/ratings/${id}/`);
      //get new avg rating for the movie
      const sumOfRatings = parseFloat(movieData.avg_rating) * movieData.rating_count;
      const totalNumberOfRatings = movieData.rating_count - 1;
      const newSumOfRatings = sumOfRatings - parseFloat(value);
      const newAvgRating = totalNumberOfRatings > 0 ? newSumOfRatings / totalNumberOfRatings : null;

      //set the movie as not rated by the user and delete user rating data
      setWasRated(false)
      setUserRating({ results: [] })
       //spread movies and update avg rating, rating id and ammount of ratings on target movie
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
      //delete rating from ratings
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
        //display rating information if isEditing param is false
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
        //display edit ratingForm if isEditing param is true
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

export default RatingMoviePage