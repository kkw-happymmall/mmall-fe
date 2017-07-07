/*
* @Author: Wendy Shu
* @Date:   2017-07-06 21:52:26
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-07 16:07:19
*/

'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var Pagination = require('util/pagination/index.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
	data : {
		listParam : {
			keyword 	: _mm.getUrlParam('keyword') 	|| '',
			categoryId 	: _mm.getUrlParam('categoryId') || '',
			orderBy 	: _mm.getUrlParam('orderBy') 	|| 'default',
			pageNum 	: _mm.getUrlParam('pageNum') 	|| 1,
			pageSize 	: _mm.getUrlParam('orderBy') 	|| 20
		}
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadList();
	},
	bindEvent : function(){
		var _this = this;
		$('.sort-item').click(function(){
			var $this = $(this);
			_this.data.listParam.pageNum = 1;
			if ($this.data('type') === 'default') {
				if ($this.hasClass('active')) {
					return; 
				}
				else{
					$this.addClass('active').siblings('.sort-item')
						.removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			else if ($this.data('type') === 'price') {
					$this.addClass('active').siblings('.sort-item')
						.removeClass('active');
					if (!$this.hasClass('asc')) {
						$this.addClass('asc').removeClass('desc');
						_this.data.listParam.orderBy = 'price_asc';
					}else{
						$this.addClass('desc').removeClass('asc');
						_this.data.listParam.orderBy = 'price_desc';	
					}
			}
			_this.loadList();
		});
	},
	loadList : function(){
		var _this = this,
			listHtml = '',
			listParam = this.data.listParam,
			$pListCon   = $('.p-list-con');
	        $pListCon.html('<div class="loading"></div>');
			listParam.categoryId 
				? (delete listParam.keyword) : (delete listParam.categoryId);
		_product.getProductList(listParam,function(res){
			listHtml = _mm.renderHtml(templateIndex,{
				list : res.list
			});
			$('.p-list-con').html(listHtml);
			_this.loadPagination({
				hasPreviousPage 	: res.hasPreviousPage,
				hasPreviousPage 	: res.prePage,
				hasNextPage 		: res.hasNextPage,
				nextPage 			: res.nextPage,
				pages 				: res.pages,
				pageNum 			: res.pageNum
			});
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	loadPagination : function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
			container : $('.pagination'),
			onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
		}));
	}
};

$(function(){
	page.init();
});