'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiHome3Fill, RiLoginBoxFill, RiLogoutBoxFill } from 'react-icons/ri';
import { PiHandDepositFill, PiHandWithdrawFill } from 'react-icons/pi';
import { FaExchangeAlt, FaRegUser, FaTable, FaUser } from 'react-icons/fa';
import { MdOutlineHistory } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { GrMoney } from 'react-icons/gr';
import { setUser } from '@/lib/redux/storage/user/user';
import { IoLogOut } from 'react-icons/io5';

function Navbar() {
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const logout = () => {
		localStorage.removeItem('token');
		dispatch(setUser({ isLogin: false }));
	};
	return (
		<div className="flex flex-row items-center justify-between w-full sticky top-0 backdrop-blur-lg px-5 pt-2 z-[100] text-orange-500 h-[80px]">
			{/* Logo */}
			<div className="flex flex-row items-center gap-2">
				<Link
					href={'/'}
					className="btn btn-link">
					<Image
						src={'/image/logo_nro.webp'}
						alt="logo_nro"
						width={150}
						height={32}
						priority={true}
						className="h-auto sm:w-[150px] w-[120px]"
					/>
				</Link>
				<ul className="menu lg:menu-horizontal flex-1 gap-4 justify-center hidden font-protest-strike-regular uppercase">
					<li>
						<Link
							className="bg-black rounded-lg text-lg btn btn-ghost"
							href={'/'}>
							Trang Chủ
						</Link>
					</li>
					<li>
						<Link
							className="bg-black rounded-lg text-lg btn btn-ghost"
							href={'/deposit'}>
							Nạp Vàng
						</Link>
					</li>
					<li>
						<Link
							className="bg-black rounded-lg text-lg btn btn-ghost"
							href={'/withdraw'}>
							Rút Vàng
						</Link>
					</li>
					<li>
						<Link
							href={'/user/table_vip'}
							className="bg-black rounded-lg text-lg btn btn-ghost">
							<FaTable size={24} />
							Điểm Danh VIP
						</Link>
					</li>
				</ul>
			</div>
			{/* Navigate */}
			<div className="flex flex-row items-center gap-4 font-protest-strike-regular">
				{/* <ThemeSwitch classHidden="lg:inline-block hidden" /> */}
				{!user.isLogin && (
					<>
						<Link
							href="/login"
							className="px-4 py-2 border bg-black border-orange-500 rounded-lg  lg:inline-block hidden uppercase text-orange-500">
							Đăng Nhập
						</Link>
						<Link
							href="/resigter"
							className="px-4 py-2 border bg-black border-orange-500 rounded-lg  lg:inline-block hidden uppercase text-orange-500">
							Đăng Ký
						</Link>
						<Link
							href={'/login'}
							className="px-4 py-2 border bg-black border-orange-500 rounded-lg text-orange-500 lg:hidden inline-block">
							<RiLoginBoxFill size={24} />
						</Link>
					</>
				)}
				{user.isLogin && (
					<>
						<Link
							href={'/user/profile'}
							className="lg:flex hidden fle-row items-center gap-2 bg-black rounded-lg border border-orange-500 p-4 lg:hover:bg-orange-500 lg:hover:text-white lg:hover:duration-300">
							<div className="flex flex-row items-center gap-2">
								<div className="avatar">
									<div className="w-8 rounded-full">
										<img src="/image/avatar/3.webp" />
									</div>
								</div>
								{user.name}
							</div>
							-
							<div className="flex flex-row items-center gap-2 font-bold">
								<p className="font-number-font">
									{new Intl.NumberFormat('vi').format(user.money ?? 0)}
								</p>
								<div className="avatar">
									<div className="w-8 rounded-xl">
										<img
											src={`/image/icon/s1.webp`}
											alt={`Icon gold`}
										/>
									</div>
								</div>
							</div>
						</Link>
						<button
							className="lg:flex hidden fle-row items-center gap-2 bg-black rounded-lg border border-orange-500 p-4 lg:hover:bg-orange-500 lg:hover:text-white lg:hover:duration-300"
							onClick={logout}>
							<IoLogOut size={24} />
						</button>
					</>
				)}
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
								{user.isLogin && (
									<li>
										<Link
											href={'/user/profile'}
											className="flex flex-col items-center gap-2 bg-black rounded-lg border border-orange-500 p-4 lg:hover:bg-orange-500 lg:hover:text-white lg:hover:duration-300">
											<div className="flex flex-row items-center gap-2">
												<div className="avatar">
													<div className="w-8 rounded-full">
														<img src="/image/avatar/3.webp" />
													</div>
												</div>
												{user.name}
											</div>
											<div className="flex flex-row items-center gap-2">
												<p className="font-number-font">
													{new Intl.NumberFormat('vi').format(user.money ?? 0)}
												</p>
												<div className="avatar">
													<div className="w-8 rounded-xl">
														<img
															src={`/image/icon/s1.webp`}
															alt={`Icon gold`}
														/>
													</div>
												</div>
											</div>
										</Link>
									</li>
								)}
								{!user.isLogin && (
									<>
										<li>
											<Link
												href="/login"
												className="link decoration-transparent flex justify-start items-center gap-2">
												<RiLoginBoxFill size={24} />
												<p>Đăng nhập</p>
											</Link>
										</li>
										<li>
											<Link
												href="/resigter"
												className="link decoration-transparent flex justify-start items-center gap-2">
												<RiLoginBoxFill size={24} />
												<p>Đăng Ký</p>
											</Link>
										</li>
									</>
								)}
								<li>
									<Link
										href="/"
										className="link decoration-transparent flex justify-start items-center gap-2">
										<RiHome3Fill size={24} />
										<p>Trang Chủ</p>
									</Link>
								</li>
								<li>
									<Link
										href="/deposit"
										className="link decoration-transparent flex justify-start items-center gap-2">
										<PiHandDepositFill size={24} />
										<p>Nạp vàng</p>
									</Link>
								</li>
								<li>
									<Link
										href="/withdraw"
										className="link decoration-transparent flex justify-start items-center gap-2">
										<PiHandWithdrawFill size={24} />
										<p>Rút vàng</p>
									</Link>
								</li>
								{user.isLogin && (
									<>
										<li>
											<Link
												href={'/user/profile'}
												className="link decoration-transparent flex justify-start items-center gap-2">
												<FaRegUser size={24} />
												Cài Đặt Tài Khoản
											</Link>
										</li>
										<li>
											<Link
												href={'/user/trade_gold'}
												className="link decoration-transparent flex justify-start items-center gap-2">
												<FaExchangeAlt size={24} />
												Chuyển Vàng
											</Link>
										</li>
										<li>
											<Link
												href={'/user/exchange_diamon'}
												className="link decoration-transparent flex justify-start items-center gap-2">
												<FaExchangeAlt size={24} />
												Đổi Vàng
											</Link>
										</li>
										<li>
											<Link
												href={'/user/history_service'}
												className="link decoration-transparent flex justify-start items-center gap-2">
												<MdOutlineHistory size={24} />
												Lịch Sử giao dịch
											</Link>
										</li>
										<li>
											<Link
												href={'/user/history_bet'}
												className="link decoration-transparent flex justify-start items-center gap-2">
												<MdOutlineHistory size={24} />
												Lịch sử cược
											</Link>
										</li>
										<li>
											<Link
												href={'/user/history_activity'}
												className="link decoration-transparent flex justify-start items-center gap-2">
												<MdOutlineHistory size={24} />
												Lịch Sử Hoạt Động
											</Link>
										</li>
									</>
								)}
								<li>
									<Link
										href={'/user/table_misson'}
										className="link decoration-transparent flex justify-start items-center gap-2">
										<FaTable size={24} />
										Bảng Nhiệm Vụ
									</Link>
								</li>
								<li>
									<Link
										href={'/user/table_vip'}
										className="link decoration-transparent flex justify-start items-center gap-2">
										<FaTable size={24} />
										Điểm Danh VIP
									</Link>
								</li>
							</ul>
							{user.isLogin && (
								<ul className="menu">
									<li>
										<button
											onClick={logout}
											className="btn btn-ghost flex justify-start items-center gap-2">
											<RiLogoutBoxFill />
											<p>Đăng Xuất</p>
										</button>
									</li>
								</ul>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
