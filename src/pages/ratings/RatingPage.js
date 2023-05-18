import React, { useEffect, useState } from 'react'
import styles from '../../styles/RatingPage.module.css'
import btnStyles from '../../styles/Button.module.css'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq, axiosRes } from '../../api/axiosDefaults'
import DisplayRating from '../../components/DisplayRating'
import Avatar from '../../components/Avatar'
import Asset from '../../components/Asset'
import { Form, Row, Col } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { MoreDropdown } from '../../components/MoreDropdown'
import RateButtons from '../../components/RateButtons'
import { fetchMoreData, handleInputChange } from '../../utils/utils'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import CommentCreateForm from '../comments/CommentCreateForm'
import Comment from '../comments/Comment'
import InfiniteScroll from 'react-infinite-scroll-component'
import Alert from '../../components/Alert'
import { useErrorHandling } from './../../components/HandleErrors';
import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'

const RatingPage = () => {
  const { id } = useParams()
  const [rating, setRating] = useState({ results: [] })
  const [oldRating, setOldRating] = useState({ results: [] })
  const [isEditing, setIsEditing] = useState(false)
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });
  const { fullScreen, handleFullScreen, imageData } = useFullScreen();

  const history = useHistory();

  const handleIsEditing = () => {
    setRating(oldRating)
    setIsEditing(!isEditing)
  }

  const cancelEdit = (e) => {
    e.preventDefault();
    setActiveAlert(false)
    handleIsEditing();
  }


  const handleSubmit = async (e) => {
    e.preventDefault()


    const formData = new FormData();

    formData.append('title', rating.title);
    formData.append('content', rating.content);
    formData.append('value', rating.value);
    formData.append('movie', rating.movie);

    try {
      await axiosReq.put(`/ratings/${rating.id}/`, formData);
      setOldRating(rating);
      setRating((prevRating) => ({
        ...prevRating,
        title: rating.title,
        content: rating.content,
        value: rating.value,
      }))
      setIsEditing(!isEditing)
    } catch (err) {
      console.log(err)
      if (err.response?.status !== 401) {
        handleErrors(err.response?.data);
      }
    }
  }

  const handleDelete = async () => {
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
        const [{ data: ratingData }, { data: comments }] = await Promise.all([
          axiosReq.get(`/ratings/${id}`),
          axiosReq.get(`/ratingcomments/?rating=${id}`)
        ])
        setRating(ratingData)
        setOldRating(ratingData)
        setComments(comments)

      } catch (err) {
        console.log(err)
      }
    }

    handleMount()
  }, [id])

  //Errors and alert
  const { errors, activeAlert, setActiveAlert, handleErrors } = useErrorHandling();
  const allErrors = [
    { title: "Rating title", message: errors.title },
    { title: "Rating value", message: errors.value },
    { title: "Rating content", message: errors.content },
  ]


  return (
    <>
      <Alert type="warning" errors={allErrors} active={activeAlert} />
      {fullScreen && (
        <FullScreenModal src={imageData.src} alt={imageData.alt} handleClick={handleFullScreen} />
      )}
      <Row className='m-0'>
        <Col className='px-0'>
          <div className={styles.Rating}>
            <div className={styles.Header}>
              <div className={styles.Dropdown}>
                <MoreDropdown handleEdit={handleIsEditing} handleDelete={handleDelete} />
              </div>
              <h1 className={styles.MovieTitle}>{rating.movie_title} <span>({rating.movie_release_year})</span></h1>
              <div
                className={styles.Stars}
                style={{ display: isEditing ? "none" : "block" }}
              >
                <DisplayRating title={rating.movie_title} rating={rating.value} type={"user"} />
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
              <img
                className={styles.Poster} 
                src={rating.movie_poster}
                alt={`${rating.movie_title} movie poster`}
                onClick={e=>handleFullScreen(e)}
              />
            </div>
            <div className={`${styles.Content} ${isEditing && "align-items-center"}`}>

              {isEditing ? (
                <Form className='d-flex flex-wrap justify-content-center' onSubmit={handleSubmit}>
                  <Form.Group className="w-100">
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
                    className={`ml-auto mr-2 mt-4 ${btnStyles.Button}`}
                    type="submit"
                  >
                    Edit
                  </button>
                  <button
                    className={`mr-auto ml-2 mt-4 ${btnStyles.Button}`}
                    onClick={e => cancelEdit(e)}
                  >
                    Cancel
                  </button>
                </Form>
              ) : (
                <>
                  <h2>{rating.title}</h2>
                  <p className={styles.RatingContent}>{rating.content}</p>
                  <div className={styles.CommentsCount}>
                    <i className="fa-regular fa-comments"></i>
                    <span>{rating.comments_count}</span>
                  </div>
                  <p>Movie reviewed on {rating.created_at} {rating.created_at !== rating.updated_at && <span>Edited</span>}</p>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row className='m-0'>
        <Col className='px-0'>
          <div className={styles.Comments}>
            {currentUser ? (
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                parentId={id}
                setParent={setRating}
                setComments={setComments}
                endpoint="ratingcomments"
              />
            ) : comments.results.length ? (
              "Comments"
            ) : null}
            {comments.results.length ? (
              <InfiniteScroll
                children={
                  comments.results.map(comment => (
                    <Comment
                      key={comment.id}
                      {...comment}
                      setParent={setRating}
                      setComments={setComments}
                      endpoint="ratingcomments"
                    />
                  ))
                } n
                dataLength={comments.results.length}
                loader={<Asset spinner />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
              />

            ) : currentUser ? (
              <span>No comments yet, be the first to do it</span>
            ) : (
              <span>No comments yet</span>
            )}
          </div>
        </Col>
      </Row>
    </>
  )
}

export default RatingPage