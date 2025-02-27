import React from 'react';

function Footer() {
	return (
		<div
			style={{ backgroundImage: "url('/image/banner.webp')" }}
			className="flex justify-center items-center bg-cover bg-no-repeat h-[200px] font-chakra-petch text-wrap w-full text-white font-bold text-center uppercase">
			<p>
				© {new Date().getFullYear()} Nrogame Me, all rights reserved. Powered by
				RIN
			</p>
		</div>
	);
}

export default Footer;
