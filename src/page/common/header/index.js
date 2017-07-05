/*
* @Author: Wendy Shu
* @Date:   2017-07-05 10:10:31
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-05 10:53:20
*/

'use strict';

require('./index.css');
var _mm = require('util/mm.js');
var header = {
	init : function(){
		this.bindEvent();
	},
	onload : function(){
		var keyword = _mm.getUrlParam('keyword');
		if (keyword) {
			$('#search-input').val(keyword);
		};
	},
	bindEvent : function(){
		var _this = this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		// 输入回车键之后，也要做绑定事件
		$('#search-input').keyup(function(e){
			// 回车键的keyCode为13
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	},
	// 搜索提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		if (keyword) {
			window.location.href = './list.html?keyword='+ keyword;
		}else{
			_mm.goHome();
		}
	}
};

header.init();
