import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Form.module.css';

const URLForm = ({ onAddUrl }) => {
  const [url, setUrl] = useState('');
  const [ttl, setTtl] = useState(0);
  const [userType, setUserType] = useState('port');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/shorten`, { url, ttl, userType });
      setShortUrl(response.data.shortUrl);
      onAddUrl(response.data.shortUrl, url);
    } catch (err) {
      setError('Failed to shorten URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Shorten Your URL</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="url" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="Enter URL" 
          required 
        />
        <input 
          type="number" 
          value={ttl} 
          onChange={(e) => setTtl(e.target.value)} 
          placeholder="TTL (seconds, for TTL users)" 
          min="0" 
        />
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="port">Port User</option>
          <option value="bot">Bot User</option>
          <option value="ttl">TTL User</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      {shortUrl && (
        <div className={styles.result}>
          <p>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default URLForm;
