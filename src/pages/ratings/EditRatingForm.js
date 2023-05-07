import React, { useState } from 'react'
import styles from '../../styles/RatingCreateEditForm.module.css'
import btnStyles from '../../styles/Button.module.css'
import appStyles from '../../App.module.css'


import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Avatar from "../../components/Avatar";
import { axiosReq } from "../../api/axiosDefaults";

const EditRatingForm = ({ movieData, handleIsEditing, setUserRating, setMovie, rating, title, content, value }) => {
    console.log(rating)
    
    const [ratingData, setRatingData] = useState({
        title: title,
        content: content,
        value: value,
    });
    const [oldValue, setOldValue] = useState(value)

    const handleChange = (event) => {
        setRatingData({
            ...ratingData,
            [event.target.name]: event.target.value,
        });
    };

    const handleClick = (e) => {
        e.preventDefault()
        setRatingData({
            ...ratingData,
            value: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append('title', ratingData.title);
        formData.append('content', ratingData.content);
        formData.append('value', ratingData.value);
        formData.append('movie', movieData.id);

        try {
            await axiosReq.put(`/ratings/${rating.id}/`, formData);
            const sumOfRatings = parseFloat(movieData.avg_rating) * movieData.rating_count;
            const totalNumberOfRatings = movieData.rating_count;
            const difference = ratingData.value - oldValue
            const newSumOfRatings = sumOfRatings + parseFloat(difference);
            const newAvgRating = newSumOfRatings / totalNumberOfRatings;
            
            setMovie((prevMovie) => ({
                results: [
                  {
                    ...prevMovie.results[0],
                    avg_rating: newAvgRating,
                  },
                ],
              }))
              setUserRating((prevRating) => ({
                    
                    ...prevRating,
                    title: ratingData.title,
                    content: ratingData.content,
                    value: ratingData.value,
                  
              }))
            setOldValue(ratingData.value)
            handleIsEditing()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Form className={styles.CreateRating} onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup className={styles.FormDisplay}>
                    <Avatar
                        src={rating.profile_image}
                        height={55}
                        id={rating.profile_id}
                        username={null}
                        className={styles.Avatar}
                    />
                    <Form.Control
                        className={`w-100 ${styles.Input}`}
                        placeholder='Review Title'
                        type="text"
                        name="title"
                        value={ratingData.title}
                        onChange={handleChange}
                    />
                    <div className={styles.ButtonControl}>
                        <button
                            className={`${styles.StarButton} ${ratingData.value < 1 ? styles.Grey : appStyles.Green}`}
                            onClick={(e) => { handleClick(e); }} value={1}>
                            <i className="fa-solid fa-star"></i>
                        </button>
                        <button
                            className={`${styles.StarButton} ${ratingData.value < 2 ? styles.Grey : appStyles.Green}`}
                            onClick={(e) => { handleClick(e); }} value={2}>
                            <i className="fa-solid fa-star"></i>
                        </button>
                        <button
                            className={`${styles.StarButton} ${ratingData.value < 3 ? styles.Grey : appStyles.Green}`}
                            onClick={(e) => { handleClick(e); }} value={3}>
                            <i className="fa-solid fa-star"></i>
                        </button>
                        <button
                            className={`${styles.StarButton} ${ratingData.value < 4 ? styles.Grey : appStyles.Green}`}
                            onClick={(e) => { handleClick(e); }} value={4}>
                            <i className="fa-solid fa-star"></i>
                        </button>
                        <button
                            className={`${styles.StarButton} ${ratingData.value < 5 ? styles.Grey : appStyles.Green}`}
                            onClick={(e) => { handleClick(e); }} value={5}>
                            <i className="fa-solid fa-star"></i>
                        </button>
                    </div>
                    <Form.Control
                        className={`d-none`}
                        type="number"
                        name="value"
                        value={ratingData.value}
                        readOnly
                    />
                    <Form.Control
                        className={`w-100 ${styles.Textarea}`}
                        placeholder='Write your review'
                        as="textarea"
                        rows={6}
                        name="content"
                        value={ratingData.content}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Form.Group>
            <button
                className={`mx-auto mt-4 ${btnStyles.Button}`}
                disabled={!content.trim()}
                type="submit"
            >
                Edit
            </button>
        </Form>
    )
}

export default EditRatingForm