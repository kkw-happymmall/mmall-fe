/*
* @Author: Wendy Shu
* @Date:   2017-07-05 09:39:32
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-05 12:30:44
*/

'use strict';

var _mm = require('util/mm.js');
var _cart = {
	// 获取购物车数量
	getCartCount : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error : reject
		});
	}
};

module.exports = _cart; 