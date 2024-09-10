'use client';
import scss from './Header.module.scss';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
import { useGetMeQuery } from '@/redux/api/me';
import { useHeaderStore } from '@/stores/useHeaderStore';
import SearchTracks from '@/components/shared/SearchTracks';
import ProfileButton from '@/components/ui/profileButton/ProfileButton';
import ProfileMenu from '@/components/ui/profileMenu/ProfileMenu';
import { useEffect, useState } from 'react';
import BurgerButton from '@/components/ui/burgerButton/BurgerButton';
import BurgerMenu from '@/components/ui/burgerMenu/BurgerMenu';
import { GoHome } from 'react-icons/go';
import { GoBell } from 'react-icons/go';
import { GoHomeFill } from 'react-icons/go';
import { FaArrowDown } from 'react-icons/fa';

const Header = () => {
	const { data: session } = useGetMeQuery();
	const { login } = useHeaderStore();
	const [isMobile, setIsMobile] = useState(true);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 1000);
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div id={scss.header}>
			<div className="container1">
				<div className={scss.header}>
					<div className={scss.leftSection}>
						<FaSpotify className={scss.icon} />
						<Link href="/">
							<GoHomeFill className={scss.icon} />
						</Link>
						{isMobile ? (
							<></>
						) : (
							<div style={{ position: 'relative', display: 'inline-block' }}>
								<SearchTracks />
							</div>
						)}
					</div>
					{isMobile ? (
						<>
							<label className="hamburger">
								<svg viewBox="0 0 32 32">
									<path
										className="line line-top-bottom"
										d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
									></path>
									<path className="line" d="M7 16 27 16"></path>
								</svg>
							</label>
						</>
					) : (
						<div className={scss.rightSection}>
							<button className={scss.premiumButton}>
								Узнать больше о Premium
							</button>
							<button className={scss.installButton}>
								<p>
									<FaArrowDown />
								</p>
								Установить приложение
							</button>
							<div>
								<div className={scss.nav}>
									<BurgerMenu />
									<div className="line_nav"></div>
								</div>
								{!isMobile ? (
									<>
										<BurgerButton />
									</>
								) : (
									<button onClick={login}>login</button>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
