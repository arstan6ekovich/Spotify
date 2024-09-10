import styles from './FeaturedPlaylist.module.scss';

const FeaturedPlaylist = () => {
  return (
    <div className={styles.featuredPlaylist}>
      <h2>Featured Playlist</h2>
      <div className={styles.playlistInfo}>
        <img
          src="/playlist-cover.jpg"
          alt="Playlist Cover"
          className={styles.playlistImage}
        />
        <div className={styles.playlistDetails}>
          <p className={styles.playlistTitle}>Daily Mix</p>
          <p className={styles.playlistDesc}>
            A mix of your favorite songs and new music just for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPlaylist;
