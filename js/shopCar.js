var flag = false;
var num = 0;
if( $.cookie("itemNum") )
{	
	$.ajax({
		type: "post",
		url: "../json/item_list.json"
	}).done(function(data) {
		var cout = parseInt($.cookie("itemNum"));
		for( var i = 0 ; i < cout ; i++ )
		{
			var str = $.cookie($.cookie("userName") + "?" + i );
			if(str){
				str = str.split("?");
				var cid = parseInt(str[1]);
				var pid = parseInt(str[2]);
				var ind = parseInt(str[str.length-2]);
				var item_message = "";
				var imgSrc = data.result.itemList[cid].List[pid].details.itemType[ind].item_small_img[0].src;
			}
			else
			{
				continue;
			}
			if( str[0]  == "未下单" )
			{
				num++;
				$("#shopCar").append("<tr class='item-details item-details"+i+"' index='" + i + "'><td class='item-check'>"+
								"<input class='check' type='checkbox' />"+
								"</td>"+
								"<td class='item-name'>"+
								"<img class='left' src='" + imgSrc + "' />"+
								"<p class='left'>"+
								"<a></a>"+
								"</p>"+
								"<div class='clear'></div>"+
								"</td>"+
								"<td class='item-price'>"+
								"<p class='left'></p>"+
								"</td>"+
								"<td class='item-price-sum'><p></p></td>"+
								"<td class='item-num'>"+
								"<input class='itemNum-add' type='number' value='' />"+
								"</td>"+
								"<td class='item-elc'>"+
								"<p class='left'><a class='btn btn1' cout='" + i + "'>确认下单</a></p>"+
								"<p class='left'><a class='btn btn2' cout='" + i + "'>删除该条</a></p>"+
								"</td></tr>");
				for( var j = 3 ; j < str.length - 6 ; j++ )
				{
					item_message += str[j] + "&ensp;"; 
				}
				$("#shopCar").find(".item-details"+i).find(".item-name").find("p").find("a").html(item_message);
				$("#shopCar").find(".item-details"+i).find(".item-price").find("p").html(str[str.length - 6]);
				$("#shopCar").find(".item-details"+i).find(".item-num").find(".itemNum-add").val(str[str.length - 4]);
				var sumPrice = "¥" + parseInt(str[str.length-6].replace("¥","").replace(".00","")) * parseInt($("#shopCar").find(".item-details"+i).find(".item-num").find(".itemNum-add").val()) + ".00";
				$("#shopCar").find(".item-details"+i).find(".item-price-sum").find("p").html(sumPrice);
				$("#shopCar").find(".item-details"+i).find(".item-price-sum").attr("price",parseInt(str[str.length-6].replace("¥","").replace(".00","")) * parseInt($("#shopCar").find(".item-details"+i).find(".item-num").find(".itemNum-add").val()));
			}
		}
		if( num != 0 )
		{
			flag = true;
		}
		if( flag == false )
		{ 
			$("#shopCar").append("<td class='no-data' colspan='6'><span class='img'></span><span class='word'>您的购物车中还没有商品，快</span><a class='word a' href='soldMall.html'>选购</a><span class='word'>吧！</span></td>");
		}
	});
}
else
{
	$("#shopCar").append("<td class='no-data' colspan='6'><span class='img'></span><span class='word'>您的购物车中还没有商品，快</span><a class='word a' href='soldMall.html'>选购</a><span class='word'>吧！</span></td>");
}

