import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/lib/redux/Provider';
import Navbar from '@/components/controller/navbar';
import Footer from '@/components/controller/footer';
import { Suspense } from 'react';
import Loading from '@/components/controller/Loading';
import CircularMenu from '@/components/controller/circularMenu';
import Clans from '@/components/controller/clans';

export const metadata: Metadata = {
	title: 'Beta Nrogame.me',
	description: 'It Work!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			data-theme="luxury"
			suppressHydrationWarning>
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.cdnfonts.com/css/michelangelo"
				/>
				<link
					href="https://fonts.cdnfonts.com/css/sf-transrobotics-2"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.cdnfonts.com/css/neue-helvetica-bq"
					rel="stylesheet"></link>
				<link
					href="https://fonts.cdnfonts.com/css/dynotherm"
					rel="stylesheet"
				/>
			</head>
			<body
				className={`antialiased min-h-screen transition-all duration-300 flex flex-col gap-5`}>
				<Providers>
					{/* <SocketProvider> */}
					<Navbar />
					<Suspense fallback={<Loading />}>{children}</Suspense>
					<CircularMenu />
					<Clans />
					<Footer />
					{/* </SocketProvider> */}
				</Providers>
			</body>
		</html>
	);
}
