import React from 'react';

function Footer() {
	return (
		<div
			style={{ backgroundImage: "url('/image/banner.png')" }}
			className="flex justify-center items-center bg-cover bg-no-repeat h-[200px] font-chakra-petch text-wrap w-full text-white text-center uppercase">
			<p>
				© {new Date().getFullYear()} Nrogame Me, all rights reserved. <br />
				Made with ❤️ for a better web.
			</p>
		</div>
	);
}

export default Footer;
