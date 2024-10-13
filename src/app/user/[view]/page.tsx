'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaExchangeAlt, FaRegUser, FaTable } from 'react-icons/fa';
import { GiDragonShield, GiSeaDragon } from 'react-icons/gi';
import { GrMoney, GrTrigger } from 'react-icons/gr';
import { MdOutlineEmail, MdOutlineHistory } from 'react-icons/md';
import { RiLockPasswordLine, RiVipCrownLine, RiVipFill } from 'react-icons/ri';

type PageView =
	| 'profile'
	| 'trade_gold'
	| 'history_bet'
	| 'history_service'
	| 'history_activity'
	| 'table_misson';

function UserContext() {
	const params = useParams<{ view: PageView }>();
	return (
		<div
			style={{ backgroundImage: "url('/image/background/logo_user.jpg')" }}
			className="min-h-screen flex justify-center items-start w-full bg-no-repeat bg-center bg-cover p-8 select-none">
			<div className="flex flex-row w-full gap-2 max-w-7xl h-full">
				{/* Navigate User */}
				<div className="lg:flex hidden flex-col bg-white/30 backdrop-blur-lg rounded-box w-fit text-nowrap py-4 px-8 gap-5 text-black">
					<div className="flex flex-row gap-2 items-center">
						<GiSeaDragon size={34} />
						<h1 className="font-sf-trans-robotics uppercase text-2xl">Rin</h1>
					</div>
					<div className="flex flex-col gap-2">
						<Link
							href={'/user/profile'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<FaRegUser size={24} />
							Cài Đặt Tài Khoản
						</Link>
						<Link
							href={'/user/trade_gold'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<FaExchangeAlt size={24} />
							Chuyển Vàng
						</Link>
						<Link
							href={'/user/history_service'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<MdOutlineHistory size={24} />
							Lịch Sử giao dịch
						</Link>
						<Link
							href={'/user/history_bet'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<MdOutlineHistory size={24} />
							Lịch sử cược
						</Link>
						<Link
							href={'/user/history_activity'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<MdOutlineHistory size={24} />
							Lịch Sử Hoạt Động
						</Link>
						<Link
							href={'/user/table_misson'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<FaTable size={24} />
							Bảng Nhiệm Vụ
						</Link>
						<button className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<RiLockPasswordLine size={24} />
							Đổi Mật Khẩu
						</button>
					</div>
				</div>
				{/* Tab */}
				{params.view === 'profile' && <Profile />}
				{params.view === 'history_bet' && <HistoryBet />}
				{params.view === 'history_activity' && <HistoryActivity />}
				{params.view === 'history_service' && <HistoryService />}
				{params.view === 'trade_gold' && <TradeGold />}
				{params.view === 'table_misson' && <TableMission />}
			</div>
		</div>
	);
}

// Cài Đặt Tài Khoản
function Profile() {
	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 gap-5 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Cài Đặt Tài Khoản
				</h1>
			</div>
			<div className="flex flex-col gap-5">
				{/* Avatar + Name + Badeg */}
				<div className="flex lg:flex-row flex-col gap-2 items-center">
					<div className="avatar">
						<div className="w-24 rounded-full">
							<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
						</div>
					</div>
					<div className="flex flex-col items-start justify-between p-2 font-protest-strike-regular uppercase gap-2">
						<div className="text-xl flex lg:flex-row flex-col gap-2 lg:items-center items-start truncate">
							<p>RIN</p>
							<div
								id="user_id"
								data-tip="Copy"
								onClick={() => {
									navigator.clipboard
										.writeText('27165d1b-06c3-4fa9-86af-2af53906ce38')
										.then(() => {
											let text = document.getElementById('user_id');
											if (text) {
												// Thêm class màu cam khi sao chép thành công
												text.classList.add('text-orange-500');

												// Thay đổi giá trị của data-tip
												text.setAttribute('data-tip', 'Copied!');

												// Loại bỏ màu và khôi phục lại giá trị data-tip sau 1 giây
												setTimeout(() => {
													text.classList.remove('text-orange-500');
													text.setAttribute('data-tip', 'Copy'); // Đặt lại giá trị gốc
												}, 1000);
											}
										});
								}}
								className="badge badge-outline cursor-pointer tooltip tooltip-right">
								27165d1b-06c3-4fa9-86af-2af53906ce38
							</div>
						</div>
						<div className="flex flex-row gap-2 border-t border-current py-2">
							<div className="badge badge-outline gap-2">
								<RiVipCrownLine />
								VIP 1
							</div>
							<div className="badge badge-outline">TOP 1</div>
							<div className="badge badge-outline">Team Dev</div>
						</div>
					</div>
				</div>
				{/* Info */}
				<div className="flex flex-col gap-2">
					{/* Username */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Tên đăng nhập
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2">
							<FaRegUser size={24} />
							<p>rinrinx28</p>
						</div>
					</div>
					{/* Email */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Email
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2">
							<MdOutlineEmail size={24} />
							<p>admin@gmail.com</p>
						</div>
					</div>
					{/* Name */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Tên Hiển Thị
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2">
							<FaRegUser size={24} />
							<p>Rin</p>
						</div>
					</div>
					{/* Vàng */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Số Dư
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2 text-xl text-orange-700">
							<GrMoney size={24} />
							<p className="font-sf-trans-robotics ">
								{new Intl.NumberFormat('vi').format(
									Math.floor(Math.random() * 10000),
								)}
							</p>
						</div>
					</div>
					{/* VIP */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Thông Tin VIP
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2 text-xl text-red-500">
							<RiVipFill size={24} />
							<p className="font-sf-trans-robotics">
								{new Intl.NumberFormat('vi').format(
									Math.floor(Math.random() * 10),
								)}
							</p>
						</div>
					</div>
					{/* Info VIP */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Điểm
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2 text-xl text-red-800">
							<GrTrigger size={24} />
							<p className="font-sf-trans-robotics">
								{new Intl.NumberFormat('vi').format(
									Math.floor(Math.random() * 10),
								)}
							</p>
						</div>
						<div className="label">
							<span className="label-text-alt text-black">
								Tích điểm nhận VIP
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Chuyển Vàng
function TradeGold() {
	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 gap-5 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Chuyển Vàng
				</h1>
			</div>
			<div className="flex flex-col gap-1 text-sm shadow-inner shadow-orange-500/30 text-white p-2 rounded-box bg-orange-500/30 font-bold">
				<p>Bạn chỉ có thể chuyển tới những người chơi ở Server 5</p>
			</div>
			<div className="flex flex-col gap-2">
				{/* Username */}
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
							Tài khoản
						</span>
					</div>
					<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2">
						<FaRegUser size={24} />
						<p>rinrinx28</p>
						<p>Máy Chủ 1</p>
					</div>
				</div>
				{/* Vàng */}
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
							Số Dư
						</span>
					</div>
					<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2 text-xl text-orange-700">
						<GrMoney size={24} />
						<p className="font-sf-trans-robotics ">
							{new Intl.NumberFormat('vi').format(
								Math.floor(Math.random() * 10000),
							)}
						</p>
					</div>
				</div>
				{/* Target ID */}
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
							ID Người Nhận
						</span>
					</div>
					<input
						className="input text-orange-500"
						type="text"
						placeholder="Nhập ID Người Nhận"
					/>
				</div>
				{/* Amount */}
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
							Số vàng chuyển
						</span>
					</div>
					<select
						defaultValue={0}
						className="select select-bordered w-full text-orange-500">
						{Array.from({ length: 10 }).map((_, i) => {
							return (
								<option
									value={i}
									key={i + 'value_trade_gold'}>
									{new Intl.NumberFormat('vi').format((i + 1) * 1e3 * 1e3 * 10)}
								</option>
							);
						})}
					</select>
					<div className="label">
						<span className="label-text-alt text-black">
							Số vàng bạn muốn chuyển cho người khác
						</span>
					</div>
				</div>
				{/* Thông báo */}

				<div className="flex flex-col gap-1 text-sm shadow-inner shadow-orange-500/30 text-white p-2 rounded-box bg-orange-500/30 font-bold">
					<p>Hạn mức hôm nay (0h00p sẽ reset): 0</p>
					<p>Đã sử dụng: 0</p>
					<p>Vui lòng chơi để nâng thêm hạn mức !</p>
				</div>
				<button className="flex flex-row gap-2 font-protest-strike-regular items-center justify-center w-full rounded-box py-4 px-4 bg-black text-orange-500 hover:bg-orange-500 hover:text-white hover:duration-300 active:hover:scale-90">
					<FaExchangeAlt size={24} />
					Chuyển Ngay
				</button>
			</div>
		</div>
	);
}

// Lịch Sử Giao Dịch
function HistoryService() {
	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 gap-5 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Lịch Sử Giao Dịch
				</h1>
			</div>
			{/* Tables */}
			<div className="overflow-auto w-full h-[600px]">
				<table className="table border border-black text-nowrap">
					{/* head */}
					<thead className="bg-orange-500 text-white capitalize">
						<tr>
							<th>Máy Chủ</th>
							<th>Nhân Vật</th>
							<th>Loại</th>
							<th>Số vàng</th>
							<th>Tình trạng</th>
							<th>thời gian</th>
							<th>Tương tác</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{Array.from({ length: 4 }).map((_, i) => {
							return (
								<tr key={i + 'history_service'}>
									<td>1</td>
									<td>Rin</td>
									<td>Nạp</td>
									<td>
										<div className="font-sf-trans-robotics badge badge-outline bg-green-500">
											+{' '}
											{new Intl.NumberFormat('vi').format(
												Math.floor(Math.random() * 10000),
											)}
										</div>
									</td>
									<td>
										<div className="badge badge-success font-chakra-petch capitalize">
											Thành công
										</div>
									</td>
									<td>{new Date().toDateString()}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

// Lịch Sử Cược
function HistoryBet() {
	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Lịch Sử Cược
				</h1>
			</div>
			<div className="overflow-auto w-full h-[600px]">
				<table className="table border border-black text-nowrap">
					{/* head */}
					<thead className="bg-orange-500 text-white capitalize">
						<tr>
							<th>Máy Chủ</th>
							<th>Nhân Vật</th>
							<th>Loại</th>
							<th>Dự Đoán</th>
							<th>Kết Quả</th>
							<th>Số vàng Cược</th>
							<th>Số vàng Nhận</th>
							<th>Tình trạng</th>
							<th>thời gian</th>
							<th>Tương tác</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{Array.from({ length: 4 }).map((_, i) => {
							return (
								<tr key={i + 'history_bet'}>
									<td>1</td>
									<td>Rin</td>
									<td>CL-TX</td>
									<td>Chẵn</td>
									<td>Chẵn</td>
									<td>
										<div className="font-sf-trans-robotics badge badge-outline bg-red-500">
											-{' '}
											{new Intl.NumberFormat('vi').format(
												Math.floor(Math.random() * 10000),
											)}
										</div>
									</td>
									<td>
										<div className="font-sf-trans-robotics badge badge-outline bg-green-500">
											+{' '}
											{new Intl.NumberFormat('vi').format(
												Math.floor(Math.random() * 10000) * 1.9,
											)}
										</div>
									</td>
									<td>
										<div className="badge badge-success font-chakra-petch capitalize">
											Thành công
										</div>
									</td>
									<td>{new Date().toDateString()}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

// Lịch Sử Hoạt động
function HistoryActivity() {
	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Lịch Sử Hoạt động
				</h1>
			</div>
			<div className="overflow-auto w-full h-[600px]">
				<table className="table border border-black text-nowrap">
					{/* head */}
					<thead className="bg-orange-500 text-white capitalize">
						<tr>
							<th>Máy Chủ</th>
							<th>Nhân Vật</th>
							<th>Hoạt Động</th>
							<th>Số vàng Trước</th>
							<th>Số vàng Sau</th>
							<th>thời gian</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{Array.from({ length: 4 }).map((_, i) => {
							return (
								<tr key={i + 'history_activity'}>
									<td>1</td>
									<td>Rin</td>
									<td>CL-TX</td>
									<td>
										<div className="font-sf-trans-robotics badge badge-outline bg-red-500">
											{new Intl.NumberFormat('vi').format(
												Math.floor(Math.random() * 10000),
											)}
										</div>
									</td>
									<td>
										<div className="font-sf-trans-robotics badge badge-outline bg-green-500">
											{new Intl.NumberFormat('vi').format(
												Math.floor(Math.random() * 10000),
											)}
										</div>
									</td>
									<td>{new Date().toDateString()}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

// Table Nhiệm Vụ
function TableMission() {
	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 gap-5 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Table Nhiệm Vụ
				</h1>
			</div>
			<p className="text-2xl font-protest-strike-regular capitalize">
				Đang Cập Nhật <span className="loading loading-dots loading-xs"></span>
			</p>
		</div>
	);
}

export default UserContext;
