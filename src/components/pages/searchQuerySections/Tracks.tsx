// 'use client';
// import { useEffect } from 'react';
// import scss from './Tracks.module.scss';
// import { useParams } from 'next/navigation';
// import { useSearchTracksQuery } from '@/redux/api/search';
// import { usePlayerStore } from '@/stores/usePlayerStore';

// const Tracks = () => {
// 	const { searchQuery } = useParams();
// 	const decodedQuery = decodeURIComponent(String(searchQuery));
// 	const { data, isLoading } = useSearchTracksQuery(decodedQuery);

// 	const { setTrackUris, currentTrackIndex, setCurrentTrackIndex } =
// 		usePlayerStore();

// 	const playMusic = (index: number) => {
// 		if (data?.tracks.items) {
// 			const uris = data.tracks.items.map((item) => item.uri);
// 			setTrackUris(uris);
// 			setCurrentTrackIndex(index);
// 		}
// 	};

// 	return (
// 		<section className={scss.Tracks}>
// 			<div className="container">
// 				<div className={scss.content}>
// 					<div className={scss.tracks}>
// 						{isLoading ? (
// 							<h1>loading...</h1>
// 						) : data?.tracks.items.length! > 0 ? (
// 							data?.tracks.items.map((item, index) => (
// 								<div
// 									key={index}
// 									onClick={() => {
// 										playMusic(index);
// 									}}
// 									className={`${scss.track} ${
// 										currentTrackIndex === index ? scss.active : ''
// 									}`}
// 								>
// 									<img src={item.album.images[0].url} alt={item.name} />
// 									<h5>{item.name}</h5>
// 								</div>
// 							))
// 						) : (
// 							<h1>No tracks found</h1>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// export default Tracks;

// SearchResult.tsx
'use client';
import React from 'react';
import styles from './Tracks.module.scss';
import { useParams } from 'next/navigation';
import { useSearchTracksQuery } from '@/redux/api/search';
import { usePlayerStore } from '@/stores/usePlayerStore';

const SearchResult = () => {
	const { searchQuery } = useParams();
	const decodedQuery = decodeURIComponent(String(searchQuery));
	const { data, isLoading } = useSearchTracksQuery(decodedQuery);

	const { setTrackUris, currentTrackIndex, setCurrentTrackIndex } =
		usePlayerStore();

	const playMusic = (index: number) => {
		if (data?.tracks.items) {
			const uris = data.tracks.items.map((item) => item.uri);
			setTrackUris(uris);
			setCurrentTrackIndex(index);
		}
	};

	return (
		<div className={styles.container}>
			{/* Tabs Section */}
			<div className={styles.tabs}>
				<button className={styles.tab}>Все</button>
				<button className={styles.tab}>Исполнители</button>
				<button className={styles.tab}>Треки</button>
				<button className={styles.tab}>Плейлисты</button>
				<button className={styles.tab}>Альбомы</button>
				<button className={styles.tab}>Профили</button>
			</div>

			{/* Main Content */}
			<div className={styles.mainContent}>
				{/* Best Result Section */}
				<div className={styles.bestResultSection}>
					<h2>Лучший результат</h2>
					{data?.tracks.items.map(
						(el) =>
							el.popularity > 50 && (
								<div key={el.id} className={styles.bestResultCard}>
									<img
										src={el.album.images[0].url}
										alt={el.name}
										className={styles.artistImage}
									/>
									<div className={styles.artistDetails}>
										<p className={styles.artistName}>{el.name}</p>
										<p className={styles.artistRole}>Исполнитель</p>
									</div>
								</div>
							)
					)}
				</div>

				{/* Tracks Section */}
				<div className={styles.tracksSection}>
					<h2>Треки</h2>
					<ul className={styles.trackList}>
						{data?.tracks.items.map((track, index) => (
							<li
								key={track.id}
								className={`${styles.trackItem} ${
									currentTrackIndex === index ? styles.active : ''
								}`}
								onClick={() => playMusic(index)}
							>
								<img
									src={track.album.images[0].url}
									alt={track.name}
									className={styles.trackCover}
								/>
								<div className={styles.trackDetails}>
									<p className={styles.trackName}>{track.name}</p>
									<p className={styles.trackArtist}>
										{track.album.artists[0].name}
									</p>
								</div>
								<p className={styles.trackDuration}>{track.duration_ms}</p>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Artists Section */}
			<div className={styles.artistsSection}>
				<h2>Исполнители</h2>
				<ul className={styles.artistList}>
					{data?.tracks.items.map((artist) => (
						<li key={artist.id} className={styles.artistItem}>
							<img
								src={artist.album.images[0].url}
								alt={artist.album.artists[0].name}
								className={styles.artistImageCircle}
							/>
							<p className={styles.artistNameCircle}>
								{artist.album.artists[0].name}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SearchResult;
