import React from "react";
import film from "../assets/film.png"
import filmwhite from "../assets/filmwhite.png"
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message, white }) => {
  return (
    <div className={`${styles.Asset} ${spinner && styles.SpinnerContainer} ${src && styles.PosterContainer} p-4`}>
      {spinner && (
        <div className={`${styles.Spinner}`}>
          <img src={white ? filmwhite : film} className={white && styles.White} alt="loader icon"/>
        </div>
      )}
      {src && <img src={src} className={styles.Poster} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;