import React from 'react';
import { MdOutlineHistoryEdu } from 'react-icons/md';

function History() {
	return (
		<div
			style={{ backgroundImage: "url('/image/background/2.jpg')" }}
			className="w-full flex items-center justify-center p-8">
			<div className="max-w-7xl w-full select-none flex flex-col justify-start gap-4 border-none rounded-btn p-4 shadow-xl shadow-current backdrop-blur-lg">
				<div
					className="flex flex-row w-full justify-start items-center gap-2 text-2xl font-protest-strike-regular uppercase text-amber-500"
					style={{
						textShadow: '1px 2px 8px #f59e0b',
					}}>
					<MdOutlineHistoryEdu />
					<h1>Lịch Sử Cược</h1>
				</div>
				<div className="overflow-x-auto max-h-[600px]">
					<table className="table table-zebra font-chakra-petch">
						{/* head */}
						<thead>
							<tr>
								<th>Máy Chủ</th>
								<th>Nhân Vật</th>
								<th>Số Vàng</th>
								<th>Thể loại</th>
								<th>Dự đoán</th>
								<th>Kết quả</th>
								<th>Vàng nhận</th>
								<th>Tình trạng</th>
								<th></th>
							</tr>
						</thead>
						<tbody className="text-start text-lg">
							{/* row 1 */}
							{Array.from({ length: 20 }).map((_, i) => {
								return (
									<tr key={i + 'row_history_bet_server'}>
										<td>1</td>
										<td>
											<div className="flex items-center gap-3">
												<div className="avatar">
													<div className="mask mask-squircle h-12 w-12">
														<img
															src="/image/server/12.png"
															alt="Avatar Tailwind CSS Component"
														/>
													</div>
												</div>
												<div>
													<div className="font-bold">Brice Swyre</div>
													<div className="text-sm opacity-50">China</div>
												</div>
											</div>
										</td>
										<td className="font-number-font font-bold">
											{new Intl.NumberFormat('vi').format(9999)}
										</td>
										<td>Chẵn Lẻ</td>
										<td>Tài</td>
										<td>Xỉu</td>
										<td>
											<div className="badge bg-green-500 capitalize text-black font-number-font font-bold">
												+
												{new Intl.NumberFormat('vi').format(
													Math.floor(Math.random() * 1e9),
												)}
											</div>
										</td>
										<td>
											<div className="badge bg-green-500 font-chakra-petch capitalize text-black font-bold">
												Thắng
											</div>
										</td>
										<th></th>
									</tr>
								);
							})}
						</tbody>
						{/* foot */}
						<tfoot>
							<tr>
								<th>Máy Chủ</th>
								<th>Nhân Vật</th>
								<th>Số Vàng</th>
								<th>Thể loại</th>
								<th>Dự đoán</th>
								<th>Kết quả</th>
								<th>Vàng nhận</th>
								<th>Tình trạng</th>
								<th></th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
	);
}

export default History;
