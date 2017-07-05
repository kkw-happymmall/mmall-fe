/*
* @Author: Wendy Shu
* @Date:   2017-07-05 14:03:12
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-05 14:31:28
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.'+ type + '-success');
	$element.show();
})