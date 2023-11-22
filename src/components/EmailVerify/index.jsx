import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import success from '../../images/success.png';
import styles from './styles.module.css';

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id, token } = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `https://auth-8w9a.onrender.com/api/users/${id}/verify/${token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmailUrl();
  }, [id, token]);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : validUrl ? (
        <>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
};

export default EmailVerify;
