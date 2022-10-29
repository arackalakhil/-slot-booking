const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const pack = require("../package.json");

const PATHS = {
	src: path.join(__dirname, "../src"),
	dist: path.join(__dirname, "../dist"),
	assets: "assets/",
	static: "static/",
	suitePath: "lib/suite/",
	diagramPath: "lib/diagram/",
	richtextPath: "lib/richtext/",
	spreadsheetPath: "lib/spreadsheet/",
};

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		app: ["./src/index.ts"]
	},
	output: {
		filename: "[name].js",
		path: PATHS.dist,
		publicPath: "",
		library: pack.name.replace(/[^a-z0-9]/gi, ""),
		libraryTarget: "umd"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: "/node_modules/"
			},
			{
				test: /\.ts$/,
				loader: "awesome-typescript-loader",
				exclude: "/node_modules/"
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]"
				}
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: "file-loader",
				options: {
					name: "./assets/fonts/[name].[ext]"
				}
			},
			{
				test: /\.s?css$/,
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { sourceMap: true, url: false }
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: { path: "./postcss.config.js" }
						}
					},
					{
						loader: "sass-loader",
						options: { sourceMap: true }
					}
				]
			}
		]
	},
	resolve: {
		mainFields: ["main", "module"],
		extensions: [".ts", ".js", ".json", ".css", ".sass"],
		plugins: [new TsconfigPathsPlugin({})],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css"
		}),
		new CopyWebpackPlugin([
			{ from: `${PATHS.src}/${PATHS.assets}`, to: `${PATHS.assets}` },
			{ from: `${PATHS.src}/${PATHS.static}`, to: `${PATHS.static}` },
			{ from: `${PATHS.src}/${PATHS.suitePath}`, to: `${PATHS.suitePath}` },
			{ from: `${PATHS.src}/${PATHS.diagramPath}`, to: `${PATHS.diagramPath}` },
			{ from: `${PATHS.src}/${PATHS.richtextPath}`, to: `${PATHS.richtextPath}` },
			{ from: `${PATHS.src}/${PATHS.spreadsheetPath}`, to: `${PATHS.spreadsheetPath}` },
			{ from: `${PATHS.src}/index.${process.env.DEMO_INDEX_SUFIX||""}html`, to: "index.html" },
		])
	]
};
