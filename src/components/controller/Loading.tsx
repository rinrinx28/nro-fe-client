import React from 'react';

function Loading() {
	return (
		<div className="w-full flex items-center justify-center p-8 bg-white">
			<img
				src="/image/gif/loading_scree.gif"
				style={{ width: 'auto', height: 'auto' }}
			/>
		</div>
	);
}

export default Loading;
