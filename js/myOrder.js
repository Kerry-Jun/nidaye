var no_data_flag = false;
if($.cookie("itemNum"))
{
	var cout = parseInt($.cookie("itemNum"));
}
else
{
	$("#no-data").css("display","block");
}

$.ajax({
	type: "post",
	url: "../json/item_list.json"
}).done(function(data) {
	for( var i = 0 ; i < cout ; i++ )
	{
		var str = $.cookie($.cookie("userName") + "?" + i);
		if(str)
		{	
			str = str.split("?");
			var box = document.createElement("div");
			var cid = parseInt(str[1]);
			var pid = parseInt(str[2]);
			var ind = parseInt(str[str.length-2]);
			var item_message = "";
			var imgSrc = data.result.itemList[cid].List[pid].details.itemType[ind].item_small_img[0].src;
			box.setAttribute("class","item-list");
			if( $.cookie($.cookie("userName") + "?" + i ).split("?")[0] == "待付款" )
			{
				no_data_flag = true;
				$("#no-data").css("display","none");
				box.innerHTML = "<p class='list-head'>" +
								"<span class='key-name'>添加时间：</span>"+
								"<span class='info time'>" + str[str.length-1] + "</span>"+
								"<span class='key-name2'>订单号：</span>"+
								"<span class='info number'>" + str[str.length-3] + "</span>"+
								"</p>"+
								"<ul>"+
								"<li class='details'>"+
								"<img class='left' src='" + imgSrc + "' />"+
								"<p class='left'>"+
								"<a class='item-name' href='item.html?" + cid + "?" + pid + "'></a>"+
								"<span class='item-details'></span>"+
								"</p>"+
								"<div class='clear'></div>"+
								"</li>"+
								"<li class='price'>"+
								"<p>￥    1099</p>"+
								"</li>"+
								"<li class='state'>"+
								"<p class='item-state'>" + str[0] + "</p>"+
								"</li>"+
								"<li class='elc'>"+
								"<p class='p1'><a>立即付款</a></p>"+
								"<p><a class='del' cout='" + str[str.length-3] + "'>取消订单</a></p>"+
								"<p><a>查看详情</a></p>"+
								"</li>"+
								"<div class='clear'></div>"+
								"</ul>";
				$("#carList").prepend(box);
			}
			else if ( $.cookie($.cookie("userName") + "?" + i ).split("?")[0] == "已取消" )
			{
				no_data_flag = true;
				$("#no-data").css("display","none");
				box.innerHTML = "<p class='list-head'>" +
								"<span class='key-name'>添加时间：</span>"+
								"<span class='info time'>" + str[str.length-1] + "</span>"+
								"<span class='key-name2'>订单号：</span>"+
								"<span class='info number'>" + str[str.length-3] + "</span>"+
								"</p>"+
								"<ul>"+
								"<li class='details'>"+
								"<img class='left' src='" + imgSrc + "' />"+
								"<p class='left'>"+
								"<a class='item-name' href='item.html?" + cid + "?" + pid + "'></a>"+
								"<span class='item-details'></span>"+
								"</p>"+
								"<div class='clear'></div>"+
								"</li>"+
								"<li class='price'>"+
								"<p>￥    1099</p>"+
								"</li>"+
								"<li class='state'>"+
								"<p class='item-state'>" + str[0] + "</p>"+
								"</li>"+
								"<li class='elc'>"+
								"<p class='item-del'>订单已取消</p>"+
								"</li>"+
									"<div class='clear'></div>"+
								"</ul>";
				$("#carList").append(box);
			}
			else
			{
				no_data_flag = false;
			}
			for( var j = 3 ; j < str.length - 5 ; j++ )
			{
				item_message += str[j] + "&ensp;"; 
			}
			var span = str[str.length - 6] + "&nbsp;×&nbsp;" + str[str.length - 4] ;
			$(box).find(".item-name").html(item_message);
			$(box).find(".item-details").html(span);
			$(box).find(".price").find("p").html(str[str.length - 5]);	
		}
		else
		{
			continue;
		}
	}
});



setTimeout(function(){
	if(no_data_flag == false)
	{
		$("#no-data").css("display","block");
	}
	$("#carList").find(".del").click(function(){
		var str = $.cookie($.cookie("userName") + "?" + $(this).attr("cout"));
		str = str.split("?");
		str[0] = "已取消";
		str = str.join("?");
		$.cookie($.cookie("userName") + "?" + $(this).attr("cout"),str,{expires:7,path:'/'});
		window.location.reload();
	});
	setTimeout(function(){
		if( $.cookie("login") != "true" )
		{
			alert("请您先登录账户再进行选购!!");
			window.location.href = "login.html";
		}
	},500)
},100)