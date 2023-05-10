import React, { useEffect, useState } from 'react'
import styles from '../../styles/RatingPage.module.css'
import btnStyles from '../../styles/Button.module.css'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq, axiosRes } from '../../api/axiosDefaults'
import DisplayRating from '../../components/DisplayRating'
import Avatar from '../../components/Avatar'
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { MoreDropdown } from '../../components/MoreDropdown'
import RateButtons from '../../components/RateButtons'
import { handleInputChange } from '../../utils/utils'

const RatingPage = () => {
  const { id } = useParams()
  const [rating, setRating] = useState({ results: [] })
  const [movie, setMovie] = useState({ results: [] })
  const [isEditing, setIsEditing] = useState(false)

  const history = useHistory();

  const handleIsEditing = () => {
    setIsEditing(!isEditing)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(rating.title)
    console.log(rating.content)
    console.log(rating.value)
    console.log(movie.id)

    const formData = new FormData();

    formData.append('title', rating.title);
    formData.append('content', rating.content);
    formData.append('value', rating.value);
    formData.append('movie', movie.id);

    try {
      await axiosReq.put(`/ratings/${rating.id}/`, formData);
      setRating((prevRating) => ({
        ...prevRating,
        title: rating.title,
        content: rating.content,
        value: rating.value,
      }))
      handleIsEditing()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async()=>{
    try {
      await axiosRes.delete(`/ratings/${rating.id}/`);
      history.goBack();
    } catch (err) {
      console.log(err)
    }
  }


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
      const [{ data: movieData }] = await Promise.all([
        axiosReq.get(`/movies/${rating.movie}`)
      ])
      setMovie(movieData)
    }

    if (rating.id !== undefined) {
      fetchMovieData()
    }

  }, [rating])

  useEffect(() => {
    console.log(isEditing)
  }, [isEditing])


  return (
    <>
      <div className={styles.Rating}>
        <div className={styles.Header}>
          <div className={styles.Dropdown}>
            <MoreDropdown handleEdit={handleIsEditing} handleDelete={handleDelete} />
          </div>
          <h1 className={styles.MovieTitle}>{movie.title} <span>({movie.release_year})</span></h1>
          <div
            className={styles.Stars}
            style={{ display: isEditing ? "none" : "block" }}
          >
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
        <div className={`${styles.Content} ${isEditing && "align-items-center"}`}>

          {isEditing ? (
            <Form className='d-flex flex-column' onSubmit={handleSubmit}>
              <Form.Group>
                <InputGroup className="w-100">
                  <RateButtons setRating={setRating} rating={rating} />
                  <Form.Control
                    className={`d-none`}
                    type="number"
                    name="value"
                    value={rating.value}
                    readOnly
                  />
                  <Form.Control
                    className={`w-100 my-2 ${styles.Input}`}
                    placeholder='Review Title'
                    type="text"
                    name="title"
                    value={rating.title}
                    onChange={(event) => handleInputChange(event, rating, setRating)}
                  />
                  <Form.Control
                    className={`w-100 ${styles.Textarea}`}
                    placeholder='Write your review'
                    as="textarea"
                    rows={6}
                    name="content"
                    value={rating.content}
                    onChange={(event) => handleInputChange(event, rating, setRating)}
                  />
                </InputGroup>
              </Form.Group>
              <button
                className={`mx-auto mt-4 ${btnStyles.Button} ${btnStyles.Inverted}`}
                type="submit"
              >
                Edit
              </button>
            </Form>
          ) : (
            <>
              <h2>{rating.title}</h2>
              <p>{rating.content}</p>
              <p>Movie reviewed on {rating.created_at} {rating.created_at !== rating.updated_at && <span>Edited</span>}</p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default RatingPage