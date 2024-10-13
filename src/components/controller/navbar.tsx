import React from 'react';
import ThemeSwitch from '../swap/swapTheme';
import Image from 'next/image';
import Link from 'next/link';
import { RiHome3Fill, RiLoginBoxFill, RiLogoutBoxFill } from 'react-icons/ri';
import { PiHandDepositFill, PiHandWithdrawFill } from 'react-icons/pi';

function Navbar() {
	return (
		<div className="flex flex-row items-center justify-between w-full sticky top-0 backdrop-blur-lg px-5 pt-2 z-[999]">
			{/* Logo */}
			<div className="flex flex-row items-center gap-2">
				<Link
					href={'/'}
					className="btn btn-link">
					<Image
						src={'/image/logo_nro.gif'}
						alt="logo_nro"
						width={150}
						height={32}
						priority={true}
						className="h-auto sm:w-[150px] w-[120px]"
					/>
				</Link>
				<ul className="menu lg:menu-horizontal flex-1 justify-center hidden font-protest-strike-regular text-4xl uppercase">
					<li className="btn btn-ghost rounded-full fill-amber-300">
						Trang Chủ
					</li>
					<li className="btn btn-ghost rounded-full">Nạp Vàng</li>
					<li className="btn btn-ghost rounded-full">Mua Vàng</li>
				</ul>
			</div>
			{/* Navigate */}
			<div className="flex flex-row items-center gap-4 font-protest-strike-regular uppercase">
				<ThemeSwitch classHidden="lg:inline-block hidden" />
				<button className="btn btn-outline rounded-box lg:inline-block hidden">
					Đăng Nhập
				</button>
				<button className="btn btn-outline rounded-box lg:hidden inline-block">
					<RiLoginBoxFill size={24} />
				</button>
				<div className="drawer drawer-end w-full lg:hidden inline-flex">
					<input
						id="my-drawer-navbar"
						type="checkbox"
						className="drawer-toggle"
					/>
					<div className="drawer-content">
						<label htmlFor="my-drawer-navbar">
							<svg
								className="fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 512 512">
								<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
							</svg>
						</label>
					</div>
					<div className="drawer-side z-[1000]">
						<label
							htmlFor="my-drawer-navbar"
							aria-label="close sidebar"
							className="drawer-overlay"></label>
						<div className="flex flex-col justify-between w-56 py-5 min-h-full text-current font-bold text-lg bg-white rounded-l-box border border-current">
							<ul className="menu">
								<li>
									<a
										href="#"
										className="link decoration-transparent flex justify-center w-full items-center">
										<p>Theme</p>
										<ThemeSwitch classHidden="lg:hidden inline-block" />
									</a>
								</li>
								<li>
									<a
										href="#"
										className="link decoration-transparent flex justify-start items-center gap-2">
										<RiHome3Fill />
										<p>Trang Chủ</p>
									</a>
								</li>
								<li>
									<a
										href="#"
										className="link decoration-transparent flex justify-start items-center gap-2">
										<PiHandDepositFill />
										<p>Nạp vàng</p>
									</a>
								</li>
								<li>
									<a
										href="#"
										className="link decoration-transparent flex justify-start items-center gap-2">
										<PiHandWithdrawFill />
										<p>Rút vàng</p>
									</a>
								</li>
							</ul>
							<ul className="menu">
								<li>
									<button className="btn btn-ghost flex justify-start items-center gap-2">
										<RiLogoutBoxFill />
										<p>Đăng Xuất</p>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
