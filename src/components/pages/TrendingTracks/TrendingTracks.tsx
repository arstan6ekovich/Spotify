import styles from './TrendingTracks.module.scss';

const TrendingTracks = () => {
	return (
		<div className={styles.trendingTracks}>
			<h2>Trending Tracks</h2>
			<ul className={styles.trackList}>
				<li className={styles.track}>
					<img src="/track-cover.jpg" alt="Track Cover" />
					<div className={styles.trackInfo}>
						<p className={styles.trackTitle}>Track 1</p>
						<p className={styles.trackArtist}>Artist 1</p>
					</div>
				</li>
				<li className={styles.track}>
					<img src="/track-cover.jpg" alt="Track Cover" />
					<div className={styles.trackInfo}>
						<p className={styles.trackTitle}>Track 2</p>
						<p className={styles.trackArtist}>Artist 2</p>
					</div>
				</li>
				{/* Add more tracks as needed */}
			</ul>
		</div>
	);
};

export default TrendingTracks;
