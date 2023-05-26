import React from 'react'
import styles from '../../styles/ListPreviewCard.module.css'
import Avatar from '../../components/Avatar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'

const ListPreviewCard = (props) => {

    const { id, title, owner, profile_id, profile_image, created_at, comments_count, movies_details, description } = props
    const { fullScreen, handleFullScreen, imageData } = useFullScreen();
    return (
        <>
            {fullScreen && (
                <FullScreenModal src={imageData.src} alt={imageData.alt} handleClick={handleFullScreen} />
            )}
            <div className={styles.Container}>
                <div className={styles.Posters}>
                    {movies_details.slice(0, 6).map((movie) => (
                        <div className={styles.Poster} key={movie.id}>
                            <img
                                src={movie.poster}
                                alt={`${movie.title} movie poster`}
                                onClick={e => handleFullScreen(e)}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.Avatar}>
                    <Avatar
                        src={profile_image}
                        height={30}
                        id={profile_id}
                        username={null}
                    />
                </div>
                <Link
                    to={`/profiles/${profile_id}`}
                    className={styles.Username}
                >
                    {owner}
                </Link>
                <p className={styles.Date}>
                    {created_at}
                </p>
                <Link
                    to={`/list/${id}`}
                    className={styles.Title}
                >
                    <h3>
                        {title}
                    </h3>
                </Link>
                <Link
                    to={`/list/${id}`}
                    className={styles.Description}
                >
                    <p >
                        {description}
                    </p>
                </Link>
                <div className={styles.CommentsCount}>
                    <i className="fa-regular fa-comments"></i>
                    <span>{comments_count}</span>
                </div>
            </div>
        </>
    )
}

export default ListPreviewCard