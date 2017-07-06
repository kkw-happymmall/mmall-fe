/*
* @Author: Wendy Shu
* @Date:   2017-07-05 22:52:52
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-06 10:30:37
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
	data : {
		username : '',
		question : '',
		answer : '',
		token : ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		var _this = this;	
		// 第一步“下一步”按钮点击
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			// 用户名存在
			if (username) {
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				},function(errMsg){
					formError.show(errMsg);
				});
			// 用户名不存在
			}else{
				formError.show('请输入用户名');
			}
		});
		// 第二步“下一步”按钮点击
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			// 答案存在
			if (answer) {
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer : answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				},function(errMsg){
					formError.show(errMsg);
				});
			// 用户名不存在
			}else{
				formError.show('请输入密码提示问题的答案');
			}
		});
		// 第三步“下一步”按钮点击
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			// 答案存在
			if (password && password.length >= 6) {
				_user.resetPassword({
					username : _this.data.username,
					passwordNew : password,
					forgetToken : _this.data.token
				},function(res){
					window.location.href = './result.html?type=pass-reset'
				},function(errMsg){
					formError.show(errMsg);
				});
			// 密码为空
			}else{
				formError.show('请输入不少于6位新密码');
			}
		});
	},
	loadStepUsername : function(){
		$('.step-username').show();
	},
	loadStepQuestion : function(){
		formError.hide();
		$('.step-username').hide()
			.siblings('.step-question').show()
			.find('#question').text(this.data.question);
	},
	loadStepPassword : function(){
		formError.hide();
		$('.step-question').hide()
			.siblings('.step-password').show();
	}
};
$(function(){
	page.init();
});