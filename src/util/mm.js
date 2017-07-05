/*
* @Author: Wendy Shu
* @Date:   2017-07-04 14:43:16
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-04 17:14:13
*/

'use strict';

var Hogan = require('hogan');
var conf = {
	serverHost : ''
};
var _mm = {
	// ajax网络请求
	request : function(param){
		var _this = this;
		$.ajax({
			type 		: param.method 	|| 'get',
			url 		: param.url 	|| '',
			dataType 	: param.type 	|| 'json',
			data 		: param.data 	|| '',
			success 	: function(res){
				// 请求成功
				if (0 === res.status) {
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}
				// 没有登录状态，需要登录
				else if (10 === res.status) {
					_this.doLogin();
				}
				// 请求的数据错误
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	// 获取后端服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	// 获取url参数
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	// render渲染html
	renderHtml : function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate);
		var result = template.render(data);
		return result;
	},
	// 成功提示
	successTips : function(msg){
		alert(msg || '操作成功');
	},
	// 错误提示
	errorTips : function(msg){
		alert(msg || '哪里不对了！');
	},
	// 表单验证，是否为非空，手机&邮箱格式是否是对的
	validate : function(value,type){
		var value = $.trim(value);
		// 非空验证
		if ('require' === type) {
			return !!value;
		}
		// 手机号验证
		if ('iphone' === type) {
			return /^1\d{10}$/.test(value);
		}
		// 验证邮箱
		if ('email' === type) {
			return /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
		}
	},
	// 统一登录处理
	doLogin : function(){
		window.location.href = './login.html?redirect='+ encodeURIComponent(window.location.href);
	},
	goHome : function(){
		window.location.href = './index.html';
	}
};

module.exports = _mm;