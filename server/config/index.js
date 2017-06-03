var config = {
	port: 8080,
	session: {
		secret: 'gy',
		key: 'gy',
		maxAge: 2592000000
	},
	mongodb: 'mongodb://localhost:27017/vote',
	github_key: '4e76781521758dd671ec',
	github_secret: '508295da4c013ba47b6b9272cfc683ae19a1bc35',
	app_url: 'http://127.0.0.1:8080/',
	redirect_url: 'http://127.0.0.1:8080/auth/github'
};
module.exports = config;