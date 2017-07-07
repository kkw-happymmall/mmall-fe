/*
* @Author: Wendy Shu
* @Date:   2017-07-04 11:07:50
* @Last Modified by:   Wendy Shu
* @Last Modified time: 2017-07-06 21:38:00
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var templateBanner = require('./banner.string');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');


$(function() {
	// 这里是渲染banner
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider = $('.banner').unslider({
    	dots: true,
    	keys: true, 
    });
    // 前一张、后一张的点击事件
    $('.banner-con .banner-arrow').click(function(){
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();
    })
});

