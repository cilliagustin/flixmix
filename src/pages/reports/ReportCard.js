import React from 'react'
import btnStyles from '../../styles/Button.module.css'
import styles from '../../styles/ReportCard.module.css'

import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'
import Avatar from '../../components/Avatar'

import { axiosRes } from '../../api/axiosDefaults';

const ReportCard = (props) => {
    const { content, id, movie, movie_poster, movie_release_year, movie_title, owner, profile_id, profile_image, setReports, created_at, reportCount, setReportCount } = props
    const { fullScreen, handleFullScreen, imageData } = useFullScreen();

    const closeReport = async () => {

        try {
            await axiosRes.delete(`/reports/${id}/`)
            setReports((prevReports) => ({
                ...prevReports,
                results: prevReports.results.filter((report) => report.id !== id),
            }));
            setReportCount(reportCount -1)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {fullScreen && (
                <FullScreenModal src={imageData.src} alt={imageData.alt} handleClick={handleFullScreen} />
            )}
            <div className={`${styles.Card}`}>
                <div className={styles.Poster}>
                    <img
                        src={movie_poster}
                        alt={`${movie_title} movie poster`}
                        onClick={e => handleFullScreen(e)}
                    />
                </div>
                <Link to={`/movies/${movie}`} className={styles.Title}>{movie_title}</Link>
                <Link to={`/movies/${movie}`} className={styles.Year}>({movie_release_year})</Link>
                <div className={styles.User}>
                    <Avatar
                        src={profile_image}
                        height={35}
                        id={profile_id}
                        username={null}
                    />
                    <Link to={`/profiles/${profile_id}`} className={styles.Username}>{owner}</Link>
                </div>
                <p className={styles.Content}>{content}</p>
                <button
                    className={`${btnStyles.Button} ${btnStyles.Black} ${btnStyles.HoverWhiteAndBlack}`}
                    onClick={closeReport}
                >
                    Close
                </button>
                <span className={styles.Date}>
                    Report opened on {created_at}
                </span>
            </div>
        </>
    )
}

export default ReportCard