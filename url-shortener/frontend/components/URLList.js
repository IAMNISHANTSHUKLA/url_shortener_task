import styles from '../styles/List.module.css';

const URLList = ({ urls }) => {
  return (
    <div className={styles.listContainer}>
      <h2>Shortened URLs</h2>
      {urls.length > 0 ? (
        <ul>
          {urls.map(({ shortUrl, originalUrl }, index) => (
            <li key={index}>
              <p>Original URL: <a href={originalUrl} target="_blank" rel="noopener noreferrer">{originalUrl}</a></p>
              <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No URLs shortened yet.</p>
      )}
    </div>
  );
};

export default URLList;
