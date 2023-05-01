import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} ${spinner && styles.SpinnerContainer} ${src && styles.PosterContainer} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} className={styles.Poster} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;