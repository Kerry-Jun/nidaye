

$.ajax({
	type: "post",
	url: "../json/item_list.json"
}).done(function(data) {
	var box = document.getElementById("box");
	var cid = window.location.href.split("?")[1];
	var pid = window.location.href.split("?")[2];
	var str = data.result.itemList[cid].List[pid].details;
	var span = document.createElement("span");
	span.innerHTML = str.name;
	$(".link").append(span);
	$(".main .right-box h1").html(str.name);
	if(str.itemType)
	{
		for(var i = 0 ; i < str.itemType.length ; i++ )
		{
			if(str.itemType[i].item_big_img)
			{
				var div = document.createElement("div");
				var ul = document.createElement("ul");
				ul.index = i;
				div.index = i;
				if( i == 0 )
				{
					div.setAttribute("class","Bpic-img Bpic-img"+i+" rel block");
					ul.setAttribute("class","block");
				}
				else
				{
					div.setAttribute("class","Bpic-img Bpic-img"+i+" rel");
				}
				$(".Bpic").append(div);
				$(".Spic").append(ul);
				for( var j = 0 ; j < str.itemType[i].item_big_img.length ; j++ )
				{
					var img = document.createElement("img");
					var li = document.createElement("li");
					li.index = j;
					img.setAttribute("src",str.itemType[i].item_big_img[j].src);
					img.index = j;
					if( j == 0 )
					{
						img.setAttribute("class","abs block");
						li.innerHTML = "<a class='border'><img src='" + str.itemType[i].item_small_img[j].src + "'/></a>"
					}
					else
					{
						img.setAttribute("class","abs");
						li.innerHTML = "<a><img src='" + str.itemType[i].item_small_img[j].src + "'/></a>"
					}
					$(div).append(img);
					$(ul).append(li);
				}
			}
		}
	}
	
	if(str.describe) {
		box.innerHTML += "<p class='red'>" + str.describe + "</p>";
	}
	if(str.price) {
		box.innerHTML += "<p class='p'>价&ensp;&ensp;&ensp;&ensp;格：<span id='showPrice' class='price' price='"+str.price+"'> ¥ " + str.price + ".00</span></p>"
	} else {
		box.innerHTML += "<p class='p'>价&ensp;&ensp;&ensp;&ensp;格：<span class='price'> ¥ ----</span></p>"
	}
	if(str.net) {
		box.innerHTML += "<p class='net'><span class='span left'>网络类型：</span></p>";
		for(var i = 0; i < str.net.length; i++) {
			var a = document.createElement("a");
			if(str.net[i].has == 0) {
				a.setAttribute("class", "radius dash");
			} else {
				a.setAttribute("class", "radius");
			}
			if(i == 0)
			{
				$(a).addClass("pointer");
			}
			a.innerHTML = str.net[i].type;
			$(".net").append(a);
		}
	}
	if(str.itemType) {
		if(str.itemType[0].type_name)
		{
			box.innerHTML += "<p class='color'><span class='span left'>" + str.itemType[0].type_name + "：</span></p>";
			for(var i = 0; i < str.itemType.length; i++) {
				var a = document.createElement("a");
				a.setAttribute("index",i);
				if(str.itemType[i].has == 0) {
					a.setAttribute("class", "radius dash");
				} else {
					a.setAttribute("class", "Cpoint radius");
				}
				if(i == 0)
				{
					$(a).addClass("pointer");
				}
				if(str.itemType[i].img_src)
				{
					a.innerHTML = "<img src='" + str.itemType[i].img_src + "' /><span>" + str.itemType[i].type + "</span>";
				}
				else
				{
					a.innerHTML = str.itemType[i].type;
				}
				$(".color").append(a);
			}
		}
	}
	if(str.version) {
		box.innerHTML += "<p class='version'><span class='span left'>" + str.version[0].type_name + "：</span></p>";
		for(var i = 0; i < str.version.length; i++) {
			var a = document.createElement("a");
			a.setAttribute("price", str.version[i].price);
			if(str.version[i].has == 0) {
				a.setAttribute("class", "radius dash");
			} else {
				a.setAttribute("class", "Rpoint radius");
			}
			if(i == 0)
			{
				$(a).addClass("pointer");
			}
			a.innerHTML = str.version[i].type;
			$(".version").append(a);
		}
	}
	if(str.package) {
		box.innerHTML += "<p class='package'><span class='span left'>套&ensp;&ensp;&ensp;&ensp;餐：</span></p>";
		for(var i = 0; i < str.package.length; i++) {
			var a = document.createElement("a");
			if(str.package[i].has == 0) {
				a.setAttribute("class", "radius dash");
			} else {
				a.setAttribute("class", "Ppoint radius");
			}
			a.innerHTML = str.package[i].type;
			$(".package").append(a);
		}
	}
	box.innerHTML += "<p class='line'></p>";
	if(str.support) {
		box.innerHTML += "<p class='support'><span class='span left'>支&ensp;&ensp;&ensp;&ensp;持：</span></p>";
		for(var i = 0; i < str.support.length; i++) {
			if(str.support[i].point == 0) {
				var a = document.createElement("span");
				a.setAttribute("class", "sup nopoint");
			} else {
				var a = document.createElement("a");
				a.setAttribute("class", "sup");
			}
			a.innerHTML = "<i class='icon'></i>" + str.support[i].type;
			$(".support").append(a);
		}
	}
	box.innerHTML += "<p><span class='span left'>配送&ensp;&ensp;至：</span><a class='radius'>北京&ensp;&ensp;北京</a></p><p class='ser'><span class='span left'>服&ensp;&ensp;&ensp;&ensp;务：</span>本商品由 魅族 负责发货 ，并由 魅族 提供售后服务</p>";
	if(str.more) {
		var p = document.createElement("p");
		p.setAttribute("class", "more");
		p.innerHTML = "<span class='span left'>还可以看：</span>";
		$(".main .right-box").append(p);
		for(var i = 0; i < str.more.length; i++) {
			var a = document.createElement("a");
			a.setAttribute("class", "item");
			a.setAttribute("href", "item.html?" + str.more[i].cid + "?" +　str.more[i].pid);
			a.innerHTML = "<img src='" + str.more[i].img_src + "'></i>" + str.more[i].describe;
			$(".more").append(a);
		}
	}
	var cout = 0;
	if(str.item_details) {
		var a = document.createElement("a");
		a.setAttribute("class", "details point1 active");
		/*a.setAttribute("href","#item_details");*/
		a.innerHTML = "商品详情";
		a.index = cout;
		cout++;
		$(".details-box").append(a);
	}
	if(str.parameter) {
		var a = document.createElement("a");
		a.setAttribute("class", "details point2");
		a.innerHTML = "规格参数";
		a.index = cout;
		cout++;
		$(".details-box").append(a);
	}
	if(str.FAQ) {
		var a = document.createElement("a");
		a.setAttribute("class", "details point3");
		a.innerHTML = "常见问题";
		a.index = cout;
		cout++;
		$(".details-box").append(a);
	}
	if(str.item_details) {
		for(var i = 0; i < str.item_details.length; i++) {
			var img = document.createElement("img");
			img.setAttribute("src", str.item_details[i].img_src);
			$(".item_details").append(img);
		}
	}
	if(str.parameter)
	{
		if(str.parameter.main_info)
		{
			var tr = document.createElement("tr");
			tr.innerHTML = "<th class='head-line' colspan='2'>基础信息</th>";
			$(".parameter table").append(tr);
			for( var i = 0 ; i < str.parameter.main_info.length ; i++ )
			{
				var tr = document.createElement("tr");
				tr.innerHTML = "<th>" + str.parameter.main_info[i].info.split("#")[0] + "</th><td>" + str.parameter.main_info[i].info.split("#")[1] + "</td>";
				$(".parameter table").append(tr);
			}
		}
		if(str.parameter.screen)
		{
			var tr = document.createElement("tr");
			tr.innerHTML = "<th class='head-line' colspan='2'>屏幕</th>";
			$(".parameter table").append(tr);
			for( var i = 0 ; i < str.parameter.screen.length ; i++ )
			{
				var tr = document.createElement("tr");
				tr.innerHTML = "<th>" + str.parameter.screen[i].info.split("#")[0] + "</th><td>" + str.parameter.screen[i].info.split("#")[1] + "</td>";
				$(".parameter table").append(tr);
			}
		}
		if(str.parameter.ram)
		{
			var tr = document.createElement("tr");
			tr.innerHTML = "<th class='head-line' colspan='2'>容量</th>";
			$(".parameter table").append(tr);
			var tr = document.createElement("tr");
			tr.innerHTML = "<th>" + str.parameter.ram.split("#")[0] + "</th><td>" + str.parameter.ram.split("#")[1] + "</td>";
			$(".parameter table").append(tr);
		}
		if(str.parameter.processor)
		{
			var tr = document.createElement("tr");
			tr.innerHTML = "<th class='head-line' colspan='2'>处理器</th>";
			$(".parameter table").append(tr);
			for( var i = 0 ; i < str.parameter.processor.length ; i++ )
			{
				var tr = document.createElement("tr");
				tr.innerHTML = "<th>" + str.parameter.processor[i].info.split("#")[0] + "</th><td>" + str.parameter.processor[i].info.split("#")[1] + "</td>";
				$(".parameter table").append(tr);
			}
		}
		if(str.parameter.net)
		{
			var tr = document.createElement("tr");
			tr.innerHTML = "<th class='head-line' colspan='2'>网络</th>";
			$(".parameter table").append(tr);
			var tr = document.createElement("tr");
			tr.innerHTML = "<th>" + str.parameter.net.split("#")[0] + "</th><td>" + str.parameter.net.split("#")[1] + "</td>";
			$(".parameter table").append(tr);
		}
		if(str.parameter.Camera)
		{
			var tr = document.createElement("tr");
			tr.innerHTML = "<th class='head-line' colspan='2'>摄像</th>";
			$(".parameter table").append(tr);
			for( var i = 0 ; i < str.parameter.Camera.length ; i++ )
			{
				var tr = document.createElement("tr");
				tr.innerHTML = "<th>" + str.parameter.Camera[i].info.split("#")[0] + "</th><td>" + str.parameter.Camera[i].info.split("#")[1] + "</td>";
				$(".parameter table").append(tr);
			}
		}
		if(str.parameter.system)
		{
			var tr = document.createElement("tr");
			tr.innerHTML = "<th class='head-line' colspan='2'>系统与应用</th>";
			$(".parameter table").append(tr);
			var tr = document.createElement("tr");
			tr.innerHTML = "<th>" + str.parameter.system.split("#")[0] + "</th><td>" + str.parameter.system.split("#")[1] + "</td>";
			$(".parameter table").append(tr);
		}
		if(str.parameter.sound)
		{
			var tr = document.createElement("tr");
			tr.innerHTML = "<th class='head-line' colspan='2'>音质参数</th>";
			$(".parameter table").append(tr);
			var tr = document.createElement("tr");
			tr.innerHTML = "<th>" + str.parameter.sound.split("#")[0] + "</th><td>" + str.parameter.sound.split("#")[1] + "</td>";
			$(".parameter table").append(tr);
		}
		if(str.parameter.elc)
		{
			var tr = document.createElement("tr");
			tr.innerHTML = "<th class='head-line' colspan='2'>" + str.parameter.elc[0].type_name + "</th>";
			$(".parameter table").append(tr);
			for(var i = 0 ; i < str.parameter.elc.length ; i++ )
			{
				var tr = document.createElement("tr");
				tr.innerHTML = "<th>" + str.parameter.elc[i].inc.split("#")[0] + "</th><td>" + str.parameter.elc[i].inc.split("#")[1] + "</td>";
				$(".parameter table").append(tr);
			}
		}
		if(str.parameter.include)
		{
			var tr = document.createElement("tr");
			tr.innerHTML = "<th class='head-line' colspan='2'>包装清单</th>";
			$(".parameter table").append(tr);
			var tr = document.createElement("tr");
			tr.innerHTML = "<th rowspan='" + str.parameter.include.length + "'>包装清单</th><td><ul></ul></td>";
			$(".parameter table").append(tr);
			for( var i = 0 ; i < str.parameter.include.length ; i++ )
			{
				var li = document.createElement("li");
				li.innerHTML = str.parameter.include[i].inc;
				$(".parameter table ul").append(li);
			}
		}
		if(str.FAQ)
		{
			for( var i = 0 ; i < str.FAQ.length ; i++ )
			{
				var dl = document.createElement("dl");
				if( i == 0 )
				{
					dl.setAttribute("class","first");
				}
				dl.innerHTML =	"<p class='rel p1'><span class='abs Q'></span><span class='rel'>" + str.FAQ[i].Q + "</span></p>"+
								"<p class='rel p2'><span class='abs A'></span><span class='rel'>" + str.FAQ[i].A + "</span></p><div class='clear'></div>";
				$(".FAQ").append(dl);
			}
		}
	}
})


