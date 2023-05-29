import { useState, useEffect } from 'react';

/**
 * Provides different functions to manipulate the errors and use them on different components.
 */
export function useErrorHandling() {
  const [errors, setErrors] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const [activeAlert, setActiveAlert] = useState(false);

  /**
   * Set the active alert as true and makes sure is set to false automatically.
   * also handles superposition setting the current alert to false if a new one is created.
   */
  const createAlert = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
      setActiveAlert(false);
    }
    setActiveAlert(true);
    const newTimeoutId = setTimeout(() => {
      setActiveAlert(false);
    }, 5000);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  /**
  * when a new error is added creates the alert
  */
  const handleErrors = (newErrors) => {
    setErrors(newErrors);
    createAlert();
  };

  return { errors, activeAlert, setActiveAlert, handleErrors };
}