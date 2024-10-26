'use client';

interface ConfigModal {
	id: string;
	children: React.ReactNode;
	customClass?: string;
}

function Modal({ id, customClass, children }: ConfigModal) {
	return (
		<dialog
			id={id}
			className="modal p-2 x-[1200]">
			<div
				className={`modal-box ${
					customClass ?? 'none'
				} text-white font-chakra-petch bg-black/70 backdrop-blur-lg`}>
				<div className="absolute top-0 left-0 w-full h-full -z-10">
					<div className="border-ani border-none w-full h-full">
						<svg
							className="svg w-full h-full"
							height="100%"
							width="100%"
							xmlns="http://www.w3.org/2000/svg">
							<rect
								rx="8"
								ry="8"
								className="line stroke-orange-500"
								height="100%"
								width="100%"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
				<form method="dialog">
					{/* if there is a button in form, it will close the modal */}
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
				</form>
				{children}
			</div>
		</dialog>
	);
}

export default Modal;
