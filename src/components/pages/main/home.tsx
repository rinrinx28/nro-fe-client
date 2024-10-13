'use client';
import React from 'react';

// Import

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { GiPerspectiveDiceSixFacesTwo } from 'react-icons/gi';
import { GrMoney } from 'react-icons/gr';
import { IoLogoGameControllerB } from 'react-icons/io';
import { SiGamejolt } from 'react-icons/si';
import { TypeBet } from '@/app/page';

function Home() {
	const { theme } = useTheme();
	const [typeBet, setTypeBet] = useState<TypeBet>('cl');
	const [themeType, setThemeType] = useState('');
	useEffect(() => {
		if (theme) {
			setThemeType(theme);
		}
	}, [theme]);
	return (
		<div
			style={{ backgroundImage: "url('/image/background/2.png')" }}
			className="min-h-screen flex flex-col w-full justify-center items-center gap-5 px-4 bg-no-repeat bg-cover bg-center">
			{/* Button Game */}
			<div className="flex flex-row overflow-auto gap-2 max-w-7xl w-full justify-start items-center backdrop-blur-md border-b border-current p-2 scroll-smooth snap-x">
				{Array.from({ length: 11 }).map((_, k) => (
					<div
						key={`${k}-button`}
						className="font-bold flex flex-row bg-base-200 p-4 rounded-box shadow-sm shadow-current gap-2 text-nowrap items-center snap-center">
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
						<div className="flex flex-col">
							<p className="text-gray-300">
								Server {k === 7 ? `Liên Server` : k > 7 ? k + 3 : k + 1}
							</p>
							<p className="text-gray-500">Hi There!</p>
						</div>
					</div>
				))}
			</div>
			<div className="h-14"></div>
			{/* Game Info */}
			<div className="flex lg:flex-row flex-col justify-around max-w-7xl w-full gap-4 select-none">
				{/* Background game */}
				<div className="lg:w-1/2 w-full flex flex-col h-[400px] justify-center items-center bg-auto bg-no-repeat bg-right rounded-box p-2 gap-4 border-ani border-none shadow-lg shadow-current">
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
						<div
							className="flex flex-row gap-2 items-center border-b border-current"
							style={{
								textShadow: '3px 3px 3px var(--fallback-bc,oklch(var(--bc)/1))',
							}}>
							<SiGamejolt />
							<p className="uppercase font-chakra-petch font-bold">Phiên BET</p>
							<SiGamejolt />
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-xs mb-l:text-base mb-m:font-chakra-petch font-bold uppercase">
							<p>Mã phiên:</p>
							<p
								className="text-white drop-shadow-md"
								style={{ textShadow: '3px 3px 5px gray' }}>
								670ae5a88785d1615f2cdc73
							</p>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-xs mb-l:text-base mb-m:font-chakra-petch font-bold uppercase">
							<p>Máy Chủ:</p>
							<p
								className="text-white drop-shadow-md"
								style={{ textShadow: '3px 3px 5px gray' }}>
								Server 1
							</p>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-xs mb-l:text-base mb-m:font-chakra-petch font-bold uppercase">
							<p>Kết Quả Trước:</p>
							<p
								className="text-white drop-shadow-md"
								style={{ textShadow: '3px 3px 5px gray' }}>
								71
							</p>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-xs mb-l:text-base mb-m:font-chakra-petch font-bold uppercase">
							<p>Thời Gian Còn:</p>
							<p
								className="text-white drop-shadow-md"
								style={{ textShadow: '3px 3px 5px gray' }}>
								<span className="loading loading-dots loading-xs"></span>
							</p>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-xs mb-l:text-base mb-m:font-chakra-petch font-bold uppercase">
							<p>Chẵn Lẻ:</p>
							<p
								className="text-white drop-shadow-md"
								style={{ textShadow: '3px 3px 5px gray' }}>
								0
							</p>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-xs mb-l:text-base mb-m:font-chakra-petch font-bold uppercase">
							<p>Tài Xỉu:</p>
							<p
								className="text-white drop-shadow-md"
								style={{ textShadow: '3px 3px 5px gray' }}>
								0
							</p>
						</div>
						<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-xs mb-l:text-base mb-m:font-chakra-petch font-bold uppercase">
							<p>Thời Gian Hoạt Động:</p>
							<p
								className="text-white drop-shadow-md"
								style={{ textShadow: '3px 3px 5px gray' }}>
								6h - 23h50
							</p>
						</div>
						<div className="flex flex-col gap- justify-start w-full">
							<div className="flex flex-row w-full justify-start items-center gap-2 font-chakra-petch font-bold uppercase">
								<p>CL:</p>
								<ul className="menu menu-horizontal lg:gap-2 lg:text-base text-sm">
									{Array.from({ length: 10 }).map((_, i) => (
										<li
											key={i + 'cl'}
											className={`mb-m:size-6 size-4 place-content-center text-white rounded-full ${
												i % 2 === 0 ? 'bg-green-500' : 'bg-red-500'
											}`}>
											{i % 2 === 0 ? 'C' : 'L'}
										</li>
									))}
								</ul>
							</div>
							<div className="flex flex-row w-full justify-start items-center gap-2 font-chakra-petch font-bold uppercase">
								<p>TX:</p>
								<ul className="menu menu-horizontal lg:gap-2">
									{Array.from({ length: 10 }).map((_, i) => (
										<li
											key={i + 'tx'}
											className={`mb-m:size-6 size-4 place-content-center text-white rounded-full ${
												i % 2 === 0 ? 'bg-green-500' : 'bg-red-500'
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
				<div className="lg:w-1/2 w-full h-[400px] flex flex-col justify-center items-center bg-cover rounded-box p-2 gap-4 border-ani border-none shadow-lg shadow-current">
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
						<div
							className="flex flex-row gap-2 items-center border-b border-current"
							style={{
								textShadow: '3px 3px 3px var(--fallback-bc,oklch(var(--bc)/1))',
							}}>
							<IoLogoGameControllerB size={24} />
							<p className="uppercase font-chakra-petch font-bold">Thao Tác</p>
							<IoLogoGameControllerB size={24} />
						</div>
						<div className="flex flex-row w-full justify-start items-center gap-2 font-chakra-petch font-bold uppercase border border-current rounded-md p-2">
							<GrMoney
								size={24}
								className={`${
									themeType === 'luxury' ? 'text-white' : 'text-amber-400'
								}`}
							/>
							<p
								className={`${
									themeType === 'luxury' ? 'text-white' : 'text-amber-400'
								}`}>
								{new Intl.NumberFormat('vi').format(9999)}
							</p>
						</div>
						{/* Select Type Bet */}
						<div className="flex flex-row w-full justify-start items-center gap-2 divide-x-2 divide-current font-chakra-petch font-bold uppercase border border-current px-2 rounded-btn">
							<IoLogoGameControllerB size={24} />
							<select
								value={'cl'}
								onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
									setTypeBet(event.target.value as TypeBet);
								}}
								className="outline-none border-0 z-10 w-full py-3 capitalize">
								<option
									value={'cl'}
									selected>
									Chẵn Lẻ - Tài Xỉu
								</option>
								<option value={'x'}>Xiên</option>
								<option value={'g'}>Dự đoán kết quả</option>
							</select>
						</div>
						{/* Type Bet */}
						{typeBet === 'cl' && (
							<div className="flex flex-col gap-2 items-center mt-2 z-10 w-full">
								<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
									<button className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white active:hover:scale-95 active:hover:duration-1000 py-2 rounded-btn">
										♥️ Chẵn ♥️
									</button>
									<button className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white active:hover:scale-95 active:hover:duration-1000 py-2 rounded-btn">
										♦️ Tài ♦️
									</button>
								</div>
								<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
									<button className="w-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white active:hover:scale-95 active:hover:duration-1000 py-2 rounded-btn">
										♠️ Lẻ ♠️
									</button>
									<button className="w-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white active:hover:scale-95 active:hover:duration-1000 py-2 rounded-btn">
										♣️ Xỉu ♣️
									</button>
								</div>
							</div>
						)}
						{typeBet === 'x' && (
							<div className="flex flex-col gap-2 items-center mt-2 z-10 w-full">
								<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
									<button className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:duration-300 hover:text-white active:hover:scale-95 active:hover:duration-1000 py-2 rounded-btn">
										♥️ Chẵn Tài ♥️
									</button>
									<button className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:duration-300 hover:text-white active:hover:scale-95 active:hover:duration-1000 py-2 rounded-btn">
										♦️ Chẵn Xỉu ♦️
									</button>
								</div>
								<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
									<button className="w-full border border-green-500 text-green-500 hover:bg-green-500 hover:duration-300 hover:text-white active:hover:scale-95 active:hover:duration-1000 py-2 rounded-btn">
										♠️ Lẻ Tài ♠️
									</button>
									<button className="w-full border border-green-500 text-green-500 hover:bg-green-500 hover:duration-300 hover:text-white active:hover:scale-95 active:hover:duration-1000 py-2 rounded-btn">
										♣️ Lẻ Xỉu ♣️
									</button>
								</div>
							</div>
						)}
						{typeBet === 'g' && (
							<div className="flex flex-row w-full justify-start items-center gap-2 divide-x-2 divide-current font-chakra-petch font-bold uppercase border border-current px-2 rounded-btn z-10">
								<AiOutlineFieldNumber size={24} />
								<input
									type="number"
									className="outline-none border-0 w-full py-3 px-2"
									placeholder="Nhập kết quả dự đoán"
								/>
							</div>
						)}

						<div className="flex flex-row w-full justify-start items-center gap-2 divide-x-2 divide-current font-chakra-petch font-bold uppercase border border-current px-2 rounded-btn z-10">
							<GrMoney size={24} />
							<input
								type="number"
								className="outline-none border-0 z-10 w-full py-3 px-2"
								placeholder="Nhập số vàng cược"
							/>
						</div>
						<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase z-10">
							<button className="btn btn-outline capitalize max-w-xs w-full">
								<GiPerspectiveDiceSixFacesTwo size={24} />
								Cược Ngay
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
