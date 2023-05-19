import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import Alert from "../../components/Alert";
import { useErrorHandling } from './../../components/HandleErrors';

function CommentCreateForm(props) {
  const { parentId, setParent, setComments, profileImage, profile_id, endpoint } = props;
  const [content, setContent] = useState("");

  //Errors and alert
  const { errors, activeAlert, handleErrors } = useErrorHandling();
  const allErrors = [
    { title: "Comment body", message: errors.content },
  ]

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('content', content);
    formData.append('rating', parentId);
    try {
      const { data } = await axiosRes.post(`/${endpoint}/`, formData);
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setParent((prevParent) => ({
        ...prevParent,
        comments_count: prevParent.comments_count + 1,
      }));
      setContent("");
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
              height={25}
              id={profile_id}
              username={null}
            />
            <Form.Control
              className={styles.Form}
              placeholder="my comment..."
              as="textarea"
              value={content}
              onChange={handleChange}
              rows={2}
            />
          </InputGroup>
        </Form.Group>
        <button
          className={`${btnStyles.Button} ${btnStyles.XsButton} ml-auto`}
          type="submit"
        >
          Post
        </button>
      </Form>
    </>
  );
}

export default CommentCreateForm;