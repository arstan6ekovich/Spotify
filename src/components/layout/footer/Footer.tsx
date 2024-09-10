'use client';
import scss from './Footer.module.scss';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useEffect } from 'react';

const Footer = () => {
	const {
		getAccessToken,
		accessToken,
		trackUris,
		currentTrackIndex,
		setCurrentTrackIndex
	} = usePlayerStore();

	useEffect(() => {
		if (!accessToken) {
			getAccessToken();
		}
	}, []);

	return (
		<footer className={scss.Footer}>
			<div className="container">
				<div className={scss.content}>
					<SpotifyWebPlayer
						styles={{
							activeColor: '#fff',
							bgColor: '#333',
							color: '#fff',
							loaderColor: '#fff',
							sliderColor: '#1cb954',
							trackArtistColor: '#ccc',
							trackNameColor: '#fff'
						}}
						// play={true}
						token={accessToken}
						uris={trackUris}
						showSaveIcon={true}
						offset={currentTrackIndex!}
						callback={(state) => {
							if (state.isPlaying) {
								const activeTrackIndex = trackUris.findIndex(
									(uri) => uri === state.track.uri
								);
								setCurrentTrackIndex(activeTrackIndex);
							}
						}}
					/>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
