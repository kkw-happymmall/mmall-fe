/*
* @Author: Wendy Shu
* @Date:   2017-07-04 11:08:09
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-05 19:49:33
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
// 表单里面的错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(errMsg){
		$('.error-item').hide().find('.err-msg').text('');
	}
};
// page 逻辑部分
var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;	
		// 登录按钮点击
		$('#submit').click(function(){
			_this.submit();
		});
		// 如果按下回车键，也提交表单
		$('.user-content').keyup(function(e){
			if (e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	// 提交表单，伪表单，因为没有form
	submit : function(){
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())
		},
		validateResult = this.formValidate(formData);
		if (validateResult.status) {
			// 成功，则提交
			_user.login(formData,function(res){
				// window.location.href = _mm.getUrlParam('redirect') || './index.html'; 
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			},function(errMsg){
				formError.show(errMsg);
			});
		}else{
			// 失败，则报错
			formError.show(validateResult.msg);
		}

	},
	// 表单字段验证
	formValidate : function(formData){
		var result = {
			status : false,
			msg : ''
		};
		if (!_mm.validate(formData.username,'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		// 输入没问题，数据验证通过
		result.status = true;
		result.msg = "验证通过";
		return result;
	}
};
$(function(){
	page.init();
});