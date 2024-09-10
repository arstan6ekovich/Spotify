'use client';
import { TbLogout2 } from 'react-icons/tb';
import scss from './ProfileMenu.module.scss';
import { useHeaderStore } from '@/stores/useHeaderStore';

const ProfileMenu = () => {
	const { isOpenProfileMenu, logout } = useHeaderStore();

	return (
		<div
			className={
				isOpenProfileMenu
					? `${scss.ProfileMenu} ${scss.active}`
					: `${scss.ProfileMenu}`
			}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<div className={scss.content}>
				<button className={scss.logout} onClick={logout}>
					<TbLogout2 />
					logout
				</button>
			</div>
		</div>
	);
};

export default ProfileMenu;
