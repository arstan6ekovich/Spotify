import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Spotify</h2>
      <ul className={styles.navLinks}>
        <li>Home</li>
        <li>Search</li>
        <li>Your Library</li>
        <li>Create Playlist</li>
        <li>Liked Songs</li>
      </ul>
    </div>
  );
};

export default Sidebar;
