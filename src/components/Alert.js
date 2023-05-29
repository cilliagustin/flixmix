import React from 'react'
import styles from '../styles/Alert.module.css'


/**
 * Retrieves alert data based on the provided alert type.
 */
function getAlertData(alertType) {
  switch (alertType) {
    case 'warning':
      return {
        class: 'Warning',
        icon: <i className={`${styles.Icon} fa-solid fa-triangle-exclamation`}></i>,
      };
    default:
      return {

      };
  }
}

/**
 * Displays an alert component with the specified properties.
 * Displays an alert for each error provided.
 */
const Alert = ({ type, errors, active }) => {
  const { class: alertClass, icon: alertIcon } = getAlertData(type);
  const hasDefinedMessage = errors.some((error) => error.message !== undefined);


  return (
    <>
      {active && hasDefinedMessage && (
        <div className={styles.Container}>
          {Object.keys(errors).map((errorKey, index) => (
            errors[errorKey].message !== undefined && (
              <div key={index} className={`${styles.Alert} ${styles[alertClass]}`}>
                {alertIcon}
                <h4>Error in {errors[errorKey].title}:</h4>
                <p>{errors[errorKey].message}</p>
                <div className={styles.Progress}></div>
              </div>
            )
          ))}
        </div>
      )}
    </>
  )
}

export default Alert