import React, { useEffect, useState } from 'react'
import styles from '../styles/DisplayAvgRating.module.css'
import appStyles from '../App.module.css'
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const DisplayAvgRating = ({ title, avg_rating, xs=false }) => {
  const [integer, setInteger] = useState(0);
  const [fraction, setFraction] = useState(0);
  const [clip, setClip] = useState("");

  useEffect(() => {
    setInteger(Math.floor(avg_rating))
    setFraction((avg_rating % 1) * 100)
  }, [avg_rating])

  useEffect(() => {
    setClip(`polygon(0 0, ${fraction}% 0, ${fraction}% 100%, 0% 100%)`)
  }, [fraction])



  return (
    <>
    {integer > 0 ? (
       <OverlayTrigger
       placement="top"
       overlay={<Tooltip>{title} average rating: {avg_rating}</Tooltip>}
     >
       <div className={`${styles.Back} ${ xs && styles.Xs}`}>
         <i className="fa-solid fa-star"></i>
         <i className="fa-solid fa-star"></i>
         <i className="fa-solid fa-star"></i>
         <i className="fa-solid fa-star"></i>
         <i className="fa-solid fa-star"></i>
         <div className={styles.Front}>
           <i
             className={`${integer + 1 >= 1 && appStyles.Green} fa-solid fa-star`}
           >
           </i>
           <i
             className={`${integer + 1 >= 2 && appStyles.Green} fa-solid fa-star`}
             style={{ clipPath: integer === 1 ? clip : "none" }}
           >
           </i>
           <i
             className={`${integer + 1 >= 3 && appStyles.Green} fa-solid fa-star`}
             style={{ clipPath: integer === 2 ? clip : "none" }}
 
           >
           </i>
           <i
             className={`${integer + 1 >= 4 && appStyles.Green} fa-solid fa-star`}
             style={{ clipPath: integer === 3 ? clip : "none" }}
           >
           </i>
           <i
             className={`${integer + 1 >= 5 && appStyles.Green} fa-solid fa-star`}
             style={{ clipPath: integer === 4 ? clip : "none" }}
           >
           </i>
         </div>
       </div>
     </OverlayTrigger>
    ): (
      <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{title} has no ratings yet</Tooltip>}
    >
      <div className={`${styles.Back} ${ xs && styles.Xs}`}>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </div>
    </OverlayTrigger>
    )}
   </>
  )
}

export default DisplayAvgRating