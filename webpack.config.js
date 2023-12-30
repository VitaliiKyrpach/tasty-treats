const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

module.exports = {
	mode,
	target,
	devtool,
	entry: path.resolve(__dirname, "src", "index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
		assetModuleFilename: "assets/[name][ext]",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
			inject: "body",
		}),
		new MiniCssExtractPlugin({
			filename: "main.css",
		}),
	],
	module: {
		rules: [
			{ test: /\.html$/, loader: "html-loader" },
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					// devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					MiniCssExtractPlugin.loader,
					"css-loader",
					"resolve-url-loader",
					{
						loader: "sass-loader",
						options: {
							sourceMap: true, // <-- !!IMPORTANT!!
						},
					},
				],
			},
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/preset-env", { targets: "defaults" }]],
					},
				},
			},
			{
				test: /\.woff2?$/,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name][ext]",
				},
			},
			{
				test: /\.(jpe?g|png|webp|gif|svg)$/i,
				type: "asset/resource",
				use: [
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75,
							},
						},
					},
				],
			},
			// {
			// 	test: /\.(jpe?g|png|webp|gif|svg)$/i,
			// 	use: [
			// 		{
			// 			loader: "file-loader",
			// 			options: {
			// 				name: "[name][ext]",
			// 				outputPath: "images",
			// 			},
			// 		},
			// 		{
			// 			loader: "image-webpack-loader",
			// 			options: {
			// 				mozjpeg: {
			// 					progressive: true,
			// 				},
			// 				// optipng.enabled: false will disable optipng
			// 				optipng: {
			// 					enabled: false,
			// 				},
			// 				pngquant: {
			// 					quality: [0.65, 0.9],
			// 					speed: 4,
			// 				},
			// 				gifsicle: {
			// 					interlaced: false,
			// 				},
			// 				// the webp option will enable WEBP
			// 				webp: {
			// 					quality: 75,
			// 				},
			// 			},
			// 		},
			// 	],
			// 	type: "asset/resource",
			// },
		],
	},
	devServer: {
		port: 3000,
		hot: true,
		open: true,
	},
};
