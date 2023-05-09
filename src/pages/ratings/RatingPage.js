import React, { useEffect, useState } from 'react'
import styles from '../../styles/RatingPage.module.css'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
import DisplayRating from '../../components/DisplayRating'
import Avatar from '../../components/Avatar'

const RatingPage = () => {
  const { id } = useParams()
  const [rating, setRating] = useState({ results: [] })
  const [movie, setMovie] = useState({ results: [] })


  console.log(rating)
  console.log(movie)

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: ratingData } = await axiosReq.get(`/ratings/${id}`)
        setRating(ratingData)

      } catch (err) {
        console.log(err)
      }
    }

    handleMount()
  }, [id])

  useEffect(() => {
    const fetchMovieData = async () => {
      const [{ data: movieData } ] = await Promise.all([
        axiosReq.get(`/movies/${rating.movie}`)
      ])
      setMovie(movieData)
    }

    if (rating.id !== undefined) {
      fetchMovieData()
    }

  }, [rating])


  return (
    <>
      <div className={styles.Rating}>
        <div className={styles.Header}>
          <h1 className={styles.MovieTitle}>{movie.title} <span>({movie.release_year})</span></h1>
          <div className={styles.Stars}>
            <DisplayRating title={movie.title} rating={rating.value} type={"user"} />
          </div>
          <div className={styles.User}>
            <Avatar
              src={rating?.profile_image} 
              height={30}
              id={rating?.profile_id}
              username={null}
            />
            <Link to={`/profiles/${rating?.profile_id}`}>{rating?.owner}</Link>
          </div>
          <img className={styles.Poster} src={movie.poster} alt={`${movie.title} movie poster`} />
        </div>
        <div className={styles.Content}>
          <h2>{rating.title}</h2>
          <p>{rating.content}</p>
          <p>{rating.created_at} {rating.created_at !== rating.updated_at && <span>Edited</span>}</p>
        </div>
      </div>
    </>
  )
}

export default RatingPage