'use client';
import { FaFacebook, FaFacebookMessenger } from 'react-icons/fa';
import '@/components/css/circularMenu.css';
import { SiZalo } from 'react-icons/si';
import Link from 'next/link';
import { BiSupport } from 'react-icons/bi';
function CircularMenu() {
	const triggerMenu = () => {
		let menu_toggle = document.getElementById('menu-toggle') as HTMLDivElement;
		let menu_round = document.getElementById('menu-round') as HTMLDivElement;
		let menu_line = document.getElementById('menu-line') as HTMLDivElement;
		if (menu_toggle) {
			menu_toggle.classList.toggle('open');
		}
		if (menu_round) {
			menu_round.classList.toggle('open');
		}
		if (menu_line) {
			menu_line.classList.toggle('open');
		}
	};
	return (
		<div className="container text-orange-500 text-lg">
			<button
				onClick={triggerMenu}
				id="menu-toggle"
				className="menu-toggle flex items-center justify-center bg-black rounded-full size-[60px] border border-orange-500">
				<BiSupport className="fa" />
			</button>
			<div
				id="menu-round"
				className="menu-round">
				<button
					onClick={triggerMenu}
					className="btn-app size-10 bg-black rounded-full border border-orange-500 flex justify-center items-center">
					<Link
						href={'http://m.me/61566956587074'}
						target="_blank">
						<FaFacebookMessenger className="fa" />
					</Link>
				</button>
				<button
					onClick={triggerMenu}
					className="btn-app size-10 bg-black rounded-full border border-orange-500 flex justify-center items-center">
					<Link
						href={'https://www.facebook.com/groups/congdongnrogame'}
						target="_blank">
						<FaFacebook className="fa" />
					</Link>
				</button>
				<button
					onClick={triggerMenu}
					className="btn-app size-10 bg-black rounded-full border border-orange-500 flex justify-center items-center">
					<Link
						href={'https://zalo.me/g/evqnqk421'}
						target="_blank">
						<SiZalo className="fa" />
					</Link>
				</button>
			</div>
		</div>
	);
}

export default CircularMenu;
