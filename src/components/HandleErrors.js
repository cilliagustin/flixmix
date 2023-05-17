import { useState, useEffect } from 'react';

export function useErrorHandling() {
  const [errors, setErrors] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const [activeAlert, setActiveAlert] = useState(false);

  const createAlert = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
      setActiveAlert(false);
    }
    setActiveAlert(true);
    const newTimeoutId = setTimeout(() => {
      setActiveAlert(false);
    }, 500000000000);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const handleErrors = (newErrors) => {
    setErrors(newErrors);
    createAlert();
  };

  return { errors, activeAlert, setActiveAlert, handleErrors };
}