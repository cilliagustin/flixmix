import React from 'react'
import styles from '../styles/RateButtons.module.css'
import appStyles from '../App.module.css'

/**
 * Renders a set of buttons that clicking on them change the rating state passed as prop
 */
const RateButtons = ({ setRating, rating }) => {
    const handleClick = (e) => {
        e.preventDefault()
        setRating({
            ...rating,
            value: e.target.value,
        });
    }

    return (
        <div className={styles.Container}>
            <button
                className={`${styles.StarButton} ${rating.value < 1 ? appStyles.Grey : appStyles.Green}`}
                onClick={(e) => { handleClick(e); }} value={1}>
                <i className="fa-solid fa-star"></i>
            </button>
            <button
                className={`${styles.StarButton} ${rating.value < 2 ? appStyles.Grey : appStyles.Green}`}
                onClick={(e) => { handleClick(e); }} value={2}>
                <i className="fa-solid fa-star"></i>
            </button>
            <button
                className={`${styles.StarButton} ${rating.value < 3 ? appStyles.Grey : appStyles.Green}`}
                onClick={(e) => { handleClick(e); }} value={3}>
                <i className="fa-solid fa-star"></i>
            </button>
            <button
                className={`${styles.StarButton} ${rating.value < 4 ? appStyles.Grey : appStyles.Green}`}
                onClick={(e) => { handleClick(e); }} value={4}>
                <i className="fa-solid fa-star"></i>
            </button>
            <button
                className={`${styles.StarButton} ${rating.value < 5 ? appStyles.Grey : appStyles.Green}`}
                onClick={(e) => { handleClick(e); }} value={5}>
                <i className="fa-solid fa-star"></i>
            </button>
        </div>
    )
}

export default RateButtons