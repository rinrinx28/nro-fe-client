// app/server-sitemap.xml/route.ts
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export async function GET(request: Request) {
	const list_page = [
		'profile',
		'trade_gold',
		'history_bet',
		'history_service',
		'history_activity',
		'table_vip',
		'exchange_diamon',
		'table_misson',
	];
	const urls: ISitemapField[] = list_page.map((p) => {
		return {
			loc: `https://nrogame.me/user/${p}`,
			lastmod: new Date().toISOString(),
			changefreq: 'daily',
			priority: 0.7,
		};
	});

	return getServerSideSitemap(urls);
}
