'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { GiPerspectiveDiceSixFacesTwo } from 'react-icons/gi';
import { GrMoney } from 'react-icons/gr';
import { IoLogoGameControllerB } from 'react-icons/io';
import { SiGamejolt } from 'react-icons/si';
import { TypeBet } from '@/app/page';

// import Swiper core and required modules
import { Pagination, Virtual } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { setServer } from '@/lib/redux/storage/server';
import {
	FaBook,
	FaBookmark,
	FaExchangeAlt,
	FaFacebook,
	FaRegUser,
	FaTable,
} from 'react-icons/fa';
import Link from 'next/link';
import { PiHandDepositFill, PiHandWithdrawFill } from 'react-icons/pi';
import Modal from '@/components/controller/Modal';

export const getNumbetFromString = (value: string) => {
	let num = value.replace(/[^\d]/g, '');
	return num ? new Intl.NumberFormat().format(parseInt(num, 10)) : '';
};

function Home() {
	const [swiperRef, setSwiperRef] = useState<any>(null);
	const server = useAppSelector((state) => state.server);
	const dispatch = useAppDispatch();
	const [typeBet, setTypeBet] = useState<TypeBet>('cl');

	// Auto Scroll to slides
	useEffect(() => {
		if (swiperRef) {
			swiperRef.slideTo(server, 0);
		}
	}, [swiperRef]);

	// Auto show ads
	// useEffect(() => {
	// 	const modal = document.getElementById('home_ads') as HTMLDialogElement;
	// 	if (modal) {
	// 		modal.show();
	// 	}
	// }, []);
	return (
		<div
			style={{ backgroundImage: "url('/image/background/2.png')" }}
			className="min-h-screen flex flex-col w-full justify-center items-center gap-5 px-4 bg-no-repeat bg-cover bg-right select-none font-chakra-petch">
			{/* Button Game */}
			<div className="max-w-7xl w-full">
				<Swiper
					// install Swiper modules
					modules={[Pagination, Virtual]}
					onSwiper={setSwiperRef}
					grabCursor={true}
					spaceBetween={25}
					slidesPerView={4}
					pagination={{ clickable: true }}
					breakpoints={{
						1440: {
							slidesPerView: 4, // 4 slides khi màn hình lớn hơn 1440px
						},
						1024: {
							slidesPerView: 3, // 3 slides khi màn hình lớn hơn 1024px
						},
						0: {
							slidesPerView: 1, // 2 slides khi màn hình nhỏ hơn 1024px
						},
					}}
					virtual>
					{Array.from({ length: 11 }).map((_, k) => (
						<SwiperSlide
							key={`${k}-button`}
							virtualIndex={k}>
							<div
								className={`font-bold flex flex-row p-4 rounded-box shadow-sm gap-2 text-nowrap items-center transition-colors ease-linear ${
									server === k
										? 'shadow-orange-500 bg-orange-500 text-white'
										: 'shadow-current bg-base-200'
								}`}>
								<div className="avatar">
									<div className="w-24 rounded-xl">
										<img
											src={`/image/server/${
												k === 7 ? k + 1 : k > 7 ? k + 3 : k + 1
											}.png`}
											style={{ filter: 'drop-shadow(5px 5px red)' }}
										/>
									</div>
								</div>
								<div className="flex flex-col w-full justify-center text-center gap-1">
									<p className="text-#f97316-300">
										Máy Chủ {k === 7 ? `Chung` : k > 7 ? k + 3 : k + 1}
									</p>
									<p>
										Thời gian còn:{' '}
										<span className="loading loading-dots loading-xs"></span>
									</p>
									<button
										className={`btn ${
											server === k ? 'btn-active' : 'btn-outline'
										}`}
										onClick={() => dispatch(setServer(k))}>
										<IoLogoGameControllerB size={24} />
										Chơi Ngay
									</button>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className="h-14"></div>
			{/* Group Func Quick */}
			<div className="flex flex-wrap justify-center items-center w-full capitalize gap-5">
				<div className="dropdown dropdown-bottom dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="flex flex-row gap-2 items-center rounded-box p-4 bg-orange-500 text-white font-chakra-petch active:hover:scale-90 hover:duration-300">
						<FaBook />
						Chức Năng
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-white">
						<li>
							<Link
								href="/deposit"
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<PiHandDepositFill size={24} />
								<p>Nạp vàng</p>
							</Link>
						</li>
						<li>
							<Link
								href="/withdraw"
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<PiHandWithdrawFill size={24} />
								<p>Rút vàng</p>
							</Link>
						</li>
						<li>
							<Link
								href={'/user/profile'}
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<FaRegUser size={24} />
								Cài Đặt Tài Khoản
							</Link>
						</li>
						<li>
							<Link
								href={'/user/trade_gold'}
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<FaExchangeAlt size={24} />
								Chuyển Vàng
							</Link>
						</li>
						<li>
							<Link
								href={'/user/table_misson'}
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<FaTable size={24} />
								Bảng Nhiệm Vụ
							</Link>
						</li>
					</ul>
				</div>
				<button
					onClick={() => {
						const model = document.getElementById(
							'home_tutorial',
						) as HTMLDialogElement;
						if (model) {
							model.show();
						}
					}}
					className="flex flex-row gap-2 items-center rounded-box p-4 bg-orange-500 text-white font-chakra-petch active:hover:scale-90 hover:duration-300">
					<FaBookmark />
					Hướng Dẫn
				</button>
				<Link
					href={'/'}
					target="_blank"
					className="flex flex-row gap-2 items-center rounded-box p-4 bg-orange-500 text-white font-chakra-petch active:hover:scale-90 hover:duration-300">
					<FaFacebook />
					Fanpage
				</Link>
			</div>
			{/* Game Info */}
			<div className="flex lg:flex-row flex-col justify-around max-w-7xl w-full gap-4 select-none">
				{/* Background game */}
				<div className="lg:w-1/2 w-full flex flex-col h-[450px] justify-center items-center bg-auto bg-no-repeat bg-right rounded-box p-2 gap-4 border-ani border-none shadow-lg shadow-current">
					<svg
						className="svg"
						height="100%"
						width="100%"
						xmlns="http://www.w3.org/2000/svg">
						<rect
							rx="8"
							ry="8"
							className="line stroke-current rounded-box"
							height="100%"
							width="100%"
							strokeLinejoin="round"
						/>
					</svg>
					{/* Layout Box Game */}
					<div className="flex flex-col justify-start w-full h-full mb-m:p-4 p-2 items-center gap-2 backdrop-blur-md bg-black/50 lg:text-base text-sm">
						<div className="flex flex-row gap-2 items-center border-b border-current text-orange-500 text-xl">
							<SiGamejolt />
							<p className="uppercase font-sf-trans-robotics">Phiên BET</p>
							<SiGamejolt />
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
							<p>Mã phiên:</p>
							<p
								className="text-orange-500 drop-shadow-md"
								style={{ textShadow: '3px 3px 5px #f97316' }}>
								670ae5a88785d1615f2cdc73
							</p>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
							<p>Máy Chủ:</p>
							<p
								className="text-orange-500 drop-shadow-md"
								style={{ textShadow: '3px 3px 5px #f97316' }}>
								{server === 7 ? '8-9-10' : server < 7 ? server + 1 : server + 3}
							</p>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
							<p>Kết Quả Trước:</p>
							<p
								className="text-orange-500 drop-shadow-md"
								style={{ textShadow: '3px 3px 5px #f97316' }}>
								71
							</p>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
							<p>Thời Gian Còn:</p>
							<p
								className="text-orange-500 drop-shadow-md"
								style={{ textShadow: '3px 3px 5px #f97316' }}>
								{new Intl.NumberFormat('vi').format(
									Math.floor(Math.random() * 200),
								)}
								{/* <span className="loading loading-dots loading-xs"></span> */}
							</p>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
							<div className="flex flex-row gap-2">
								<p>Chẵn:</p>
								<p
									className="text-orange-500 drop-shadow-md"
									style={{ textShadow: '3px 3px 5px #f97316' }}>
									{new Intl.NumberFormat('vi').format(
										Math.floor(Math.random() * 1000),
									)}
								</p>
							</div>
							<div className="flex flex-row gap-2">
								<p>Lẻ:</p>
								<p
									className="text-orange-500 drop-shadow-md"
									style={{ textShadow: '3px 3px 5px #f97316' }}>
									{new Intl.NumberFormat('vi').format(
										Math.floor(Math.random() * 1000),
									)}
								</p>
							</div>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
							<div className="flex flex-row gap-2">
								<p>Tài:</p>
								<p
									className="text-orange-500 drop-shadow-md"
									style={{ textShadow: '3px 3px 5px #f97316' }}>
									{new Intl.NumberFormat('vi').format(
										Math.floor(Math.random() * 1000),
									)}
								</p>
							</div>
							<div className="flex flex-row gap-2">
								<p>Xỉu:</p>
								<p
									className="text-orange-500 drop-shadow-md"
									style={{ textShadow: '3px 3px 5px #f97316' }}>
									{new Intl.NumberFormat('vi').format(
										Math.floor(Math.random() * 1000),
									)}
								</p>
							</div>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
							<p>Thời Gian Hoạt Động:</p>
							<p
								className="text-orange-500 drop-shadow-md"
								style={{ textShadow: '3px 3px 5px #f97316' }}>
								6h - 23h50
							</p>
						</div>
						<div className="flex flex-col gap- justify-start w-full">
							<div className="flex flex-row w-full justify-start items-center gap-2 text-white font-chakra-petch font-bold uppercase">
								<p>CL:</p>
								<ul className="menu menu-horizontal lg:gap-2 lg:text-base text-sm">
									{Array.from({ length: 10 }).map((_, i) => (
										<li
											key={i + 'cl'}
											className={`mb-m:size-6 size-4 place-content-center text-white rounded-full ${
												i % 2 === 0 ? 'bg-black' : 'bg-orange-500'
											}`}>
											{i % 2 === 0 ? 'C' : 'L'}
										</li>
									))}
								</ul>
							</div>
							<div className="flex flex-row w-full justify-start items-center gap-2 text-white font-chakra-petch font-bold uppercase">
								<p>TX:</p>
								<ul className="menu menu-horizontal lg:gap-2">
									{Array.from({ length: 10 }).map((_, i) => (
										<li
											key={i + 'tx'}
											className={`mb-m:size-6 size-4 place-content-center text-white rounded-full ${
												i % 2 === 0 ? 'bg-black' : 'bg-orange-500'
											}`}>
											{i % 2 === 0 ? 'T' : 'X'}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
				{/* Game Controll */}
				<div className="lg:w-1/2 w-full h-[450px] flex flex-col justify-center items-center bg-cover rounded-box p-2 gap-4 border-ani border-none shadow-lg shadow-current">
					<svg
						className="svg"
						height="100%"
						width="100%"
						xmlns="http://www.w3.org/2000/svg">
						<rect
							rx="8"
							ry="8"
							className="line stroke-current rounded-box"
							height="100%"
							width="100%"
							strokeLinejoin="round"
						/>
					</svg>
					<div className="flex flex-col justify-start w-full h-full p-4 items-center gap-2 backdrop-blur-md bg-black/50">
						<div className="flex flex-row gap-2 items-center border-b border-current text-orange-500 text-xl">
							<IoLogoGameControllerB size={24} />
							<p className="uppercase font-sf-trans-robotics">Thao Tác</p>
							<IoLogoGameControllerB size={24} />
						</div>
						<div className="flex flex-row w-full justify-start items-center gap-2 font-sf-trans-robotics uppercase border border-orange-500 rounded-md p-2">
							<GrMoney
								size={24}
								className={`text-white`}
							/>
							<p className={`text-white`}>
								{new Intl.NumberFormat('vi').format(9999)}
							</p>
						</div>
						{/* Select Type Bet */}
						<div className="flex flex-row w-full justify-start items-center gap-2 divide-x-2 divide-orange-500 text-orange-500 font-chakra-petch font-bold uppercase border border-orange-500 px-2 rounded-btn">
							<IoLogoGameControllerB size={24} />
							<select
								defaultValue={'cl'}
								onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
									setTypeBet(event.target.value as TypeBet);
								}}
								className="outline-none border-0 z-10 w-full py-3 capitalize bg-transparent">
								<option value={'cl'}>Chẵn Lẻ - Tài Xỉu</option>
								<option value={'x'}>Xiên</option>
								<option value={'g'}>Dự đoán kết quả</option>
							</select>
						</div>
						{/* Type Bet */}
						{typeBet === 'cl' && (
							<div className="flex flex-col gap-2 items-center mt-2 z-10 w-full">
								<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
									<button className="bg-black text-white w-full p-4 rounded-box uppercase active:hover:scale-90 hover:duration-300">
										Chẵn
									</button>
									<button className="bg-orange-500 text-white w-full p-4 rounded-box uppercase active:hover:scale-90 hover:duration-300">
										Lẻ
									</button>
								</div>
								<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
									<button className="bg-black text-white w-full p-4 rounded-box uppercase active:hover:scale-90 hover:duration-300">
										Tài
									</button>
									<button className="bg-orange-500 text-white w-full p-4 rounded-box uppercase active:hover:scale-90 hover:duration-300">
										Xỉu
									</button>
								</div>
							</div>
						)}
						{typeBet === 'x' && (
							<div className="flex flex-col gap-2 items-center mt-2 z-10 w-full">
								<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
									<button className="bg-black text-white w-full p-4 rounded-box uppercase active:hover:scale-90 hover:duration-300">
										Chẵn Tài
									</button>
									<button className="bg-orange-500 text-white w-full p-4 rounded-box uppercase active:hover:scale-90 hover:duration-300">
										Chẵn Xỉu
									</button>
								</div>
								<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
									<button className="bg-black text-white w-full p-4 rounded-box uppercase active:hover:scale-90 hover:duration-300">
										Lẻ Tài
									</button>
									<button className="bg-orange-500 text-white w-full p-4 rounded-box uppercase active:hover:scale-90 hover:duration-300">
										Lẻ Xỉu
									</button>
								</div>
							</div>
						)}
						{typeBet === 'g' && (
							<div className="flex flex-row w-full justify-start items-center gap-2 divide-x-2 divide-orange-500 text-orange-500 font-chakra-petch font-bold uppercase border border-orange-500 px-2 rounded-btn z-10">
								<AiOutlineFieldNumber size={24} />
								<input
									type="number"
									className="outline-none border-0 w-full py-3 px-2 bg-transparent"
									placeholder="Nhập kết quả dự đoán"
								/>
							</div>
						)}

						<div className="flex flex-row w-full justify-start items-center gap-2 divide-x-2 divide-orange-500 text-orange-500 font-sf-trans-robotics uppercase border border-orange-500 px-2 rounded-btn z-10">
							<GrMoney size={24} />
							<input
								onChange={(e) => {
									// Extract numeric part (removes any non-digit characters)
									let value = getNumbetFromString(e.target.value);

									// Update the input value with the formatted number
									e.target.value = value;
								}}
								type="text"
								className="outline-none border-0 z-10 w-full py-3 px-2 bg-transparent"
							/>
						</div>
						<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase z-10">
							<button className="btn capitalize max-w-xs w-full text-orange-500">
								<GiPerspectiveDiceSixFacesTwo size={24} />
								Cược Ngay
							</button>
						</div>
					</div>
				</div>
			</div>
			<Modal
				id="home_tutorial"
				key={'tutorial'}>
				<div className="flex flex-col gap-5">
					<h3>Hướng Dẫn</h3>
					<div className="flex flex-col gap-1 ">
						<p className="font-bold">Hệ thống chẳn lẻ Game Ngọc Rồng Online</p>
						<p className="font-bold">
							Lấy chức năng "
							<span className="text-amber-500">Con số may mắn</span>" trong game
							làm kết quả
						</p>
						<p className="font-bold">
							Bạn đều có thể đặt cược, lấy kết quả ở{' '}
							<span className="text-amber-500">Máy Chủ</span> tùy thích
						</p>
						<p className="text-amber-500 font-bold">Thể lệ gồm các trò chơi:</p>
						<p className="">
							-{' '}
							<span className="text-orange-500 font-bold">Dự đoán chẵn lẻ</span>
							: kết quả số chẵn hoặc số lẻ
						</p>
						<p className="">
							Tỷ lệ:{' '}
							<span className="text-red-500 font-bold">
								x1.9 (đặt 10tr được 19tr vàng)
							</span>
						</p>
						<p className="">
							Ví dụ con số may mắn là 1 số chẵn như 0, 2, 4, 6, 8, 10, 12... thì
							đặt bên Chẵn thắng, ngược lại con số may mắn là số lẻ như 1, 3, 5,
							7, 9, 11... thì đặt bên Lẻ thắng
						</p>
						<p className="">
							-{' '}
							<span className="text-orange-500 font-bold">Dự đoán tài xỉu</span>
							: kết quả từ 50-99 là tài còn từ 0-49 là xỉu
						</p>
						<p className="">
							Tỷ lệ:{' '}
							<span className="text-red-500 font-bold">
								x1.9 (đặt 10tr được 19tr vàng)
							</span>
						</p>
						<p className="">
							Ví dụ kết quả của con số là 35,16,27,58,09 thì kết quả được tính
							là 1 số cuối. Tương tự lần lượt là: 5-9 là bên Tài thắng, ngược
							lại số cuối từ 0-4 sẽ là Xỉu thắng
						</p>
						<p className="">
							-{' '}
							<span className="text-orange-500 font-bold">Dự đoán kết quả</span>
							: kết quả là con số may mắn từ 0 tới 99
						</p>
						<p className="">
							Tỷ lệ:{' '}
							<span className="text-red-500 font-bold">
								x70 (đặt 10tr được 700tr vàng)
							</span>
						</p>
						<p className="">
							Liên kết:{' '}
							<Link
								className="text-orange-500"
								href={'/deposit'}>
								Nạp vàng
							</Link>{' '}
							|{' '}
							<Link
								className="text-orange-500"
								href={'/withdraw'}>
								Rút vàng
							</Link>
						</p>
					</div>
				</div>
			</Modal>

			{/*ADS*/}
			<Modal
				id="home_ads"
				customClass="w-full max-w-xl">
				<div className="flex flex-col gap-5">
					<h1 className="text-xl">Chương Trình Khuyến Mãi</h1>
					<div className="flex flex-col gap-2">
						<div className="flex flex-row gap-2 items-center text-lg">
							<video
								autoPlay
								loop
								muted
								preload="auto"
								src="/image/gif/dragon_hot.webm"
								aria-label="Dragon Hot"
								style={{ width: '52px' }}></video>
							<p className="text-wrap">
								Nhận ngay{' '}
								<span className="text-red-500 font-bold">
									{new Intl.NumberFormat('vi').format(1e6)} vàng
								</span>{' '}
								khi tạo tài khoản trên web
							</p>
						</div>
						<div className="flex flex-row gap-2 items-center text-lg">
							<video
								autoPlay
								loop
								muted
								preload="auto"
								src="/image/gif/dragon_hot.webm"
								aria-label="Dragon Hot"
								style={{ width: '52px' }}></video>
							<p>Tặng thỏi vàng miễn phí mỗi ngày</p>
						</div>
						<div className="flex flex-row gap-2 items-center text-lg">
							<video
								autoPlay
								loop
								muted
								preload="auto"
								src="/image/gif/dragon_hot.webm"
								aria-label="Dragon Hot"
								style={{ width: '52px' }}></video>
							<p>Nạp Thỏi Vàng tích điểm nhận thành viên VIP</p>
						</div>
						<div className="flex flex-row gap-2 items-center text-lg">
							<video
								autoPlay
								loop
								muted
								preload="auto"
								src="/image/gif/dragon_hot.webm"
								aria-label="Dragon Hot"
								style={{ width: '52px' }}></video>
							<p>Nhiều Event Hấp Dẫn</p>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default Home;
