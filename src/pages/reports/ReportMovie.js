import React, { useState } from 'react'
import styles from '../../styles/ReportMovie.module.css'
import btnStyles from '../../styles/Button.module.css'
import appStyles from '../../App.module.css'
import { Form } from "react-bootstrap";
import { axiosReq } from '../../api/axiosDefaults'
import Alert from "../../components/Alert";
import { useErrorHandling } from './../../components/HandleErrors';

/**
 * display to a registered user a button to make a report and
 * the report form modal
*/
const ReportMovie = ({ id, setMovies }) => {
    const [showForm, setShowForm] = useState(false);
    const [content, setContent] = useState("");

    //Errors and alert
    const { errors, activeAlert, handleErrors } = useErrorHandling();
    const allErrors = [
        { title: "Report Content", message: errors.content },
    ]

    const handleChange = (e) => {
        setContent(e.target.value)
    }

    //send report to api
    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            movie: id,
            content: content,
        };
        try {
            const { data } = await axiosReq.post("/reports/", requestData);
            setMovies((prevMovies) => ({
                ...prevMovies,
                results: prevMovies.results.map((movie) => {
                    // increment report count for movie and ser report id
                    return movie.id === id
                        ? { ...movie, report_count: movie.report_count + 1, report_id: data.id }
                        : movie;
                })
            }))
            setContent("")
            setShowForm(false)

        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                handleErrors(err.response?.data);
            }
        }
    }
    return (
        <>
            <Alert type="warning" errors={allErrors} active={activeAlert} />
            {showForm && (
                // if users sets the showForm state to true the modal will appear and
                // allow the user to submit a report
                <div className={styles.Overlay}>
                    <div className={styles.ReportContainer}>
                        <div className={styles.Header}>
                            <h4>Report movie</h4>
                        </div>
                        <button
                            className={styles.Btn}
                            onClick={() => setShowForm(false)}
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <Form
                            className="d-flex flex-column align-items-center justify-content-center px-3 mt-4"
                            onSubmit={handleSubmit}
                        >
                            <Form.Group>
                                <Form.Control
                                    className={appStyles.TextArea}
                                    placeholder="Write your report..."
                                    as="textarea"
                                    value={content}
                                    onChange={handleChange}
                                    rows={7}
                                />
                            </Form.Group>
                            <button
                                className={`${btnStyles.Button} ${btnStyles.XsButton} ${btnStyles.HoverWhite} mt-5`}
                                type="submit"
                                disabled={!content.trim()}
                            >
                                Post
                            </button>
                        </Form>
                    </div>
                </div>
            )}
            {/* this button will allow the user to open the report modal */}
            <button
                className={`${btnStyles.Button} ${btnStyles.BigButton} ${btnStyles.Black} ${btnStyles.HoverWhite}`}
                onClick={() => setShowForm(true)}
            >
                Report movie
            </button>
        </>
    )
}

export default ReportMovie