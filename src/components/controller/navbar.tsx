import React from 'react';
import ThemeSwitch from '../swap/swapTheme';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
	return (
		<div className="flex flex-row items-center justify-around w-full sticky top-0">
			{/* Logo */}
			<div className="flex-none">
				<Link
					href={'/'}
					className="btn btn-link">
					<Image
						src={'/image/logo_nro.gif'}
						alt="logo_nro"
						width={150}
						height={32}
						priority={true}
					/>
				</Link>
			</div>
			{/* Navbar */}
			<ul className="menu lg:menu-horizontal flex-1 justify-center hidden">
				<li className="btn btn-ghost rounded-full">Trang Chủ</li>
				<li className="btn btn-ghost rounded-full">Nạp Vàng</li>
				<li className="btn btn-ghost rounded-full">Mua Vàng</li>
			</ul>
			{/* Navigate */}
			<div className="flex flex-row items-center gap-5">
				<ThemeSwitch />
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
					<div className="drawer-side z-50">
						<label
							htmlFor="my-drawer-navbar"
							aria-label="close sidebar"
							className="drawer-overlay"></label>
						<ul className="menu bg-base-200 rounded-l-box w-56 min-h-full">
							<li>
								<a>Item 1</a>
							</li>
							<li>
								<details open>
									<summary>Parent</summary>
									<ul>
										<li>
											<a>Submenu 1</a>
										</li>
										<li>
											<a>Submenu 2</a>
										</li>
										<li>
											<details open>
												<summary>Parent</summary>
												<ul>
													<li>
														<a>Submenu 1</a>
													</li>
													<li>
														<a>Submenu 2</a>
													</li>
												</ul>
											</details>
										</li>
									</ul>
								</details>
							</li>
							<li>
								<a>Item 3</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
