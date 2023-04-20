import React, { useEffect, useState } from 'react'
import styles from '../styles/Alert.module.css'

function getAlertData(alertType) {
    switch (alertType) {
      case 'warning':
        return {
          class: 'Warning',
          title: 'Warning',
          icon: <i className={`${styles.Icon} fa-solid fa-triangle-exclamation`}></i>,
        };
      default:
        return {
            
        };
    }
  }

const Alert = ({type, errors }) => {
    const { class: alertClass, title: alertTitle, icon: alertIcon } = getAlertData(type);
    const [activeAlert, setActiveAlert] = useState(false);

    useEffect(()=>{
        const hasDefinedMessage = errors.some((error) => error.message !== undefined);
        hasDefinedMessage
        ? (() => {
            setActiveAlert(true);
            const timeout = setTimeout(() => {
                setActiveAlert(false);
            }, 5000);

            return () => {
                clearTimeout(timeout);
            };
            })()
        : setActiveAlert(false);
        
    },[errors])

  return (
    <>
    {activeAlert && (
        <div className={`${styles.AlertContainer} ${styles[alertClass]}`}>
            <div className={styles.Content}>
                <h4>{alertIcon}{alertTitle}</h4>
                <ul>
                    {Object.keys(errors).map((errorKey, index) => (
                        errors[errorKey].message !== undefined && (
                            <li key={index}><span>Error in {errors[errorKey].title}:</span><br></br>{errors[errorKey].message}</li>
                        )
                    ))}
                </ul>
            </div>
            <div className={styles.Progress}></div>
        </div>
    )}
    </>
  )
}

export default Alert