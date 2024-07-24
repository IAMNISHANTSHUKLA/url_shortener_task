import { useState } from 'react';
import axios from 'axios';
import URLForm from '../components/URLForm';
import URLList from '../components/URLList';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [urls, setUrls] = useState([]);

  const handleAddUrl = (shortUrl, originalUrl) => {
    setUrls([...urls, { shortUrl, originalUrl }]);
  };

  return (
    <div className={styles.container}>
      <h1>URL Shortener</h1>
      <URLForm onAddUrl={handleAddUrl} />
      <URLList urls={urls} />
    </div>
  );
}
