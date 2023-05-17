import React, { useState } from 'react'
import styles from '../../styles/RatingCreateEditForm.module.css'
import btnStyles from '../../styles/Button.module.css'

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Avatar from "../../components/Avatar";
import { axiosReq } from "../../api/axiosDefaults";
import RateButtons from '../../components/RateButtons';
import { handleInputChange } from '../../utils/utils';
import Alert from "../../components/Alert";
import { useErrorHandling } from './../../components/HandleErrors';

function RatingCreateForm(props) {
  const { movieId, movieData, setMovie, setRatings, setWasRated, profile_image, profile_id } = props;
  const [ratingData, setRatingData] = useState({
    title: "",
    content: "",
    value: "",
  });

  const { title, content, value } = ratingData;


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('value', value);
    formData.append('movie', movieId);

    try {
      const { data } = await axiosReq.post("/ratings/", formData);

      const sumOfRatings = parseFloat(movieData.avg_rating) * movieData.rating_count;
      const totalNumberOfRatings = movieData.rating_count + 1;
      const newSumOfRatings = sumOfRatings + parseFloat(value);
      const newAvgRating = movieData.rating_count !== 0 ? (newSumOfRatings / totalNumberOfRatings).toFixed(2) : value;

      await Promise.all([
        setRatings((prevRating) => ({
          ...prevRating,
          results: [data, ...prevRating.results],
        })),
        setMovie((prevMovie) => ({
          results: [
            {
              ...prevMovie.results[0],
              rating_count: prevMovie.results[0].rating_count + 1,
              rating_id: data.id,
              avg_rating: newAvgRating,
            },
          ],
        })),
      ]);

      setWasRated(true);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        handleErrors(err.response?.data);
      }
    }
  };

  //Errors and alert
  const { errors, activeAlert, handleErrors } = useErrorHandling();
  const allErrors = [
    { title: "Rating title", message: errors.title },
    { title: "Rating value", message: errors.value },
    { title: "Rating content", message: errors.content },
  ]


  return (
    <>
      <Alert type="warning" errors={allErrors} active={activeAlert} />
      <Form className={styles.CreateRating} onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup className={styles.FormDisplay}>
            <Avatar
              src={profile_image}
              height={55}
              id={profile_id}
              username={null}
              className={styles.Avatar}
            />
            <Form.Control
              className={`w-100 ${styles.Input}`}
              placeholder='Review Title'
              type="text"
              name="title"
              value={title}
              onChange={(event) => handleInputChange(event, ratingData, setRatingData)}
            />
            <div className={styles.ButtonControl}>
              <RateButtons setRating={setRatingData} rating={ratingData} />
            </div>
            <Form.Control
              className={`d-none`}
              type="number"
              name="value"
              value={value}
              readOnly
            />
            <Form.Control
              className={`w-100 ${styles.Textarea}`}
              placeholder='Write your review'
              as="textarea"
              rows={6}
              name="content"
              value={content}
              onChange={(event) => handleInputChange(event, ratingData, setRatingData)}
            />
          </InputGroup>
        </Form.Group>
        <button
          className={`mx-auto mt-4 ${btnStyles.Button}`}
          type="submit"
        >
          post
        </button>
      </Form>
    </>
  );
}

export default RatingCreateForm;