import React from 'react'
import styles from '../../styles/errorPage.module.css'
import btnStyles from '../../styles/Button.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

/**
 * Display Error page
 */
const ErrorPage = () => {
  const history = useHistory()
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <h1>404<br />PAGE NOT<br />FOUND</h1>
        {/* go to previous page link */}
        <button
          onClick={() => { history.goBack() }}
          className={`${btnStyles.Button} ${btnStyles.BigButton} ${btnStyles.WhiteAndBlack} ${btnStyles.HoverBlack}`}
        >
          GO BACK
        </button>
      </div>
    </div>
  )
}

export default ErrorPage