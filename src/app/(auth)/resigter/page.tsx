'use client';

import { useAppSelector } from '@/lib/redux/hook';
import apiClient from '@/lib/server/apiClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa';

interface ResigterField {
	username?: string;
	name?: string;
	password?: string;
	server?: string;
	email?: string;
}
function Resigter() {
	const user = useAppSelector((state) => state.user);
	const finger = useAppSelector((state) => state.finger);
	const [field, setField] = useState<ResigterField>({});
	const [msg, setMsg] = useState<string>('');
	const [isLoad, setLoad] = useState<boolean>(false);

	const router = useRouter();

	const showNotice = (message: string) => {
		setLoad(false);
		let div = document.getElementById('notice_resigter') as HTMLDialogElement;
		if (div) {
			div.show();
			setMsg(message);
		}
		return;
	};

	const resigter = async () => {
		try {
			setLoad(true);
			if (user.isLogin) return showNotice('Bạn đã đăng nhập!');
			if (!field || !field.password || field.password?.length < 6)
				return showNotice('Độ dài mật khẩu tối thiểu là 6 ký tự');
			await apiClient.post('/auth/resigter', { ...field, hash: finger });
			router.push('/login');
		} catch (err: any) {
			const {
				data: { message },
			} = err.response;
			showNotice(message.message);
			setLoad(false);
		} finally {
			setLoad(false);
		}
	};

	useEffect(() => {
		let autoClose = setTimeout(() => {
			let div = document.getElementById('notice_resigter') as HTMLDialogElement;
			if (div) {
				div.close();
			}
		}, 5e3);
		return () => clearTimeout(autoClose);
	}, [msg]);

	return (
		<div className="min-h-screen w-full flex justify-center items-center p-2">
			<div className="flex md:flex-row-reverse flex-col-reverse w-full lg:max-w-4xl bg-white rounded-box shadow-xl">
				{/* From Login */}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						resigter();
					}}
					className="flex flex-col gap-2 w-full justify-around py-4 px-2 text-orange-500">
					<div className="flex flex-col gap-5 w-full">
						<h1 className="font-michelangelo w-full text-center text-6xl">
							Resigter
						</h1>
						<label className="form-control w-full">
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
									placeholder="Tên đăng nhập"
									onChange={(e) =>
										setField((f) => ({ ...f, username: e.target.value }))
									}
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<label className="form-control w-full">
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
									required
									onChange={(e) =>
										setField((f) => ({ ...f, name: e.target.value }))
									}
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<label className="form-control w-full">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="h-4 w-4 opacity-70">
									<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
								</svg>
								<input
									type="email"
									className="grow"
									placeholder="Nhập Email"
									required
									onChange={(e) =>
										setField((f) => ({ ...f, email: e.target.value }))
									}
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<label className="form-control w-full">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="h-4 w-4 opacity-70">
									<path
										fillRule="evenodd"
										d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
										clipRule="evenodd"
									/>
								</svg>
								<input
									type="password"
									className="grow"
									placeholder="Nhập mật khẩu"
									required
									onChange={(e) =>
										setField((f) => ({ ...f, password: e.target.value }))
									}
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<label className="form-control w-full">
							<select
								required
								onChange={(e) =>
									setField((f) => ({ ...f, server: e.target.value }))
								}
								className="select select-bordered select-lg w-full bg-black">
								<option
									disabled
									selected>
									Chọn Máy Chủ
								</option>
								{Array.from({ length: 7 }).map((_, i) => (
									<option
										key={i + 'resigter_server'}
										value={i + 1}>
										Máy Chủ {i + 1}
									</option>
								))}
								<option value={'8'}>Máy Chủ 8-9-10</option>
								<option value={'11'}>Máy Chủ 11</option>
								{Array.from({ length: 2 }).map((_, i) => (
									<option
										disabled
										key={i + 'resigter_server'}
										value={i + 12}>
										Máy Chủ {i + 12}
									</option>
								))}
							</select>
						</label>
						<p
							id="notice-resigter"
							className="px-2 text-red-500 hidden">
							{msg}
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<button
							type="submit"
							className="btn btn-active text-white uppercase bg-orange-500">
							{isLoad ? (
								<span className="loading loading-bars loading-lg"></span>
							) : (
								'Đăng Ký'
							)}
						</button>
					</div>
				</form>
				{/*  */}
				<div
					style={{
						backgroundImage: "url('/image/background/logo_resigter.webp')",
					}}
					className="h-[600px] w-full bg-no-repeat bg-cover bg-center rounded-l-box md:inline-block hidden"></div>
			</div>
			{/* You can open the modal using document.getElementById('ID').showModal() method */}
			<dialog
				id="notice_resigter"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold z-50">
						<h1 className="text-lg">Thông Báo - Đăng Ký</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2 p-2 w-full text-center">
						{msg}
					</div>
				</div>
				<form
					method="dialog"
					className="modal-backdrop">
					<button>
						<FaMinus size={24} />
					</button>
				</form>
			</dialog>
		</div>
	);
}

export default Resigter;
