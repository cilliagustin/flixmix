import React, { useEffect, useState } from 'react'
import styles from '../../styles/RatingCreateEditForm.module.css'
import btnStyles from '../../styles/Button.module.css'
import appStyles from '../../App.module.css'


import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Avatar from "../../components/Avatar";
import { axiosReq } from "../../api/axiosDefaults";

function RatingCreateForm(props) {
  const { movie, setMovie, setRatings, setWasRated, setUserRating, profile_image, profile_id } = props;
  const [ratingData, setRatingData] = useState({
        title: "",
        content: "",
        value: "",
        movieData: movie,
    });

    const { title, content, value, movieData } = ratingData;

    const handleChange = (event) => {
        setRatingData({
            ...ratingData,
            [event.target.name]: event.target.value,
        });
    };

    const handleClick = (e)=> {
      e.preventDefault()
      setRatingData({
        ...ratingData,
        value: e.target.value,
      });
      console.log(ratingData)
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('value', value);
    formData.append('movie', movie);

    console.log(title, content, value, movie)


    try {
      const { data } = await axiosReq.post("/ratings/", formData);
  
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
            },
          ],
        })),
      ]);
  
      setWasRated(true);
    } catch (err) {
      console.log(err);
    }
  };


  return (
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
            onChange={handleChange}
          />
          <div className={styles.ButtonControl}>
            <button
              className={`${styles.StarButton} ${value < 1 ? styles.Grey : appStyles.Green}`}
              onClick={(e) => {handleClick(e);}} value={1}>
                <i className="fa-solid fa-star"></i>
            </button>
            <button
              className={`${styles.StarButton} ${value < 2 ? styles.Grey : appStyles.Green}`}
              onClick={(e) => {handleClick(e);}} value={2}>
                <i className="fa-solid fa-star"></i>
            </button>
            <button
              className={`${styles.StarButton} ${value < 3 ? styles.Grey : appStyles.Green}`}
              onClick={(e) => {handleClick(e);}} value={3}>
                <i className="fa-solid fa-star"></i>
            </button>
            <button
              className={`${styles.StarButton} ${value < 4 ? styles.Grey : appStyles.Green}`}
              onClick={(e) => {handleClick(e);}} value={4}>
                <i className="fa-solid fa-star"></i>
            </button>
            <button
              className={`${styles.StarButton} ${value < 5 ? styles.Grey : appStyles.Green}`}
              onClick={(e) => {handleClick(e);}} value={5}>
                <i className="fa-solid fa-star"></i>
            </button>
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
            placeholder='Review Title'
            as="textarea"
            rows={6}
            name="content"
            value={content}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`mx-auto mt-4 ${btnStyles.Button}`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default RatingCreateForm;