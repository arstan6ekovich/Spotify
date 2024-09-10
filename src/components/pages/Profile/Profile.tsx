'use client';

import { useGetMeQuery } from '@/redux/api/me';
import styles from './Profile.module.scss';
import TopArtists from '../Actors/Actors';
import { useSearchTracksQuery } from '@/redux/api/search';
import { useParams } from 'next/navigation';
// @ts-ignore
import { ColorExtractor } from 'react-color-extractor';
import { useState } from 'react';

const Profile = () => {
	const [colors, setColors] = useState<string[]>([]); // Управление состоянием цветов
	const { searchQuery } = useParams();
	const decodedQuery = decodeURIComponent(String(searchQuery));

	const { data: response } = useGetMeQuery();

	const { data, isLoading, error } = useSearchTracksQuery(decodedQuery);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error loading tracks.</div>;
	}
	const handleColors = (newColors: string[]) => {
		setColors(newColors); // Обновляем цвета при их получении
	};
	return (
		<div
			className={styles.profileHeader}
			style={{
				background: `linear-gradient(270deg, ${colors[0]}, black)`,
                minHeight: "83vh"
			}}
		>
			{response && (
				<div className={styles.profileUser}>
					{response?.images[0]?.url && (
						<ColorExtractor getColors={handleColors}>
							<img
								src={response.images?.[0]?.url}
								alt={`${response.display_name}'s profile`}
								className={styles.profileImage}
							/>
						</ColorExtractor>
					)}
					<h1>{response.display_name}</h1>
				</div>
			)}

			<div className={styles.actors}>
				{data?.tracks.items.map((track, index) => {
					const artists = track.artists.map((artist) => ({
						name: artist.name,
						image: artist.uri
					}));

					return <TopArtists key={index} artists={artists} />;
				})}
			</div>
		</div>
	);
};

export default Profile;
