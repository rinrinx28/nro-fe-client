'use client';
import History from '@/components/pages/main/history';
import TablesTop from '@/components/pages/main/tables-top';
import Home from '@/components/pages/main/home';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/redux/hook';
import { CiLink } from 'react-icons/ci';
import { IoPlayCircle } from 'react-icons/io5';
import { FaMusic } from 'react-icons/fa';

function getYouTubeVideoId(url: string) {
	const urlObj = new URL(url);
	return urlObj.searchParams.get('v');
}

export default function Page() {
	const econfig = useAppSelector((state) => state.econfig);
	const [link, setLink] = useState<string | null>(null);
	const [isShow, setShow] = useState<boolean>(false);

	const play = (url: string) => {
		let id = getYouTubeVideoId(url);
		let url_ytb = `https://www.youtube.com/embed/${id}`;
		setLink(url_ytb);
	};

	useEffect(() => {
		if (econfig.length > 0) {
			let target = econfig.find((e) => e.name === 'e_shop');
			if (target) {
				let ypt = target?.option?.ytb ?? null;
				let url = `https://www.youtube.com/embed/${ypt}`;
				setLink(url);
			}
		}
	}, [econfig]);
	return (
		<div
			id="home_page"
			className="flex flex-col gap-2 justify-center items-center w-full select-none bg-[#C1121F]">
			<Home />
			<div
				style={{ backgroundImage: "url('/image/background/banner_1.webp')" }}
				className="w-full bg-cover bg-repeat bg-top">
				<div className="flex flex-col items-center p-2 w-full justify-center gap-4">
					<button
						onClick={() => setShow((e) => !e)}
						className="font-bold flex flex-row p-3 rounded-box shadow-sm gap-2 text-nowrap items-center transition-colors ease-linear shadow-orange-500 bg-orange-500 text-white">
						<FaMusic />
						Nghe Nhạc
					</button>
					<div
						className={`${
							isShow ? 'flex' : 'hidden'
						} flex-col gap-2 items-center w-full justify-center`}>
						{/* <form
							onSubmit={(e) => {
								e.preventDefault();
								let input_url_ybt = document.getElementById(
									'url_ybt',
								) as HTMLInputElement;
								if (input_url_ybt) {
									let url = input_url_ybt.value;
									if (url.length > 0) {
										play(url);
										input_url_ybt.value = '';
									}
								}
							}}
							className="flex flex-row items-center lg:gap-2 w-full justify-center">
							<label className="input input-bordered flex items-center gap-2 max-w-xl w-full">
								<CiLink size={24} />
								<input
									id="url_ybt"
									type="text"
									className="max-w-lg w-full"
									placeholder="Ex: https://www.youtube.com/watch?v=pfiCNAc2AgU"
								/>
							</label>
							<button
								type="submit"
								className="btn">
								<IoPlayCircle size={32} />
							</button>
						</form> */}
						<div className="w-full max-w-[500px] max-h-[600]">
							<iframe
								className="w-full h-[400px] max-h-[500px]"
								src={link ?? ''}
								title="YouTube video player"
								allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
						</div>
					</div>
				</div>
			</div>

			<History />
			<div
				style={{ backgroundImage: "url('/image/background/banner_1.webp')" }}
				className="w-full h-20 bg-cover bg-repeat bg-center"></div>
			<TablesTop />
			<div
				style={{ backgroundImage: "url('/image/background/banner_1.webp')" }}
				className="w-full h-20 bg-cover bg-repeat bg-bottom"></div>
		</div>
	);
}
