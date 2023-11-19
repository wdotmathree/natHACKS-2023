/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.ibb.co",
			},
		],
	},
	webpack: (config, {}) => {
		config.module.rules.push({
			test: /\.wav$/,
			use: {
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
					outputPath: "public/sounds/",
					publicPath: "public/sounds/",
				},
			},
		});

		return config;
	},
};

module.exports = nextConfig;
