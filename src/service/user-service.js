/*
* @Author: Wendy Shu
* @Date:   2017-07-05 09:15:02
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-06 16:05:25
*/

'use strict';

var _mm = require('util/mm.js');
var _user = {
	// 登出
	logout : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/logout.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	// 检查用户登录状态
	checkLogin : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	// 登录
	login : function(userInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
		});
	},
	checkUsername : function(username,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/check_valid.do'),
            data    : {
            	type : 'username',
            	str : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
		});
	},
	register : function(userInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
		});
	},
	getQuestion : function(username,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data    : {
            	username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
		});
	},
	checkAnswer : function(userInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
		});
	},
	resetPassword  : function(userInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
		});
	},
	getUserInfo : function(resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
		});
	},
	updateUserInfo : function(userInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
		});
	},
	updatePassword : function(userInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
		});
	}
};

module.exports = _user;