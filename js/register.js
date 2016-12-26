
var flag1 = false;
var flag2 = false;
var flag3 = false;
var flag4 = false;

$(".point").click(function(){
	var num ="";
	for(var i = 0 ; i < 6 ; i++){
		num += Math.floor(Math.random()*10) + "";
	}
	$(this).html(num);
});

$("#phone").focus(function(){
	this.value = "";
	$(".p1 .iconfont").css("display","none");
	$(".p1 .word").html("");
});
$("#pwd").focus(function(){
	this.value = "";
	$(".p2 .iconfont").css("display","none");
	$(".p2 .word").html("");
});
$("#pwdSure").focus(function(){
	this.value = "";
	$(".p3 .iconfont").css("display","none");
	$(".p3 .word").html("");
});
$("#checkword").focus(function(){
	this.value = "";
	$(".p4 .iconfont").css("display","none");
	$(".p4 .word").html("");
});

$("#phone").blur(function(){
	if(checkPhone() != false)
	{
		if($.cookie("userName"))
		{
			if( $("#phone").val() == $.cookie("userName") )
			{
				$(".p1 .fail").css("display","block");
				$(".p1 .word").html("手机号码已注册!")
			}
			else
			{
				$(".p1 .right").css("display","block");
				flag1 = true;
			}
		}
		else
		{
			$(".p1 .right").css("display","block");
			flag1 = true;
		}
	}
	else
	{
		$(".p1 .fail").css("display","block");
		$(".p1 .word").html("手机号码格式错误!");
		flag1 = false;
	}
});
$("#pwd").blur(function(){
	if(checkPwd() != false)
	{
		$(".p2 .right").css("display","block");
		flag2 = true;
	}
	else
	{
		$(".p2 .fail").css("display","block");
		$(".p2 .word").html("密码格式错误!");
		flag2 = false;
	}
});
$("#pwdSure").blur(function(){
	if($("#pwdSure").val() != $("#pwd").val() || $("#pwdSure").val() == "" )
	{
		$(".p3 .fail").css("display","block");
		$(".p3 .word").html("确认密码错误!");
		flag3 = false;
	}
	else
	{
		$(".p3 .right").css("display","block");
		flag3 = true;
	}
});

$("#checkword").blur(function(){
	if($("#checkNum").html() == "获取验证码" )
	{
		$(".p4 .fail").css("display","block");
		$(".p4 .word").html("请获取验证码!");
		flag4 = false;
	}
	else if( parseInt($("#checkNum").html()) == parseInt($("#checkword").val()))
	{
		$(".p4 .right").css("display","block");
		flag4 = true;
	}
	else
	{
		$(".p4 .fail").css("display","block");
		$(".p4 .word").html("请输入正确的验证码!");
		flag4 = false;
	}
});


$("#submit").click(function(){
	if( flag1 == true && flag2 == true && flag3 == true && flag4 == true && $("#checkbox").prop("checked") == true )
	{
		var name = $("#phone").val();
		var pwd = $("#pwd").val();
		$.cookie("userName",name,{expires:7,path:'/'});
		$.cookie("pwd",pwd,{expires:7,path:'/'});
		alert("注册成功！点击确定跳转至登录界面！");
		window.location.href = "login.html";
	}
	else if( $("#checkbox").prop("checked") == false )
	{
		alert("请勾选用户条款！")
	}
	else
	{
		alert("请将信息全部填写正确！")
	}
	return false;
});



function checkPhone(){ 
    var phone = document.getElementById('phone').value;
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
        return false; 
    } 
}
function checkPwd(){ 
    var pwd = document.getElementById('pwd').value;
    if(!(/^(?=[`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?\d]*[a-zA-Z]+)(?=[a-zA-Z`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?]*\d+)[`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?\w]{6,16}$/.test(pwd))){
        return false; 
    } 
}
function checkCheckWord(){
	var checkword = document.getElementById('checkword').value;
	var checkNum = document.getElementById('checkNum').value;
	if( checkword != checkNum )
	{
		return false;
	}
}
