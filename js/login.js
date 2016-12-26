$("#submit").click(function(){
	var name = $.cookie("userName");
	var pwd = $.cookie("pwd");
	if($("#username").val() == name )
	{
		if($("#password").val() == pwd )
		{
			if($("#checkbox").prop("checked") == true)
			{
				$.cookie("check","true",{expires:7,path:'/'});
			}
			$.cookie("login","true",{path:'/'})
			alert("登录成功！点击确认进入主页面！");
			window.location.href = "../index.html";
		}
		else
		{
			alert("密码错误！");
		}
	}
	else
	{
		alert("用户名或密码错误！");
	}
	return false;
})

$("#username").focus(function(){
	$(".p1 .iconfont").css("display","none");
	$(".p1 .word").html("");
	$(this).val("");
})

$("#password").focus(function(){
	$(".p2 .iconfont").css("display","none");
	$(".p2 .word").html("");
	$(this).val("");
})

$("#username").blur(function(){
	if(checkPhone() != false)
	{
		if($.cookie("userName"))
		{
			if($("#username").val() == $.cookie("userName"))
			{
				$(".p1 .right").css("display","block");
			}
			else
			{
				$(".p1 .fail").css("display","block");
				$(".p1 .word").html("手机号码未注册!");
			}
		}
		else
		{
			$(".p1 .right").css("display","block");
		}
	}
	else
	{
		$(".p1 .fail").css("display","block");
		$(".p1 .word").html("手机号码格式错误!");
	}
});
$("#password").blur(function(){
	if(checkPwd() != false)
	{
		$(".p2 .right").css("display","block");
	}
	else
	{
		$(".p2 .fail").css("display","block");
		$(".p2 .word").html("密码格式错误!");
	}
});


function checkPhone(){ 
    var phone = document.getElementById('username').value;
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
        return false; 
    } 
}
function checkPwd(){ 
    var pwd = document.getElementById('password').value;
    if(!(/^(?=[`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?\d]*[a-zA-Z]+)(?=[a-zA-Z`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?]*\d+)[`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?\w]{6,16}$/.test(pwd))){
        return false; 
    } 
}

window.onload = function (){
	if($.cookie("check") == "true" )
	{
		$("#username").val($.cookie("userName"));
		$("#password").val($.cookie("pwd"));
		$("#checkbox").prop("checked","true");
	}
}
