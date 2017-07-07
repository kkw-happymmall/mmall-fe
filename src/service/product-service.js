/*
* @Author: Wendy Shu
* @Date:   2017-07-06 22:05:27
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-07 16:09:26
*/

'use strict';

var _mm = require('util/mm.js');
var _product = {
	// 登出
	getProductList : function(listParam,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/product/list.do'),
			data: listParam,
			success : resolve,
			error : reject
		});
	},
	getProductDetail : function(productId,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/product/detail.do'),
			data: {
				productId : productId
			},
			success : resolve,
			error : reject
		});
	}
};

module.exports = _product;