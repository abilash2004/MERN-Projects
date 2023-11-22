import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PasswordReset = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const param = useParams();
    const url = `http://localhost:8000/api/password-reset/${param.id}/${param.token}`;
    const [loading, setLoading] = useState(true); // New state for loading

    useEffect(() => {
        const verifyUrl = async () => {
            try {
                await axios.get(url);
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false);
            } finally {
            setLoading(false);
        };
    };
        verifyUrl();
    }, [param, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(url, { password });
            setMsg(data.message);
            setError("");
            window.location = "/login";
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg("");
            }
        }
    };

    return (
        <Fragment>
            {loading ? (
        <p>Loading...</p>
      ) :validUrl ? (
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <form style={{
                        width: '400px',
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
                    }} onSubmit={handleSubmit}>
                        <h1>Add New Password</h1>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            style={{
                                outline: 'none',
                                border: 'none',
                                width: '370px',
                                padding: '15px',
                                borderRadius: '10px',
                                backgroundColor: '#edf5f3',
                                margin: '5px 0',
                                fontSize: '14px',
                            }}
                        />
                        {error && <div style={{
                            width: '370px',
                            padding: '15px',
                            margin: '5px 0',
                            fontSize: '14px',
                            backgroundColor: '#f34646',
                            color: 'white',
                            borderRadius: '5px',
                            textAlign: 'center',
                        }}>{error}</div>}
                        {msg && <div style={{
                            width: '370px',
                            padding: '15px',
                            margin: '5px 0',
                            fontSize: '14px',
                            backgroundColor: '#5cdd5c',
                            color: 'white',
                            borderRadius: '5px',
                            textAlign: 'center',
                        }}>{msg}</div>}
                        <button type="submit" style={{
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
                        }}>
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <h1>404 NOT FOUNDED</h1>
            )}
        </Fragment>
    );
};

export default PasswordReset;


