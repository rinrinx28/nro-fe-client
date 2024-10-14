'use client';
import {
	FaPlus,
	FaFacebook,
	FaFacebookMessenger,
	FaRegComment,
} from 'react-icons/fa';
import '@/components/css/circularMenu.css';
import { SiZalo } from 'react-icons/si';
import Link from 'next/link';
import { GiVikingLonghouse } from 'react-icons/gi';
import { openChatBox } from './chat';
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
				<FaPlus className="fa" />
			</button>
			<div
				id="menu-round"
				className="menu-round">
				<button
					onClick={triggerMenu}
					className="btn-app size-10 bg-black rounded-full border border-orange-500 flex justify-center items-center">
					<Link href={'/'}>
						<FaFacebookMessenger className="fa" />
					</Link>
				</button>
				<button
					onClick={triggerMenu}
					className="btn-app size-10 bg-black rounded-full border border-orange-500 flex justify-center items-center">
					<Link href={'/'}>
						<FaFacebook className="fa" />
					</Link>
				</button>
				<button
					onClick={triggerMenu}
					className="btn-app size-10 bg-black rounded-full border border-orange-500 flex justify-center items-center">
					<Link href={'/'}>
						<SiZalo className="fa" />
					</Link>
				</button>
			</div>
			<div
				id="menu-line"
				className="menu-line">
				<button
					onClick={() => {
						triggerMenu();
						openChatBox();
					}}
					className="btn-app size-10 bg-black rounded-full border border-orange-500 flex justify-center items-center">
					<FaRegComment className="fa" />
				</button>
				<button
					onClick={triggerMenu}
					className="btn-app size-10 bg-black rounded-full border border-orange-500 flex justify-center items-center">
					<GiVikingLonghouse className="fa" />
				</button>
				{/* <button
					onClick={triggerMenu}
					className="btn-app size-10 bg-black rounded-full border border-orange-500 flex justify-center items-center">
					<FaImage className="fa" />
				</button>
				<button
					onClick={triggerMenu}
					className="btn-app size-10 bg-black rounded-full border border-orange-500 flex justify-center items-center">
					<FaVine className="fa" />
				</button> */}
			</div>
		</div>
	);
}

export default CircularMenu;
