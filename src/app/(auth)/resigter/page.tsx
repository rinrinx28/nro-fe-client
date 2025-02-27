'use client';
import { useAppSelector } from '@/lib/redux/hook';
import apiClient from '@/lib/server/apiClient';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaMinus, FaUser } from 'react-icons/fa';
import { IoKey, IoMailSharp } from 'react-icons/io5';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';

function Resigter() {
	const user = useAppSelector((state) => state.user);
	const finger = useAppSelector((state) => state.finger);
	const [msg, setMsg] = useState<string>('');
	const [isLoad, setLoad] = useState<boolean>(false);

	const router = useRouter();

	const showNotice = (message: string) => {
		let div = document.getElementById('notice_resigter') as HTMLDialogElement;
		if (div) {
			div.show();
			setMsg(message);
		}
		return;
	};

	const resigter = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			setLoad(true);
			if (user.isLogin) throw new Error('Bạn đã đăng nhập!');
			const formData = new FormData(e.target as HTMLFormElement);
			let password = formData.get('password');
			let username = formData.get('username');
			let name = formData.get('name');
			let email = formData.get('email');
			let server = formData.get('server');
			if (!username) throw new Error('Xin vui lòng nhập tên đăng nhập');
			if (!name) throw new Error('Xin vui lòng nhập tên hiển thị');
			if (!email) throw new Error('Xin vui lòng nhập email');
			if (!password) throw new Error('Xin vui lòng nhập mật khẩu');
			if (!server) throw new Error('Bạn chưa chọn máy chủ');
			password = password.toString();
			username = username.toString();
			name = name.toString();
			email = email.toString();
			server = server.toString();
			if (password.length < 6)
				throw new Error('Độ dài mật khẩu tối thiểu là 6 ký tự');
			await apiClient.post('/auth/resigter', {
				password,
				name,
				username,
				email,
				server,
				hash: finger,
			});
			router.push('/login');
			setLoad(false);
			return;
		} catch (error: any) {
			// Xử lý lỗi cụ thể
			let message = 'Đã xảy ra lỗi không xác định';

			if (error instanceof AxiosError) {
				// Xử lý lỗi từ axios
				message = error.response?.data?.message || error.message;
			} else if (error instanceof Error) {
				// Xử lý custom errors
				message = error.message;
			}

			showNotice(message);
			setLoad(false);
			return;
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
					onSubmit={resigter}
					className="flex flex-col gap-2 w-full justify-around py-4 px-2 text-orange-500 z-10">
					<div className="flex flex-col gap-5 w-full">
						<h1 className="font-michelangelo w-full text-center text-6xl">
							Resigter
						</h1>
						<label className="form-control w-full">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<FaUser />
								<input
									type="text"
									className="grow"
									placeholder="Tên đăng nhập"
									name="username"
									required
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<label className="form-control w-full">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<MdOutlineDriveFileRenameOutline />
								<input
									type="text"
									className="grow"
									placeholder="Tên hiển thị"
									required
									name="name"
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<label className="form-control w-full">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<IoMailSharp />
								<input
									type="email"
									className="grow"
									placeholder="Nhập Email"
									required
									name="email"
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<label className="form-control w-full">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<IoKey />
								<input
									type="password"
									className="grow"
									placeholder="Nhập mật khẩu"
									required
									name="password"
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<label className="form-control w-full">
							<select
								required
								name="server"
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
