import styles from './Actors.module.scss';

interface Artist {
	name: string;
	image: string;
}

interface TopArtistsProps {
	artists: Artist[];
}

const TopArtists: React.FC<TopArtistsProps> = ({ artists }) => {
	console.log(artists, "artists");

	return (
		<div className={styles.artistsContainer}>
			{artists.map((artist, index) => (
				<div key={index} className={styles.artist}>
					<img
						src={artist.image[0]}
						alt={artist.name}
						className={styles.artistImage}
					/>
					<p>{artist.name}</p>
				</div>
			))}
		</div>
	);
};

export default TopArtists;