$(window).scroll(function(){  
	var num = 0;
    /*var height = document.body.scrollHeight || document.documentElement.scrollHeight;  
    var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;*/
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if( $(".fix-box").is(":visible") && scrollTop < 200 )
    {
	    $(".fix-box").stop().animate({
	    	"top":-80
	    },500);
	    setTimeout(function(){
        	$(".fix-box").css("display","none");
	    },500);
    }
    if( $(".fix-box").is(":hidden") && scrollTop >= 200 )
    {
        $(".fix-box").css("display","block");
	    $(".fix-box").animate({
	    	"top":0
	    },500);
    }
    if( $("#hidden").is(":hidden") && scrollTop >= 800 )
    {
        $("#hidden").css("display","block");
	    $(".fix-box .abs").animate({
	    	"right":0
	    },500);
    }
    if( $("#hidden").is(":visible") && scrollTop < 800 )
    {
        $("#hidden").css("display","none");
	    $(".fix-box .abs").animate({
	    	"right":-130
	    },500);
    }
    if( scrollTop >= 1300 )
    {
        $("#left").css("display","block");
    }
    if( scrollTop < 1300 )
    {
        $("#left").css("display","none");
    }
});







setTimeout(function() {
	$(".details").click(function() {
		$(".details").removeClass("active");
		$("#left a").removeClass("pointer");
		$("#left a").eq(this.index).addClass("pointer");
		$(".details").eq(this.index).addClass("active");
		$(".details-page").removeClass("block");
		$(".details-page").eq(this.index).addClass("block");
	});
	$(".Spic ul li").click(function(){
		$(".Spic").find("ul").eq(this.parentNode.index).find("a").removeClass("border");
		$(this).find("a").addClass("border");
		$(".Bpic-img").eq(this.parentNode.index).find("img").fadeOut(200);
		$(".Bpic-img").eq(this.parentNode.index).find("img").eq(this.index).fadeIn(200);
	});
	$(".color .Cpoint").click(function(){
		var num = this.getAttribute("index");
		$(".color .radius").removeClass("pointer");
		$(this).addClass("pointer");
		$(".Bpic-img").removeClass("block");
		$(".Spic ul").removeClass("block");
		$(".Bpic-img").eq(num).addClass("block");
		$(".Spic ul").eq(num).addClass("block");
		add();
	});
	$(".version .Rpoint").click(function(){
		$(".version .Rpoint").removeClass("pointer");
		$(this).addClass("pointer");
		$(".p .price").html(" ¥ "+this.getAttribute("price")+".00");
		add();
	});
	$(".package .Ppoint").click(function(){
		$(".package .Ppoint").removeClass("pointer");
		$(this).addClass("pointer");
		$(".warning").css("display","none");
		add();
	});
	$(".buy .add").click(function(){
		var sum = parseInt($(".buy input").val());
		sum++;
		$(".buy input").val(sum);
		add();
	});
	$(".buy .sub").click(function(){
		var sum = parseInt($(".buy input").val());
		if(sum > 1)
		{
			sum--;
			$(".buy input").val(sum);
			add();
		}
	});
	
	add();
	addA();
	$("#left a").click(function(){
		$('html, body').animate({scrollTop: $(".details-box").offset().top - 100 }, 400);
		/*$('html, body').animate({scrollTop: $(this.hash).offset().top}, 400);*/
		/*284行*/
		/*翻译一下：点击的时候，首先阻止了默认行为，*/
		/*  然后让html,和body滚动动画，*/
		/*  滚动到离顶部的距离为目标的offset().top的距离，*/
		/* 在4毫秒内完成。*/
		/*hash 属性是一个可读可写的字符串，*/
		/*该字符串是 URL 的锚部分（从 # 号开始的部分），*/
		/*所以this.hash是指当前的地址的#部分。*/
		/*$("body,html").scrollTop(660);*/
		$("#left a").removeClass("pointer");
		$(this).addClass("pointer");
		$(".details").removeClass("active");
		$(".details").eq(this.index).addClass("active");
		$(".details-page").removeClass("block");
		$(".details-page").eq(this.index).addClass("block");
	});
	$("#buy").click(function(){
		$('html, body').animate({scrollTop:100}, 400);
	});
	$("#buy-item").click(function(){
		if( $.cookie("login") == "true" )
		{
			var cout = 0;
			if($.cookie("itemNum"))
			{
				cout = parseInt($.cookie("itemNum"));
			}
			if($(".info p").hasClass("package"))
			{
				if(!$(".package .Ppoint").hasClass("pointer"))
				{
					$(".warning").css("display","block");
				}
				else
				{
					var str = setItemInfo(cout);
					changeItemInfo(str,cout);
				}
			}
			else
			{
				var str = setItemInfo(cout);
				changeItemInfo(str,cout);
			}
			alert("下单成功!即将跳转到我的订单页面!");
			window.location.href = "myOrder.html";
		}
		else
		{
			alert("请您先登录账户再进行选购!!");
			window.location.href = "login.html";
		}
	});
	$("#toShopCar").click(function(){
		if( $.cookie("login") == "true" )
		{
			var cout = 0;
			if($.cookie("itemNum"))
			{
				cout = parseInt($.cookie("itemNum"));
			}
			if($(".info p").hasClass("package"))
			{
				if(!$(".package .Ppoint").hasClass("pointer"))
				{
					$(".warning").css("display","block");
				}
				else
				{
					var str = setItemInfo2(cout);
					changeItemInfo(str,cout);
				}
			}
			else
			{
				var str = setItemInfo2(cout);
				changeItemInfo(str,cout);
			}
			alert("添加成功!该商品已加入购物车!");
		}
		else
		{
			alert("请您先登录账户再进行选购!!");
			window.location.href = "login.html";
		}
	});
	$(".Bpic").find("img").click(function(){
		var img_src = $(this).attr("src");
		$("#moveDiv").css("display","block");
		$("#magnifier").css("display","block");
		$("#magnifier").find(".Bimg").css("background","url("+img_src+") no-repeat");
	})
	$(".Bpic").mouseenter(function(ev){
		var ev = ev || event;
		$(".Bpic").mousemove(function(ev){
			var left = ev.pageX - $(this).offset().left-50;
			var top = ev.pageY - $(this).offset().top-50;
			var disCout = $(this).width()/$("#magnifier").width();
			var Bleft = left * disCout;
			var Btop = top * disCout;
			if( left <= 0 )
			{
				left = 0;
				Bleft = left * disCout;
			}
			if( left > 280 )
			{
				left = 280;
				Bleft = left * disCout;
			}
			if( top <= 0 )
			{
				top = 0;
			}
			if( top > 280 )
			{
				top = 280;
			}
			$("#moveDiv").css("top",top);
			$("#moveDiv").css("left",left);
			$("#magnifier").find(".Bimg").css("background-position-x",-Bleft);
			$("#magnifier").find(".Bimg").css("background-position-y",-Btop);
			
			})
	});
	$(".Bpic").mouseleave(function(){
		$("#moveDiv").css("display","none");
		$("#magnifier").css("display","none");
	})
}, 150);


