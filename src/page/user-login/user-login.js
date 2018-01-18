require('./user-login.css');
import navSide from 'page/commons/nav-simple/index.js';
import 'page/commons/footer/index.js';
import _user from 'service/user-service.js';
import _mm from 'util/mm.js';

//page逻辑部分
var formError={
	show:function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide:function(){
		$('.error-item').show().find('.err-msg').text('');
	}
};
//page 逻辑部分
var page={
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var _this=this;
		$('submit').click(function(){
			_this.submit();
		});
		$('.user-content').keyup(function(e){
			if(e.keyCode===13){
				_this.submit();
			}
		})
	},
	//提交表单
	submit:function(){
		var formData={
			username:$.trim($('#username').val()),
			password:$.trim($('#password').val()),
		}
		//表单验证结果
		validateResult=this.formValidate(formData);
		//验证成功
		if(validateResult.status){
			_user.login(formData,
				function(res){
					window.location.href=_mm.getUrlParam('redirect') || './index.html';
				},
				function(validateResult.msg){
					formError.show(validateResult.msg);
				}
			)
		}else{
			//formError.show(validateResult.msg);
		}
	},
	//表单的验证
	formValidate:function(formData){
		var result={
			status:false,
			msg:'',
		}
		if(!(_mm.validate(formData.username,'require'))){
			result.msg='用户名不能为空';
			return result;
		}
		if(!(_mm.validate(formData.password,'require'))){
			result.msg="密码不能为空";
			return result;
		}
		//通过验证，返回正确提示
		result.status=true;
		result.msg='验证通过';
		return result;
	}
}