'use client';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { setUserBet, UserBet } from '@/lib/redux/storage/user/userBet';
import apiClient from '@/lib/server/apiClient';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa';
import { MdOutlineHistoryEdu } from 'react-icons/md';

interface FieldRow {
	row: '10' | '25' | '50' | '100';
	show: 'all' | 'only';
}

function History() {
	const user = useAppSelector((state) => state.user);
	const userBets = useAppSelector((state) => state.userBets);
	const server = useAppSelector((state) => state.server);

	const dispatch = useAppDispatch();

	const [data, setData] = useState<UserBet[]>([]);
	const [filter, setField] = useState<FieldRow>({
		row: '25',
		show: 'all',
	});
	const [msg, setMsg] = useState<string>('');
	useEffect(() => {
		if (userBets) {
			const targets = userBets.filter((bet) =>
				filter.show === 'all'
					? bet.server === server
					: bet.uid === (user._id ?? ''),
			);
			let new_main_server = targets;
			let new_channel: UserBet[] = [];
			for (const bet of new_main_server) {
				if (new_channel.length >= Number(filter.row)) {
					new_channel.shift(); // Removes the oldest message if the array exceeds 10 messages
				}
				new_channel.push(bet);
			}
			setData(new_channel);
		}
	}, [userBets]);

	useEffect(() => {
		const listUserBet = async (server: string, limited: number) => {
			try {
				const { data } = await apiClient.get(
					`/no-call/list/userbet?server=${server}&limited=${limited}`,
				);
				for (const bet of data) {
					dispatch(setUserBet(bet));
				}
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		if (server) {
			listUserBet(server, Number(filter.row));
		}
	}, [server, filter]);

	const cancelPlace = async (userBetId: string) => {
		try {
			if (!user.isLogin || !user.token)
				return showNoticeEShop('Bạn chưa đăng nhập');
			const { data } = await apiClient.post(
				'/mini-game/cancel',
				{
					userBetId: userBetId,
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			showNoticeEShop(data.message);
		} catch (err: any) {
			showNoticeEShop(err.response.data.message.message);
		}
	};

	const showNoticeEShop = (message: string) => {
		let dialog = document.getElementById(
			'usert_bet_place_notice',
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
			setMsg(message);
		}
	};
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
							{data
								.sort(
									(a, b) =>
										moment(b.createdAt).unix() - moment(a.createdAt).unix(),
								)
								.map((bet, i) => {
									const {
										amount = 0,
										status,
										result,
										place,
										revice = 0,
										server,
										typeBet,
										uid,
										meta = {},
										isEnd,
									} = bet;
									const { name = 'rno', avatar = null } = meta;
									return (
										<tr key={i + 'row_history_bet_server'}>
											<td>{server}</td>
											<td>
												<div className="flex items-center gap-3">
													<div className="avatar">
														<div className="mask mask-squircle h-12 w-12">
															<img
																src={`/image/avatar/${avatar ?? '3'}.webp`}
																alt={`Avatar nrogame ${avatar ?? '3'}`}
															/>
														</div>
													</div>
													<div>
														<div className="font-bold">{name}</div>
													</div>
												</div>
											</td>
											<td className="font-number-font font-bold">
												{new Intl.NumberFormat('vi').format(amount)}
											</td>
											<td>
												{typeBet === 'cl'
													? 'Chẵn Lẻ'
													: typeBet === 'g'
													? 'Dự Đoán Số'
													: 'Xiên'}
											</td>
											<td>{place}</td>
											<td>
												{!isEnd ? (
													<span className="loading loading-dots loading-sm"></span>
												) : (
													result
												)}
											</td>
											<td>
												<div
													className={`badge ${
														status === 1
															? 'bg-yellow-500 text-black'
															: revice > 0
															? 'bg-green-500 text-black'
															: 'bg-red-500 text-white'
													} capitalize font-number-font font-bold`}>
													{status === 1 ? (
														<>Đã Hoàn</>
													) : (
														<>
															{revice > 0 ? '+' : '-'}
															{new Intl.NumberFormat('vi').format(revice)}
														</>
													)}
												</div>
											</td>
											<td>
												<div
													className={`badge ${
														status === 1
															? 'bg-yellow-500 text-black'
															: status === 2
															? revice > 0
																? 'bg-green-500 text-black'
																: 'bg-red-500 text-white'
															: 'bg-cyan-500 text-black'
													} font-chakra-petch capitalize font-bold`}>
													{status === 1
														? 'Đã Hủy'
														: status === 2
														? revice > 0
															? 'Thắng'
															: 'Thua'
														: 'Đợi Kết Quả'}
												</div>
											</td>
											<th>
												{uid === user._id ? (
													!isEnd && status === 0 ? (
														<button
															onClick={() => cancelPlace(bet._id ?? '')}
															className="p-2 rounded-lg bg-red-500 text-white">
															Hủy
														</button>
													) : (
														''
													)
												) : (
													''
												)}
											</th>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
				{/* Filter */}
				<div className="flex flex-row justify-between items-center">
					{/* Filter Bet  */}
					<select
						defaultValue={filter.show}
						onChange={(e) =>
							setField((f) => ({
								...f,
								show: e.target.value as 'all' | 'only',
							}))
						}
						className="select select-bordered w-full max-w-fit">
						{['all', 'only'].map((s, i) => {
							return (
								<option
									key={i + 'show'}
									value={s}>
									{s === 'all' ? 'Tất cả' : 'Chỉ mình tôi'}
								</option>
							);
						})}
					</select>
					{/* row max */}
					<select
						defaultValue={filter.row}
						onChange={(e) =>
							setField((f) => ({
								...f,
								row: e.target.value as '10' | '25' | '50' | '100',
							}))
						}
						className="select select-bordered w-full max-w-fit">
						{['10', '25', '50', '100'].map((s, i) => {
							return (
								<option
									key={i + 'row'}
									value={s}>
									{s}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<dialog
				id="usert_bet_place_notice"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Thông Báo</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2 text-center">
						<p className="">{msg}</p>
					</div>
				</div>
			</dialog>
		</div>
	);
}

export default History;
