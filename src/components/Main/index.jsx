import styles from "./styles.module.css";
import React, { useState } from 'react';
import axios from 'axios';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const [url, setUrl] = useState('');
	const [shortId, setShortId] = useState('');

	const handleShortenURL = async () => {
		try {
			const response = await axios.post('http://localhost:8000/url', { url });
			setShortId(response.data.id);
		} catch (error) {
			console.error('Error shortening URL:', error);
		}
	};


	return (
		<div>
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<h1>Welcome Guvi</h1>
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
				</nav>
			</div>
			<div style={{ textAlign: 'center', marginTop: '20vh' }}>
				<input type="text" value={url} onChange={(e) => setUrl(e.target.value)} style={{
					marginBottom: '10px',
					outline: 'none',
					border: 'none',
					width: '370px',
					padding: '15px',
					borderRadius: '10px',
					backgroundColor: '#edf5f3',
					margin: '5px 0',
					fontSize: '14px',
				}} />
				<br />
				<button onClick={handleShortenURL} style={{
					marginBottom: '10px',
					border: 'none',
					outline: 'none',
					padding: '12px 0',
					backgroundColor: '#3bb19b',
					color: 'white',
					borderRadius: '20px',
					width: '180px',
					fontWeight: 'bold',
					fontSize: '14px',
					cursor: 'pointer',
					margin: '10px auto',
				}}>Shorten URL</button>
				<br />
				{shortId && <p
				style={{
					marginBottom: '10px',
					marginRight:'auto',
					marginLeft:'auto',
					fontFamily: 'Helvetica',
					fontSize: '25px',
				}}
				>http://localhost:8000/{shortId}</p>}
			</div>
		</div>
	);
};

export default Main;