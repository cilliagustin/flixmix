import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";

import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import Alert from "../../components/Alert";
import { useErrorHandling } from './../../components/HandleErrors';

const CommentEditForm = (props) => {
    const { id, rating, profile_id, content, profileImage, setComments, setShowEditForm, endpoint } = props;
    const [formContent, setFormContent] = useState(content);

    //Errors and alert
    const { errors, activeAlert, handleErrors } = useErrorHandling();
    const allErrors = [
        { title: "Comment body", message: errors.content },
    ]

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('content', formContent.trim());
        formData.append('rating', rating);

        try {
            await axiosRes.put(`/${endpoint}/${id}/`, formData);
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                            ...comment,
                            content: formContent.trim(),
                            updated_at: "now",
                        }
                        : comment;
                }),
            }));
            setShowEditForm(false);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                handleErrors(err.response?.data);
            }
        }
    };

    return (
        <>
            <Alert type="warning" errors={allErrors} active={activeAlert} />
            <Form className="my-2 mx-4 d-flex flex-column" onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Avatar
                            src={profileImage}
                            height={35}
                            id={profile_id}
                            username={null}
                        />
                        <Form.Control
                            className={styles.Form}
                            placeholder="my comment..."
                            as="textarea"
                            value={formContent}
                            onChange={handleChange}
                            rows={2}
                        />
                    </InputGroup>
                </Form.Group>
                <button
                    className={`${btnStyles.Button} ${btnStyles.XsButton} ml-auto`}
                    type="submit"
                >
                    Edit
                </button>
            </Form>
        </>
    )
}

export default CommentEditForm