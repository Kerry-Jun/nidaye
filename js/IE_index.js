
if( $.cookie("login") == "true" )
{
	$("#login-true").find("a").prop("href","html/person.html?" + $.cookie("userName") );
	$("#login-true").find("#car").prop("href","html/shopCar.html?" + $.cookie("userName") );
}

$("#login").mouseenter(function() {
	$("#login-box").css("display", "block");
	if( $.cookie("login") == "true" )
	{
		$("#login-true").css("display", "block");
	}
	else 
	{
		$("#login-list").css("display", "block");
	}

});
$("#login").mouseleave(function() {
	$("#login-box").css("display", "none");
	$("#login-list").css("display", "none");
	$("#login-true").css("display", "none");
});

$("#logout").click(function(){
	$.cookie("login",'', { expires: -1,path:'/' });
	window.location.reload();
});
var timer1;
var num = 0;
var cout = 0;
$(".moveOn").mouseenter(function() {
	$("#item-list").css("display", "block");
	$(".nav-list .ul li a").addClass("meun");
	$(".nav .head").find("a").addClass("unchange");
	$(".nav").addClass("nav-back");

})
$(".animate0").mouseenter(function() {
	$(".pList a").css("display", "none");
	$(".pList1 a").css("display", "block");
});
$(".animate1").mouseenter(function() {
	$(".pList a").css("display", "none");
	$(".pList2 a").css("display", "block");
});
$(".animate2").mouseenter(function() {
	$(".pList a").css("display", "none");
	$(".pList3 a").css("display", "block");
});
$(".moveOn").mouseleave(function() {
	$("#item-list").css("display","none");
	$(".nav").removeClass("nav-back");
	$(".nav-list .ul li a").removeClass("meun");
	$(".nav .head").find("a").removeClass("unchange");
})

$.ajax({
	type: "POST",
	url: "json/menu_data.json"
}).done(function(data) {
	var str = data.result.phoneList;
	for(var i = 0; i < 4; i++) {
		var li = document.createElement("li");
		li.innerHTML = "<a href='html/item.html?" + str[i].cid + "?" + str[i].pid +"'>" + str[i].name + "</a>";
		$(".menu_data").append(li);
	}
});

$.ajax({
	type: "POST",
	url: "json/phone_list.json"
}).done(function(data) {
	var str1 = data.result.phoneList1;
	var str2 = data.result.phoneList2;
	var str3 = data.result.List3;
	for(var i = 0; i < str1.length; i++) {
		var a = document.createElement("a");
		a.setAttribute("href", "html/item.html?" + str1[i].cid + "?" + str1[i].pid);
		a.innerHTML = "<i><img src='" + str1[i].img_src + "'/></i><p>" + str1[i].name + "</p>";
		$(".pList1").append(a);
	}
	for(var i = 0; i < str2.length; i++) {
		var a = document.createElement("a");
		a.setAttribute("href", "html/item.html?" + str2[i].cid + "?" + str2[i].pid);
		a.innerHTML = "<i><img src='" + str2[i].img_src + "'/></i><p>" + str2[i].name + "</p>";
		$(".pList2").append(a);
	}
	for(var i = 0; i < str3.length; i++) {
		var a = document.createElement("a");
		a.setAttribute("href", "html/item.html?" + str3[i].cid + "?" + str3[i].pid);
		a.innerHTML = "<i><img src='" + str3[i].img_src + "'/></i><p>" + str3[i].name + "</p>";
		$(".pList3").append(a);
	}
})
//轮播图AJAX获取

$.ajax({
	type: "POST",
	url: "json/Carousel.json"
}).done(function(data) {
	var str = data.result.imgList;
	for(var i = 0; i < str.length; i++) {
		var span = document.createElement("span");
		var li = document.createElement("li");
		if(i == 0) {
			li.setAttribute("class", "first");
			span.setAttribute("class", "red");
		}
		$("#banner div").append(span);
		li.setAttribute("black", str[i].black)
		li.style.background = "url(" + str[i].img_src + ") no-repeat center";
		li.style.width = document.documentElement.clientWidth + "px";
		if(str[i].hasButton != 0) {
			for(var j = 0; j < str[i].hasButton; j++) {
				li.innerHTML += "<a class='a' href='" + str[i].button[j].href + "' style='width:" + str[i].button[j].buttonWidth + ";height:" + str[i].button[j].buttonHeight + ";left:" + str[i].button[j].buttonLeft + ";top:" + str[i].button[j].buttonTop + "'></a>"
			}
		} else {
			li.innerHTML += "<a class='a' href='" + str[i].href + "' style='width:100%;height:100%'></a>"
		}
		$("#banner #ul").append(li);
	}
	if($("#banner #ul li").eq(0).attr("black") == "1") {
		$(".nav .nav-list").find("a").addClass("white");
		$(".nav .head").find("a").addClass("change");
	}
})

