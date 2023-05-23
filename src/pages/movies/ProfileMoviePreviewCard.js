import React from 'react'
import styles from '../../styles/ProfileMoviePreviewCard.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'


const ProfileMoviePreviewCard = (props) => {
    const { id, title, release_year, poster, listSearch, listedMovies, setListedMovies } = props
    const { fullScreen, handleFullScreen, imageData } = useFullScreen();


    const pushId = ()=>{
        const notfoundMovie = listedMovies.every(movie => movie.id !== id);
        if(notfoundMovie){
            const newMovie = {id: id, title: title, poster:poster, release_year: release_year}
            setListedMovies([...listedMovies, newMovie])
        }
    }

    return (
        <>
            {fullScreen && (
                <FullScreenModal src={imageData.src} alt={imageData.alt} handleClick={handleFullScreen} />
            )}
            <div 
           onClick={() => { if (listSearch) pushId(); }}
            className={`${styles.Card} ${listSearch && styles.ListCard}`}
            >
                <div className={styles.PosterContainer}>
                    <img
                        src={poster}
                        alt={`${title} movie Poster`}
                        onClick={e => handleFullScreen(e)}
                    />
                </div>
                <Link to={`/movies/${id}`} className={styles.Title}>
                    <h4>{title}<span>({release_year})</span></h4>
                </Link>
            </div>
        </>
    )
}

export default ProfileMoviePreviewCard