'use client';

import Link from 'next/link';

function Login() {
	return (
		<div className="min-h-screen w-full flex justify-center items-center p-2">
			<div className="flex md:flex-row flex-col w-full lg:max-w-4xl bg-white rounded-box shadow-xl">
				{/* From Login */}
				<form
					onSubmit={(e) => {
						e.preventDefault();
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
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
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
					</div>
					<div className="flex flex-col gap-2 w-full">
						<button
							type="submit"
							className="btn btn-active">
							Đăng Nhập
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
					style={{ backgroundImage: "url('/image/background/logo_login.jpg')" }}
					className="h-[600px] w-full bg-no-repeat bg-cover bg-center rounded-r-box md:inline-block hidden"></div>
			</div>
		</div>
	);
}

export default Login;