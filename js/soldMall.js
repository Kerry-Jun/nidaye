$.ajax({
	type:"post",
	url:"../json/soldMall_Carousel.json"
}).done(function(data){
	var str = data.result.imgList;
	for( var i = 0 ; i< str.length ; i++ )
	{
		var div = document.createElement("div");
		div.setAttribute("class","div");
		div.innerHTML = "<a href='" + str[i].href + "'></a>";
		var span = document.createElement("span");
		div.index = i;
		span.index = i;
		if( i == 0 )
		{
			div.setAttribute("class","div first");
			span.setAttribute("class","first");
		}		
		div.style.background = "url(" + str[i].img_src + ") center";
		$("#banner").append(div);
		$("#span-box").append(span);
	}
});

$.ajax({
	type:"post",
	url:"../json/soldMall_left_nav.json"
}).done(function(data){
	var str = data.result.itemList;
	for( var i = 0 ; i < str.length ; i++ )
	{
		var ul = document.createElement("ul");
		var ul2 = document.createElement("ul");
		for( var j = 0 ; j < str[i].details.length ; j++ )
		{
			var li = document.createElement("li");
			li.innerHTML = "<a href='item.html?" + str[i].details[j].cid + "?" + str[i].details[j].pid + "'><img src='" + str[i].details[j].img_src + "'/><span>" + str[i].details[j].name + "</span></a>";
			if( j < 5 )
			{
				$(ul).append(li);
			}
			if( j < 10 && j >= 5 )
			{
				$(ul2).append(li);
			}
			if( j > 10 )
			{
				break;
			}
		}
		$("#left-nav").find(".box"+(i+1)).find(".box-list").append(ul);
		if(j>6)
		{
			$("#left-nav").find(".box"+(i+1)).find(".box-list").append(ul2);	
		}
		var span = document.createElement("span");
		span.setAttribute("class","clear");
		$("#left-nav").find(".box"+(i+1)).find(".box-list").append(span);
		$("#left-nav").find(".box"+(i+1)).append(span);
	}
});
$.ajax({
	type:"post",
	url:"../json/item_list.json"
}).done(function(data){
	var str = data.result.itemList[0].List;
	for( var i = 1 ; i < 10 ; i++ )
	{
		var a = document.createElement("a");
		a.setAttribute("href","item.html?0?" + i);
		a.innerHTML =   "<img src='"+ str[i].details.itemType[0].item_big_img[0].src +"' />"+
						"<p class='p1'>"+str[i].details.name+"</p>"+
						"<p class='p2'>"+str[i].details.describe+"</p>"+
						"<p class='p3'><span>¥</span>"+str[i].details.price+"</p>";
		$("#slod-list").append(a);
	}
});


setTimeout(function(){
	var timer;
	var num = 0;
	var num2 = 0;
	function carousel(){
		timer = setInterval(function(){
			$("#banner").find(".div").eq(num).fadeOut(500);
			if( num2 == 2 )
			{
				$("#hot").find(".carousel").animate({"left":"-1263px"});
			}
			if( num2 == 4 )
			{
				$("#hot").find(".carousel").animate({"left":"0"});
				num2 = 0;
			}
			num2++;
			num++;
			if( num > 4 )
			{
				num = 0;
			}
			$("#span-box").find("span").removeClass("first");
			$("#span-box").find("span").eq(num).addClass("first");
			$("#banner").find(".div").eq(num).fadeIn(500);
		},4000)
	}
	carousel();
	$("#span-box").find("span").mouseover(function(){
		clearInterval(timer);
	});
	$("#span-box").find("span").mouseout(function(){
		carousel();
	});
	$("#span-box").find("span").click(function(){
		$("#banner").find(".div").fadeOut(500);
		$("#banner").find(".div").eq(this.index).fadeIn(500);
		$("#span-box").find("span").removeClass("first");
		$(this).addClass("first");
		num = this.index;
	});
},100)


$.ajax({
	type:"post",
	url:"../json/soldMall_hot.json"
}).done(function(data){
	var str = data.result.itemList[0].details;
	for( var i = 0 ; i < str.length ; i++ )
	{
		var a = document.createElement("a");
		a.setAttribute("href","item.html?" + str[i].cid + "?" + str[i].pid );
		a.innerHTML =   "<img src='" + str[i].img_src + "' />"+
						"<p class='p1'>" + str[i].name + "</p>"+
						"<p class='p2'>" + str[i].describe + "</p>"+
						"<p class='p3'><span>¥</span>" + str[i].price + "</p>";
		$("#hot").find(".carousel").append(a);
	}
})


