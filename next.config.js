/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ["mongoose", "ipfs-utils"],
	},
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
	webpack(config) {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		}
		return config
	}
}

module.exports = nextConfig