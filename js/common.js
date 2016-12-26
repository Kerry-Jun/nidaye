$.ajax({
	type: "post",
	url: "../json/nav_menu.json"
}).done(function(data) {
	var list = data.result;
	for(var i = 0; i < list.pro.length; i++) {
		var li = document.createElement("li");
		if(list.pro[i].del) {
			li.innerHTML = "<a href='item.html?" + list.pro[i].cid + "?" + list.pro[i].pid + "'>" +
				"<p><img src='" + list.pro[i].img_src + "' /></p>" +
				"<p>" + list.pro[i].name + "</p>" +
				"<p><del>¥" + list.pro[i].del + "</del><span class='red'>¥</span><span class='price'>" + list.pro[i].price + "</span></p>" +
				"</a>"
		} else {
			li.innerHTML = "<a href='item.html?" + list.pro[i].cid + "?" + list.pro[i].pid + "'>" +
				"<p><img src='" + list.pro[i].img_src + "' /></p>" +
				"<p>" + list.pro[i].name + "</p>" +
				"<p><span class='red'>¥</span><span class='price'>" + list.pro[i].price + "</span></p>" +
				"</a>"
		}
		$(".list1 ul").append(li);
	}
	for(var i = 0; i < list.mx.length; i++) {
		var li = document.createElement("li");
		if(list.mx[i].del) {
			li.innerHTML = "<a href='item.html?" + list.mx[i].cid + "?" + list.mx[i].pid + "'>" +
				"<p><img src='" + list.mx[i].img_src + "' /></p>" +
				"<p>" + list.mx[i].name + "</p>" +
				"<p><del>¥" + list.mx[i].del + "</del><span class='red'>¥</span><span class='price'>" + list.mx[i].price + "</span></p>" +
				"</a>"
		} else {
			li.innerHTML = "<a href='item.html?" + list.mx[i].cid + "?" + list.mx[i].pid + "'>" +
				"<p><img src='" + list.mx[i].img_src + "' /></p>" +
				"<p>" + list.mx[i].name + "</p>" +
				"<p><span class='red'>¥</span><span class='price'>" + list.mx[i].price + "</span></p>" +
				"</a>"
		}
		$(".list3 ul").append(li);
	}
	for(var i = 0; i < list.meilan.length; i++) {
		var li = document.createElement("li");
		if(list.meilan[i].del) {
			li.innerHTML = "<a href='item.html?" + list.meilan[i].cid + "?" + list.meilan[i].pid + "'>" +
				"<p><img src='" + list.meilan[i].img_src + "' /></p>" +
				"<p>" + list.meilan[i].name + "</p>" +
				"<p><del>¥" + list.meilan[i].del + "</del><span class='red'>¥</span><span class='price'>" + list.meilan[i].price + "</span></p>" +
				"</a>"
		} else {
			li.innerHTML = "<a href='item.html?" + list.meilan[i].cid + "?" + list.meilan[i].pid + "'>" +
				"<p><img src='" + list.meilan[i].img_src + "' /></p>" +
				"<p>" + list.meilan[i].name + "</p>" +
				"<p><span class='red'>¥</span><span class='price'>" + list.meilan[i].price + "</span></p>" +
				"</a>"
		}
		$(".list2 ul").append(li);
	}
	for(var i = 0; i < list.peijian.length; i++) {
		var li = document.createElement("li");
		if(list.peijian[i].del) {
			li.innerHTML = "<a href='item.html?" + list.peijian[i].cid + "?" + list.peijian[i].pid + "'>" +
				"<p><img src='" + list.peijian[i].img_src + "' /></p>" +
				"<p>" + list.peijian[i].name + "</p>" +
				"<p><del>¥" + list.peijian[i].del + "</del><span class='red'>¥</span><span class='price'>" + list.peijian[i].price + "</span></p>" +
				"</a>"
		} else {
			li.innerHTML = "<a href='item.html?" + list.peijian[i].cid + "?" + list.peijian[i].pid + "'>" +
				"<p><img src='" + list.peijian[i].img_src + "' /></p>" +
				"<p>" + list.peijian[i].name + "</p>" +
				"<p><span class='red'>¥</span><span class='price'>" + list.peijian[i].price + "</span></p>" +
				"</a>"
		}
		$(".list4 ul").append(li);
	}
	for(var i = 0; i < list.yingjian.length; i++) {
		var li = document.createElement("li");
		if(list.yingjian[i].del) {
			li.innerHTML = "<a href='item.html?" + list.yingjian[i].cid + "?" + list.yingjian[i].pid + "'>" +
				"<p><img src='" + list.yingjian[i].img_src + "' /></p>" +
				"<p>" + list.yingjian[i].name + "</p>" +
				"<p><del>¥" + list.yingjian[i].del + "</del><span class='red'>¥</span><span class='price'>" + list.yingjian[i].price + "</span></p>" +
				"</a>"
		} else {
			li.innerHTML = "<a href='item.html?" + list.yingjian[i].cid + "?" + list.yingjian[i].pid + "'>" +
				"<p><img src='" + list.yingjian[i].img_src + "' /></p>" +
				"<p>" + list.yingjian[i].name + "</p>" +
				"<p><span class='red'>¥</span><span class='price'>" + list.yingjian[i].price + "</span></p>" +
				"</a>"
		}
		$(".list5 ul").append(li);
	}
});

$(".li-box").find(".li").mouseover(function() {
	var index = $(this).attr("index");
	$(".list").css("display", "none");
	$(".list").eq(index).css("display", "block");
	$(".menu-list").slideDown(300);
});
$(".li-box").mouseout(function() {
	$(".menu-list").mouseleave(function() {
		setTimeout(function() {
			$(".menu-list").css("display","none");
			setTimeout(function() {
				$(".list").css("display", "none");
			}, 300)
		}, 200)
	})
});


if( $.cookie("login") == "true" )
{
	$("#login").html($.cookie("userName"));
	$("#login").prop("href","person.html?" + $("#login").html());
	$("#toCar").prop("href","myOrder.html?" + $.cookie("userName"));
	$("#ShopCar").prop("href","shopCar.html?" + $.cookie("userName"));
}