function add(num){
		$(".item_name").html($("h1").html());
		if($(".version a").hasClass("pointer"))
		{
			$(".item_price").html("¥"+(parseInt($(".version .pointer").attr("price"))*parseInt($("#item-num").val()))+".00");
		}
		else
		{
			$(".item_price").html("¥"+(parseInt($("#showPrice").attr("price"))*parseInt($("#item-num").val()))+".00");
		}
		if($(".net a").hasClass("pointer"))
		{
			$(".item_net").html($(".net .pointer").html());	
		}
		if($(".color a").hasClass("pointer"))
		{
			$(".item_color").html($(".color .pointer span").html());	
		}
		if($(".version a").hasClass("pointer"))
		{
			$(".item_version").html($(".version .pointer").html());	
		}
		if($(".package a").hasClass("pointer"))
		{
			$(".item_package").html($(".package .pointer").html());	
		}
	}
	function addA(){
		if($(".details-box").find("a").hasClass("point1"))
		{
			var a = document.createElement("a");
			a.setAttribute("class","item_details pointer");
			a.innerHTML = "商品详情";
			a.index = 0;
			$("#left").append(a);
		}
		if($(".details-box").find("a").hasClass("point2"))
		{
			var a = document.createElement("a");
			a.setAttribute("class","parameter");
			a.innerHTML = "规格参数";
			a.index = 1;
			$("#left").append(a);
		}
		if($(".details-box").find("a").hasClass("point3"))
		{
			var a = document.createElement("a");
			a.setAttribute("class","FAQ");
			a.innerHTML = "常见问题";
			a.index = 2;
			$("#left").append(a);
		}
	}
	
