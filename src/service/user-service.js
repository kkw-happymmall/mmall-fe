/*
* @Author: Wendy Shu
* @Date:   2017-07-05 09:15:02
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-05 12:31:02
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
	}
};

module.exports = _user;