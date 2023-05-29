import React, { useEffect, useState } from 'react'
import styles from '../styles/DisplayRating.module.css'
import appStyles from '../App.module.css'
import { OverlayTrigger, Tooltip } from "react-bootstrap";

/**
 * Gets the Rating and displays it with stars
 * if the rating is a float the last star will be displayed according to that percentage
 * the field xs if true displays them in a smaller scale
 * the type is average will state this is an average rating otherwise it will
 * display this is a user rating
 * there are two set of stars positioned with z index. The ones on top are green to differentiate them
 */
const DisplayRating = ({ title, rating, xs=false, type }) => {
  const [integer, setInteger] = useState(0);
  const [fraction, setFraction] = useState(0);
  const [clip, setClip] = useState("");

  const tooltipText = type === "average" ? `${title} average rating: ${rating}` : `${integer} out of 5`

  useEffect(() => {
    setInteger(Math.floor(rating))
    setFraction((rating % 1) * 100)
  }, [rating])

  useEffect(() => {
    setClip(`polygon(0 0, ${fraction}% 0, ${fraction}% 100%, 0% 100%)`)
  }, [fraction])



  return (
    <>
    {integer > 0 ? (
       <OverlayTrigger
       placement="top"
       overlay={<Tooltip>{tooltipText}</Tooltip>}
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

export default DisplayRating