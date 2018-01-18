'use strict';
var Hogan=require('hogan');
var conf={
	serverHost:'',
};
var _mm={
	request:function(param){
		var _this=this;
		$.ajax({
			type:param.method || 'get',
			url:param.url || '',
			dataType:param.type || 'json',
			data:param.data || '',
			success:function(res){
				if(0===res.status){
					typeof param.success==='function'&&param.success(res.data,res.msg)
				}else if(10===res.status){
					_this.doLogin();
				}else if(1===res.status){
					typeof param.error==='function'&&param.error(res.msg)
				}
			},
			error:function(err){
				typeof param.error==='function'&&param.error(res.msg)
			}
		})
	},
	//获取服务器地址
	getServerUrl:function(path){
		return conf.host + path;
	},
	//获取url参数
	getUrlParam:function(name){
		//happymmall.com/product/list?keyword=xxx
		var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
		var result=window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]):null;
	},
	//渲染html
	renderHtml:function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
			result=template.render(data);
		return result;
	},
	//成功提示
	successTips:function(msg){
		alert(msg || '操作成功')
	},
	//错误提示
	errorTips:function(msg){
		alert(msg || '哪里不对了')
	},
	//字段的验证，支持是否为空,手机，邮箱
	validate:function(value,type){
		var value=$.trim(value);
		//非空验证
		if('require'===type){
			return !!value;
		}
		//手机号验证
		if('phone'===type){
			return /^1\d{10}$/.test(phone);
		}
		//邮箱验证
		if('emall'===type){
			return /^(\w)+(\.\w+)+((\.\w{2,3}){1,3})$/.test(phone);
		}
	},
	//统一登入处理
	doLogin:function(){
		window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href);
	},
	goHome:function(){
		window.location.href='./index.html';
	}
}
module.exports=_mm;