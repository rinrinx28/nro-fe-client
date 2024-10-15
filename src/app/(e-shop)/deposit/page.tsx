'use client';
import { getNumbetFromString } from '@/components/pages/main/home';
import { GrMoney } from 'react-icons/gr';

type TypeDeposit = 'gold' | 'rgold';

function Deposit() {
	return (
		<div
			style={{ backgroundImage: "url('/image/background/logo_deposit.jpg')" }}
			className="min-h-screen w-full flex flex-col justify-center items-center p-4 gap-4 bg-no-repeat bg-cover select-none">
			<div className="flex flex-col gap-2 w-full max-w-7xl rounded-box shadow-lg shadow-white/80 bg-white/50 backdrop-blur-lg text-black p-8">
				<h1 className="w-full text-center font-chakra-petch font-bold uppercase text-4xl text-amber-800">
					Nạp Vàng
				</h1>
				<div className="flex flex-col gap-1 text-sm shadow-inner shadow-orange-500/30 text-white p-2 rounded-box bg-orange-500/30 font-bold">
					<p>Hệ thống nạp vàng tự động</p>
					<p>Bước 1: Đặt đơn nạp vàng trên website</p>
					<p>Bước 2: Vào đúng địa điểm gặp nhân vật nhận hàng để giao dịch</p>
					<p>
						Sau khi giao dịch thành công bạn sẽ được cộng vàng trên website sau
						3 giây
					</p>
					<p>- Tỷ lệ nạp 100%, nạp 100tr được 100tr</p>
					<p>
						Hệ thống tự động hủy đơn sau 10 phút nếu chưa giao dịch thành công
					</p>
					<p>Hãy tìm khu không có Virus/BOSS để tránh bị hủy GD giữa chừng.</p>
				</div>
				<div className="flex lg:flex-row flex-col w-full gap-2">
					{/* Giao Dịch */}
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
						className="flex flex-col w-full lg:max-w-md rounded-box border border-current bg-white">
						<div className="w-full bg-orange-500 text-white text-center rounded-t-box py-4">
							<h1 className="font-protest-strike-regular">
								Số Dư:{' '}
								<span className="font-sf-trans-robotics">
									{new Intl.NumberFormat('vi').format(9999)}
								</span>
							</h1>
						</div>
						<label className="form-control w-full p-2 text-orange-500 font-protest-strike-regular">
							<select className="select select-bordered w-full border-2 ">
								<option
									disabled
									selected>
									Chọn Máy Chủ
								</option>
								{Array.from({ length: 11 }).map((_, i) => (
									<option
										key={i + 'resigter_server'}
										value={i}>
										Máy Chủ {i === 7 ? 'Gộp' : i < 7 ? i + 1 : i + 3}
									</option>
								))}
							</select>
						</label>
						<label className="form-control w-full p-2 text-orange-500 font-protest-strike-regular">
							<select
								defaultValue={'gold'}
								className="select select-bordered w-full border-2 ">
								<option
									value={'gold'}
									selected>
									Giao dịch vàng
								</option>
								<option value={'rgold'}>Giao dịch thỏi vàng</option>
							</select>
						</label>
						<label className="form-control w-full p-2 text-orange-500 font-protest-strike-regular">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="h-4 w-4 opacity-70">
									<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
								</svg>
								<input
									type="text"
									className="grow"
									placeholder="Tên hiển thị"
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<label className="form-control w-full p-2 text-orange-500 font-protest-strike-regular">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<GrMoney />
								<input
									onChange={(e) => {
										// Extract numeric part (removes any non-digit characters)
										let value = getNumbetFromString(e.target.value);

										// Update the input value with the formatted number
										e.target.value = value;
									}}
									type="text"
									className="grow"
									placeholder="nhập số vàng nạp"
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<div className="p-2">
							<div className="flex flex-col gap-1 text-sm shadow-inner shadow-orange-500/30 text-black rounded-lg p-2 bg-orange-500/30 font-bold">
								<p>
									Hệ thống thỏi vàng tự động quy đổi{' '}
									<span className="text-red-500">1 thỏi vàng</span> là{' '}
									<span className="text-red-500">500tr vàng</span>
								</p>
							</div>
						</div>
						<div className="p-4 w-full">
							<button
								className="font-protest-strike-regular w-full uppercase py-4 px-2 bg-orange-500 text-white rounded-box hover:border-orange-500 hover:border hover:bg-transparent hover:text-orange-500 hover:duration-300 active:hover:scale-90"
								type="submit">
								Nạp ngay
							</button>
						</div>
					</form>
					{/* Table Bot giao dich */}
					<div className="overflow-auto w-full">
						<table className="table border border-black text-nowrap">
							<caption className="caption-top capitalize py-2 px-2 text-xl bg-white text-orange-500 font-protest-strike-regular rounded-t-box">
								Vị Trí Nhân Vật Nhận vàng
							</caption>
							{/* head */}
							<thead className="bg-orange-500 text-white capitalize">
								<tr>
									<th></th>
									<th>Nhân Vật</th>
									<th>Địa điểm</th>
									<th>Khu vực</th>
									<th>Số vàng</th>
								</tr>
							</thead>
							<tbody>
								{/* row 1 */}
								{Array.from({ length: 4 }).map((_, i) => {
									return (
										<tr key={i + 'deposit_bot'}>
											<th>{i + 1}</th>
											<td>Cy Ganderton</td>
											<td>Quality Control Specialist</td>
											<td>Blue</td>
											<td className="font-sf-trans-robotics">
												{new Intl.NumberFormat('vi').format(
													Math.floor(Math.random() * 10000),
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{/* History Giao Dịch */}
			<div className="flex flex-col gap-2 w-full max-w-7xl rounded-box shadow-lg shadow-white/80 bg-white/50 backdrop-blur-lg text-black p-8">
				<div className="overflow-auto w-full">
					<table className="table border border-black text-nowrap">
						<caption className="caption-top capitalize py-2 px-2 text-2xl bg-white text-orange-500 font-protest-strike-regular rounded-t-box">
							Lịch Sử giao dịch
						</caption>
						{/* head */}
						<thead className="bg-orange-500 text-white capitalize">
							<tr>
								<th>Máy Chủ</th>
								<th>Nhân Vật</th>
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
									<tr key={i + 'deposit_bot'}>
										<td>1</td>
										<td>Cy Ganderton</td>
										<td className="font-sf-trans-robotics">
											{new Intl.NumberFormat('vi').format(
												Math.floor(Math.random() * 10000),
											)}
										</td>
										<td>
											<div className="badge bg-green-500 font-sf-trans-robotics capitalize text-black">
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
		</div>
	);
}

export default Deposit;