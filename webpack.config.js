/*
* @Author: Wendy Shu
* @Date:   2017-07-04 11:09:37
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-06 15:44:49
*/

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置。dev ／ online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

var getHtmlConfig = function(name,title){
    return {
        template : "./src/view/" + name + ".html",
        filename : "view/" + name + ".html",
        title : title,
        inject : true,
        hash : true,
        chunks : ['common', name]
    };
}

var config = {
    entry: {
    	'common'            : ['./src/page/common/index.js'],
    	'index'             : ['./src/page/index/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'], 
        'user-register'     : ['./src/page/user-register/index.js'], 
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'], 
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'], 
        'user-center'       : ['./src/page/user-center/index.js'], 
        'user-center-update': ['./src/page/user-center-update/index.js'], 
    	'result'            : ['./src/page/result/index.js'] 
    },
    output: {
    	// 存放文件路径
        path: './dist',
        // 访问文件路径
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals : {
    	'jquery' : 'window.jQuery'
    },
    module : {
		loaders : [
			{
				test: /\.css$/,
				loader:  ExtractTextPlugin.extract("style-loader","css-loader")
			},
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
                loader:  'url-loader?limit=100&name=resource/[name].[ext]'
            },
            {
                test: /\.string$/, 
                loader: 'html-loader'
            }
		]
    },
    resolve : {
    	alias : {
    		util : __dirname + '/src/util',
    		page : __dirname + '/src/page',
    		service : __dirname + '/src/service',
    		image : __dirname + '/src/image',
    		node_modules : __dirname + '/node_modules'
    	}
    },
    plugins : [
	    new webpack.optimize.CommonsChunkPlugin({
	    	name : 'common',
	    	filename : 'js/base.js'
	    }),
	    new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','登录密码找回')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','个人信息修改')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))

    ]
};

if('dev' == WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config; 