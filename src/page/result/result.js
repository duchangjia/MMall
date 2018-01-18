'use strict';
require('./result.css');
import navSide from 'page/commons/nav-simple/index.js';
import 'page/commons/footer/index.js';
import _mm from 'util/mm.js';

console.log($)
$(function(){
	var type=_mm.getUrlParam('type') || 'default', $element=$('.'+type+'-success');
	$element.show();
})