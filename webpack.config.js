const path = require('path');
const webpack = require('webpack'); // 用于访问内置插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
require('html-loader');
//环境变量 dev/online
var WEBPACK_ENV=process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin
var getHtmlConfig=function(name,title){
	return {
		template:'./src/view/'+name+'.html',
		filename:'view/'+name+'.html',
    title:title,
		inject:true,
		hash:true,
		chunks:['common',name],
	}
}

const config= {
  entry: {
  	'common':['./src/page/commons/index.js'],
  	'index':['./src/page/index/index.js'],
  	'user-login':['./src/page/user-login/user-login.js'],
    'result':['./src/page/result/result.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist',
    filename: 'js/[name].js'
  },
  externals:{
    'jquery':'window.jQuery',
  	'$':'window.jQuery',
  },
  module: {
  	rules:[
  		{
	        test: /\.css$/,
	        use: ExtractTextPlugin.extract({
	            use: 'css-loader',
	            fallback: 'style-loader'
	        })
    	},
      {
          test:/\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf)(\?.*)?$/,
          use:[{
              loader:'url-loader',
              options:{
                  limit:50,
                  outputPath:'image/'
              }
          }]
      },
      {
          test: /\.string$/,
          loader:'html-loader',
      },
    ]
  },
  resolve:{
    alias:{
      node_modules:__dirname+'/node_modules',
      util:__dirname+'/src/util',
      page:__dirname+'/src/page',
      server:__dirname+'/src/server',
      image:__dirname+'/src/image',
    },
  },
  plugins:[
  	// 提供公共代码
  	// 默认会把所有入口节点的公共代码提取出来,生成一个common.js
    new webpack.optimize.CommonsChunkPlugin({
    	name:'common',
    	filename:'js/base.js',
    }),
    //css单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),
    //html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('result','反馈结果')),
    //new webpack.HotModuleReplacementPlugin(),
  ],
};

if('dev'===WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088')
}
module.exports=config;