function setItemInfo(cout){
	var ind = $("#box .color .pointer").attr("index");
	var cid = window.location.href.split("?")[1];
	var pid = window.location.href.split("?")[2];
	var str = "待付款?" + cid + "?" + pid + "?" + $("#fixed").find(".item_name").html();
	var d = new Date().toLocaleDateString();
	d = d.replace(/\//gi,"-");
	var t = new Date().toTimeString().split(" ")[0];
	d = d + " " + t;
	if($("#box").find("p").hasClass("net"))
	{
		str += "?" + $("#fixed").find(".item_net").html();
	}
	if($("#box").find("p").hasClass("color"))
	{
		str += "?" + $("#fixed").find(".item_color").html();
	}
	if($("#box").find("p").hasClass("version"))
	{
		var showPrice = $("#box").find(".version").find(".pointer").attr("price");
		str += "?" + $("#fixed").find(".item_version").html();
	}
	else
	{
		var showPrice = $("#showPrice").attr("price")
	}
	if($("#box").find("p").hasClass("package"))
	{
		str += "?" + $("#fixed").find(".item_package").html();
	}
	str += "?¥" + showPrice + ".00?" + $("#fixed").find(".item_price").html() + "?" + $("#item-num").val() + "?" + cout + "?" + ind + "?" + d ;
	cout++;
	return str;
}
function setItemInfo2(cout){
	var ind = $("#box .color .pointer").attr("index");
	var cid = window.location.href.split("?")[1];
	var pid = window.location.href.split("?")[2];
	var str = "未下单?" + cid + "?" + pid + "?" + $("#fixed").find(".item_name").html();
	var d = new Date().toLocaleDateString();
	d = d.replace(/\//gi,"-");
	var t = new Date().toTimeString().split(" ")[0];
	d = d + " " + t;
	if($("#box").find("p").hasClass("net"))
	{
		str += "?" + $("#fixed").find(".item_net").html();
	}
	if($("#box").find("p").hasClass("color"))
	{
		str += "?" + $("#fixed").find(".item_color").html();
	}
	if($("#box").find("p").hasClass("version"))
	{
		var showPrice = $("#box").find(".version").find(".pointer").attr("price");
		str += "?" + $("#fixed").find(".item_version").html();
	}
	else
	{
		var showPrice = $("#showPrice").attr("price")
	}
	if($("#box").find("p").hasClass("package"))
	{
		str += "?" + $("#fixed").find(".item_package").html();
	}
	str += "?¥" + showPrice + ".00?" + $("#fixed").find(".item_price").html() + "?" + $("#item-num").val() + "?" + cout + "?" + ind + "?" + d ;
	cout++;
	return str;
}
function changeItemInfo(str,cout){
	var flag = false;
				if($.cookie("itemNum"))
				{
					str = str.split("?");
					for(var i = 0 ; i < cout ; i++ )
					{
						if($.cookie($.cookie("userName") + "?" + i ))
						{
							var value = $.cookie($.cookie("userName") + "?" + i ).split("?");
							var Number = value[value.length-3];
							for( var j = 0 ; j < value.length - 5 ; j++ )
							{
								if(value[j] == str[j])
								{ 
									flag = true;
									continue;
								}
								else
								{
									flag = false;
									break;
								}
							}
							if( flag == true )
							{
								var sum = parseInt(value[value.length-4]) + parseInt(str[str.length-4]);
								if($("#box p").hasClass("version"))
								{
									var changePrice = "¥"+(parseInt($(".version .pointer").attr("price"))*sum)+".00";
								}
								else 
								{
									var changePrice = "¥"+(parseInt($("#box").find(".p").find(".price").attr("price"))*sum)+".00";
								}
								str[str.length-3] = Number;
								str[str.length-4] = sum;
								str[str.length-5] = changePrice;
								str = str.join("?");
								$.cookie($.cookie("userName") + "?" + Number,str,{expires:7,path:'/'});
							}
						}
					}
					if(flag == false)
					{
						str = str.join("?");
						$.cookie($.cookie("userName") + "?" + cout,str,{expires:7,path:'/'});
						cout++;
						$.cookie($.cookie("itemNum",cout));
					}
				}
				else
				{
					$.cookie($.cookie("userName") + "?" + cout,str,{expires:7,path:'/'});
					cout++;
					$.cookie("itemNum",cout);
				}
};

