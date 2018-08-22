
const ENV = process.env.npm_lifecycle_event;


module.exports = {
	ENV,
	isTest: ENV.indexOf('test') !== -1,
	isProd: ENV.indexOf('build') !== -1,
	isTestWatch: ENV.indexOf('test') !== -1 && ENV.indexOf('watch') !== -1,
	isDev: !this.isTest && !this.isTestWatch && this.isProd === false,
};
