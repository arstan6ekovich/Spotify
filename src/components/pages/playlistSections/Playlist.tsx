'use client';
import { useParams } from 'next/navigation';
import styles from './Playlist.module.scss';
import { useGetPlaylistByIdQuery } from '@/redux/api/playlist';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useState } from 'react';
import { useGetMeQuery } from '@/redux/api/me';
// @ts-ignore
import { ColorExtractor } from 'react-color-extractor';
import { useSearchTracksQuery } from '@/redux/api/search';

const Playlist = () => {
	const [colors, setColors] = useState<string[]>([]); // Управление состоянием цветов
	console.log(colors, 'colors');

	const { playlistId } = useParams();
	const { data } = useGetPlaylistByIdQuery(String(playlistId));
	const { data: responseUser } = useGetMeQuery();

	const { setTrackUris, currentTrackIndex, setCurrentTrackIndex } =
		usePlayerStore();

	const playMusic = (index: number) => {
		if (data?.tracks.items) {
			const uris = data.tracks.items.map((item) => item.track.uri);
			setTrackUris(uris);
			setCurrentTrackIndex(index);
		}
	};

	const handleColors = (newColors: string[]) => {
		setColors(newColors); // Обновляем цвета при их получении
	};

	return (
		<div
			className={styles.container}
			style={{
				background: `linear-gradient(270deg, ${colors[0]}, black)`
			}}
		>
			{/* Извлекаем цвета из обложки плейлиста */}
			{data?.images[0]?.url && (
				<ColorExtractor getColors={handleColors}>
					<img
						width={100}
						src={data.tracks.items[0].track.album.images[0].url} // Use only the first track's album image URL
						alt="Album cover"
					/>
				</ColorExtractor>
			)}

			<div className={styles['playlist-header']}>
				<div className={styles['playlist-info']}>
					<h1>{data?.name || 'Playlist'}</h1>
					<p>
						{data?.tracks.total || 0} трека, примерно 1час{' '}
						{(() => {
							const totalDurationMs = data?.tracks.items.reduce(
								(acc, track) => acc + track.track.duration_ms,
								0
							);
							// @ts-ignore
							const totalMinutes = Math.floor(totalDurationMs / 60000);
							// @ts-ignore
							const totalSeconds = Math.floor((totalDurationMs % 60000) / 1000)
								.toFixed(0)
								.padStart(2, '0');

							return `${totalMinutes}:${totalSeconds}`;
						})()}
					</p>
				</div>
				<button className={styles['play-button']}>
					<img
						src={responseUser?.images[0]?.url || '/default-profile.png'}
						alt="Play"
					/>
				</button>
			</div>

			{/* Отображаем извлечённые цвета */}
			<div style={{ display: 'flex', marginTop: '20px' }}></div>

			<div className={styles.tracklist}>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Альбом</th>
							<th>Название</th>
							<th>Название</th>
							<th>Добавление дата</th>
						</tr>
					</thead>
					<tbody>
						{data?.tracks.items.map((track, index) => (
							<tr
								key={track.track.id}
								onClick={() => playMusic(index)}
								className={`${styles.trackItem} ${
									currentTrackIndex === index ? styles.active : ''
								}`}
							>
								<td>{index + 1}</td>

								<img width={100} src={track.track.album.images[0].url} alt="" />
								<td>{track.track.name}</td>
								<td>{track.track.album.name}</td>
								<td>{new Date(track.added_at).toLocaleDateString()}</td>
								<td>
									{Math.floor(track.track.duration_ms / 60000)}:
									{Math.floor((track.track.duration_ms % 60000) / 1000)
										.toFixed(0)
										.padStart(2, '0')}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Playlist;
