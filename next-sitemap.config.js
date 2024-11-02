// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || 'https://nrogame.me',
	generateRobotsTxt: true,
	changefreq: 'daily',
	priority: 0.7,
	sitemapSize: 7000,
	exclude: ['/404', '/500', '/server-sitemap.xml'],
	robotsTxtOptions: {
		policies: [{ userAgent: '*', allow: '/' }],
		additionalSitemaps: ['https://nrogame.me/server-sitemap.xml'],
	},
};
