'use client';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { updateUser } from '@/lib/redux/storage/user/user';
import apiClient from '@/lib/server/apiClient';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaMinus, FaUser } from 'react-icons/fa';
import { IoKey } from 'react-icons/io5';

function Login() {
	const user = useAppSelector((state) => state.user);
	const finger = useAppSelector((state) => state.finger);
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

	const login = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			setLoad(true);
			if (user.isLogin) return showNotice('Bạn đã đăng nhập!');
			const formData = new FormData(e.target as HTMLFormElement);
			const username = formData.get('username')?.toString() || null;
			const password = formData.get('password')?.toString() || null;
			if (!username) throw new Error('Xin vui lòng nhập tên đăng nhập');
			if (!password) throw new Error('Xin vui lòng nhập mật khẩu');
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
			const { data } = await apiClient.post('/auth/login', {
				password,
				username,
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
			clearTimeout(timeoutId);
			setLoad(false);
			router.push('/');
		} catch (error: any) {
			let message = 'Đã xảy ra lỗi không xác định';

			if (error instanceof AxiosError) {
				if (error.code === 'ECONNABORTED') {
					message = 'Kết nối quá thời gian, vui lòng thử lại';
				} else {
					message = error.response?.data?.message.message || error.message;
				}
			} else if (error instanceof Error) {
				message = error.message;
			}

			showNotice(message);
			setLoad(false);
			return;
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
					onSubmit={login}
					className="flex flex-col gap-2 w-full justify-around py-4 px-2 z-10">
					<div className="flex flex-col gap-5 w-full ">
						<h1 className="font-michelangelo w-full text-center text-6xl">
							LOGIN
						</h1>
						<label className="form-control w-full">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<FaUser />
								<input
									type="text"
									className="grow"
									placeholder="Tên đăng nhập"
									name="username"
								/>
							</div>
						</label>
						<label className="form-control w-full">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<IoKey />
								<input
									type="password"
									className="grow"
									placeholder="Nhập mật khẩu"
									name="password"
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
