/*
* @Author: Wendy Shu
* @Date:   2017-07-07 11:47:49
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-07 15:11:13
*/

'use strict';

require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');

var Pagination = function(){
	var _this  = this;
	this.defaultOption = {
		container  	 : null,
		pageNum		 : 1,
		pageRange 	 : 3,
		// 回调
		onSelectPage : null
	};

	$(document).on('click', '.pg-item', function(){
		var $this = $(this);
        // 对于active和disabled按钮点击，不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function' 
            ? _this.option.onSelectPage($this.data('value')) : null;
    });
};

// 原型集成的方法,渲染分页的方法
Pagination.prototype.render = function(userOption){
	//最后生成的东西要放在container中
	// 先将defaultOption和userOption合并在一起
	// 对一个空对象进行添加，现将defaultOption，再将userOption，这时候对后两项自身的内容不会有影响
	this.option = $.extend({},this.defaultOption,userOption);
	if (!(this.option.container instanceof jQuery)) {
		return;
	}
	// 判断分页是否只有一页
	if (this.option.pages <= 1) {
		return;
	}

	// 渲染分页内容
	this.option.container.html(this.getPaginationHtml());
}

// 获取分页的html
Pagination.prototype.getPaginationHtml = function(){
	var html 		= '',
		pageArray 	= [],
		option 		= this.option,
		star		= (option.pageNum - option.pageRange <=0) ? 1 : (option.pageNum - option.pageRange),
		end 		= (option.pageNum + option.pageRange > option.pages) ? option.pages : (option.pageNum + option.pageRange);
	// 上一页按钮的数据
	pageArray.push({
		name : '上一页',
		value : this.option.prePage,
		disabled : !this.option.hasPreviousPage
	});
	// 数字的按钮
	for(var i = star; i<=end;i++){
		pageArray.push({
			name 		: i,
			value 		: i,
			active 		: (i === option.pageNum)
		});
	};
	// 下一页按钮的数据
	pageArray.push({
		name : '下一页',
		value : this.option.nextPage,
		disabled : !this.option.hasNextPage
	});

	html = _mm.renderHtml(templatePagination,{
		pageArray :pageArray,
		pageNum : option.pageNum,
		pages : option.pages
	});

	return html;

}

module.exports = Pagination;