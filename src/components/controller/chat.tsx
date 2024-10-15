'use client';
import '@/components/css/chat.css';
import { FaMinus, FaRobot } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';

export const openChatBox = () => {
	let chatBox = document.getElementById('chat-box') as HTMLDivElement;
	if (chatBox) {
		chatBox.classList.toggle('hidden');
	}
	let chat_box_screen = document.getElementById(
		'chat_box_screen',
	) as HTMLDivElement;
	if (chat_box_screen) {
		chat_box_screen.scrollTop = chat_box_screen.scrollHeight;
	}
};

function Chat() {
	return (
		<div
			id="chat-box"
			className="fixed lg:bottom-2 top-52 lg:right-4 right-0 slide-top w-full max-w-[500px] z-[100] p-2 backdrop-blur-lg select-none hidden">
			<div className=" bg-black/80 rounded-box border-ani border-none w-full h-full flex flex-col">
				<svg
					className="svg"
					height="100%"
					width="100%"
					xmlns="http://www.w3.org/2000/svg">
					<rect
						rx="8"
						ry="8"
						className="line stroke-orange-500 rounded-box"
						height="100%"
						width="100%"
						strokeLinejoin="round"
					/>
				</svg>
				{/* Layout ChatBox */}
				<div className="flex flex-col gap-3 p-4 font-chakra-petch w-full text-orange-500">
					{/* Header */}
					<div className="flex flex-row justify-between items-center  uppercase z-50">
						<div className="flex flex-row gap-2 items-center">
							<IoChatbubbleEllipsesSharp size={24} />
							<h1>ChatBox</h1>
						</div>
						<button onClick={openChatBox}>
							<FaMinus />
						</button>
					</div>
					{/* Change Server Chat */}
					<div className="flex flex-row items-center gap-2 z-50 ">
						<h2 className="text-lg">Kênh:</h2>
						<select
							defaultValue={'sv_0'}
							className="select select-bordered w-full max-w-xs capitalize">
							<option
								value={'team_dev'}
								key={'clan' + 'room_chat_box'}>
								Team Dev
							</option>
							{Array.from({ length: 12 }).map((_, i) => {
								return (
									<option
										value={'sv_' + i}
										key={i + 'room_chat_box'}>
										Máy Chủ {i === 7 ? 'Gộp' : i < 7 ? i + 1 : i + 3}
									</option>
								);
							})}
						</select>
					</div>
					{/* Chat */}
					<div className="p-2 z-50 w-full">
						<div
							id="chat_box_screen"
							className="border border-orange-500 w-full lg:h-[350px] h-[300px] overflow-auto scroll-smooth rounded-box p-2">
							{Array.from({ length: 24 }).map((_, i) => {
								return (
									<div
										key={i + 'chat_box'}
										className={`chat ${
											i % 2 === 0 ? 'chat-start' : 'chat-end'
										}`}>
										<div className="chat-image avatar">
											<div className="w-10 rounded-box border border-orange-500">
												<img
													alt="Tailwind CSS chat bubble component"
													src={`/image/avatar/${
														i % 2 === 0 ? '2.webp' : '3.webp'
													}`}
												/>
											</div>
										</div>
										<div className="chat-header">
											{i % 2 === 0 ? 'Rin' : 'Anh'}
											{/* <time className="text-xs opacity-50">12:45</time> */}
										</div>
										<div className="chat-bubble max-w-36">
											You were the Chosen One!
										</div>
										{/* <div className="chat-footer opacity-50">Delivered</div> */}
									</div>
								);
							})}
						</div>
					</div>

					{/* Input Chat */}
					<div className="flex flex-row text-orange-500 w-full items-center gap-4 z-50">
						<input
							type="text"
							placeholder="Type here"
							className="input input-bordered w-full border-orange-500"
						/>
						<button className="border border-orange-500 rounded-box text-center p-2 active:hover:scale-90 hover:duration-300">
							<IoIosSend size={32} />
						</button>
					</div>

					{/* Filter */}
					<div className="flex flex-wrap gap-2">
						<button className="border border-orange-500 rounded-box text-center p-2">
							<FaRobot size={32} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;
