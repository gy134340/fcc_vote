var config = {
	port: 5000,
	session: {
		secret: 'gy',
		key: 'gy',
		maxAge: 2592000000
	},
	mongodb: 'mongodb://localhost;27017/vote'

};
module.export = config;