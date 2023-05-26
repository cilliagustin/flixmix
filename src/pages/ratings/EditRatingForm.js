import React, { useState } from 'react'
import styles from '../../styles/RatingCreateEditForm.module.css'
import btnStyles from '../../styles/Button.module.css'
import RateButtons from "../../components/RateButtons";


import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Avatar from "../../components/Avatar";
import { axiosReq } from "../../api/axiosDefaults";
import { handleInputChange } from '../../utils/utils';
import { useErrorHandling } from './../../components/HandleErrors';
import Alert from '../../components/Alert';

const EditRatingForm = ({ movieData, handleIsEditing, setUserRating, setMovie, rating, title, content, value }) => {

    console.log({ movieData, handleIsEditing, setUserRating, setMovie, rating, title, content, value })

    const [ratingData, setRatingData] = useState({
        title: title,
        content: content,
        value: value,
    });
    const [oldValue, setOldValue] = useState(value)


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
            if (err.response?.status !== 401) {
                handleErrors(err.response?.data);
            }
        }
    }

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
                            onChange={(event) => handleInputChange(event, ratingData, setRatingData)}
                        />
                        <div className={styles.ButtonControl}>
                            <RateButtons setRating={setRatingData} rating={ratingData} />
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
                            onChange={(event) => handleInputChange(event, ratingData, setRatingData)}
                        />
                    </InputGroup>
                </Form.Group>
                <button
                    className={`mx-auto mt-4 ${btnStyles.Button}`}
                    type="submit"
                >
                    Edit
                </button>
            </Form>
        </>
    )
}

export default EditRatingForm