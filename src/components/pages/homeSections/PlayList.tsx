'use client';
import FeaturedPlaylist from '../FeaturedPlaylist/FeaturedPlaylist';
import TrendingTracks from '../TrendingTracks/TrendingTracks';
import scss from './PlayList.module.scss';
import Sidebar from './Sidebar/Sidebar';
const PlayList = () => {
	return (
		<section id={scss.homePage}>
			<Sidebar />
			<div className={scss.mainContent}>
				<FeaturedPlaylist />
				<TrendingTracks />
			</div>
		</section>
	);
};
export default PlayList;