setTimeout(function(){
	$(".item-elc .btn2").click(function(){
		$.cookie($.cookie("userName") + "?" + $(this).attr("cout"),"",{expires:-1,path:'/'});
		alert("成功删除该购物车商品！");
		window.location.reload();
	});
	$(".item-elc").find(".btn1").click(function(){
		var str = $.cookie($.cookie("userName") + "?" + $(this).attr("cout")).split("?");
		var d = new Date().toLocaleDateString();
		var t = new Date().toTimeString().split(" ")[0];
		d = d.split("/").join("-") + " " + t;
		str[0] = "待付款";
		str[str.length-1] = d;
		str[str.length-4] = $(this).parent().parent().parent().find(".itemNum-add").val();
		str[str.length-5] = "¥" + parseInt(str[str.length-6].replace("¥","").replace(".00","")) * parseInt($(this).parent().parent().parent().find(".itemNum-add").val()) + ".00";
		str = str.join("?");
		$.cookie($.cookie("userName") + "?" + $(this).attr("cout"),str,{expires:7,path:'/'});
		alert("下单成功！请前往我的订单进行查询！");
		window.location.reload();
	});
	var OneItem_price = 0;
	var past_priceSum = 0;
	var value = "";
	$(".itemNum-add").focus(function(){
		value = $(this).val();
		OneItem_price = parseInt($(this).parent().parent().find(".item-price p").html().replace("¥","").replace(".00",""));
		past_priceSum = OneItem_price * parseInt($(this).val());
	});
	$(".itemNum-add").blur(function(){
		var val = $(this).val();
		if( parseInt($(this).val()) >= 1 )
		{
			var new_value = parseInt($(this).val());
			if( new_value == value )
			{
				var new_priceSum = past_priceSum;
			}
			else
			{
				var new_priceSum = OneItem_price * new_value;
				var dis_price = new_priceSum - past_priceSum;
			}
			if( $(this).parent().parent().find(".check").prop("checked") == true )
			{
				$(this).parent().parent().find(".item-price-sum").attr("price",new_priceSum);
				$(this).parent().parent().find(".item-price-sum p").html("¥" + new_priceSum + ".00");
				new_priceSum = dis_price + parseInt($("#Allprice").attr("price"));
				$("#Allprice").attr("price",new_priceSum);
				$("#Allprice").html("¥" + $("#Allprice").attr("price") + ".00");
				$("#priceSum").html("¥" + $("#Allprice").attr("price") + ".00");
			}
			else
			{
				$(this).parent().parent().find(".item-price-sum").attr("price",new_priceSum);
				$(this).parent().parent().find(".item-price-sum p").html("¥" + new_priceSum + ".00");
			}
		}
		else
		{
			$(this).val(value);	
		}
	});
	var price_sum = 0;
	var pointNum = 0;
	$("#allCheck").click(function(){
		if(pointNum == 0)
		{
			price_sum = 0;
			for( var i = 0 ; i < $("#shopCar .check").length ; i++ )
			{
				price_sum += parseInt($("#shopCar .check").eq(i).parent().parent().find(".item-price-sum").attr("price"));
				if( $("#shopCar .check").eq(i).prop("checked") == false )
				{
					$("#shopCar .check").eq(i).prop("checked",true);
				}
			}
			$("#Allprice").attr("price",price_sum);
			$("#Allprice").html("¥" + $("#Allprice").attr("price") + ".00");
			$("#priceSum").html("¥" + $("#Allprice").attr("price") + ".00");
			pointNum++;
		}
		else
		{
			for( var i = 0 ; i < $("#shopCar .check").length ; i++ )
			{
				if( $("#shopCar .check").eq(i).prop("checked") == true )
				{
					$("#shopCar .check").eq(i).prop("checked",false);
				}
			}
			$("#Allprice").attr("price",0);
			$("#Allprice").html("¥" + $("#Allprice").attr("price") + ".00");
			$("#priceSum").html("¥" + $("#Allprice").attr("price") + ".00");
			pointNum = 0;
		}
	});
	$("#shopCar .check").click(function(){
		var item_price = 0;
		if( $(this).prop("checked") == true )
		{
			item_price = parseInt($(this).parent().parent().find(".item-price-sum").attr("price")) + parseInt($("#Allprice").attr("price"));
			$("#Allprice").attr("price",item_price);
			$("#Allprice").html("¥" + $("#Allprice").attr("price") + ".00");
			$("#priceSum").html("¥" + $("#Allprice").attr("price") + ".00");
		}
		else
		{
			item_price = parseInt($("#Allprice").attr("price")) - parseInt($(this).parent().parent().find(".item-price-sum").attr("price"));
			$("#Allprice").attr("price",item_price);
			$("#Allprice").html("¥" + $("#Allprice").attr("price") + ".00");
			$("#priceSum").html("¥" + $("#Allprice").attr("price") + ".00");
		}
	});
	$("#Settlement").click(function(){
		var flag = false;
		for( var i = 0 ; i < $("#shopCar").find(".item-details").length ; i++ )
		{
			if( $("#shopCar").find(".item-details").eq(i).find(".check").prop("checked") == true )
			{
				flag = true;
				var str = $.cookie($.cookie("userName") + "?" + $("#shopCar").find(".item-details").eq(i).attr("index")).split("?");
				var d = new Date().toLocaleDateString();
				var t = new Date().toTimeString().split(" ")[0];
				d = d.split("/").join("-") + " " + t;
				str[0] = "待付款";
				str[str.length-1] = d;
				str[str.length-4] = $("#shopCar").find(".item-details").eq(i).find(".itemNum-add").val();
				str[str.length-5] = "¥" + parseInt(str[str.length-6].replace("¥","").replace(".00","")) * parseInt($("#shopCar").find(".item-details").eq(i).find(".itemNum-add").val()) + ".00";
				str = str.join("?");
				$.cookie($.cookie("userName") + "?" + $("#shopCar").find(".item-details").eq(i).attr("index"),str,{expires:7,path:'/'});
			}
		}
		if(flag == false)
		{
			alert("请勾选至少一件商品！")
		}
		else
		{
			alert("下单成功！即将跳转请至我的订单！");
			window.location.href = "myOrder.html";
		}
	});
	setTimeout(function(){
		if( $.cookie("login") != "true" )
		{
			alert("请您先登录账户再进行选购!!");
			window.location.href = "login.html";
		}
	},500)
},100);


