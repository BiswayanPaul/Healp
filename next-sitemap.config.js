/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://healp.vercel.app', // or your custom domain if you have one
    generateRobotsTxt: true, // Generates both sitemap and robots.txt
    exclude: ['/dashboard/*', '/profile/*', '/appointments/*'], // private routes
};
