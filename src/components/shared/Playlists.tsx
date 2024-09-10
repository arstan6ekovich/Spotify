'use client';
import scss from './Playlists.module.scss';
import { useRouter } from 'next/navigation';
import { useGetPlaylistsQuery } from '@/redux/api/playlist';
import { useSearchTracksQuery } from '@/redux/api/search';

const Playlists = () => {
	const { data } = useGetPlaylistsQuery();
	const router = useRouter();
	const { data: res, isLoading } = useSearchTracksQuery(String());

	return (
		<div className={scss.Playlists}>
			<div
				className={scss.content}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					justifyContent: 'center',
					gap: '40px',
					padding: '100px 0',
					textTransform: 'uppercase'
				}}
			>
				{data?.items.map((item, index) => (
					<div
						key={index}
						onClick={() => {
							router.push(`/playlist/${item.id}`);
						}}
					>
						<span
							style={{
								fontSize: '30px',
								textAlign: 'center',
								marginTop: '50px'
							}}
						>
							{item.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Playlists;
