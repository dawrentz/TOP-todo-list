const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { default: taskModule } = require("./src/taskModule");

module.exports = {
    entry: {
        index: "./src/index.js",
        taskModule: "./src/taskModule.js",
        render: "./src/render.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    mode: "development",
    devtool: "inline-source-map", 
    devServer: {
        static: "./dist", 
        hot: false,
        watchFiles: ["src/index.html"],
        liveReload: true,
        client: {
            logging: "warn",
        },

    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
    ],
    optimization: {
        // runtimeChunk: "single",
    },
};

//and "look out for option"?
//change multiple entries with more js modules