setTimeout(function() {
	function Box(id) {
		this.box = document.getElementById(id);
		this.ul = this.box.getElementsByTagName("ul")[0];
		this.li = this.box.getElementsByTagName("li");
		//this.left = this.box.getElementsByClassName("left");
		//this.right = this.box.getElementsByClassName("right");
		this.span = this.box.getElementsByTagName("span");
		this.num = 0;
		this.per = "";
	}
	Box.prototype.init = function() {
		var width = parseInt(document.documentElement.clientWidth);
		var timer;
		for(var i = 0; i < this.li.length; i++) {
			this.li[i].index = i;
			this.span[i].index = i;
		}
		this.interval(this, width);
		this.mouseover(this);
		this.mouseout(this, width);
		this.click(this, width);
	}
	Box.prototype.interval = function(n, width) {
		var This = n;
		timer = setInterval(function() {
			width = parseInt(document.documentElement.clientWidth);
			for(var i = 0; i < This.li.length; i++) {
				This.li[i].style.width = document.documentElement.clientWidth + "px";
			}
			n.time(This, width);
		}, 3000)
	}
	Box.prototype.time = function(n, width) {
		n.num += 1;
		if(n.num > n.li.length - 1) {
			n.num = 0;
		}
		$(n.ul).animate({
			"left": -(n.num * width) + "px"
		}, 1000);
		$(n.span).eq(n.num).css("background", "#fc2200");
		if(n.li[n.num].getAttribute("black") == "1") {
			setTimeout(function() {
				$(".nav .nav-list").find("a").addClass("white");
				$(".nav .head").find("a").addClass("change");
			}, 500)
		} else {
			setTimeout(function() {
				$(".nav .nav-list").find("a").removeClass("white");
				$(".nav .head").find("a").removeClass("change");
			}, 500)
		}
		if(n.per != "") {
			$(n.span).eq(n.per).css("background", "#aaa");
		} else {
			$(n.span).eq(0).css("background", "#aaa");
		}
		n.per = n.num;
	}
	Box.prototype.mouseout = function(n, width) {
		var This = n;
		$(n.span).mouseout(function() {
			n.interval(This, width);
		})
	}
	Box.prototype.mouseover = function(n) {
		var This = n;
		$(n.span).mouseover(function() {
			clearInterval(timer);
		})
	}
	Box.prototype.click = function(n, width) {
		var This = n;
		$(n.left).click(function() {
			This.sub(This, width);
		});
		$(n.right).click(function() {
			This.add(This, width);
		});
		$(n.span).click(function() {
			This.turnTo(This, this, width);
		});
	}
	Box.prototype.sub = function(n, width) {
		n.num -= 1;
		if(n.num < 0) {
			n.num = n.li.length - 1;
		}
		$(n.ul).animate({
			"left": -(n.num * width) + "px"
		}, 1000);
		n.span[n.num].style.background = "#fc2200";
		if(n.per != "") {
			n.span[n.per].style.background = "#aaa";
		} else {
			n.span[0].style.background = "#aaa";
		}
		n.per = n.num;
	}

	Box.prototype.add = function(n, width) {
		n.num += 1;
		if(n.num > n.li.length - 1) {
			n.num = 0;
		}
		$(n.ul).animate({
			"left": -(n.num * width) + "px"
		}, 1000);
		n.span[n.num].style.background = "#fc2200";
		if(n.per != "") {
			n.span[n.per].style.background = "#aaa";
		} else {
			n.span[0].style.background = "#aaa";
		}
		n.per = n.num;
	}
	Box.prototype.turnTo = function(n, span, width) {
		n.num = span.index;
		if(n.li[n.num].getAttribute("black") == "1") {
			setTimeout(function() {
				$(".nav .nav-list").find("a").addClass("white");
				$(".nav .head").find("a").addClass("change")
			}, 800)
		} else {
			setTimeout(function() {
				$(".nav .nav-list").find("a").removeClass("white");
				$(".nav .head").find("a").removeClass("change")
			}, 800)
		}
		$(n.ul).animate({
			"left": -(n.num * width) + "px"
		}, 1000);
		span.style.background = "#fc2200";
		if(n.per != "") {
			n.span[n.per].style.background = "#aaa";
		} else {
			n.span[0].style.background = "#aaa";
		}
		n.per = span.index;
	}
	var Carousel = new Box("banner");
	Carousel.init();
}, 150)