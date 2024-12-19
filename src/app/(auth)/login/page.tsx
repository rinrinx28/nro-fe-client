'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { updateUser } from '@/lib/redux/storage/user/user';
import apiClient from '@/lib/server/apiClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa';

interface LoginField {
	username?: string;
	password?: string;
}

function Login() {
	const user = useAppSelector((state) => state.user);
	const finger = useAppSelector((state) => state.finger);
	const [field, setField] = useState<LoginField>({});
	const [msg, setMsg] = useState<string>('');
	const [isLoad, setLoad] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const showNotice = (message: string) => {
		let div = document.getElementById('notice_login') as HTMLDialogElement;
		if (div) {
			div.show();
			setMsg(message);
		}
		return;
	};

	const login = async () => {
		try {
			setLoad(true);
			if (user.isLogin) return showNotice('Bạn đã đăng nhập!');
			const { data } = await apiClient.post('/auth/login', {
				...field,
				hash: finger,
			});
			const { access_token } = data;
			localStorage.setItem('token', access_token);
			dispatch(
				updateUser({
					...data.user,
					isLogin: true,
					token: access_token,
				}),
			);
			router.push('/');
		} catch (err: any) {
			const { message } = err.response.data;
			showNotice(message.message);
		} finally {
			setLoad(false);
		}
	};

	useEffect(() => {
		let autoClose = setTimeout(() => {
			let div = document.getElementById('notice_login') as HTMLDialogElement;
			if (div) {
				div.close();
			}
		}, 5e3);
		return () => clearTimeout(autoClose);
	}, [msg]);
	return (
		<div className="min-h-screen w-full flex justify-center items-center p-2">
			<div className="flex md:flex-row flex-col w-full lg:max-w-4xl bg-white rounded-box shadow-xl">
				{/* From Login */}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						login();
					}}
					className="flex flex-col gap-2 w-full justify-around py-4 px-2">
					<div className="flex flex-col gap-5 w-full">
						<h1 className="font-michelangelo w-full text-center text-6xl">
							LOGIN
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
									onChange={(e) =>
										setField((f) => ({ ...f, password: e.target.value }))
									}
								/>
							</div>
						</label>
						<div className="form-control">
							<label className="cursor-pointer label justify-start gap-2">
								<input
									type="checkbox"
									defaultChecked
									className="checkbox"
								/>
								<span className="label-text">Ghi nhớ phiên đăng nhập?</span>
							</label>
						</div>
						<p
							id="notice-login"
							className="px-2 text-red-500 hidden">
							{msg}
						</p>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<button
							type="submit"
							className="btn btn-active">
							{isLoad ? (
								<span className="loading loading-bars loading-lg"></span>
							) : (
								'Đăng Nhập'
							)}
						</button>
						<p className="w-full text-center">
							Bạn chưa có tài khoản? Xin vui lòng{' '}
							<Link
								href="/resigter"
								className="text-orange-500 underline">
								Đăng Ký
							</Link>
						</p>
					</div>
				</form>
				{/*  */}
				<div
					style={{
						backgroundImage: "url('/image/background/logo_login.webp')",
					}}
					className="h-[600px] w-full bg-no-repeat bg-cover bg-center rounded-r-box md:inline-block hidden"></div>
			</div>
			<dialog
				id="notice_login"
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

export default Login;
