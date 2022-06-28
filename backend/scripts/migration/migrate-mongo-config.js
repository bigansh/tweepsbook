require('dotenv').config()

const config = {
	mongodb: {
		url: process.env.DATABASE_URL,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
	migrationsDir: 'migrations',
	changelogCollectionName: 'changelog',
	migrationFileExtension: '.js',
	useFileHash: false,
	moduleSystem: 'esm',
}

export default config
